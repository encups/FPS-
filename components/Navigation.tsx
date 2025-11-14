"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/features", label: "Features" },
    { href: "/examples", label: "Examples" },
    { href: "/pricing", label: "Pricing" },
    { href: "/customers", label: "Customers" },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="border-b-4 border-medieval-gold bg-black/50 backdrop-blur fixed top-0 left-0 right-0 z-50"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <span className="text-3xl">🏰</span>
            <h1 className="pixel-text text-xl text-medieval-gold">Frame Fables</h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.slice(1).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`font-pixel text-base transition-colors ${
                  pathname === item.href
                    ? "text-medieval-gold"
                    : "text-medieval-parchment hover:text-medieval-gold"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-4">
            <Link
              href="/login"
              className="font-pixel text-base text-medieval-parchment hover:text-medieval-gold transition-colors hidden sm:block"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="pixel-border pixel-text bg-medieval-gold text-medieval-ink px-4 py-2 text-sm hover:bg-medieval-bronze transition-colors"
            >
              Start Free
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
