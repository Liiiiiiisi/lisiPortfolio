import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lisi Portfolio",
  description: "Personal portfolio website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased" style={{ backgroundColor: '#000000' }}>
        {children}
      </body>
    </html>
  );
}
