import type { Metadata, Viewport } from "next";
import { cookies } from "next/headers";
import { IBM_Plex_Sans_Arabic, Aref_Ruqaa } from "next/font/google";
import "./globals.css";
import { AmbientBackground } from "@/components/AmbientBackground";
import { LanguageProvider, type Language } from "@/context/LanguageContext";
import { JsonLdSchema } from "@/components/JsonLdSchema";
import {
  SITE_URL,
  SITE_NAME,
  DEFAULT_TITLE_AR,
  DEFAULT_DESCRIPTION_AR,
  SEO_KEYWORDS,
  getHomeJsonLd,
} from "@/lib/seo-config";

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-sans",
});

const arefRuqaa = Aref_Ruqaa({
  subsets: ["arabic"],
  weight: ["400"],
  display: "swap",
  variable: "--font-calligraphy",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0B1B3D",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE_AR,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION_AR,
  applicationName: SITE_NAME,
  keywords: SEO_KEYWORDS,
  authors: [
    { name: "Ali Benamar", url: "https://www.instagram.com/benamar_a34/" },
    { name: "M'Amine Jaboune", url: "https://www.instagram.com/amine_jaboune/" },
    { name: "Marouan Ben Amar", url: "https://www.instagram.com/marouan.ben.amar/" },
  ],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "education",
  alternates: {
    canonical: "/",
    languages: {
      "ar-MA": "/",
      "ar-DZ": "/",
      "en-US": "/",
    },
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: DEFAULT_TITLE_AR,
    description: DEFAULT_DESCRIPTION_AR,
    locale: "ar_MA",
    alternateLocale: ["ar_DZ", "en_US"],
    images: [
      {
        url: "/hero-image.png",
        width: 1200,
        height: 630,
        alt: "M&A OVERSEAS CONSULTING - الدراسة في أوروبا وقبول جامعي مضمون",
      },
      {
        url: "/logo/logo.png",
        width: 512,
        height: 512,
        alt: "شعار مكتب M&A OVERSEAS CONSULTING",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE_AR,
    description: DEFAULT_DESCRIPTION_AR,
    images: ["/hero-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/logo/logo-icon.png", type: "image/png" },
      { url: "/logo/logo.png", type: "image/png" },
    ],
    apple: [{ url: "/logo/logo-icon.png", type: "image/png" }],
  },
  manifest: "/manifest.webmanifest",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const savedLang = cookieStore.get("ma_overseas_lang")?.value;
  const initialLanguage: Language = savedLang === "en" ? "en" : "ar";
  const initialDir = initialLanguage === "ar" ? "rtl" : "ltr";

  return (
    <html
      lang={initialLanguage}
      dir={initialDir}
      className={`${ibmPlexArabic.variable} ${arefRuqaa.variable} scroll-smooth`}
    >
      <body
        dir={initialDir}
        className="antialiased selection:bg-brand-electric selection:text-white min-h-screen flex flex-col relative text-brand-navy bg-[#FAFBFD]"
      >
        <JsonLdSchema data={getHomeJsonLd()} />
        <LanguageProvider initialLanguage={initialLanguage}>
          <AmbientBackground />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
