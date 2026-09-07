import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import BackHome from "@/components/back-home";
import ContactFx from "@/components/contact-fx";

const CONTACT_LINKS = [
  {
    label: "Discord",
    icon: faDiscord,
    href: "https://discord.com/users/1422272718459633664",
    external: true,
  },
  {
    label: "GitHub",
    icon: faGithub,
    href: "https://github.com/Vxlancity",
    external: true,
  },
  {
    label: "Email",
    icon: faEnvelope,
    href: "mailto:vxlancity.contact@yahoo.com?subject=Hello%20from%20your%20portfolio&body=Hi%20Vxlancity,%0D%0A%0D%0AI%20found%20your%20portfolio%20and%20wanted%20to%20get%20in%20touch!",
    external: false,
  },
];

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 md:px-12 py-24">
      <ContactFx />

      <p
        data-contact="eyebrow"
        className="eyebrow mb-6"
        style={{ opacity: 0, transform: "translateY(16px)" }}
      >
        Contact
      </p>

      <h1
        className="font-display font-black leading-[0.85] tracking-tight mb-8"
        style={{ fontSize: "clamp(4rem, 12vw, 8rem)", color: "var(--text)" }}
      >
        {"Get In Touch.".split("").map((char, index) => (
          <span key={index} className="char-mask">
            <span
              data-contact="char"
              className="inline-block"
              style={{ transform: "translateY(110%)" }}
            >
              {char === " " ? "\u00a0" : char}
            </span>
          </span>
        ))}
      </h1>

      <div
        data-contact="item"
        className="section-rule mb-8"
        style={{ opacity: 0, transform: "translateY(24px)" }}
      />

      <ul
        data-contact="item"
        className="panel overflow-hidden"
        style={{ opacity: 0, transform: "translateY(24px)" }}
      >
        {CONTACT_LINKS.map((link, index) => (
          <li
            key={link.label}
            style={{
              borderTop: index === 0 ? undefined : "1px solid var(--border)",
            }}
          >
            <a
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="row-link flex min-h-14 items-center justify-between px-5 py-4"
            >
              <span className="flex items-center gap-3">
                <FontAwesomeIcon
                  icon={link.icon}
                  className="w-4 h-4"
                  style={{ color: "var(--text-tertiary)" }}
                />
                <span className="text-sm" style={{ color: "var(--text)" }}>
                  {link.label}
                </span>
              </span>
              <span
                aria-hidden="true"
                className="row-arrow"
                style={{ color: "var(--text-tertiary)" }}
              >
                ↗
              </span>
            </a>
          </li>
        ))}
      </ul>

      <div
        data-contact="item"
        style={{ opacity: 0, transform: "translateY(24px)" }}
      >
        <BackHome />
      </div>
    </div>
  );
}
