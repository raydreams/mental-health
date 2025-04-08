"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Heart, Mail, Twitter, Instagram, LucideGavel, Facebook } from "lucide-react"
import Image from "next/image"

const footerLinks = {
  support: [
    { name: "Crisis Support", href: "/crisis" },
    { name: "Find Help", href: "/resources/find" },
    { name: "Resources", href: "/resources" },
  ],
  learn: [
    { name: "About Us", href: "/about" },
    { name: "Mental Health Info", href: "/learn" },
    { name: "FAQ", href: "/faq" },
  ],
  connect: [
    { name: "Contact", href: "/contact" },
    { name: "Newsletter", href: "/newsletter" },
    { name: "Volunteer", href: "/volunteer" },
  ],
}

export default function Footer() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <motion.footer 
      className="relative py-12 pb-32 bg-black border-t border-emerald-500/20"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Image and Text Section */}
          <div className="relative group">
            <div className="relative w-48 h-32 rounded-2xl overflow-hidden mx-auto">
              <Image
                src="/unsplash.jpeg"
                alt="Mental Health Support"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 flex flex-col justify-end p-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-xs text-gray-300">
                  Empowering change through awareness and action.
                </p>
              </div>
            </div>
          </div>

          {/* Support Links */}
          <div className="md:pl-8">
            <h3 className="text-sm font-semibold text-emerald-400 mb-4">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-emerald-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Learn Links */}
          <div>
            <h3 className="text-sm font-semibold text-emerald-400 mb-4">Learn</h3>
            <ul className="space-y-3">
              {footerLinks.learn.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-emerald-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Links */}
          <div>
            <h3 className="text-sm font-semibold text-emerald-400 mb-4">Connect</h3>
            <ul className="space-y-3">
              {footerLinks.connect.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-emerald-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex space-x-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-emerald-400 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-emerald-400 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-emerald-400 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-emerald-500/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Mental Health Support. All rights reserved.
            </p>
            <div className="flex items-center space-x-4">
              <a href="/legal" className="text-gray-400 hover:text-emerald-400 transition-colors">
                <LucideGavel className="h-4 w-4" />
              </a>
              <span className="text-gray-400">|</span>
              <span className="text-sm text-gray-400">Made with <Heart className="inline-block h-4 w-4 text-emerald-400" /> in Canada</span>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  )
} 