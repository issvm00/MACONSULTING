import type { Metadata } from "next";
import "./globals.css";
import { AmbientBackground } from "@/components/AmbientBackground";

export const metadata: Metadata = {
  title: "M&A OVERSEAS CONSULTING | الدراسة في أوروبا",
  description:
    "مكتب معتمد للاستشارات التعليمية ومرافقة الطلاب للدراسة في أوروبا (المغرب والجزائر). توجيه جامعي، قبول مضمون، فيزا ومنح دراسية.",
  icons: {
    icon: "/logo/logo.PNG",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className="scroll-smooth">
      <body className="antialiased selection:bg-brand-electric selection:text-white min-h-screen flex flex-col relative text-brand-navy bg-[#FAFBFD]">
        <AmbientBackground />
        {children}
      </body>
    </html>
  );
}
