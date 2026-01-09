import './globals.css';

export const metadata = {
  title: 'allsight',
  description: 'cross-platform prediction market aggregator',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
