interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center items-center mx-auto" : "text-left items-start";
  const eyebrowColor = tone === "light" ? "text-gold-600" : "text-gold-400";
  const titleColor = tone === "light" ? "text-graphite-900" : "text-white";
  const descColor = tone === "light" ? "text-stone-600" : "text-stone-300";

  return (
    <div className={`flex max-w-2xl flex-col gap-4 ${alignClass}`}>
      {eyebrow && (
        <span className={`text-xs font-medium tracking-[0.2em] uppercase ${eyebrowColor}`}>
          {eyebrow}
        </span>
      )}
      <h2 className={`font-display text-3xl font-semibold leading-tight md:text-4xl ${titleColor}`}>
        {title}
      </h2>
      {description && <p className={`text-base leading-relaxed ${descColor}`}>{description}</p>}
    </div>
  );
}
