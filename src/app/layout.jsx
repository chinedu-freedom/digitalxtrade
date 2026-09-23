import './globals.css';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata = {
  title: 'DigitalXTrade - Earn Without Compromise',
  description: 'Premium trading experience based on awarded platforms.',
  icons: {
    icon: '/logo.jpeg',
    apple: '/logo.jpeg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} bg-white text-gray-900 antialiased min-h-screen`}>
        <Toaster position="top-right" richColors theme="dark" />
        {children}
      </body>
    </html>
  );
}
