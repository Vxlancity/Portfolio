import BackHome from "@/components/back-home";
import AboutFx from "@/components/about-fx";

const FACTS_CARDS = [
  {
    emoji: "📍",
    label: "Standort",
    value: "Niedersachsen, Deutschland",
    bold: true,
  },
  {
    emoji: "🎂",
    label: "Alter",
    value: "15 Jahre",
    bold: true,
  },
  {
    emoji: "🎯",
    label: "Vision",
    value:
      "Blitzschnelle, moderne und visuell beeindruckende Web-Erlebnisse erschaffen.",
    bold: false,
  },
  {
    emoji: "💻",
    label: "Was ich mache",
    value: "Individuelle Websites & Web-Apps – kostenfrei auf Anfrage.",
    bold: false,
  },
];

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 md:px-12 py-24">
      <AboutFx />

      <p data-about="eyebrow" className="eyebrow mb-6">
        About Me
      </p>

      {/* Single h1 – animated as one block, no word-mask clipping */}
      <h1
        data-about="title"
        className="font-display font-black tracking-tight mb-10"
        style={{
          fontSize: "clamp(4.5rem, 14vw, 9.5rem)",
          lineHeight: 0.9,
          color: "var(--text)",
        }}
      >
        Hey,
        <br />
        ich bin&apos;s.
      </h1>

      <div data-about="item" className="section-rule mb-10" />

      <p
        data-about="item"
        className="text-base md:text-lg leading-relaxed mb-10"
        style={{ color: "var(--text-secondary)" }}
      >
        Ich bin{" "}
        <span style={{ color: "var(--text)", fontWeight: 600 }}>
          15 Jahre alt
        </span>{" "}
        und komme aus{" "}
        <span style={{ color: "var(--text)", fontWeight: 600 }}>
          Niedersachsen, Deutschland
        </span>
        . Seit Jahren begeistere ich mich für Webentwicklung – ich baue
        individuelle Websites, Backend-Systeme und Full-Stack Applications mit
        dem Fokus auf Geschwindigkeit und modernes Design.
      </p>

      <div
        data-about="item"
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10"
      >
        {FACTS_CARDS.map((card) => (
          <div
            key={card.label}
            className="panel px-6 py-5 flex items-start gap-4"
          >
            <span className="text-2xl shrink-0">{card.emoji}</span>
            <div>
              <p
                className="text-xs mb-1 uppercase tracking-widest"
                style={{ color: "var(--text-tertiary)" }}
              >
                {card.label}
              </p>
              <p
                className={card.bold ? "text-sm font-semibold" : "text-sm"}
                style={{
                  color: card.bold ? "var(--text)" : "var(--text-secondary)",
                }}
              >
                {card.value}
              </p>
            </div>
          </div>
        ))}

        {/* Anime – full width */}
        <div
          className="panel px-6 py-5 flex items-center gap-5 sm:col-span-2"
          style={{
            background:
              "color-mix(in oklch, oklch(68% 0.19 290) 7%, transparent)",
            border:
              "1px solid color-mix(in oklch, oklch(68% 0.19 290) 28%, transparent)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/emojis/kuromi_laugh.gif`}
            alt=""
            aria-hidden="true"
            className="w-12 h-12 object-contain shrink-0"
          />
          <div>
            <p
              className="text-xs mb-1 uppercase tracking-widest"
              style={{ color: "var(--text-tertiary)" }}
            >
              🍿 Lieblings-Anime
            </p>
            <p
              className="text-base font-bold"
              style={{ color: "var(--accent)" }}
            >
              Onimai: I&apos;m Now Your Sister!
            </p>
            <p
              className="text-xs mt-0.5"
              style={{ color: "var(--text-tertiary)" }}
            >
              Wenn ich nicht code, schaue ich Anime.
            </p>
          </div>
        </div>
      </div>

      <div data-about="item">
        <BackHome />
      </div>
    </div>
  );
}
