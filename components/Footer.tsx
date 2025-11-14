"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="border-t-4 border-medieval-gold bg-black/50 py-12 relative z-10"
    >
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">🏰</span>
              <span className="pixel-text text-xl text-medieval-gold">Frame Fables</span>
            </div>
            <p className="font-pixel text-sm text-medieval-stone">
              AI-powered marketing content in seconds
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="pixel-text text-sm text-medieval-gold mb-4">Product</h3>
            <ul className="space-y-2">
              {["Features", "Examples", "Pricing"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase()}`}
                    className="font-pixel text-sm text-medieval-parchment hover:text-medieval-gold transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="pixel-text text-sm text-medieval-gold mb-4">Company</h3>
            <ul className="space-y-2">
              {["Customers", "Login", "Sign Up"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase().replace(" ", "")}`}
                    className="font-pixel text-sm text-medieval-parchment hover:text-medieval-gold transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="pixel-text text-sm text-medieval-gold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li className="font-pixel text-sm text-medieval-stone">Privacy Policy</li>
              <li className="font-pixel text-sm text-medieval-stone">Terms of Service</li>
              <li className="font-pixel text-sm text-medieval-stone">Cookie Policy</li>
            </ul>
          </div>
        </div>

        <div className="border-t-2 border-medieval-gold/20 pt-8 text-center">
          <p className="font-pixel text-sm text-medieval-stone">
            © 2024 Frame Fables. All rights reserved to the realm.
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
