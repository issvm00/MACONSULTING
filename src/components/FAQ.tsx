"use client";

import React, { useState, useCallback, memo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  MessageCircle,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  MapPin,
  CheckCircle2,
} from "lucide-react";
import { useLanguage, type Language } from "@/context/LanguageContext";

type FaqCategory = "all" | "admission" | "visa" | "costs" | "living";

interface CategoryTab {
  id: FaqCategory;
  labelAr: string;
  labelEn: string;
}

interface FaqItem {
  id: string;
  category: Exclude<FaqCategory, "all">;
  questionAr: string;
  questionEn: string;
  answerAr: string;
  answerEn: string;
  highlightNoteAr?: string;
  highlightNoteEn?: string;
}

const CATEGORY_TABS: CategoryTab[] = [
  { id: "all", labelAr: "جميع الأسئلة", labelEn: "All Questions" },
  {
    id: "admission",
    labelAr: "القبول والجامعات",
    labelEn: "Admission & Universities",
  },
  { id: "visa", labelAr: "التأشيرة والضمانات", labelEn: "Visa & Guarantees" },
  { id: "costs", labelAr: "التكاليف والمنح", labelEn: "Costs & Scholarships" },
  { id: "living", labelAr: "السكن والاستقرار", labelEn: "Housing & Living" },
];

