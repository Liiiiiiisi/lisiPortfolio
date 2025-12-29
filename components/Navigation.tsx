'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Navigation() {
  const pathname = usePathname();
  const [language, setLanguage] = useState<'EN' | 'CN'>('EN');
  const isProjectPage = pathname?.startsWith('/projects/');
  const isHomePage = pathname === '/';

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/project', label: 'Project' },
    { href: '/about', label: 'About' },
    { href: '/resume', label: 'Resume' },
    { href: '/contact', label: 'Contact' },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'EN' ? 'CN' : 'EN');
  };

  const isDarkPage = isProjectPage || isHomePage;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4">
      <div className="w-full max-w-5xl">
        <div className="bg-black/30 backdrop-blur-xl border border-white/10 rounded-full px-4 md:px-6 py-2.5 md:py-3 shadow-xl">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2 md:space-x-4">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-xs md:text-sm font-medium uppercase tracking-wide transition-all duration-200 px-2.5 md:px-3 py-1.5 rounded-full ${
                      isActive
                        ? 'text-white bg-black/40 border border-white/20'
                        : 'text-gray-400 hover:text-gray-300'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
            <div className="flex items-center">
              <div className="h-4 w-px bg-white/20 mx-3 md:mx-4" />
              <button
                onClick={toggleLanguage}
                className="bg-black/40 border border-white/20 rounded-full px-2.5 md:px-3 py-1.5 text-xs md:text-sm font-medium uppercase tracking-wide transition-all duration-200 flex items-center gap-1"
              >
                <span className={language === 'EN' ? 'text-white' : 'text-gray-400'}>EN</span>
                <span className="text-white/30">/</span>
                <span className={language === 'CN' ? 'text-white' : 'text-gray-400'}>CN</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
