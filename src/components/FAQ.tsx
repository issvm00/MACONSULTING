"use client";

import React, { useState, useCallback, memo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  MessageCircle,
  ArrowLeft,
  ShieldCheck,
  MapPin,
  CheckCircle2,
} from "lucide-react";

type FaqCategory = "all" | "admission" | "visa" | "costs" | "living";

interface CategoryTab {
  id: FaqCategory;
  label: string;
}

interface FaqItem {
  id: string;
  category: Exclude<FaqCategory, "all">;
  question: string;
  answer: string;
  highlightNote?: string;
}

const CATEGORY_TABS: CategoryTab[] = [
  { id: "all", label: "جميع الأسئلة" },
  { id: "admission", label: "القبول والجامعات" },
  { id: "visa", label: "التأشيرة والضمانات" },
  { id: "costs", label: "التكاليف والمنح" },
  { id: "living", label: "السكن والاستقرار" },
];

const FAQ_ITEMS: FaqItem[] = [
  {
    id: "faq-01",
    category: "admission",
    question:
      "هل الشهادات الجامعية في الوجهات الأوروبية السبعة معترف بها رسمياً في المغرب، الجزائر، وباقي دول العالم؟",
    answer:
      "نعم بكل تأكيد. جميع الجامعات والمعاهد الأوروبية التي تربطنا بها شراكات رسمية (في ليتوانيا، رومانيا، إيطاليا، إسبانيا، المجر، مالطا، وأيرلندا) هي مؤسسات حكومية وخاصة معتمدة ضمن نظام بولونيا الأوروبي للتعليم العالي (Bologna Process & ECTS). هذا يضمن أن دبلومك معترف به رسمياً في المغرب والجزائر، ويُخوّل لك متابعة الدراسات العليا أو العمل في أي دولة داخل الاتحاد الأوروبي وأمريكا الشمالية دون الحاجة لمعادلة معقدة.",
    highlightNote: "شهادات أوروبية معتمدة دولياً 100% وفق نظام ECTS الأوروبي.",
  },
  {
    id: "faq-02",
    category: "admission",
    question:
      "ما هي شروط القبول؟ وهل يُشترط معدل بكالوريا مرتفع أو شهادة لغة مثل IELTS / TOEFL؟",
    answer:
      "لا يُشترط الحصول على معدل مرتفع جداً في البكالوريا للقبول في أغلب الجامعات الشريكة، حيث ندرس ملفك بعناية لنوجهك نحو الجامعات والتخصصات التي تتوافق مع معدلك وميزانيتك (بما في ذلك الهندسة، إدارة الأعمال، الطب، المعلوميات، واللغات). أما بخصوص اللغة، فإذا لم تكن تتوفر على شهادة IELTS أو TOEFL، نوفر لك إمكانية اجتياز مقابلة تقييمية مبسطة عبر الإنترنت مع الجامعة، أو الالتحاق بسنة تحضيرية للغة في أوروبا قبل بدء تخصصك.",
    highlightNote: "نقبل مختلف معدلات البكالوريا مع حلول مرنة لشرط اللغة.",
  },
  {
    id: "faq-03",
    category: "visa",
    question:
      "كم تستغرق عملية استخراج القبول الجامعي والتأشيرة؟ وما معنى ضمان القبول بنسبة 100%؟",
    answer:
      "بفضل عقودنا المباشرة مع الجامعات الأوروبية دون وسطاء، نستخرج القبول الجامعي الرسمي (Offer Letter) في ظرف قياسي يتراوح بين 10 إلى 20 يوم عمل فقط بعد اكتمال وثائق الملف. ضمان القبول 100% يعني أننا نراجع ملفك أكاديمياً قبل التقديم ولا نختار إلا الجامعات التي نضمن استيفاءك الكامل لشروطها. بعد صدور القبول النهائي، يتولى خبراؤنا تجهيز ملف التأشيرة القانوني وحجز موعد القنصلية ومرافقتك خطوة بخطوة لضمان أعلى نسبة نجاح في الحصول على الفيزا.",
    highlightNote: "استخراج القبول الرسمي خلال 10 إلى 20 يوماً مع إعداد احترافي لملف القنصلية.",
  },
  {
    id: "faq-04",
    category: "costs",
    question:
      "ما هي تكلفة الدراسة والمعيشة السنوية في أوروبا؟ وهل تتوفر منح دراسية مخفّضة؟",
    answer:
      "تتميز الوجهات التي نشتغل عليها (مثل ليتوانيا، رومانيا، والمجر) بكونها من أكثر الدول الأوروبية توازناً من حيث الجودة والتكلفة؛ إذ تبدأ الرسوم الدراسية في العديد من التخصصات من حوالي 2000 إلى 4500 يورو سنوياً، بينما تتراوح تكلفة المعيشة والسكن الجامعي بين 300 و500 يورو شهرياً. كما يساعدك فريقنا في التقديم على المنح الدراسية الجزئية أو الكاملة المتاحة للطلبة المتفوقين.",
    highlightNote: "رسوم دراسية ومعيشية مناسبة جداً مقارنة بدول أوروبا الغربية.",
  },
  {
    id: "faq-05",
    category: "costs",
    question:
      "كيف تتم طريقة دفع الرسوم الدراسية؟ وما هي شروط الضمان المالي للسفارة؟",
    answer:
      "نحرص في M&A Overseas Consulting على الشفافية المالية المطلقة؛ حيث يقوم الطالب وولي أمره بتحويل الرسوم الدراسية مباشرة إلى الحساب البنكي الرسمي للجامعة في أوروبا بعد صدور القبول المبدئي، وتتيح أغلب الجامعات إمكانية الأداء على دفعتين (كل فصل دراسي على حدة). أما بخصوص الضمان المالي لملف التأشيرة، فيكفي تقديم كشف حساب بنكي يثبت القدرة على تغطية مصاريف السنة الأولى دون الحاجة لتجميد المبلغ في حساب مغلق معقد.",
    highlightNote: "تحويل الرسوم يتم مباشرة للحساب الرسمي للجامعة مع إمكانية الدفع الفصلي.",
  },
  {
    id: "faq-06",
    category: "living",
    question:
      "هل يحق للطالب العمل بالموازاة مع الدراسة في أوروبا لتغطية مصاريفه الشخصية؟",
    answer:
      "نعم، يمنحك تصريح الإقامة الدراسية في دول الاتحاد الأوروبي الحق القانوني في العمل بدوام جزئي (عادةً 20 ساعة أسبوعياً خلال فترة الدراسة، ودوام كامل 40 ساعة أسبوعياً خلال العطل الصيفية والفصلية). وبفضل تواجد فريقنا الميداني في أوروبا — وخصوصاً في ليتوانيا — نرشد طلابنا عند وصولهم حول كيفية فتح الحساب البنكي، استخراج بطاقة الإقامة، والبحث عن فرص عمل طلابية مناسبة تساعدهم في تغطية مصاريفهم اليومية.",
    highlightNote: "حق قانوني في العمل 20 ساعة أسبوعياً أثناء الدراسة ودوام كامل في العطل.",
  },
  {
    id: "faq-07",
    category: "living",
    question:
      "كيف تتم عملية حجز السكن الجامعي والاستقبال في المطار عند الوصول إلى بلد الدراسة؟",
    answer:
      "مهمتنا لا تنتهي بصدور التأشيرة؛ بل نحجز لطلابنا تذاكر الطيران للسفر في مجموعات موحدة نحو نفس الجامعة، ونؤمّن لك قبل سفرك حجزاً رسمياً ومضموناً في السكن الجامعي (Dormitory) أو في شقة طلابية مشتركة/استوديو مستقل حسب رغبتك. وفور وصولك إلى المطار في أوروبا، يكون مرافقنا الميداني في استقبالك لنقلك إلى مقر إقامتك، ومساعدتك في إجراءات التسجيل النهائي بالجامعة والتأقلم السلس في أيامك الأولى.",
    highlightNote: "استقبال شخصي في المطار وحجز سكن مضمون قبل مغادرتك أرض الوطن.",
  },
  {
    id: "faq-08",
    category: "visa",
    question:
      "أنا طالب من خارج مدينة أكادير أو من الجزائر، كيف يمكنني التسجيل ومتابعة ملفي مع مكتبكم؟",
    answer:
      "نواكب مئات الطلاب من كافة المدن المغربية ومن جميع ولايات الجزائر بنفس الدقة والاحترافية؛ يمكنك إما زيارة مقرنا الرسمي المرخص في إنزكان - شارع مراكش (أكادير)، أو إتمام جميع مراحل الاستشارة، توقيع العقد القانوني، وإرسال الوثائق عن بُعد عبر منصتنا الرقمية والواتساب الرسمي. يتم تخصيص مستشار مباشر لك ولعائلتك يوافيكم بتحديثات فورية في كل مرحلة من مراحل القبول والفيزا حتى يوم السفر.",
    highlightNote: "مواكبة حضورية في مقرنا بإنزكان أو عن بُعد لطلاب كافة مدن المغرب والجزائر.",
  },
];

