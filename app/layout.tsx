import "./globals.css";

export const metadata = {
  title: "ScholarSeva",
  description: "Smart Scholarship Discovery Platform for Students",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}