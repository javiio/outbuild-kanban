import { Providers } from '@/core/ui/layout/Providers';
import { AppLayout } from '@/core/ui/layout/AppLayout';

import "./globals.css";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Outbuild Kanban</title>
      </head>
      <body>
        <Providers>
          <AppLayout>
            {children}
          </AppLayout>
        </Providers>
      </body>
    </html>
  );
}
