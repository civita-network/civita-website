import { randomUUID } from "node:crypto";
import { readFile, rename, rm, writeFile } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";
import { isDeepStrictEqual } from "node:util";
import countries from "i18n-iso-countries";

const repository = "civita-network/civita-documentation";
const sourceUrl = "https://github.com/" + repository + "/blob/main/working_group.tex";
const defaultRosterPath = fileURLToPath(new URL("../src/data/working-group.json", import.meta.url));
const regionNames = new Intl.DisplayNames("en", { type: "region" });
const header = ["First Name", "Last Name", "Institution", "Country", "Email"];
const sectionCommands = ["\\endfirsthead", "\\endhead", "\\endfoot", "\\endlastfoot"];
const tableRules = new Set(["\\hline", "\\toprule", "\\midrule", "\\bottomrule"]);
const maxReduction = 0.20;

const accents = {
  "'": "\u0301", "\x60": "\u0300", '"': "\u0308", "^": "\u0302", "~": "\u0303",
  "=": "\u0304", ".": "\u0307", u: "\u0306", v: "\u030c", H: "\u030b",
  c: "\u0327", k: "\u0328", b: "\u0331", d: "\u0323", r: "\u030a",
};
const textCommands = new Set(["textbf", "textit", "textmd", "textnormal", "textrm",
  "textsc", "textsf", "textsl", "texttt", "textup", "emph", "mbox"]);
const textSymbols = {
  "&": "&", "%": "%", "#": "#", "$": "$", "_": "_", "{": "{", "}": "}",
  " ": " ", ",": "\u2009", "-": "", i: "ı", j: "ȷ",
  ae: "æ", AE: "Æ", oe: "œ", OE: "Œ", aa: "å", AA: "Å", o: "ø", O: "Ø",
  l: "ł", L: "Ł", ss: "ß", textasciicircum: "^", textasciitilde: "~",
  textbackslash: "\\", textendash: "–", textemdash: "—", textquotesingle: "'",
};
const textPunctuation = { "{": "", "}": "", "~": " ", "--": "–", "---": "—" };

