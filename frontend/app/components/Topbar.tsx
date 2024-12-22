import React from "react";

const NAV_ITEMS = [
  { id: "signin", label: "Signin", href: "/signin" },
  { id: "register", label: "Register", href: "/register" },
  { id: "contact", label: "Contact Us", href: "/contact" },
  { id: "seller", label: "Become a seller", href: "/seller" },
] as const;

const NavButton = ({ label, href }: { label: string; href: string }) => (
  <a
    href={href}
    className="hover:underline transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/20 rounded px-2 py-1"
  >
    {label}
  </a>
);

export default function Topbar() {
  return (
    <header className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">Free Delivery all over Nepal!</p>

          <nav className="flex items-center space-x-6">
            {NAV_ITEMS.map(({ id, label, href }) => (
              <NavButton key={id} label={label} href={href} />
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
