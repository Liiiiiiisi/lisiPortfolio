import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './context/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Design tokens live in globals.css as CSS variables.
        bg: 'var(--color-bg)',
        surface: 'var(--color-surface)',
        ink: 'var(--color-ink)',
        muted: 'var(--color-muted)',
        line: 'var(--color-line)',
        accent: 'var(--color-accent)',
        'accent-strong': 'var(--color-accent-strong)',
        'title-ghost': 'var(--color-title-ghost)',
      },
      fontFamily: {
        // Chinese display text falls through to system CJK fonts —
        // no artificial horizontal scaling of CJK glyphs.
        display: [
          '"Barlow Condensed"',
          '"Arial Narrow"',
          '"Helvetica Neue"',
          'Arial',
          '"PingFang SC"',
          '"Noto Sans SC"',
          '"Microsoft YaHei"',
          'sans-serif',
        ],
      },
      maxWidth: {
        site: 'var(--max-width-site)',
      },
    },
  },
  plugins: [],
};

export default config;

