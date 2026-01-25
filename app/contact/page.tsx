'use client';

import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, Globe } from 'lucide-react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const socialLinks = [
  {
    name: 'Email',
    href: 'mailto:lxie082@outlook.com',
    icon: Mail,
    description: 'Drop me a line',
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/lisi-xie-5aa373157/',
    icon: Linkedin,
    description: 'Connect professionally',
  },
  {
    name: 'GitHub',
    href: 'https://github.com',
    icon: Github,
    description: 'View my code',
  },
  {
    name: 'ResearchGate',
    href: 'https://researchgate.net',
    icon: Globe,
    description: 'Academic work',
  },
];

export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Navigation />
      <main className="flex-1 pt-32 px-4 pb-12 flex items-center justify-center">
        <div className="max-w-2xl w-full text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold mb-8 text-white"
          >
            GET IN TOUCH
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400 mb-16"
          >
            Open for collaborations, freelance projects, or just a chat about the future of XR.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {socialLinks.map((link, index) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <Link
                  href={link.href}
                  target="_blank"
                  className="flex items-center justify-center gap-4 p-6 rounded-xl group transition-all duration-300"
                  style={{
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  }}
                >
                  <link.icon size={28} className="text-gray-400 group-hover:text-white transition-colors" />
                  <div className="text-left">
                    <span className="text-lg font-semibold text-gray-200 group-hover:text-white transition-colors block">
                      {link.name}
                    </span>
                    <span className="text-sm text-gray-500 group-hover:text-gray-400 transition-colors">
                      {link.description}
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer isDark={true} />
    </div>
  );
}

