import type { Metadata } from 'next';

import '@/styles/globals.css';
import '@/styles/print.css';

export const metadata: Metadata = {
  title: 'IBNote',
  description: '집에서 아이와 한 활동을 짧게 기록하고 다시 이어 보는 부모용 기록 서비스',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-background-light font-display text-slate-800 antialiased">
        {children}
      </body>
    </html>
  );
}
