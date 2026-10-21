import type { Metadata } from "next";
import { PostulerWizard } from "@/components/PostulerWizard";

export const metadata: Metadata = {
  title: "تقديم طلب الدراسة والاستشارة المجانية | M&A OVERSEAS CONSULTING",
  description:
    "قدّم طلبك للدراسة في أوروبا واحصل على تقييم مجاني لملفك الأكاديمي وتوجيه شخصي لطلاب المغرب والجزائر نحو أفضل الجامعات الأوروبية.",
};

export default function PostulerPage() {
  return <PostulerWizard />;
}
