import assert from "node:assert/strict";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { parseWorkingGroup, syncWorkingGroup } from "./sync-working-group.mjs";

const fixture = await readFile(new URL("./fixtures/working-group.tex", import.meta.url), "utf8");
const firstSha = "a".repeat(40);
const nextSha = "b".repeat(40);
const sourceUrl = "https://github.com/civita-network/civita-documentation/blob/main/working_group.tex";

function table(...rows) {
  return [
    "\\begin{longtable}{lllll}",
    "First Name & Last Name & Institution & Country & Email \\\\",
    ...rows.map((row) => row + " \\\\"),
    "\\end{longtable}",
  ].join("\n");
}

function stubGithub(latex, sha = firstSha) {
  const calls = [];
  return async (url) => {
    calls.push(url);
    if (calls.length === 1) {
      assert.equal(url, "https://api.github.com/repos/civita-network/civita-documentation/git/ref/heads/main");
      return Response.json({ object: { sha } });
    }
    assert.equal(calls.length, 2);
    assert.equal(url, "https://raw.githubusercontent.com/civita-network/civita-documentation/" + sha + "/working_group.tex");
    return new Response(latex);
  };
}

async function temporaryRoster(t, members) {
  const directory = await mkdtemp(join(tmpdir(), "civita-roster-"));
  t.after(() => rm(directory, { recursive: true, force: true }));
  const rosterPath = join(directory, "working-group.json");
  const original = JSON.stringify({
    metadata: { sourceUrl, sourceCommitSha: firstSha },
    members,
  });
  await writeFile(rosterPath, original);
  return { rosterPath, original };
}

test("extracts all 36 members from the official table fixture in source order", () => {
  const members = parseWorkingGroup(fixture);
  assert.equal(members.length, 36);
  assert.deepEqual(members[0], {
    name: "Ab van den Bos",
    institution: "NLyse Consultants",
    country: "Netherlands",
  });
  assert.deepEqual(members.at(-1), {
    name: "Yuchen Li",
    institution: "Northwestern University",
    country: "United States",
  });
  assert.equal(members.find(({ name }) => name === "Jan Cervenka").institution, "Červenka Consulting");
  assert.equal(members.find(({ name }) => name === "Luca Sorelli").institution, "Université Laval");
  assert.equal(members.find(({ name }) => name === "Stephanie Paal").institution, "Texas A&M University");
  assert.doesNotMatch(JSON.stringify(members), /@|nolinkurl|email/i);
});

test("handles a multiline column declaration, repeated headers, comments, and a footer", () => {
  const withFooter = fixture.replace("\\endfoot", [
    "\\multicolumn{5}{r}{Continued on next page} \\\\",
    "\\endfoot",
    "\\hline",
    "\\endlastfoot",
    "% Extra & cells & must & be & ignored \\\\",
  ].join("\r\n"));
  assert.deepEqual(parseWorkingGroup(withFooter), parseWorkingGroup(fixture));
});

test("renders accented names, text formatting, and escaped symbols while discarding email", () => {
  const rows = table(String.raw`{\textbf{\'{E}lodie}} & \v{C}ern\'y &
    \emph{Universit\'{e}}~A\&B \#2 \{Research\} & FRA &
    \nolinkurl{a%foo&bar@example.invalid}`);
  assert.deepEqual(parseWorkingGroup(rows), [{
    name: "Élodie Černý", institution: "Université A&B #2 {Research}", country: "France",
  }]);
});

const memberRow = "First & Last & Example University & USA & \\nolinkurl{fixture@example.invalid}";

test("rejects missing and malformed rows", () => {
  assert.throws(() => parseWorkingGroup(table()), /contains no members/);
  assert.throws(() => parseWorkingGroup(table("First & Last & Example University & USA")), /4 columns; expected 5/);
  assert.throws(() => parseWorkingGroup(table(memberRow.replace("Example University", ""))), /institution: empty value/);
  assert.throws(() => parseWorkingGroup(table(memberRow.replace("First", ""))), /first name: empty value/);
  assert.throws(() => parseWorkingGroup(table(memberRow.replace("Last", ""))), /last name: empty value/);
  assert.throws(() => parseWorkingGroup(table(memberRow.replace("USA", ""))), /country: empty value/);
  assert.throws(() => parseWorkingGroup(table(memberRow.replace("First", "{First"))), /Unclosed group or row/);
  assert.throws(() => parseWorkingGroup(table(memberRow).replace(/\\\\\n\\end/, "\n\\end")), /Unclosed group or row/);
  assert.throws(() => parseWorkingGroup(table(memberRow).replace("\\end{longtable}", "")), /Missing end/);
  assert.throws(() => parseWorkingGroup(fixture.replace("First Name", "Last Name")), /Unexpected Working Group table header/);
});

