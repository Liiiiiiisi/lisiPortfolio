'use client';

import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, Globe } from 'lucide-react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';

export default function Contact() {
  const { t } = useLanguage();

  const socialLinks = [
    {
      nameKey: 'contact.email.name',
      href: 'mailto:lxie082@outlook.com',
      icon: Mail,
      descKey: 'contact.email.description',
    },
    {
      nameKey: 'contact.linkedin.name',
      href: 'https://www.linkedin.com/in/lisi-xie-5aa373157/',
      icon: Linkedin,
      descKey: 'contact.linkedin.description',
    },
    {
      nameKey: 'contact.github.name',
      href: 'https://github.com',
      icon: Github,
      descKey: 'contact.github.description',
    },
    {
      nameKey: 'contact.researchgate.name',
      href: 'https://researchgate.net',
      icon: Globe,
      descKey: 'contact.researchgate.description',
    },
  ];

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
            {t('contact.heading')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400 mb-16"
          >
            {t('contact.subtext')}
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {socialLinks.map((link, index) => (
              <motion.div
                key={link.nameKey}
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
                      {t(link.nameKey)}
                    </span>
                    <span className="text-sm text-gray-500 group-hover:text-gray-400 transition-colors">
                      {t(link.descKey)}
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
