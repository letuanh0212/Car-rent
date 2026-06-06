import { Link } from "react-router-dom";
import Button from "~/components/Button";
import Input from "~/components/Inputs";

export default function Footer() {
  return (
    <footer className="border-t border-(--color-border) bg-(--color-surface-dim)">
      <div className="mx-auto grid max-w-7xl  grid-cols-1 gap-6 px-8 py-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Link to="/" className="text-2xl font-extrabold text-(--color-text-primary)">
            LuxeDrive
          </Link>

          <p className="mt-4 max-w-xs text-base leading-6 text-(--color-text-secondary)">
            Premium mobility reimagined for the modern world. Precision, power,
            and prestige in every mile.
          </p>
        </div>

        <FooterColumn
          title="Experience"
          links={[
            { label: "Browse Cars", to: "/cars" },
            { label: "Fleet Locations", to: "/locations" },
            { label: "Corporate Sales", to: "/corporate" },
          ]}
        />

        <FooterColumn
          title="Support"
          links={[
            { label: "Contact Us", to: "/contact" },
            { label: "Help Center", to: "/help" },
            { label: "Privacy Policy", to: "/privacy" },
          ]}
        />

        <div>
          <h4 className="mb-6 font-bold text-(--color-text-primary)">
            Newsletter
          </h4>

          <p className="text-sm font-semibold text-(--color-text-secondary)">
            Subscribe for exclusive offers.
          </p>

          <form className="mt-4 flex gap-2">
            <Input
              type="email"
              placeholder="Email Address"
              className="min-h-10 px-3 py-2"
            />

            <Button
              type="submit"
              variant="primary"
              className="min-h-10 min-w-10 px-0"
              aria-label="Subscribe"
            >
              <span className="material-symbols-outlined">
                send
              </span>
            </Button>
          </form>
        </div>
      </div>

      <div className="border-t border-(--color-border) py-6 text-center text-sm font-semibold text-(--color-text-secondary)">
        © 2024 LuxeDrive Premium Mobility. All rights reserved.
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }) {
  return (
    <div>
      <h4 className="mb-6 font-bold text-(--color-text-primary)">
        {title}
      </h4>

      <ul className="flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.to}>
            <Link
              to={link.to}
              className="text-sm font-semibold text-(--color-text-secondary) transition hover:text-(--color-text-primary)"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
