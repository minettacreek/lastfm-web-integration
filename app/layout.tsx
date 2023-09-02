import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lastfm Web Integration',
  description: 'Lastfm Web Integration for NZXT',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}
