import Link from 'next/link';
import { Mail, Linkedin, Github } from 'lucide-react';

interface FooterProps {
  isDark?: boolean;
}

export default function Footer({ isDark = false }: FooterProps) {
  return (
    <footer className={`${
      isDark 
        ? 'bg-black' 
        : 'bg-white dark:bg-black'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center justify-center">
          {/* Social Icons */}
          <div className="flex items-center space-x-6">
            <Link
              href="mailto:lxie082@outlook.com"
              className={`transition-colors ${
                isDark
                  ? 'text-gray-500 hover:text-gray-300'
                  : 'text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300'
              }`}
              aria-label="Email"
            >
              <Mail size={22} strokeWidth={1.5} />
            </Link>
            <Link
              href="https://www.linkedin.com/in/lisi-xie-5aa373157/"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors ${
                isDark
                  ? 'text-gray-500 hover:text-gray-300'
                  : 'text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300'
              }`}
              aria-label="LinkedIn"
            >
              <Linkedin size={22} strokeWidth={1.5} />
            </Link>
            <Link
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors ${
                isDark
                  ? 'text-gray-500 hover:text-gray-300'
                  : 'text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300'
              }`}
              aria-label="GitHub"
            >
              <Github size={22} strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
