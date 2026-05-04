import { Manrope, Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import './globals.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const manrope = Manrope({
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-display',
  subsets: ['latin'],
  display: 'swap',
});

const inter = Inter({
  weight: ['300', '400', '500', '600'],
  variable: '--font-body',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: 'FitStart — Start Your Workout Now',
  description:
    'Free workouts, exercise guides, and beginner programs. No gym required. Start moving today.',
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: '#ff4d3d',
          colorBackground: '#0f1115',
          colorText: '#f5f6f8',
          colorTextSecondary: '#a1a6b4',
          colorInputBackground: '#1e2128',
          colorInputText: '#f5f6f8',
          colorShimmer: '#333742',
        },
        elements: {
          card: {
            backgroundColor: '#0f1115',
            border: '1px solid #333742',
          },
          popoverBox: {
            backgroundColor: '#0f1115',
            border: '1px solid #333742',
          },
        },
      }}
    >
      <html
        lang='en'
        className={`${manrope.variable} ${inter.variable} h-full antialiased`}
      >
        <body className='min-h-screen flex flex-col font-sans bg-black text-zinc-100'>
          <Navbar />
          <main className='flex-1 relative mt-14'>{children}</main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
