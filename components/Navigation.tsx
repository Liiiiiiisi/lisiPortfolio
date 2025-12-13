'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Navigation() {
  const pathname = usePathname();
  const [language, setLanguage] = useState<'EN' | 'CN'>('EN');

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

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex space-x-6 md:space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors duration-200 hover:text-gray-900 dark:hover:text-white ${pathname === item.href
                    ? 'text-gray-900 dark:text-white border-b-2 border-gray-900 dark:border-white pb-1'
                    : 'text-gray-600 dark:text-gray-400'
                  }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <button
            onClick={toggleLanguage}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            {language} / {language === 'EN' ? 'CN' : 'EN'}
          </button>
        </div>
      </div>
    </nav>
  );
}