function displayText(latex) {
  const tokens = /\\([A-Za-z]+|[^\r\n])|[{}~&$#_^]|---|--/g;
  let output = "";
  let offset = 0;
  let match;

  while ((match = tokens.exec(latex)) !== null) {
    const [token, command] = match;
    output += latex.slice(offset, match.index);
    const rest = latex.slice(tokens.lastIndex);

    if (command === undefined && Object.hasOwn(textPunctuation, token)) {
      output += textPunctuation[token];
    } else if (Object.hasOwn(accents, command)) {
      const argument = /^\s*(?:\{\s*(\\[ij]|\p{L})\s*\}|(\\[ij](?![A-Za-z])|\p{L}))/u.exec(rest);
      if (!argument) throw new Error("missing letter after accent " + token);
      const letter = (argument[1] ?? argument[2]).replace(/^\\/, "");
      output += letter + accents[command];
      tokens.lastIndex += argument[0].length;
    } else if (textCommands.has(command)) {
      const spacing = /^\s*(?=\{)/.exec(rest);
      if (!spacing) throw new Error("expected a group after " + token);
      tokens.lastIndex += spacing[0].length;
    } else if (Object.hasOwn(textSymbols, command)) {
      output += textSymbols[command];
      if (/^[A-Za-z]/.test(command)) tokens.lastIndex += /^\s*/.exec(rest)[0].length;
    } else {
      const problem = command === undefined ? "unescaped LaTeX character" : "unexpected LaTeX command";
      throw new Error(problem + " " + token);
    }
    offset = tokens.lastIndex;
  }

  return (output + latex.slice(offset)).replace(/\s+/g, " ").trim().normalize("NFC");
}

function afterColumnDeclaration(latex, openingBrace) {
  const tokens = /\\(?:[A-Za-z]+|[^\r\n])|[{}]/g;
  tokens.lastIndex = openingBrace;
  let depth = 0;
  let match;
  while ((match = tokens.exec(latex)) !== null) {
    if (match[0] === "{") depth++;
    if (match[0] === "}" && --depth === 0) return tokens.lastIndex;
  }
  throw new Error("Unclosed longtable column declaration.");
}

function readTableSections(table) {
  const sections = new Map();
  // Escaped delimiters and delimiters inside braced arguments are cell content.
  const tokens = /\\\\\*?(?:\[[^\]\r\n]*\])?|\\(?:[A-Za-z]+|[^\r\n])|[{}&]/g;
  let rows = [];
  let cells = [];
  let cellStart = 0;
  let depth = 0;
  let lastSectionIndex = -1;

  function atRowBoundary(index) {
    return cells.length === 0 && !table.slice(cellStart, index).trim();
  }

  for (const match of table.matchAll(tokens)) {
    const [token] = match;
    if (token === "{") {
      depth++;
    } else if (token === "}") {
      if (--depth < 0) throw new Error("Unmatched closing brace in longtable.");
    } else if (depth === 0 && (token === "&" || token.startsWith("\\\\"))) {
      cells.push(table.slice(cellStart, match.index));
      cellStart = match.index + token.length;
      if (token !== "&") {
        rows.push(cells);
        cells = [];
      }
    } else if (depth === 0 && sectionCommands.includes(token)) {
      const sectionIndex = sectionCommands.indexOf(token);
      if (sectionIndex <= lastSectionIndex || !atRowBoundary(match.index)) {
        throw new Error("Unexpected " + token + " in Working Group longtable.");
      }
      sections.set(token, rows);
      rows = [];
      lastSectionIndex = sectionIndex;
      cellStart = match.index + token.length;
    } else if (depth === 0 && tableRules.has(token) && atRowBoundary(match.index)) {
      cellStart = match.index + token.length;
    }
  }

  if (depth !== 0 || !atRowBoundary(table.length)) {
    throw new Error("Unclosed group or row in Working Group longtable.");
  }
  return { sections, rows };
}

export function parseWorkingGroup(latex) {
  // Keep URL arguments opaque to comment stripping. The fifth column is discarded.
  const uncommented = latex.replace(
    /\\nolinkurl\s*\{(?:\\[{}]|[^{}])*\}|\\(?:[A-Za-z]+|[^\r\n])|%[^\r\n]*(?:\r?\n|$)/g,
    (token) => token.startsWith("%") ? "" : token,
  );
  const begins = [...uncommented.matchAll(/\\begin\s*\{longtable\}\s*(?:\[[lcr]\]\s*)?\{/g)];
  if (begins.length !== 1) throw new Error("Expected one Working Group longtable.");

  const begin = begins[0];
  const tableStart = afterColumnDeclaration(uncommented, begin.index + begin[0].length - 1);
  const tableEnd = /\\end\s*\{longtable\}/.exec(uncommented.slice(tableStart));
  if (!tableEnd) throw new Error("Missing end of Working Group longtable.");
  const { sections, rows } = readTableSections(uncommented.slice(tableStart, tableStart + tableEnd.index));

  const headers = sectionCommands.slice(0, 2).filter((command) => sections.has(command));
  const headerRows = headers.length ? headers.map((command) => sections.get(command)) : [[rows.shift()]];
  for (const block of headerRows) {
    if (block.length !== 1 || !block[0] || !isDeepStrictEqual(block[0].map(displayText), header)) {
      throw new Error("Unexpected Working Group table header. Expected first name, last name, institution, country, and email.");
    }
  }

  if (rows.length === 0) throw new Error("Working Group roster contains no members.");
  const seenNames = new Set();
  return rows.map((row, index) => {
    const location = "Working Group member row " + (index + 1);
    if (row.length !== header.length) {
      throw new Error(location + " has " + row.length + " columns; expected " + header.length + ".");
    }

    const fields = ["first name", "last name", "institution", "country"];
    const [firstName, lastName, institution, code] = fields.map((field, column) => {
      try {
        const value = displayText(row[column]);
        if (!value) throw new Error("empty value");
        if (/[^\s@]+@[^\s@]+\.[^\s@]+/.test(value)) throw new Error("unexpected email address");
        return value;
      } catch (error) {
        throw new Error(location + ", " + field + ": " + error.message);
      }
    });

    const countryCode = code.toUpperCase();
    const alpha2 = /^[A-Z]{2,3}$/.test(countryCode)
      ? countries.toAlpha2(countryCode === "NED" ? "NLD" : countryCode)
      : undefined;
    if (!alpha2 || !countries.isValid(alpha2)) {
      const detail = /^[A-Z]{2,3}$/.test(countryCode) ? " " + countryCode : "";
      throw new Error(location + " has an unknown country code" + detail + ".");
    }

    const name = firstName + " " + lastName;
    const nameKey = name.toLowerCase();
    if (seenNames.has(nameKey)) throw new Error(location + " has duplicate member name " + name + ".");
    seenNames.add(nameKey);
    return { name, institution, country: regionNames.of(alpha2) };
  });
}

async function fetchSource(fetchImpl) {
  async function get(url, label) {
    let response;
    try {
      response = await fetchImpl(url, { signal: AbortSignal.timeout(20_000) });
    } catch (error) {
      const detail = error.cause?.code ?? error.message;
      throw new Error("Could not fetch " + label + " from GitHub: " + detail);
    }
    if (!response.ok) {
      throw new Error("Could not fetch " + label + " from GitHub (HTTP " + response.status + ").");
    }
    return response;
  }

  const ref = await get("https://api.github.com/repos/" + repository + "/git/ref/heads/main", "documentation main");
  const sha = (await ref.json()).object?.sha;
  if (!sha || !/^[a-f0-9]{40}$/.test(sha)) throw new Error("GitHub did not return a valid documentation commit SHA.");
  const source = await get("https://raw.githubusercontent.com/" + repository + "/" + sha + "/working_group.tex", "working_group.tex");
  return { sha, latex: await source.text() };
}

function reportChanges(previous, members, report) {
  const oldByName = new Map(previous.map((member) => [member.name, member]));
  const newByName = new Map(members.map((member) => [member.name, member]));
  const added = members.filter(({ name }) => !oldByName.has(name));
  const removed = previous.filter(({ name }) => !newByName.has(name));
  const changed = members.filter((member) => {
    const old = oldByName.get(member.name);
    return old && !isDeepStrictEqual(member, old);
  });

  report("Roster updated to " + members.length + " members (" + added.length + " added, "
    + removed.length + " removed, " + changed.length + " changed).");
  for (const { name } of added) report("  Added: " + name);
  for (const { name } of removed) report("  Removed: " + name);
  for (const member of changed) {
    const old = oldByName.get(member.name);
    const details = ["institution", "country"].filter((key) => member[key] !== old[key])
      .map((key) => key + " " + old[key] + " → " + member[key]);
    report("  Changed: " + member.name + " (" + details.join(", ") + ")");
  }

  const oldOrder = previous.filter(({ name }) => newByName.has(name)).map(({ name }) => name);
  const newOrder = members.filter(({ name }) => oldByName.has(name)).map(({ name }) => name);
  if (!isDeepStrictEqual(oldOrder, newOrder)) report("  Existing members reordered.");
}

export async function syncWorkingGroup({
  rosterPath = defaultRosterPath,
  fetchImpl = fetch,
  report = console.log,
} = {}) {
  const { members: previous } = JSON.parse(await readFile(rosterPath, "utf8"));
  if (!Array.isArray(previous)) throw new Error("Existing Working Group JSON is missing its members array.");
  const { sha, latex } = await fetchSource(fetchImpl);
  const members = parseWorkingGroup(latex);
  if (previous.length - members.length > previous.length * maxReduction) {
    throw new Error("Working Group roster would shrink from " + previous.length + " to " + members.length
      + " members. Reductions above 20% require review before updating the website roster.");
  }
  if (isDeepStrictEqual(previous, members)) {
    report("Roster unchanged (" + members.length + " members).");
    return;
  }

  const roster = { metadata: { sourceUrl, sourceCommitSha: sha }, members };
  const temporaryPath = rosterPath + "." + randomUUID() + ".tmp";
  try {
    await writeFile(temporaryPath, JSON.stringify(roster, null, 2) + "\n", { flag: "wx" });
    await rename(temporaryPath, rosterPath);
  } finally {
    await rm(temporaryPath, { force: true });
  }
  reportChanges(previous, members, report);
}

if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) {
  try {
    await syncWorkingGroup();
  } catch (error) {
    console.error("Working Group synchronization failed: " + error.message);
    process.exitCode = 1;
  }
}
