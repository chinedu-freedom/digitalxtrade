import './globals.css';
import { Inter } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from '../context/AuthContext';

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
        <AuthProvider>
          <ToastContainer
            position="top-right"
            autoClose={4000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