const FAQ_ITEMS: FaqItem[] = [
  {
    id: "faq-01",
    category: "admission",
    questionAr:
      "هل الشهادات الجامعية في الوجهات الأوروبية السبعة معترف بها رسمياً في المغرب، الجزائر، وباقي دول العالم؟",
    questionEn:
      "Are university degrees from the 7 European destinations officially recognized in Morocco, Algeria, and worldwide?",
    answerAr:
      "نعم بكل تأكيد. جميع الجامعات والمعاهد الأوروبية التي تربطنا بها شراكات رسمية (في ليتوانيا، رومانيا، إيطاليا، إسبانيا، المجر، مالطا، وأيرلندا) هي مؤسسات حكومية وخاصة معتمدة ضمن نظام بولونيا الأوروبي للتعليم العالي (Bologna Process & ECTS). هذا يضمن أن دبلومك معترف به رسمياً في المغرب والجزائر، ويُخوّل لك متابعة الدراسات العليا أو العمل في أي دولة داخل الاتحاد الأوروبي وأمريكا الشمالية دون الحاجة لمعادلة معقدة.",
    answerEn:
      "Yes, absolutely. All European universities and institutes we officially partner with (across Lithuania, Romania, Italy, Spain, Hungary, Malta, and Ireland) are accredited public and private institutions operating under the European Higher Education Area (Bologna Process & ECTS). This guarantees that your degree is officially recognized in Morocco and Algeria, and qualifies you to pursue postgraduate studies or employment across the European Union and North America without complex equivalency hurdles.",
    highlightNoteAr:
      "شهادات أوروبية معتمدة دولياً 100% وفق نظام ECTS الأوروبي.",
    highlightNoteEn:
      "100% internationally accredited European degrees under the ECTS system.",
  },
  {
    id: "faq-02",
    category: "admission",
    questionAr:
      "ما هي شروط القبول؟ وهل يُشترط معدل بكالوريا مرتفع أو شهادة لغة مثل IELTS / TOEFL؟",
    questionEn:
      "What are the admission requirements? Do I need a high Baccalaureate GPA or an IELTS / TOEFL certificate?",
    answerAr:
      "لا يُشترط الحصول على معدل مرتفع جداً في البكالوريا للقبول في أغلب الجامعات الشريكة، حيث ندرس ملفك بعناية لنوجهك نحو الجامعات والتخصصات التي تتوافق مع معدلك وميزانيتك (بما في ذلك الهندسة، إدارة الأعمال، الطب، المعلوميات، واللغات). أما بخصوص اللغة، فإذا لم تكن تتوفر على شهادة IELTS أو TOEFL، نوفر لك إمكانية اجتياز مقابلة تقييمية مبسطة عبر الإنترنت مع الجامعة، أو الالتحاق بسنة تحضيرية للغة في أوروبا قبل بدء تخصصك.",
    answerEn:
      "A very high high-school/Baccalaureate GPA is not required for admission at most of our partner universities. We carefully evaluate your academic profile to match you with universities and majors suited to your grades and budget (including Engineering, Business, Medicine, Computer Science, and Languages). As for English proficiency, if you do not hold an IELTS or TOEFL certificate, we arrange a straightforward online university assessment interview or enrollment in a European Language Foundation Year before starting your degree.",
    highlightNoteAr:
      "نقبل مختلف معدلات البكالوريا مع حلول مرنة لشرط اللغة.",
    highlightNoteEn:
      "Flexible GPA acceptance and convenient alternatives to IELTS/TOEFL.",
  },
  {
    id: "faq-03",
    category: "visa",
    questionAr:
      "كم تستغرق عملية استخراج القبول الجامعي والتأشيرة؟ وما معنى ضمان القبول بنسبة 100%؟",
    questionEn:
      "How long does it take to get university admission and a visa? What does 100% guaranteed admission mean?",
    answerAr:
      "بفضل عقودنا المباشرة مع الجامعات الأوروبية دون وسطاء، نستخرج القبول الجامعي الرسمي (Offer Letter) في ظرف قياسي يتراوح بين 10 إلى 20 يوم عمل فقط بعد اكتمال وثائق الملف. ضمان القبول 100% يعني أننا نراجع ملفك أكاديمياً قبل التقديم ولا نختار إلا الجامعات التي نضمن استيفاءك الكامل لشروطها. بعد صدور القبول النهائي، يتولى خبراؤنا تجهيز ملف التأشيرة القانوني وحجز موعد القنصلية ومرافقتك خطوة بخطوة لضمان أعلى نسبة نجاح في الحصول على الفيزا.",
    answerEn:
      "Thanks to our direct agreements with European universities without intermediaries, we secure your official Offer Letter within a record 10 to 20 business days once your documents are complete. Our 100% admission guarantee means we pre-audit your academic file and apply only to universities where you fully meet the criteria. Once final admission is issued, our specialists prepare your legal consular visa file, schedule your embassy appointment, and coach you step by step to ensure the highest visa approval rate.",
    highlightNoteAr:
      "استخراج القبول الرسمي خلال 10 إلى 20 يوماً مع إعداد احترافي لملف القنصلية.",
    highlightNoteEn:
      "Official admission issued in 10–20 business days with expert consular file preparation.",
  },
  {
    id: "faq-04",
    category: "costs",
    questionAr:
      "ما هي تكلفة الدراسة والمعيشة السنوية في أوروبا؟ وهل تتوفر منح دراسية مخفّضة؟",
    questionEn:
      "What are the annual tuition and living costs in Europe? Are scholarships available?",
    answerAr:
      "تتميز الوجهات التي نشتغل عليها (مثل ليتوانيا، رومانيا، والمجر) بكونها من أكثر الدول الأوروبية توازناً من حيث الجودة والتكلفة؛ إذ تبدأ الرسوم الدراسية في العديد من التخصصات من حوالي 2000 إلى 4500 يورو سنوياً، بينما تتراوح تكلفة المعيشة والسكن الجامعي بين 300 و500 يورو شهرياً. كما يساعدك فريقنا في التقديم على المنح الدراسية الجزئية أو الكاملة المتاحة للطلبة المتفوقين.",
    answerEn:
      "Our European destinations (such as Lithuania, Romania, and Hungary) offer one of Europe's best balances between academic quality and affordability. Tuition fees across many majors start from €2,000 to €4,500 per year, while monthly living and dormitory costs typically range between €300 and €500. Our team also assists eligible students in applying for partial or full tuition scholarships.",
    highlightNoteAr:
      "رسوم دراسية ومعيشية مناسبة جداً مقارنة بدول أوروبا الغربية.",
    highlightNoteEn:
      "Highly affordable tuition and living costs compared to Western Europe.",
  },
  {
    id: "faq-05",
    category: "costs",
    questionAr:
      "كيف تتم طريقة دفع الرسوم الدراسية؟ وما هي شروط الضمان المالي للسفارة؟",
    questionEn:
      "How are tuition fees paid, and what are the financial proof requirements for the embassy?",
    answerAr:
      "نحرص في M&A Overseas Consulting على الشفافية المالية المطلقة؛ حيث يقوم الطالب وولي أمره بتحويل الرسوم الدراسية مباشرة إلى الحساب البنكي الرسمي للجامعة في أوروبا بعد صدور القبول المبدئي، وتتيح أغلب الجامعات إمكانية الأداء على دفعتين (كل فصل دراسي على حدة). أما بخصوص الضمان المالي لملف التأشيرة، فيكفي تقديم كشف حساب بنكي يثبت القدرة على تغطية مصاريف السنة الأولى دون الحاجة لتجميد المبلغ في حساب مغلق معقد.",
    answerEn:
      "At M&A Overseas Consulting, we maintain complete financial transparency: students and parents transfer tuition fees directly to the university's official European bank account after conditional admission is issued, and most universities allow paying in two installments (per semester). For the embassy's financial proof, a standard bank statement demonstrating coverage for first-year expenses is sufficient—without needing a complex blocked account.",
    highlightNoteAr:
      "تحويل الرسوم يتم مباشرة للحساب الرسمي للجامعة مع إمكانية الدفع الفصلي.",
    highlightNoteEn:
      "Tuition is paid directly to the university's official bank account with semester installment options.",
  },
  {
    id: "faq-06",
    category: "living",
    questionAr:
      "هل يحق للطالب العمل بالموازاة مع الدراسة في أوروبا لتغطية مصاريفه الشخصية؟",
    questionEn:
      "Can international students work part-time while studying in Europe to cover personal expenses?",
    answerAr:
      "نعم، يمنحك تصريح الإقامة الدراسية في دول الاتحاد الأوروبي الحق القانوني في العمل بدوام جزئي (عادةً 20 ساعة أسبوعياً خلال فترة الدراسة، ودوام كامل 40 ساعة أسبوعياً خلال العطل الصيفية والفصلية). وبفضل تواجد فريقنا الميداني في أوروبا — وخصوصاً في ليتوانيا — نرشد طلابنا عند وصولهم حول كيفية فتح الحساب البنكي، استخراج بطاقة الإقامة، والبحث عن فرص عمل طلابية مناسبة تساعدهم في تغطية مصاريفهم اليومية.",
    answerEn:
      "Yes. Your European Union student residence permit grants you the legal right to work part-time (typically 20 hours per week during academic semesters, and full-time up to 40 hours per week during summer and semester breaks). Thanks to our on-ground team in Europe—especially in Lithuania—we guide students upon arrival on opening a bank account, obtaining their residence card, and finding suitable student jobs to help cover daily living costs.",
    highlightNoteAr:
      "حق قانوني في العمل 20 ساعة أسبوعياً أثناء الدراسة ودوام كامل في العطل.",
    highlightNoteEn:
      "Legal right to work 20 hrs/week during semesters and full-time during holidays.",
  },
  {
    id: "faq-07",
    category: "living",
    questionAr:
      "كيف تتم عملية حجز السكن الجامعي والاستقبال في المطار عند الوصول إلى بلد الدراسة؟",
    questionEn:
      "How do student accommodation booking and airport pickup work upon arrival in Europe?",
    answerAr:
      "مهمتنا لا تنتهي بصدور التأشيرة؛ بل نحجز لطلابنا تذاكر الطيران للسفر في مجموعات موحدة نحو نفس الجامعة، ونؤمّن لك قبل سفرك حجزاً رسمياً ومضموناً في السكن الجامعي (Dormitory) أو في شقة طلابية مشتركة/استوديو مستقل حسب رغبتك. وفور وصولك إلى المطار في أوروبا، يكون مرافقنا الميداني في استقبالك لنقلك إلى مقر إقامتك، ومساعدتك في إجراءات التسجيل النهائي بالجامعة والتأقلم السلس في أيامك الأولى.",
    answerEn:
      "Our mission doesn't end once your visa is issued. We coordinate group flight bookings for students attending the same university and secure guaranteed accommodation in university dormitories or private/shared student apartments before you depart. The moment you land at the airport in Europe, our on-ground coordinator welcomes you, transfers you to your residence, and assists you with final university registration and settling in smoothly.",
    highlightNoteAr:
      "استقبال شخصي في المطار وحجز سكن مضمون قبل مغادرتك أرض الوطن.",
    highlightNoteEn:
      "Personal airport pickup and guaranteed accommodation arranged before departure.",
  },
  {
    id: "faq-08",
    category: "visa",
    questionAr:
      "أنا طالب من خارج مدينة أكادير أو من الجزائر، كيف يمكنني التسجيل ومتابعة ملفي مع مكتبكم؟",
    questionEn:
      "I live outside Agadir or in Algeria—how can I register and track my application with your office?",
    answerAr:
      "نواكب مئات الطلاب من كافة المدن المغربية ومن جميع ولايات الجزائر بنفس الدقة والاحترافية؛ يمكنك إما زيارة مقرنا الرسمي المرخص في إنزكان - شارع مراكش (أكادير)، أو إتمام جميع مراحل الاستشارة، توقيع العقد القانوني، وإرسال الوثائق عن بُعد عبر منصتنا الرقمية والواتساب الرسمي. يتم تخصيص مستشار مباشر لك ولعائلتك يوافيكم بتحديثات فورية في كل مرحلة من مراحل القبول والفيزا حتى يوم السفر.",
    answerEn:
      "We support hundreds of students across all Moroccan cities, all Algerian provinces, and beyond with the exact same precision and care. You can either visit our licensed headquarters in Inezgane - Marrakech Ave (Agadir), or complete the entire consultation, legal contract signing, and document submission remotely via our digital platform and official WhatsApp. A dedicated advisor is assigned to you and your family to provide real-time updates from admission to visa approval and departure.",
    highlightNoteAr:
      "مواكبة حضورية في مقرنا بإنزكان أو عن بُعد لطلاب كافة مدن المغرب والجزائر.",
    highlightNoteEn:
      "In-person guidance at our Agadir HQ or 100% remote support across Morocco, Algeria, and beyond.",
  },
];

