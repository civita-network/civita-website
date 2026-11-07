type SectionHeadingProps = {
  as?: "h1" | "h2";
  title: string;
  id?: string;
  eyebrow?: string;
  description?: string;
};

export function SectionHeading({
  as: Heading = "h2",
  title,
  id,
  eyebrow,
  description,
}: SectionHeadingProps) {
  return (
    <div className="max-w-3xl">
      {eyebrow && (
        <p className="mb-3 text-xs font-semibold tracking-[0.16em] text-primary uppercase">
          {eyebrow}
        </p>
      )}
      <Heading
        id={id}
        className={
          Heading === "h1"
            ? "text-4xl font-semibold tracking-tight text-primary sm:text-5xl"
            : "text-2xl font-semibold tracking-tight text-primary sm:text-3xl"
        }
      >
        {title}
      </Heading>
      {description && (
        <p className="mt-3 max-w-[65ch] leading-relaxed text-muted">
          {description}
        </p>
      )}
    </div>
  );
}
