import type { Metadata } from "next";
import { PostulerWizard } from "@/components/PostulerWizard";
import { JsonLdSchema } from "@/components/JsonLdSchema";
import { SITE_URL, SITE_NAME, getPostulerJsonLd } from "@/lib/seo-config";

const POSTULER_TITLE =
  "تقديم طلب الدراسة والاستشارة المجانية | M&A OVERSEAS CONSULTING";
const POSTULER_DESCRIPTION =
  "قدّم طلبك للدراسة في أوروبا واحصل على استشارة مجانية وتوجيه شخصي للطلاب من المغرب والجزائر ومختلف الدول نحو أفضل الجامعات الأوروبية.";

export const metadata: Metadata = {
  title: "تقديم طلب الدراسة والاستشارة المجانية",
  description: POSTULER_DESCRIPTION,
  alternates: {
    canonical: "/postuler",
  },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/postuler`,
    siteName: SITE_NAME,
    title: POSTULER_TITLE,
    description: POSTULER_DESCRIPTION,
    locale: "ar_MA",
    alternateLocale: ["ar_DZ", "en_US"],
    images: [
      {
        url: "/hero-image.png",
        width: 1200,
        height: 630,
        alt: POSTULER_TITLE,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: POSTULER_TITLE,
    description: POSTULER_DESCRIPTION,
    images: ["/hero-image.png"],
  },
};

export default function PostulerPage() {
  return (
    <>
      <JsonLdSchema data={getPostulerJsonLd()} />
      <PostulerWizard />
    </>
  );
}