const FOUNDER_AVATARS = [
  { src: "/team/ali_benamar.jpg", altAr: "علي بنعمر", altEn: "Ali Benamar" },
  {
    src: "/team/marouan_ben_amar.jpg",
    altAr: "مروان بنعمر",
    altEn: "Marouan Ben Amar",
  },
  {
    src: "/team/amine_jaboune.jpg",
    altAr: "محمد أمين جابون",
    altEn: "M'Amine Jaboune",
  },
];

const TRANSITION_EASE = [0.22, 1, 0.36, 1] as const;

// Smooth fade-in avatar image matching Hero.tsx & AboutTeam.tsx weak-network polish
const SmoothAvatar = memo(function SmoothAvatar({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative w-9 h-9 rounded-full overflow-hidden border-2 border-white bg-slate-100 shadow-2xs">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="36px"
        referrerPolicy="no-referrer"
        onLoad={() => setIsLoaded(true)}
        className={`object-cover object-top transition-opacity duration-500 ease-out ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
});

// Reusable Direct Advisor Support Card (Rendered in Sticky Start Column on Desktop)
const AdvisorSupportCard = memo(function AdvisorSupportCard({
  language,
  isRTL,
}: {
  language: Language;
  isRTL: boolean;
}) {
  const DirectionalArrow = isRTL ? ArrowLeft : ArrowRight;

  return (
    <div
      className={`apple-glass rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-[0_14px_34px_-10px_rgba(11,27,61,0.06)] relative overflow-hidden space-y-5 ${
        isRTL ? "text-right" : "text-left"
      }`}
    >
      {/* Top Founders Avatar Cluster */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className={`flex ${
              isRTL ? "-space-x-2 space-x-reverse" : "-space-x-2"
            } overflow-hidden shrink-0`}
          >
            {FOUNDER_AVATARS.map((founder) => (
              <SmoothAvatar
                key={founder.src}
                src={founder.src}
                alt={language === "ar" ? founder.altAr : founder.altEn}
              />
            ))}
          </div>

          <div>
            <p className="text-xs font-bold text-brand-navy">
              {language === "ar"
                ? "مستشارونا رهن إشارتك"
                : "Our Advisors Are Here for You"}
            </p>
            <p className="text-[11px] text-slate-500 font-medium">
              {language === "ar"
                ? "توجيه شخصي مجاني للمغرب والجزائر"
                : "Free personalized guidance for Morocco & Algeria"}
            </p>
          </div>
        </div>

        <div className="w-9 h-9 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-brand-electric shrink-0">
          <ShieldCheck className="w-[18px] h-[18px] stroke-[2]" />
        </div>
      </div>

      <div className="space-y-1.5 pt-1 border-t border-slate-100">
        <h3 className="text-sm sm:text-base font-bold text-brand-navy">
          {language === "ar"
            ? "لم تجد إجابة لسؤالك الخاص؟"
            : "Didn't find the answer to your specific question?"}
        </h3>
        <p className="text-xs text-slate-600 leading-relaxed">
          {language === "ar"
            ? "لكل طالب وضعية أكاديمية وميزانية خاصة. تواصل معنا مباشرة عبر واتساب لتقييم ملفك وتحديد الجامعة الأنسب لك مجاناً."
            : "Every student has a unique academic profile and budget. Contact us directly on WhatsApp for a free profile assessment and university matching."}
        </p>
      </div>

      {/* Primary WhatsApp Action Button */}
      <a
        href="https://wa.me/212775496303"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full text-xs sm:text-sm font-bold text-white bg-brand-navy hover:bg-brand-electric active:scale-[0.98] shadow-md shadow-brand-navy/10 transition-[background-color,transform,box-shadow] duration-200 group whitespace-nowrap"
      >
        <MessageCircle className="w-4 h-4 text-brand-electric-light shrink-0" />
        <span>
          {language === "ar"
            ? "اطرح سؤالك على مستشار معتمد"
            : "Ask a Certified Advisor"}
        </span>
        <DirectionalArrow
          className={`w-4 h-4 transition-transform duration-200 ${
            isRTL
              ? "group-hover:-translate-x-1"
              : "group-hover:translate-x-1"
          } shrink-0`}
        />
      </a>

      {/* Office Location Footnote */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px] text-slate-500 font-medium">
        <div className="flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-brand-electric shrink-0" />
          <span>
            {language === "ar"
              ? "المقر الرسمي: إنزكان - شارع مراكش (أكادير)"
              : "Official HQ: Inezgane - Marrakech Ave (Agadir)"}
          </span>
        </div>
        <span className="text-brand-electric font-bold">
          {language === "ar" ? "7 وجهات" : "7 Destinations"}
        </span>
      </div>
    </div>
  );
});

interface AccordionRowProps {
  item: FaqItem;
  language: Language;
  isRTL: boolean;
  isOpen: boolean;
  onToggle: (id: string) => void;
}

// Pure Ultra-Clean Question Card: Zero numbers, zero top metadata clutter — 100% focus on the question & answer
const AccordionRow = memo(function AccordionRow({
  item,
  language,
  isRTL,
  isOpen,
  onToggle,
}: AccordionRowProps) {
  const questionText = language === "ar" ? item.questionAr : item.questionEn;
  const answerText = language === "ar" ? item.answerAr : item.answerEn;
  const highlightNote =
    language === "ar" ? item.highlightNoteAr : item.highlightNoteEn;

  return (
    <div
      className={`apple-glass rounded-2xl sm:rounded-3xl transition-[border-color,box-shadow,background-color] duration-250 overflow-hidden ${
        isOpen
          ? "border-blue-300/95 bg-white shadow-[0_16px_38px_-10px_rgba(37,99,235,0.13)]"
          : "border-slate-200/85 bg-white/95 hover:border-blue-200"
      }`}
    >
      <button
        type="button"
        onClick={() => onToggle(item.id)}
        aria-expanded={isOpen}
        aria-controls={`panel-${item.id}`}
        id={`trigger-${item.id}`}
        className={`w-full ${
          isRTL ? "text-right" : "text-left"
        } px-5 py-4 sm:px-6 sm:py-5 flex items-center justify-between gap-4 cursor-pointer select-none group`}
      >
        {/* Question Heading */}
        <h3
          className={`text-sm sm:text-base lg:text-[17px] font-bold leading-relaxed transition-colors duration-200 ${
            isOpen
              ? "text-brand-electric"
              : "text-brand-navy group-hover:text-brand-electric"
          }`}
        >
          {questionText}
        </h3>

        {/* Animated Expand / Collapse Affordance Circle */}
        <span
          className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shrink-0 transition-all duration-250 border ${
            isOpen
              ? "bg-brand-electric border-brand-electric text-white rotate-180 shadow-[0_4px_12px_rgba(37,99,235,0.25)]"
              : "bg-slate-50 border-slate-200/80 text-slate-500 group-hover:border-blue-200 group-hover:text-brand-electric"
          }`}
          aria-hidden="true"
        >
          <ChevronDown className="w-4 h-4 sm:w-[18px] sm:h-[18px] stroke-[2.2]" />
        </span>
      </button>

      {/* Zero-Jank CSS Grid 0fr -> 1fr Expandable Body */}
      <div
        id={`panel-${item.id}`}
        role="region"
        aria-labelledby={`trigger-${item.id}`}
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div
            className={`px-5 pb-5 sm:px-6 sm:pb-6 pt-3 border-t border-slate-100/90 space-y-3.5 ${
              isRTL ? "text-right" : "text-left"
            }`}
          >
            <p className="text-xs sm:text-sm lg:text-[14.5px] text-slate-600 font-normal leading-relaxed">
              {answerText}
            </p>

            {highlightNote && (
              <div className="flex items-center gap-2 pt-1.5 text-[11px] sm:text-xs font-bold text-brand-navy">
                <CheckCircle2 className="w-4 h-4 text-brand-electric shrink-0" />
                <span>{highlightNote}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

export function FAQ() {
  const { language, isRTL } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<FaqCategory>("all");
  const [openId, setOpenId] = useState<string | null>("faq-01");

  const filteredFaqs =
    activeCategory === "all"
      ? FAQ_ITEMS
      : FAQ_ITEMS.filter((item) => item.category === activeCategory);

  const handleToggle = useCallback((id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  }, []);

  const handleCategoryChange = useCallback((cat: FaqCategory) => {
    setActiveCategory(cat);
    const firstMatch =
      cat === "all"
        ? FAQ_ITEMS[0]
        : FAQ_ITEMS.find((item) => item.category === cat);
    if (firstMatch) {
      setOpenId(firstMatch.id);
    }
  }, []);

  return (
    <section
      id="faq"
      dir={isRTL ? "rtl" : "ltr"}
      className="relative w-full pt-8 sm:pt-12 lg:pt-14 pb-8 sm:pb-12 lg:pb-16 overflow-x-clip scroll-mt-20"
    >
      {/* Subtle Ambient Background Accents (Zero filter:blur GPU cost) */}
      <div
        aria-hidden="true"
        className="absolute top-12 left-1/4 w-[420px] h-[420px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(37, 99, 235, 0.06) 0%, rgba(37, 99, 235, 0) 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        {/* ================================================================= */}
        {/* ASYMMETRIC ARCHITECTURAL 12-COLUMN SPLIT (5 Cols / 7 Cols)        */}
        {/* ================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-10 items-start">
          {/* --------------------------------------------------------------- */}
          {/* START COLUMN (5 Cols - Editorial Header & Desktop Sticky Card)  */}
          {/* --------------------------------------------------------------- */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.55, ease: TRANSITION_EASE }}
              className={`space-y-6 text-center ${
                isRTL ? "lg:text-right" : "lg:text-left"
              }`}
            >
              {/* Editorial Section Header */}
              <div className="space-y-3">
                <div className="flex items-center justify-center lg:justify-start gap-2 text-xs font-bold text-brand-electric">
                  <span>
                    {language === "ar"
                      ? "إجابات شفافة وموثقة"
                      : "Transparent & Verified Answers"}
                  </span>
                  <span aria-hidden="true" className="text-slate-300">
                    ·
                  </span>
                  <span className="text-slate-500 font-semibold">
                    {language === "ar"
                      ? "دليل الطالب وولي الأمر"
                      : "Student & Parent Guide"}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-bold text-brand-navy tracking-tight leading-[1.25]">
                  {language === "ar" ? (
                    <>
                      الأسئلة الشائعة حول{" "}
                      <span className="relative inline-block text-brand-electric pb-1.5">
                        <span>الدراسة في أوروبا</span>
                        <span
                          aria-hidden="true"
                          className="absolute -bottom-0.5 right-0 left-0 w-full h-2.5 pointer-events-none select-none"
                        >
                          <svg
                            viewBox="0 0 140 16"
                            fill="none"
                            preserveAspectRatio="none"
                            className="w-full h-full overflow-visible"
                          >
                            <path
                              d="M 138 3 C 95 15, 45 15, 2 5"
                              stroke="#2563EB"
                              strokeWidth="3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              vectorEffect="non-scaling-stroke"
                            />
                          </svg>
                        </span>
                      </span>
                    </>
                  ) : (
                    <>
                      Frequently Asked Questions About{" "}
                      <span className="relative inline-block text-brand-electric pb-1.5">
                        <span>Studying in Europe</span>
                        <span
                          aria-hidden="true"
                          className="absolute -bottom-0.5 right-0 left-0 w-full h-2.5 pointer-events-none select-none"
                        >
                          <svg
                            viewBox="0 0 140 16"
                            fill="none"
                            preserveAspectRatio="none"
                            className="w-full h-full overflow-visible"
                          >
                            <path
                              d="M 138 3 C 95 15, 45 15, 2 5"
                              stroke="#2563EB"
                              strokeWidth="3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              vectorEffect="non-scaling-stroke"
                            />
                          </svg>
                        </span>
                      </span>
                    </>
                  )}
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed max-w-md mx-auto lg:mx-0">
                  {language === "ar"
                    ? "جمعنا لك ولعائلتك أدق الإجابات حول شروط القبول، ضمان التأشيرة، التكاليف الدراسية، والعمل والسكن في وجهاتنا الأوروبية السبعة لتبدأ خطوتك الأولى بثقة ووضوح تام."
                    : "We have compiled clear, accurate answers for you and your family covering admission requirements, visa guarantees, tuition costs, part-time work, and student housing across our 7 European destinations."}
                </p>
              </div>

              {/* Desktop Only (>=1024px): Sticky Advisor Support Card */}
              <div className="hidden lg:block">
                <AdvisorSupportCard language={language} isRTL={isRTL} />
              </div>
            </motion.div>
          </div>

          {/* --------------------------------------------------------------- */}
          {/* END COLUMN (7 Cols - Interactive Filter Bar + FAQ Accordions)    */}
          {/* --------------------------------------------------------------- */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.55, delay: 0.08, ease: TRANSITION_EASE }}
            className="lg:col-span-7 w-full space-y-5"
          >
            {/* Interactive Category Segmented Filter Controls */}
            <div className="relative">
              <div
                role="tablist"
                aria-label={
                  language === "ar" ? "تصنيفات الأسئلة الشائعة" : "FAQ Categories"
                }
                className={`flex items-center gap-2 overflow-x-auto pb-1 ${
                  isRTL ? "pl-6 sm:pl-0" : "pr-6 sm:pr-0"
                } no-scrollbar`}
              >
                {CATEGORY_TABS.map((tab) => {
                  const isSelected = activeCategory === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      role="tab"
                      aria-selected={isSelected}
                      onClick={() => handleCategoryChange(tab.id)}
                      className={`px-4 py-2.5 rounded-full text-xs font-bold transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer border active:scale-95 ${
                        isSelected
                          ? "bg-brand-navy text-white border-brand-navy shadow-sm"
                          : "bg-white/95 text-slate-600 border-slate-200/85 hover:border-blue-200 hover:text-brand-electric"
                      }`}
                    >
                      {language === "ar" ? tab.labelAr : tab.labelEn}
                    </button>
                  );
                })}
              </div>

              {/* Subtle Edge Fade on Mobile to hint horizontal scrollability */}
              <div
                aria-hidden="true"
                className={`sm:hidden pointer-events-none absolute inset-y-0 ${
                  isRTL
                    ? "left-0 bg-gradient-to-r"
                    : "right-0 bg-gradient-to-l"
                } w-8 from-[#FAFBFD] to-transparent`}
              />
            </div>

            {/* Accordion Stack */}
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`${language}-${activeCategory}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2, ease: TRANSITION_EASE }}
                className="space-y-3"
              >
                {filteredFaqs.map((item) => (
                  <AccordionRow
                    key={item.id}
                    item={item}
                    language={language}
                    isRTL={isRTL}
                    isOpen={openId === item.id}
                    onToggle={handleToggle}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
