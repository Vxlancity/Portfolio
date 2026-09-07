export default function Hero() {
  return (
    <div
      data-gsap="hero"
      className="max-w-5xl mx-auto px-6 md:px-12 pt-32 md:pt-36 pb-14"
    >
      <p data-gsap="hero-item" className="eyebrow mb-6">
        Developer · UI/UX · Performance
      </p>

      <h1
        className="font-display font-black leading-[0.85] tracking-tight mb-8"
        style={{
          fontSize: "clamp(3.5rem, 12vw, 9.5rem)",
          color: "var(--text)",
        }}
      >
        {"Vxlancity.".split("").map((char, index) => (
          <span key={index} className="char-mask">
            <span data-gsap="hero-char" className="inline-block">
              {char}
            </span>
          </span>
        ))}
      </h1>

      <div data-gsap="hero-item">
        <div className="section-rule mb-8" />

        <div className="flex items-start gap-3 max-w-2xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/emojis/kuromi_hey.gif`}
            alt=""
            aria-hidden="true"
            className="w-5 h-5 object-contain shrink-0 mt-1.5"
          />
          <p className="prose-body text-base md:text-lg">
            I build fast, beautiful applications with a focus on rendering
            performance and thoughtful UI/UX. Crafting digital experiences with
            precision and passion — exploring modern web technologies and
            custom web applications.
          </p>
        </div>
      </div>
    </div>
  );
}
