"use client";

const items = [
  { label: "Brand Identity", color: "var(--iris)" },
  { label: "Digital Design", color: "var(--aqua)" },
  { label: "Campaign Creative", color: "var(--gold)" },
  { label: "Design Systems", color: "var(--violet)" },
  { label: "Environmental & Spatial", color: "var(--sky)" },
  { label: "Credentials & Presentations", color: "var(--ember)" },
];

export function DisciplineTicker() {
  const row = (
    <>
      {items.map((item) => (
        <span
          key={item.label}
          className="inline-flex items-center gap-9 px-9"
          style={{
            fontFamily: "var(--font-dm-mono)",
            fontSize: "9px",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "var(--ter)",
          }}
        >
          {item.label}
          <span
            className="inline-block w-[3px] h-[3px] rounded-full flex-shrink-0"
            style={{ background: item.color }}
          />
        </span>
      ))}
    </>
  );
  return (
    <div
      className="border-t border-b overflow-hidden relative z-[1] py-[13px]"
      style={{
        borderColor: "var(--border)",
        background: "var(--deep)",
      }}
    >
      <div
        className="flex gap-0 whitespace-nowrap"
        style={{ animation: "tickerMove 32s linear infinite" }}
      >
        {row}
        {row}
      </div>
    </div>
  );
}