const FOUNDER_AVATARS = [
  { src: "/team/ali_benamar.jpg", alt: "علي بنعمر" },
  { src: "/team/marouan_ben_amar.jpg", alt: "مروان بنعمر" },
  { src: "/team/amine_jaboune.jpg", alt: "محمد أمين جبون" },
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

// Reusable Direct Advisor Support Card (Rendered in Sticky Right Column on Desktop, and Below Questions on Mobile)
const AdvisorSupportCard = memo(function AdvisorSupportCard() {
  return (
    <div className="apple-glass rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-[0_14px_34px_-10px_rgba(11,27,61,0.06)] relative overflow-hidden space-y-5 text-right">
      {/* Top Founders Avatar Cluster */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2 space-x-reverse overflow-hidden shrink-0">
            {FOUNDER_AVATARS.map((founder) => (
              <SmoothAvatar
                key={founder.src}
                src={founder.src}
                alt={founder.alt}
              />
            ))}
          </div>

          <div>
            <p className="text-xs font-bold text-brand-navy">
              مستشارونا رهن إشارتك
            </p>
            <p className="text-[11px] text-slate-500 font-medium">
              توجيه شخصي مجاني للمغرب والجزائر
            </p>
          </div>
        </div>

        <div className="w-9 h-9 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-brand-electric shrink-0">
          <ShieldCheck className="w-[18px] h-[18px] stroke-[2]" />
        </div>
      </div>

      <div className="space-y-1.5 pt-1 border-t border-slate-100">
        <h3 className="text-sm sm:text-base font-bold text-brand-navy">
          لم تجد إجابة لسؤالك الخاص؟
        </h3>
        <p className="text-xs text-slate-600 leading-relaxed">
          لكل طالب وضعية أكاديمية وميزانية خاصة. تواصل معنا مباشرة عبر واتساب
          لتقييم ملفك وتحديد الجامعة الأنسب لك مجاناً.
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
        <span>اطرح سؤالك على مستشار معتمد</span>
        <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1 shrink-0" />
      </a>

      {/* Office Location Footnote */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px] text-slate-500 font-medium">
        <div className="flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-brand-electric shrink-0" />
          <span>المقر الرسمي: إنزكان - شارع مراكش (أكادير)</span>
        </div>
        <span className="text-brand-electric font-bold">7 وجهات</span>
      </div>
    </div>
  );
});

interface AccordionRowProps {
  item: FaqItem;
  isOpen: boolean;
  onToggle: (id: string) => void;
}

// Pure Ultra-Clean Question Card: Zero numbers, zero top metadata clutter — 100% focus on the question & answer
const AccordionRow = memo(function AccordionRow({
  item,
  isOpen,
  onToggle,
}: AccordionRowProps) {
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
        className="w-full text-right px-5 py-4 sm:px-6 sm:py-5 flex items-center justify-between gap-4 cursor-pointer select-none group"
      >
        {/* Question Heading */}
        <h3
          className={`text-sm sm:text-base lg:text-[17px] font-bold leading-relaxed transition-colors duration-200 ${
            isOpen
              ? "text-brand-electric"
              : "text-brand-navy group-hover:text-brand-electric"
          }`}
        >
          {item.question}
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
          <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-3 border-t border-slate-100/90 space-y-3.5 text-right">
            <p className="text-xs sm:text-sm lg:text-[14.5px] text-slate-600 font-normal leading-relaxed">
              {item.answer}
            </p>

            {item.highlightNote && (
              <div className="flex items-center gap-2 pt-1.5 text-[11px] sm:text-xs font-bold text-brand-navy">
                <CheckCircle2 className="w-4 h-4 text-brand-electric shrink-0" />
                <span>{item.highlightNote}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

export function FAQ() {
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
      dir="rtl"
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
          {/* RIGHT COLUMN (5 Cols - Editorial Header & Desktop Sticky Card)  */}
          {/* --------------------------------------------------------------- */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.55, ease: TRANSITION_EASE }}
              className="space-y-6 text-center lg:text-right"
            >
            {/* Editorial Section Header */}
            <div className="space-y-3">
              <div className="flex items-center justify-center lg:justify-start gap-2 text-xs font-bold text-brand-electric">
                <span>إجابات شفافة وموثقة</span>
                <span aria-hidden="true" className="text-slate-300">
                  ·
                </span>
                <span className="text-slate-500 font-semibold">
                  دليل الطالب وولي الأمر
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-bold text-brand-navy tracking-tight leading-[1.25]">
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
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed max-w-md mx-auto lg:mx-0">
                جمعنا لك ولعائلتك أدق الإجابات حول شروط القبول، ضمان التأشيرة،
                التكاليف الدراسية، والعمل والسكن في وجهاتنا الأوروبية السبعة
                لتبدأ خطوتك الأولى بثقة ووضوح تام.
              </p>
            </div>

            {/* Desktop Only (>=1024px): Sticky Advisor Support Card */}
            <div className="hidden lg:block">
              <AdvisorSupportCard />
            </div>
            </motion.div>
          </div>

          {/* --------------------------------------------------------------- */}
          {/* LEFT COLUMN (7 Cols - Interactive Filter Bar + FAQ Accordions)  */}
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
                aria-label="تصنيفات الأسئلة الشائعة"
                className="flex items-center gap-2 overflow-x-auto pb-1 pl-6 sm:pl-0 no-scrollbar"
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
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* Subtle Left Edge Fade on Mobile to hint horizontal scrollability */}
              <div
                aria-hidden="true"
                className="sm:hidden pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-[#FAFBFD] to-transparent"
              />
            </div>

            {/* Accordion Stack */}
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeCategory}
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
