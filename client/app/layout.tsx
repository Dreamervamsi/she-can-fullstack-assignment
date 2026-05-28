import './globals.css';
import { Metadata } from "next";
  
export const metadata: Metadata = {
  title: "She Can Foundation - Contact Us",
  description: "Get in touch with She Can Foundation. Send us your message and we'll respond shortly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
