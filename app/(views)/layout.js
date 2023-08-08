import Link from "next/link";
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Better Polling',
  description: '',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <nav style={{display: 'flex', justifyContent: 'space-around'}}>
          <Link href='/'>survey</Link>
          <Link href='/happiness'>happiness info</Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
