import Image from "next/image";

const COLLABORATORS: {
  file: string;
  name: string;
  role: string;
  platform: string;
  href: string;
  color: string;
}[] = [
  {
    file: "holzi.png",
    name: "einHolzkopf",
    role: "Content Creator",
    platform: "YouTube",
    href: "https://www.youtube.com/@einHolzkopf",
    color: "#22c55e",
  },
  {
    file: "tuubaa.png",
    name: "Tuubaa",
    role: "Content Creator",
    platform: "YouTube",
    href: "https://youtube.com/@tuubaa",
    color: "#ec4899",
  },
  {
    file: "giggand.png",
    name: "Giggand",
    role: "Streamer",
    platform: "Twitch",
    href: "https://twitch.tv/giggand",
    color: "#a855f7",
  },
  {
    file: "xtobii.png",
    name: "xTobiiLIve",
    role: "Streamer",
    platform: "Twitch",
    href: "https://www.twitch.tv/xtobiilive",
    color: "#6366f1",
  },
];

export default function WorkedFor() {
  return (
    <section id="worked-for" className="relative py-20">
      <span data-gsap="giant" aria-hidden="true" className="giant-text top-4">
        Friends
      </span>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-12">
          <h2 data-gsap="section-title" className="section-title mb-4">
            Worked For
          </h2>
          <div className="section-rule mb-4" />
          <p
            data-gsap="fade-up"
            className="text-sm"
            style={{ color: "var(--text-tertiary)" }}
          >
            People and creators I&apos;ve had the pleasure to collaborate with
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
          {COLLABORATORS.map((person) => (
            <a
              key={person.name}
              href={person.href}
              target="_blank"
              rel="noopener noreferrer"
              data-gsap="fade-up"
              className="panel group relative flex flex-col items-center p-6 text-center transition-all duration-300 hover:-translate-y-2 hover:border-[var(--border-strong)]"
            >
              <div className="relative mb-5">
                <div
                  className="absolute -inset-1.5 rounded-full opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-75"
                  style={{ background: person.color }}
                />
                <Image
                  src={`/image/pfp/${person.file}`}
                  alt={person.name}
                  width={112}
                  height={112}
                  className="relative h-24 w-24 rounded-full object-cover border-2 border-[var(--border)] shadow-lg transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <h3
                className="text-lg font-bold mb-1.5 transition-colors group-hover:text-white"
                style={{ color: "var(--text)" }}
              >
                {person.name}
              </h3>

              <div className="mb-5 flex items-center gap-2">
                <span
                  className="inline-flex items-center rounded-full px-3 py-0.5 text-xs font-medium"
                  style={{
                    background: `color-mix(in oklch, ${person.color} 18%, transparent)`,
                    color: person.color,
                    border: `1px solid color-mix(in oklch, ${person.color} 35%, transparent)`,
                  }}
                >
                  {person.platform}
                </span>
                <span
                  className="text-xs"
                  style={{ color: "var(--text-tertiary)" }}
                >
                  {person.role}
                </span>
              </div>

              <span className="btn btn-sm w-full mt-auto group-hover:border-[var(--border-strong)] group-hover:bg-[var(--surface-raised)]">
                View Channel ↗
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