test("rejects duplicate names, unknown countries, unexpected commands, and misplaced email", () => {
  assert.throws(() => parseWorkingGroup(table(memberRow, memberRow.toLowerCase())), /duplicate member name/i);
  assert.throws(() => parseWorkingGroup(table(memberRow.replace("USA", "ZZZ"))), /unknown country code ZZZ/);
  assert.throws(() => parseWorkingGroup(table(memberRow.replace("First", "\\unknown{First}"))), /first name: unexpected LaTeX command \\unknown/);
  assert.throws(() => parseWorkingGroup(table(memberRow.replace("Example University", "\\unknown{Example University}"))), /institution: unexpected LaTeX command \\unknown/);
  assert.throws(() => parseWorkingGroup(table(memberRow.replace("Example University", "fixture@example.invalid"))), /institution: unexpected email address/);
});

test("pins the download by commit and writes deterministic public JSON", async (t) => {
  const { rosterPath, original } = await temporaryRoster(t, []);
  await syncWorkingGroup({ rosterPath, fetchImpl: stubGithub(fixture), report: () => {} });
  const firstOutput = await readFile(rosterPath, "utf8");
  assert.deepEqual(JSON.parse(firstOutput), {
    metadata: { sourceUrl, sourceCommitSha: firstSha },
    members: parseWorkingGroup(fixture),
  });
  assert.doesNotMatch(firstOutput, /@|nolinkurl|email/i);

  await writeFile(rosterPath, original);
  await syncWorkingGroup({ rosterPath, fetchImpl: stubGithub(fixture), report: () => {} });
  assert.equal(await readFile(rosterPath, "utf8"), firstOutput);
});

test("leaves the file byte-for-byte unchanged when only the commit or emails change", async (t) => {
  const { rosterPath, original } = await temporaryRoster(t, parseWorkingGroup(fixture));
  const report = [];
  const newEmails = fixture.replaceAll("fixture@example.invalid", "another@example.invalid");
  await syncWorkingGroup({ rosterPath, fetchImpl: stubGithub(newEmails, nextSha), report: (line) => report.push(line) });
  assert.equal(await readFile(rosterPath, "utf8"), original);
  assert.deepEqual(report, ["Roster unchanged (36 members)."]);
});

test("reports additions, removals, and changed records", async (t) => {
  const { rosterPath } = await temporaryRoster(t, [
    { name: "First Last", institution: "Old University", country: "Canada" },
    { name: "Former Member", institution: "Some University", country: "United States" },
  ]);
  const latex = table(memberRow, "New & Member & Some University & CAN &");
  const report = [];
  await syncWorkingGroup({ rosterPath, fetchImpl: stubGithub(latex, nextSha), report: (line) => report.push(line) });
  assert.deepEqual(report, [
    "Roster updated to 2 members (1 added, 1 removed, 1 changed).",
    "  Added: New Member",
    "  Removed: Former Member",
    "  Changed: First Last (institution Old University → Example University, country Canada → United States)",
  ]);
});

test("writes and reports an ordering-only change", async (t) => {
  const latex = table(memberRow, "Another & Member & Some University & AUS &");
  const members = parseWorkingGroup(latex);
  const { rosterPath } = await temporaryRoster(t, [...members].reverse());
  const report = [];
  await syncWorkingGroup({ rosterPath, fetchImpl: stubGithub(latex, nextSha), report: (line) => report.push(line) });
  assert.deepEqual(JSON.parse(await readFile(rosterPath, "utf8")).members, members);
  assert.ok(report.includes("  Existing members reordered."));
});

test("preserves the existing roster after invalid data, a large reduction, or a fetch failure", async (t) => {
  const { rosterPath, original } = await temporaryRoster(t, parseWorkingGroup(fixture));
  const noReport = () => assert.fail("An unsuccessful synchronization should not report a change");
  const options = { rosterPath, report: noReport };
  await assert.rejects(syncWorkingGroup({ ...options, fetchImpl: stubGithub(table()) }), /contains no members/);
  assert.equal(await readFile(rosterPath, "utf8"), original);
  await assert.rejects(syncWorkingGroup({ ...options, fetchImpl: stubGithub(table(memberRow)) }), /shrink from 36 to 1/);
  assert.equal(await readFile(rosterPath, "utf8"), original);
  await assert.rejects(syncWorkingGroup({
    ...options, fetchImpl: async () => new Response(null, { status: 503 }),
  }), /documentation main.*HTTP 503/);
  assert.equal(await readFile(rosterPath, "utf8"), original);
});
