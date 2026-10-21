"use client";

import React, { useState, useEffect, useCallback, useRef, memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Phone,
  User,
  MessageCircle,
  MapPin,
  Cpu,
  TrendingUp,
  Award,
  Globe,
  GraduationCap,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  BookOpen,
  Stethoscope,
  Building2,
  Copy,
  RotateCcw,
} from "lucide-react";

const TRANSITION_EASE = [0.22, 1, 0.36, 1] as const;

type StudentCountry = "ma" | "dz";

// WhatsApp Routing Numbers per Country Desk
const WHATSAPP_NUMBERS: Record<
  StudentCountry,
  { raw: string; deskLabel: string }
> = {
  ma: {
    raw: "212775496303",
    deskLabel: "مكتب المغرب الرسمي (أكادير - إنزكان)",
  },
  dz: {
    raw: "37062202955",
    deskLabel: "المكتب الأوروبي المخصص لطلاب الجزائر",
  },
};

const FOUNDERS = [
  { name: "علي بنعمر", image: "/team/ali_benamar.jpg" },
  { name: "مروان بنعمر", image: "/team/marouan_ben_amar.jpg" },
  { name: "محمد أمين جبون", image: "/team/amine_jaboune.jpg" },
];

// Progressive Avatar Loader for Weak Mobile Networks
const SmoothAvatar = memo(function SmoothAvatar({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border-2 border-white bg-slate-100 shadow-sm shrink-0">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="36px"
        referrerPolicy="no-referrer"
        onLoad={() => setLoaded(true)}
        className={`object-cover object-top transition-opacity duration-500 ease-out ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
});

// Crisp SVG Country Flags (Morocco, Algeria + 7 European Study Destinations)
const CountryFlag = memo(function CountryFlag({
  code,
  size = "md",
}: {
  code: string;
  size?: "sm" | "md" | "lg";
}) {
  const sizeClasses =
    size === "lg"
      ? "w-6 h-6 sm:w-6 sm:h-6"
      : size === "md"
      ? "w-5 h-5"
      : "w-4 h-4";

  if (code === "UNDECIDED") {
    return (
      <span
        className={`${sizeClasses} rounded-full bg-blue-100 text-brand-electric flex items-center justify-center shrink-0`}
      >
        <Sparkles className="w-3.5 h-3.5" />
      </span>
    );
  }

  const renderSvg = () => {
    switch (code) {
      case "MA": // Morocco
        return (
          <svg viewBox="0 0 24 24" className="w-full h-full">
            <rect width="24" height="24" fill="#C1272D" />
            <path
              d="M12 6.8L13.35 10.95H17.7L14.18 13.5L15.52 17.65L12 15.1L8.48 17.65L9.82 13.5L6.3 10.95H10.65L12 6.8Z"
              fill="none"
              stroke="#006233"
              strokeWidth="1.4"
              strokeLinejoin="round"
            />
          </svg>
        );
      case "DZ": // Algeria
        return (
          <svg viewBox="0 0 24 24" className="w-full h-full">
            <rect x="0" width="12" height="24" fill="#006233" />
            <rect x="12" width="12" height="24" fill="#FFFFFF" />
            <circle cx="12" cy="12" r="4.6" fill="#D21034" />
            <circle cx="13.2" cy="12" r="3.7" fill="#FFFFFF" />
            <path
              d="M12 12L9.5 7.6A4.6 4.6 0 0 0 9.5 16.4Z"
              fill="#D21034"
            />
            <polygon
              points="13.8,9.8 14.3,11.2 15.8,11.2 14.6,12.1 15.0,13.5 13.8,12.6 12.6,13.5 13.0,12.1 11.8,11.2 13.3,11.2"
              fill="#D21034"
            />
          </svg>
        );
      case "LT": // Lithuania
        return (
          <svg viewBox="0 0 24 24" className="w-full h-full">
            <rect y="0" width="24" height="8" fill="#FDB913" />
            <rect y="8" width="24" height="8" fill="#006A44" />
            <rect y="16" width="24" height="8" fill="#C1272D" />
          </svg>
        );
      case "RO": // Romania
        return (
          <svg viewBox="0 0 24 24" className="w-full h-full">
            <rect x="0" width="8" height="24" fill="#002B7F" />
            <rect x="8" width="8" height="24" fill="#FCD116" />
            <rect x="16" width="8" height="24" fill="#CE1126" />
          </svg>
        );
      case "IT": // Italy
        return (
          <svg viewBox="0 0 24 24" className="w-full h-full">
            <rect x="0" width="8" height="24" fill="#009246" />
            <rect x="8" width="8" height="24" fill="#FFFFFF" />
            <rect x="16" width="8" height="24" fill="#CE2B37" />
          </svg>
        );
      case "ES": // Spain
        return (
          <svg viewBox="0 0 24 24" className="w-full h-full">
            <rect y="0" width="24" height="6" fill="#AA151B" />
            <rect y="6" width="24" height="12" fill="#F1BF00" />
            <rect y="18" width="24" height="6" fill="#AA151B" />
          </svg>
        );
      case "HU": // Hungary
        return (
          <svg viewBox="0 0 24 24" className="w-full h-full">
            <rect y="0" width="24" height="8" fill="#CE2939" />
            <rect y="8" width="24" height="8" fill="#FFFFFF" />
            <rect y="16" width="24" height="8" fill="#477050" />
          </svg>
        );
      case "IE": // Ireland
        return (
          <svg viewBox="0 0 24 24" className="w-full h-full">
            <rect x="0" width="8" height="24" fill="#169B62" />
            <rect x="8" width="8" height="24" fill="#FFFFFF" />
            <rect x="16" width="8" height="24" fill="#FF883E" />
          </svg>
        );
      case "MT": // Malta
        return (
          <svg viewBox="0 0 24 24" className="w-full h-full">
            <rect x="0" width="12" height="24" fill="#FFFFFF" />
            <rect x="12" width="12" height="24" fill="#CF142B" />
            <path
              d="M5 4.5H7V6.5H9V8.5H7V10.5H5V8.5H3V6.5H5V4.5Z"
              fill="#9E9E9E"
              stroke="#CF142B"
              strokeWidth="0.5"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <span
      className={`relative ${sizeClasses} rounded-full overflow-hidden border border-slate-200/90 shadow-sm shrink-0 inline-flex bg-white`}
    >
      {renderSvg()}
    </span>
  );
});

const DESTINATIONS = [
  { id: "LT", name: "ليتوانيا", fullWidth: false },
  { id: "RO", name: "رومانيا", fullWidth: false },
  { id: "IT", name: "إيطاليا", fullWidth: false },
  { id: "ES", name: "إسبانيا", fullWidth: false },
  { id: "HU", name: "المجر", fullWidth: false },
  { id: "IE", name: "أيرلندا", fullWidth: false },
  { id: "MT", name: "مالطا", fullWidth: true },
  {
    id: "UNDECIDED",
    name: "لم أحدد الوجهة بعد — وجّهوني للأفضل",
    fullWidth: true,
  },
];

const STUDY_LEVELS = [
  {
    id: "bac",
    title: "بكالوريا 2026 أو حاصل عليها",
    icon: GraduationCap,
  },
  {
    id: "higher",
    title: "طالب جامعي (Bac+2 / إجازة)",
    icon: Award,
  },
];

const BAC_STREAMS_BY_COUNTRY: Record<
  StudentCountry,
  Array<{ id: string; label: string }>
> = {
  ma: [
    { id: "pc_svt", label: "علوم فيزيائية / SVT" },
    { id: "sm_tech", label: "علوم رياضية أو تقنية" },
    { id: "eco", label: "علوم اقتصادية وتدبير" },
    { id: "lettres", label: "آداب وعلوم إنسانية" },
  ],
  dz: [
    { id: "dz_sci", label: "علوم تجريبية" },
    { id: "dz_math", label: "رياضيات أو تقني رياضي" },
    { id: "dz_eco", label: "تسيير واقتصاد" },
    { id: "dz_lettres", label: "آداب وفلسفة / لغات" },
  ],
};

const BAC_YEARS = [
  { id: "2026", label: "دفعة 2026" },
  { id: "2025", label: "سنة 2025" },
  { id: "2024_before", label: "2024 أو قبل" },
];

const TARGET_FIELDS = [
  {
    id: "eng_it",
    title: "الهندسة والمعلوميات و AI",
    icon: Cpu,
    fullWidth: false,
  },
  {
    id: "med_health",
    title: "الطب، الصيدلة وعلوم الصحة",
    icon: Stethoscope,
    fullWidth: false,
  },
  {
    id: "business",
    title: "إدارة الأعمال والتجارة",
    icon: TrendingUp,
    fullWidth: false,
  },
  {
    id: "prep_lang",
    title: "السنة التحضيرية للغة",
    icon: BookOpen,
    fullWidth: false,
  },
  {
    id: "other_field",
    title: "تخصص آخر / أحتاج مساعدة للاختيار",
    icon: Sparkles,
    fullWidth: true,
  },
];

const LANGUAGE_LEVELS = [
  {
    id: "beginner",
    tag: "A1 - A2",
    title: "مبتدئ",
    fullWidth: false,
  },
  {
    id: "intermediate",
    tag: "B1 - B2",
    title: "متوسط إلى جيد",
    fullWidth: false,
  },
  {
    id: "advanced",
    tag: "B2+ / IELTS",
    title: "مستوى متقدم — جاهز للقبول المباشر",
    fullWidth: true,
  },
];

const BUDGET_RANGES = [
  { id: "eco", title: "2,500€ - 4,000€ سنوياً" },
  { id: "mid", title: "4,000€ - 6,000€ سنوياً" },
  { id: "plus", title: "+6,000€ سنوياً" },
  { id: "advice", title: "مناقشة التكاليف والمنح" },
];

const CONSULT_MODES_BY_COUNTRY: Record<
  StudentCountry,
  Array<{ id: string; title: string; icon: React.ElementType }>
> = {
  ma: [
    {
      id: "office_agadir",
      title: "حضورياً في مقر أكادير (إنزكان)",
      icon: Building2,
    },
    {
      id: "remote_ma",
      title: "عن بُعد عبر واتساب (جميع المدن)",
      icon: MessageCircle,
    },
  ],
  dz: [
    {
      id: "remote_dz_full",
      title: "مواكبة شاملة عن بُعد لطلاب الجزائر",
      icon: Globe,
    },
    {
      id: "remote_dz_eu",
      title: "توجيه مباشر مع مكتبنا في أوروبا",
      icon: MessageCircle,
    },
  ],
};

const STEP_META = [
  { number: 1, title: "البلد والوجهة الدراسية" },
  { number: 2, title: "المستوى والتخصص" },
  { number: 3, title: "اللغة والميزانية" },
  { number: 4, title: "تأكيد وإرسال الملف" },
];

export function PostulerWizard() {
  const [step, setStep] = useState<number>(1);
  const [isLogoLoaded, setIsLogoLoaded] = useState<boolean>(false);

  // Step 1 State
  const [studentCountry, setStudentCountry] = useState<StudentCountry>("ma");
  const [destination, setDestination] = useState<string>("LT");

  // Step 2 State
  const [studyLevel, setStudyLevel] = useState<string>("bac");
  const [bacStream, setBacStream] = useState<string>("pc_svt");
  const [bacYear, setBacYear] = useState<string>("2026");
  const [targetField, setTargetField] = useState<string>("eng_it");

  // Step 3 State
  const [englishLevel, setEnglishLevel] = useState<string>("intermediate");
  const [budgetRange, setBudgetRange] = useState<string>("mid");
  const [consultMode, setConsultMode] = useState<string>("remote_ma");

  // Step 4 State
  const [fullName, setFullName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [studentCity, setStudentCity] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  // Submission / Confirmation State
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [generatedWhatsappUrl, setGeneratedWhatsappUrl] = useState<string>("");
  const [generatedMessageText, setGeneratedMessageText] = useState<string>("");
  const [copiedDossier, setCopiedDossier] = useState<boolean>(false);
  const copyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Read optional query parameters on mount (e.g. ?destination=RO or ?country=dz)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const destParam = params.get("destination")?.toUpperCase();
    if (destParam && DESTINATIONS.some((d) => d.id === destParam)) {
      setDestination(destParam);
    }
    const countryParam = params.get("country")?.toLowerCase();
    if (countryParam === "dz" || countryParam === "algeria") {
      setStudentCountry("dz");
      setBacStream("dz_sci");
      setConsultMode("remote_dz_full");
    }
    return () => {
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
    };
  }, []);

  // Synchronize country-specific defaults when switching between Morocco and Algeria
  const handleSelectCountry = useCallback((country: StudentCountry) => {
    setStudentCountry(country);
    if (country === "ma") {
      setBacStream((prev) => (prev.startsWith("dz_") ? "pc_svt" : prev));
      setConsultMode((prev) =>
        prev.startsWith("remote_dz") ? "remote_ma" : prev
      );
    } else {
      setBacStream((prev) => (!prev.startsWith("dz_") ? "dz_sci" : prev));
      setConsultMode((prev) =>
        !prev.startsWith("remote_dz") ? "remote_dz_full" : prev
      );
    }
  }, []);

  const goToStep = useCallback((nextStep: number) => {
    setStep(nextStep);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  // Resolve human-readable labels for Live Summary & WhatsApp message
  const selectedDestinationObj =
    DESTINATIONS.find((d) => d.id === destination) || DESTINATIONS[0];
  const selectedStudyLevelObj =
    STUDY_LEVELS.find((l) => l.id === studyLevel) || STUDY_LEVELS[0];
  const currentStreams = BAC_STREAMS_BY_COUNTRY[studentCountry];
  const selectedStreamObj =
    currentStreams.find((s) => s.id === bacStream) || currentStreams[0];
  const selectedYearObj =
    BAC_YEARS.find((y) => y.id === bacYear) || BAC_YEARS[0];
  const selectedFieldObj =
    TARGET_FIELDS.find((f) => f.id === targetField) || TARGET_FIELDS[0];
  const selectedLangObj =
    LANGUAGE_LEVELS.find((l) => l.id === englishLevel) || LANGUAGE_LEVELS[1];
  const selectedBudgetObj =
    BUDGET_RANGES.find((b) => b.id === budgetRange) || BUDGET_RANGES[1];
  const currentConsultModes = CONSULT_MODES_BY_COUNTRY[studentCountry];
  const selectedConsultObj =
    currentConsultModes.find((c) => c.id === consultMode) ||
    currentConsultModes[0];
  const activeDesk = WHATSAPP_NUMBERS[studentCountry];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const year = new Date().getFullYear();
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const refCode = `MA-${studentCountry.toUpperCase()}-${year}-${randomDigits}`;

    const countryName =
      studentCountry === "ma" ? "المغرب 🇲🇦" : "الجزائر 🇩🇿";

    const messageLines = [
      `السلام عليكم فريق M&A Overseas Consulting،`,
      `أود تقديم طلب استشارة وتقييم ملف للدراسة في أوروبا (مرجع الملف: ${refCode}):`,
      ``,
      `• الطالب(ة): ${fullName.trim()}`,
      `• البلد والمدينة: ${countryName} (${studentCity.trim()})`,
      `• رقم الهاتف: ${phone.trim()}`,
      `• الوجهة المفضلة: ${selectedDestinationObj.name}`,
      `• المستوى الدراسي: ${selectedStudyLevelObj.title}`,
      `• الشعبة وسنة البكالوريا: ${selectedStreamObj.label} (${selectedYearObj.label})`,
      `• التخصص المطلوب: ${selectedFieldObj.title}`,
      `• مستوى اللغة: ${selectedLangObj.title} (${selectedLangObj.tag})`,
      `• الميزانية التقريبية: ${selectedBudgetObj.title}`,
      `• طريقة المواكبة: ${selectedConsultObj.title}`,
    ];

    if (notes.trim()) {
      messageLines.push(`• ملاحظة إضافية: ${notes.trim()}`);
    }

    messageLines.push(
      ``,
      `أرغب في تحديد موعد جلسة التوجيه المجانية ومناقشة الخطوات القادمة.`
    );

    const fullText = messageLines.join("\n");
    const whatsappUrl = `https://wa.me/${activeDesk.raw}?text=${encodeURIComponent(
      fullText
    )}`;

    setGeneratedMessageText(fullText);
    setGeneratedWhatsappUrl(whatsappUrl);
    setSubmittedRef(refCode);

    // Trigger anchor click to open WhatsApp cleanly in a new tab
    const tempAnchor = document.createElement("a");
    tempAnchor.href = whatsappUrl;
    tempAnchor.target = "_blank";
    tempAnchor.rel = "noopener noreferrer";
    document.body.appendChild(tempAnchor);
    tempAnchor.click();
    document.body.removeChild(tempAnchor);
  };

  const handleCopyDossier = useCallback(() => {
    if (!generatedMessageText || typeof navigator === "undefined") return;
    navigator.clipboard?.writeText(generatedMessageText);
    setCopiedDossier(true);
    if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
    copyTimerRef.current = setTimeout(() => setCopiedDossier(false), 2500);
  }, [generatedMessageText]);

  return (
    <div
      dir="rtl"
      className="min-h-screen flex flex-col font-sans text-brand-navy relative overflow-x-clip select-none"
    >
      {/* =================================================================== */}
      {/* 1. DISTRACTION-FREE STICKY APPLICATION HEADER                       */}
      {/* =================================================================== */}
      <header className="sticky top-0 z-40 bg-white/95 md:backdrop-blur-md border-b border-slate-200/80 h-16 sm:h-[68px] flex items-center shadow-sm transform-gpu">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between relative">
          {/* Right: Back to Home Button */}
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-600 hover:text-brand-electric transition-colors py-2 px-3 rounded-full hover:bg-slate-100/80 active:scale-95"
          >
            <ArrowRight className="w-4 h-4 text-brand-electric shrink-0" />
            <span className="whitespace-nowrap">العودة للرئيسية</span>
          </Link>

          {/* Center: Official Brand Logo */}
          <Link
            href="/"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center active:scale-95 transition-transform"
          >
            <Image
              src="/logo/logo.png"
              alt="M&A OVERSEAS CONSULTING"
              width={352}
              height={163}
              referrerPolicy="no-referrer"
              onLoad={() => setIsLogoLoaded(true)}
              className={`h-8 sm:h-9 w-auto object-contain transition-opacity duration-500 ease-out ${
                isLogoLoaded ? "opacity-100" : "opacity-0"
              }`}
              priority
            />
          </Link>

          {/* Left: Direct WhatsApp Support Capsule */}
          <a
            href={`https://wa.me/${activeDesk.raw}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50/90 hover:bg-brand-electric text-brand-navy hover:text-white border border-blue-200/75 text-[11px] sm:text-xs font-bold shadow-sm transition-all duration-200 active:scale-95 whitespace-nowrap group"
          >
            <MessageCircle className="w-3.5 h-3.5 text-brand-electric group-hover:text-white transition-colors shrink-0" />
            <span>تحتاج مساعدة؟</span>
          </a>
        </div>
      </header>

      {/* =================================================================== */}
      {/* 2. MAIN WIZARD BODY                                                 */}
      {/* =================================================================== */}
      <main className="flex-grow py-5 sm:py-9 relative z-10">
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
          {/* Top 4-Step Segmented Progress Bar */}
          <div className="max-w-3xl mx-auto mb-5 sm:mb-8">
            <div className="flex items-center justify-between gap-2 text-xs sm:text-sm font-semibold mb-2">
              <span className="text-slate-500 truncate">
                الخطوة {step} من 4:{" "}
                <strong className="text-brand-navy font-bold">
                  {STEP_META[step - 1]?.title}
                </strong>
              </span>

              <span className="text-brand-electric font-bold bg-white px-2.5 py-0.5 rounded-full text-[11px] sm:text-xs border border-slate-200/90 shadow-sm tabular-nums whitespace-nowrap shrink-0">
                {step * 25}% مكتمل
              </span>
            </div>

            {/* 4 Interactive Progress Segments */}
            <div className="grid grid-cols-4 gap-2 w-full">
              {STEP_META.map((s) => {
                const isCompletedOrCurrent = step >= s.number;
                const canJumpBack = s.number < step && !submittedRef;
                return (
                  <button
                    key={s.number}
                    type="button"
                    disabled={!canJumpBack}
                    onClick={() => canJumpBack && goToStep(s.number)}
                    aria-label={s.title}
                    className={`h-2 rounded-full overflow-hidden bg-slate-200/90 relative ${
                      canJumpBack ? "cursor-pointer" : "cursor-default"
                    }`}
                  >
                    <div
                      className={`h-full bg-brand-electric transition-all duration-300 ease-out rounded-full ${
                        isCompletedOrCurrent ? "w-full" : "w-0"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Asymmetric 12-Column Layout: 7 Cols Wizard + 5 Cols Sticky Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* ============================================================= */}
            {/* RIGHT COLUMN (7 Cols): INTERACTIVE MULTI-STEP CARD            */}
            {/* ============================================================= */}
            <div className="relative lg:col-span-7 apple-glass rounded-3xl sm:rounded-[32px] border border-slate-200/90 p-4 sm:p-7 lg:p-8 shadow-[0_20px_50px_-14px_rgba(11,27,61,0.09)] overflow-hidden">
              {/* Zero-Blur GPU Radial Top Lighting */}
              <div
                aria-hidden="true"
                className="absolute -top-24 -right-24 w-72 h-72 rounded-full pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle, rgba(37, 99, 235, 0.08) 0%, rgba(37, 99, 235, 0) 70%)",
                }}
              />

              <div className="relative z-10">
                <AnimatePresence mode="wait" initial={false}>
                  {/* ======================================================= */}
                  {/* CONFIRMATION SCREEN (After Form Submission)             */}
                  {/* ======================================================= */}
                  {submittedRef ? (
                    <motion.div
                      key="submitted-screen"
                      initial={{ opacity: 0, scale: 0.98, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.98, y: -10 }}
                      transition={{ duration: 0.28, ease: TRANSITION_EASE }}
                      className="space-y-5 text-center py-2"
                    >
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl sm:rounded-3xl bg-blue-50 border border-blue-200/80 text-brand-electric flex items-center justify-center mx-auto shadow-sm">
                        <CheckCircle2 className="w-8 h-8 sm:w-9 sm:h-9 stroke-[2.2]" />
                      </div>

                      <div className="space-y-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold text-brand-navy tabular-nums">
                          <span>مرجع الملف الرسمي:</span>
                          <span className="text-brand-electric">
                            {submittedRef}
                          </span>
                        </div>
                        <h2 className="text-lg sm:text-2xl font-bold text-brand-navy">
                          تم تجهيز ملف طلبك بنجاح، {fullName}!
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                          اضغط على الزر أسفله لفتح واتساب وإرسال ملفك مباشرة إلى{" "}
                          <strong className="text-brand-navy">
                            {activeDesk.deskLabel}
                          </strong>
                          .
                        </p>
                      </div>

                      {/* Direct WhatsApp Launch Button */}
                      <div className="pt-1 flex flex-col sm:flex-row items-center justify-center gap-2.5">
                        <a
                          href={generatedWhatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full sm:w-auto h-11 sm:h-12 px-6 rounded-xl sm:rounded-2xl bg-brand-electric hover:bg-brand-navy text-white font-bold text-xs sm:text-sm shadow-md shadow-brand-electric/20 inline-flex items-center justify-center gap-2 whitespace-nowrap transition-all active:scale-95 group"
                        >
                          <MessageCircle className="w-4 h-4 shrink-0" />
                          <span>فتح واتساب وإرسال الملف</span>
                          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 shrink-0" />
                        </a>

                        <button
                          type="button"
                          onClick={handleCopyDossier}
                          className="w-full sm:w-auto h-11 sm:h-12 px-5 rounded-xl sm:rounded-2xl bg-slate-100 hover:bg-slate-200/80 text-brand-navy font-bold text-xs inline-flex items-center justify-center gap-2 whitespace-nowrap transition-all active:scale-95 cursor-pointer"
                        >
                          <Copy className="w-3.5 h-3.5 text-brand-electric shrink-0" />
                          <span>
                            {copiedDossier
                              ? "تم نسخ تفاصيل الملف ✓"
                              : "نسخ نص الملف"}
                          </span>
                        </button>
                      </div>

                      <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-500">
                        <button
                          type="button"
                          onClick={() => setSubmittedRef(null)}
                          className="inline-flex items-center gap-1.5 hover:text-brand-electric transition-colors cursor-pointer"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>تعديل معطيات الملف</span>
                        </button>

                        <Link
                          href="/"
                          className="hover:text-brand-navy transition-colors"
                        >
                          العودة إلى الصفحة الرئيسية
                        </Link>
                      </div>
                    </motion.div>
                  ) : step === 1 ? (
                    /* ======================================================= */
                    /* STEP 1: COUNTRY OF RESIDENCE & EUROPEAN DESTINATION     */
                    /* ======================================================= */
                    <motion.div
                      key="step-1"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.22, ease: TRANSITION_EASE }}
                      className="space-y-5"
                    >
                      <h1 className="text-[17px] sm:text-2xl font-bold text-brand-navy leading-snug tracking-tight">
                        لنبدأ بتخصيص ملفك الدراسي في أوروبا
                      </h1>

                      {/* 1A: Student Country Selector (Zero-Fluff Single-Row Cards) */}
                      <div className="space-y-2">
                        <label className="block text-xs font-bold text-slate-600">
                          1. من أي بلد تتواصل معنا؟
                        </label>
                        <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                          {[
                            {
                              id: "ma" as StudentCountry,
                              flag: "MA",
                              title: "المملكة المغربية",
                            },
                            {
                              id: "dz" as StudentCountry,
                              flag: "DZ",
                              title: "الجمهورية الجزائرية",
                            },
                          ].map((c) => {
                            const isSelected = studentCountry === c.id;
                            return (
                              <button
                                key={c.id}
                                type="button"
                                onClick={() => handleSelectCountry(c.id)}
                                className={`h-[52px] sm:h-14 px-3 sm:px-4 rounded-2xl border text-right transition-all duration-150 cursor-pointer flex items-center justify-between gap-2 active:scale-[0.98] ${
                                  isSelected
                                    ? "bg-blue-50/90 border-2 border-brand-electric ring-2 ring-brand-electric/15 shadow-sm"
                                    : "bg-slate-50/80 border-slate-200/90 hover:border-blue-200 hover:bg-white"
                                }`}
                              >
                                <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                                  <CountryFlag code={c.flag} size="lg" />
                                  <strong
                                    className={`text-xs sm:text-sm font-bold whitespace-nowrap ${
                                      isSelected
                                        ? "text-brand-electric"
                                        : "text-brand-navy"
                                    }`}
                                  >
                                    {c.title}
                                  </strong>
                                </div>

                                <div
                                  className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                                    isSelected
                                      ? "bg-brand-electric text-white"
                                      : "border border-slate-300 bg-white"
                                  }`}
                                >
                                  {isSelected && (
                                    <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-[3]" />
                                  )}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* 1B: Target European Destination (Zero-Fluff Direct Country Cards) */}
                      <div className="space-y-2">
                        <label className="block text-xs font-bold text-slate-600">
                          2. ما هي وجهتك الدراسية المفضلة في أوروبا؟
                        </label>
                        <div className="grid grid-cols-2 gap-2.5">
                          {DESTINATIONS.map((dest) => {
                            const isSelected = destination === dest.id;
                            return (
                              <button
                                key={dest.id}
                                type="button"
                                onClick={() => setDestination(dest.id)}
                                className={`${
                                  dest.fullWidth ? "col-span-2" : ""
                                } h-12 sm:h-[52px] px-3 sm:px-4 rounded-2xl border text-right transition-all duration-150 cursor-pointer flex items-center justify-between gap-2 active:scale-[0.98] ${
                                  isSelected
                                    ? "bg-blue-50/90 border-2 border-brand-electric ring-2 ring-brand-electric/15 shadow-sm"
                                    : "bg-white border-slate-200/90 hover:border-blue-200 hover:bg-slate-50/50"
                                }`}
                              >
                                <div className="flex items-center gap-2.5 min-w-0">
                                  <CountryFlag code={dest.id} size="md" />
                                  <strong
                                    className={`text-xs sm:text-sm font-bold whitespace-nowrap ${
                                      isSelected
                                        ? "text-brand-electric"
                                        : "text-brand-navy"
                                    }`}
                                  >
                                    {dest.name}
                                  </strong>
                                </div>

                                <div
                                  className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                                    isSelected
                                      ? "bg-brand-electric text-white"
                                      : "border border-slate-300 bg-white"
                                  }`}
                                >
                                  {isSelected && (
                                    <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-[3]" />
                                  )}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Step 1 Sleek Action Bar */}
                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                        <span className="text-[11px] text-slate-400 font-medium">
                          الخطوة 1 من 4
                        </span>
                        <button
                          type="button"
                          onClick={() => goToStep(2)}
                          className="group h-11 px-6 rounded-xl bg-brand-navy hover:bg-brand-electric text-white font-bold text-xs sm:text-sm inline-flex items-center justify-center gap-2 whitespace-nowrap transition-all active:scale-[0.98] cursor-pointer shadow-sm"
                        >
                          <span>متابعة للملف الدراسي</span>
                          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 shrink-0" />
                        </button>
                      </div>
                    </motion.div>
                  ) : step === 2 ? (
                    /* ======================================================= */
                    /* STEP 2: ACADEMIC PROFILE & TARGET MAJOR                 */
                    /* ======================================================= */
                    <motion.div
                      key="step-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.22, ease: TRANSITION_EASE }}
                      className="space-y-5"
                    >
                      <h2 className="text-[17px] sm:text-2xl font-bold text-brand-navy leading-snug tracking-tight">
                        حدد مستواك الدراسي والتخصص المطلوب
                      </h2>

                      {/* 2A: Current Study Level */}
                      <div className="space-y-2">
                        <label className="block text-xs font-bold text-slate-600">
                          1. مستواك الدراسي الحالي:
                        </label>
                        <div className="grid grid-cols-2 gap-2.5">
                          {STUDY_LEVELS.map((lvl) => {
                            const isSelected = studyLevel === lvl.id;
                            const IconComp = lvl.icon;
                            return (
                              <button
                                key={lvl.id}
                                type="button"
                                onClick={() => setStudyLevel(lvl.id)}
                                className={`h-[52px] sm:h-14 px-3 sm:px-4 rounded-2xl border text-right transition-all duration-150 cursor-pointer flex items-center justify-between gap-2 active:scale-[0.98] ${
                                  isSelected
                                    ? "bg-blue-50/90 border-2 border-brand-electric ring-2 ring-brand-electric/15 shadow-sm"
                                    : "bg-slate-50/80 border-slate-200/90 hover:border-blue-200 hover:bg-white"
                                }`}
                              >
                                <div className="flex items-center gap-2 min-w-0">
                                  <div
                                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                                      isSelected
                                        ? "bg-brand-electric text-white"
                                        : "bg-white border border-slate-200 text-slate-600"
                                    }`}
                                  >
                                    <IconComp className="w-3.5 h-3.5" />
                                  </div>
                                  <strong
                                    className={`text-xs sm:text-sm font-bold leading-snug ${
                                      isSelected
                                        ? "text-brand-electric"
                                        : "text-brand-navy"
                                    }`}
                                  >
                                    {lvl.title}
                                  </strong>
                                </div>

                                <div
                                  className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                                    isSelected
                                      ? "bg-brand-electric text-white"
                                      : "border border-slate-300 bg-white"
                                  }`}
                                >
                                  {isSelected && (
                                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                                  )}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* 2B: Country-Adaptive Baccalaureate Stream */}
                      <div className="space-y-2">
                        <label className="block text-xs font-bold text-slate-600">
                          2. شعبة البكالوريا:
                        </label>
                        <div className="grid grid-cols-2 gap-2.5">
                          {currentStreams.map((b) => {
                            const isSelected = bacStream === b.id;
                            return (
                              <button
                                key={b.id}
                                type="button"
                                onClick={() => setBacStream(b.id)}
                                className={`h-12 px-3 sm:px-4 rounded-2xl text-right transition-all duration-150 cursor-pointer flex items-center justify-between gap-2 active:scale-[0.98] ${
                                  isSelected
                                    ? "bg-blue-50/90 border-2 border-brand-electric text-brand-electric ring-2 ring-brand-electric/15 shadow-sm"
                                    : "bg-slate-50/80 border border-slate-200/90 text-brand-navy hover:border-blue-200 hover:bg-white"
                                }`}
                              >
                                <strong className="text-xs sm:text-sm font-bold leading-snug">
                                  {b.label}
                                </strong>
                                <div
                                  className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                                    isSelected
                                      ? "bg-brand-electric text-white"
                                      : "border border-slate-300 bg-white"
                                  }`}
                                >
                                  {isSelected && (
                                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                                  )}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* 2C: Baccalaureate / Graduation Year */}
                      <div className="space-y-2">
                        <label className="block text-xs font-bold text-slate-600">
                          3. سنة الحصول على البكالوريا (أو آخر شهادة):
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {BAC_YEARS.map((y) => {
                            const isSelected = bacYear === y.id;
                            return (
                              <button
                                key={y.id}
                                type="button"
                                onClick={() => setBacYear(y.id)}
                                className={`h-11 px-2 rounded-xl text-center text-xs sm:text-sm font-bold transition-all duration-150 cursor-pointer active:scale-[0.98] ${
                                  isSelected
                                    ? "bg-blue-50/90 border-2 border-brand-electric text-brand-electric ring-2 ring-brand-electric/15 shadow-sm"
                                    : "bg-slate-50/80 border border-slate-200/90 text-slate-700 hover:border-blue-200 hover:bg-white"
                                }`}
                              >
                                {y.label}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* 2D: Target Academic Major */}
                      <div className="space-y-2">
                        <label className="block text-xs font-bold text-slate-600">
                          4. التخصص المطلوب في أوروبا:
                        </label>
                        <div className="grid grid-cols-2 gap-2.5">
                          {TARGET_FIELDS.map((field) => {
                            const isSelected = targetField === field.id;
                            const IconComp = field.icon;
                            return (
                              <button
                                key={field.id}
                                type="button"
                                onClick={() => setTargetField(field.id)}
                                className={`${
                                  field.fullWidth ? "col-span-2" : ""
                                } h-[52px] sm:h-14 px-3 sm:px-4 rounded-2xl border text-right transition-all duration-150 cursor-pointer flex items-center justify-between gap-2 active:scale-[0.98] ${
                                  isSelected
                                    ? "bg-blue-50/90 border-2 border-brand-electric ring-2 ring-brand-electric/15 shadow-sm"
                                    : "bg-white border-slate-200/90 hover:border-blue-200 hover:bg-slate-50/50"
                                }`}
                              >
                                <div className="flex items-center gap-2 min-w-0">
                                  <div
                                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                                      isSelected
                                        ? "bg-brand-electric text-white"
                                        : "bg-slate-100 text-slate-600"
                                    }`}
                                  >
                                    <IconComp className="w-3.5 h-3.5" />
                                  </div>
                                  <strong
                                    className={`text-xs sm:text-sm font-bold leading-snug ${
                                      isSelected
                                        ? "text-brand-electric"
                                        : "text-brand-navy"
                                    }`}
                                  >
                                    {field.title}
                                  </strong>
                                </div>

                                <div
                                  className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                                    isSelected
                                      ? "bg-brand-electric text-white"
                                      : "border border-slate-300 bg-white"
                                  }`}
                                >
                                  {isSelected && (
                                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                                  )}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Step 2 Sleek Action Bar */}
                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                        <button
                          type="button"
                          onClick={() => goToStep(1)}
                          className="h-11 px-4 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 font-bold text-xs inline-flex items-center gap-1.5 whitespace-nowrap transition-colors cursor-pointer active:scale-95"
                        >
                          <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                          <span>السابق</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => goToStep(3)}
                          className="group h-11 px-6 rounded-xl bg-brand-navy hover:bg-brand-electric text-white font-bold text-xs sm:text-sm inline-flex items-center justify-center gap-2 whitespace-nowrap transition-all active:scale-[0.98] cursor-pointer shadow-sm"
                        >
                          <span>متابعة للخطوة 3</span>
                          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 shrink-0" />
                        </button>
                      </div>
                    </motion.div>
                  ) : step === 3 ? (
                    /* ======================================================= */
                    /* STEP 3: LANGUAGE, BUDGET & CONSULTATION MODE            */
                    /* ======================================================= */
                    <motion.div
                      key="step-3"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.22, ease: TRANSITION_EASE }}
                      className="space-y-5"
                    >
                      <h2 className="text-[17px] sm:text-2xl font-bold text-brand-navy leading-snug tracking-tight">
                        حدد مستوى اللغة، الميزانية وطريقة المواكبة
                      </h2>

                      {/* 3A: English Level — First 2 Side-by-Side (grid-cols-2), 3rd Advanced Full-Width (col-span-2) */}
                      <div className="space-y-2">
                        <label className="block text-xs font-bold text-slate-600">
                          1. مستواك في اللغة الإنجليزية:
                        </label>
                        <div className="grid grid-cols-2 gap-2.5">
                          {LANGUAGE_LEVELS.map((lvl) => {
                            const isSelected = englishLevel === lvl.id;
                            return (
                              <button
                                key={lvl.id}
                                type="button"
                                onClick={() => setEnglishLevel(lvl.id)}
                                className={`${
                                  lvl.fullWidth ? "col-span-2" : ""
                                } h-[52px] sm:h-14 px-3 sm:px-4 rounded-2xl border text-right transition-all duration-150 cursor-pointer flex items-center justify-between gap-2 active:scale-[0.98] ${
                                  isSelected
                                    ? "bg-blue-50/90 border-2 border-brand-electric ring-2 ring-brand-electric/15 shadow-sm"
                                    : "bg-slate-50/80 border-slate-200/90 hover:border-blue-200 hover:bg-white"
                                }`}
                              >
                                <div className="flex items-center gap-2 min-w-0">
                                  <span
                                    dir="ltr"
                                    className="px-2 py-0.5 rounded-md bg-blue-100/90 text-[11px] font-extrabold text-brand-electric shrink-0"
                                  >
                                    {lvl.tag}
                                  </span>
                                  <strong
                                    className={`text-xs sm:text-sm font-bold truncate ${
                                      isSelected
                                        ? "text-brand-electric"
                                        : "text-brand-navy"
                                    }`}
                                  >
                                    {lvl.title}
                                  </strong>
                                </div>

                                <div
                                  className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                                    isSelected
                                      ? "bg-brand-electric text-white"
                                      : "border border-slate-300 bg-white"
                                  }`}
                                >
                                  {isSelected && (
                                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                                  )}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* 3B: Annual Tuition Budget Range (2x2 Grid) */}
                      <div className="space-y-2">
                        <label className="block text-xs font-bold text-slate-600">
                          2. الميزانية السنوية التقريبية:
                        </label>
                        <div className="grid grid-cols-2 gap-2.5">
                          {BUDGET_RANGES.map((b) => {
                            const isSelected = budgetRange === b.id;
                            return (
                              <button
                                key={b.id}
                                type="button"
                                onClick={() => setBudgetRange(b.id)}
                                className={`h-12 sm:h-[52px] px-3 sm:px-4 rounded-2xl border text-right transition-all duration-150 cursor-pointer flex items-center justify-between gap-2 active:scale-[0.98] ${
                                  isSelected
                                    ? "bg-blue-50/90 border-2 border-brand-electric ring-2 ring-brand-electric/15 shadow-sm"
                                    : "bg-white border-slate-200/90 hover:border-blue-200 hover:bg-slate-50/50"
                                }`}
                              >
                                <strong
                                  className={`text-xs sm:text-sm font-bold leading-snug ${
                                    isSelected
                                      ? "text-brand-electric"
                                      : "text-brand-navy"
                                  }`}
                                >
                                  {b.title}
                                </strong>
                                <div
                                  className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                                    isSelected
                                      ? "bg-brand-electric text-white"
                                      : "border border-slate-300 bg-white"
                                  }`}
                                >
                                  {isSelected && (
                                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                                  )}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* 3C: Country-Adaptive Consultation Mode */}
                      <div className="space-y-2">
                        <label className="block text-xs font-bold text-slate-600">
                          3. طريقة الاستشارة والمواكبة:
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {currentConsultModes.map((mode) => {
                            const isSelected = consultMode === mode.id;
                            const IconComp = mode.icon;
                            return (
                              <button
                                key={mode.id}
                                type="button"
                                onClick={() => setConsultMode(mode.id)}
                                className={`h-[52px] sm:h-14 px-3.5 sm:px-4 rounded-2xl border text-right transition-all duration-150 cursor-pointer flex items-center justify-between gap-2.5 active:scale-[0.99] ${
                                  isSelected
                                    ? "bg-blue-50/90 border-2 border-brand-electric ring-2 ring-brand-electric/15 shadow-sm"
                                    : "bg-slate-50/80 border-slate-200/90 hover:border-blue-200 hover:bg-white"
                                }`}
                              >
                                <div className="flex items-center gap-2.5 min-w-0">
                                  <div
                                    className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                                      isSelected
                                        ? "bg-brand-electric text-white"
                                        : "bg-white border border-slate-200 text-brand-navy"
                                    }`}
                                  >
                                    <IconComp className="w-4 h-4" />
                                  </div>
                                  <strong
                                    className={`text-xs sm:text-sm font-bold leading-snug ${
                                      isSelected
                                        ? "text-brand-electric"
                                        : "text-brand-navy"
                                    }`}
                                  >
                                    {mode.title}
                                  </strong>
                                </div>

                                <div
                                  className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center shrink-0 ${
                                    isSelected
                                      ? "bg-brand-electric text-white"
                                      : "border border-slate-300 bg-white"
                                  }`}
                                >
                                  {isSelected && (
                                    <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-[3]" />
                                  )}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Step 3 Sleek Action Bar */}
                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                        <button
                          type="button"
                          onClick={() => goToStep(2)}
                          className="h-11 px-4 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 font-bold text-xs inline-flex items-center gap-1.5 whitespace-nowrap transition-colors cursor-pointer active:scale-95"
                        >
                          <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                          <span>السابق</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => goToStep(4)}
                          className="group h-11 px-6 rounded-xl bg-brand-navy hover:bg-brand-electric text-white font-bold text-xs sm:text-sm inline-flex items-center justify-center gap-2 whitespace-nowrap transition-all active:scale-[0.98] cursor-pointer shadow-sm"
                        >
                          <span>متابعة لتأكيد الملف</span>
                          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 shrink-0" />
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    /* ======================================================= */
                    /* STEP 4: CONTACT DETAILS & DIRECT WHATSAPP SUBMISSION    */
                    /* ======================================================= */
                    <motion.div
                      key="step-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.22, ease: TRANSITION_EASE }}
                    >
                      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                        <h2 className="text-[17px] sm:text-2xl font-bold text-brand-navy leading-snug tracking-tight">
                          أدخل معلومات التواصل لإرسال ملفك عبر واتساب
                        </h2>

                        {/* Live Selection Recap Box */}
                        <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-200/80 space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5 text-xs font-bold text-brand-navy">
                              <Sparkles className="w-3.5 h-3.5 text-brand-electric shrink-0" />
                              <span>ملخص ملفك</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => goToStep(1)}
                              className="text-[11px] font-bold text-brand-electric hover:underline cursor-pointer whitespace-nowrap"
                            >
                              تعديل الاختيارات
                            </button>
                          </div>

                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                            <div className="p-2.5 rounded-xl bg-white border border-slate-200/80">
                              <span className="block text-[10px] text-slate-500 font-medium">
                                الوجهة
                              </span>
                              <div className="flex items-center gap-1.5 mt-0.5">
                                <CountryFlag
                                  code={selectedDestinationObj.id}
                                  size="sm"
                                />
                                <strong className="text-brand-navy font-bold text-xs truncate">
                                  {selectedDestinationObj.name}
                                </strong>
                              </div>
                            </div>

                            <div className="p-2.5 rounded-xl bg-white border border-slate-200/80">
                              <span className="block text-[10px] text-slate-500 font-medium">
                                التخصص
                              </span>
                              <strong className="block text-brand-navy font-bold text-xs truncate mt-0.5">
                                {selectedFieldObj.title}
                              </strong>
                            </div>

                            <div className="p-2.5 rounded-xl bg-white border border-slate-200/80 col-span-2 sm:col-span-1">
                              <span className="block text-[10px] text-slate-500 font-medium">
                                بلد الإقامة
                              </span>
                              <div className="flex items-center gap-1.5 mt-0.5">
                                <CountryFlag
                                  code={studentCountry === "ma" ? "MA" : "DZ"}
                                  size="sm"
                                />
                                <strong className="text-brand-navy font-bold text-xs truncate">
                                  {studentCountry === "ma"
                                    ? "المغرب"
                                    : "الجزائر"}{" "}
                                  ({selectedLangObj.tag})
                                </strong>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Form Inputs */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                          <div>
                            <label className="block text-xs font-bold text-slate-600 mb-1.5">
                              الاسم الكامل للطالب(ة){" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
                                <User className="w-4 h-4" />
                              </div>
                              <input
                                type="text"
                                required
                                autoComplete="name"
                                placeholder="مثال: أمين بنعلي"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="select-text w-full pr-10 pl-3.5 py-2.5 sm:py-3 bg-slate-50/90 border border-slate-200/90 rounded-xl sm:rounded-2xl text-sm text-brand-navy placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand-electric/10 focus:border-brand-electric transition-all shadow-sm"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-slate-600 mb-1.5">
                              رقم الهاتف (واتساب){" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
                                <Phone className="w-4 h-4" />
                              </div>
                              <input
                                type="tel"
                                required
                                autoComplete="tel"
                                placeholder={
                                  studentCountry === "ma"
                                    ? "06XX-XXXXXX"
                                    : "05XX-XXXXXX / +213..."
                                }
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                dir="ltr"
                                className="select-text w-full pr-10 pl-3.5 py-2.5 sm:py-3 bg-slate-50/90 border border-slate-200/90 rounded-xl sm:rounded-2xl text-sm text-brand-navy placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand-electric/10 focus:border-brand-electric transition-all shadow-sm text-right"
                              />
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-600 mb-1.5">
                            {studentCountry === "ma"
                              ? "المدينة الحالية في المغرب"
                              : "الولاية / المدينة في الجزائر"}{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
                              <MapPin className="w-4 h-4" />
                            </div>
                            <input
                              type="text"
                              required
                              autoComplete="address-level2"
                              placeholder={
                                studentCountry === "ma"
                                  ? "أكادير، الدار البيضاء، الرباط، مراكش..."
                                  : "الجزائر العاصمة، وهران، قسنطينة، سطيف..."
                              }
                              value={studentCity}
                              onChange={(e) => setStudentCity(e.target.value)}
                              className="select-text w-full pr-10 pl-3.5 py-2.5 sm:py-3 bg-slate-50/90 border border-slate-200/90 rounded-xl sm:rounded-2xl text-sm text-brand-navy placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand-electric/10 focus:border-brand-electric transition-all shadow-sm"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-600 mb-1.5">
                            سؤال أو ملاحظة إضافية للمستشار (اختياري)
                          </label>
                          <textarea
                            rows={2}
                            placeholder="اكتب أي استفسار حول التخصص، المنح أو الإجراءات..."
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            className="select-text w-full px-3.5 py-2.5 bg-slate-50/90 border border-slate-200/90 rounded-xl sm:rounded-2xl text-sm text-brand-navy placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand-electric/10 focus:border-brand-electric transition-all resize-none shadow-sm"
                          />
                        </div>

                        {/* Step 4 Sleek Single-Line Action Bar */}
                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2.5">
                          <button
                            type="button"
                            onClick={() => goToStep(3)}
                            className="h-11 px-4 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 font-bold text-xs inline-flex items-center gap-1.5 whitespace-nowrap transition-colors cursor-pointer active:scale-95 shrink-0"
                          >
                            <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                            <span>السابق</span>
                          </button>

                          <button
                            type="submit"
                            className="group h-11 px-5 sm:px-7 rounded-xl bg-brand-electric hover:bg-brand-navy text-white font-bold text-xs sm:text-sm shadow-md shadow-brand-electric/20 inline-flex items-center justify-center gap-2 whitespace-nowrap active:scale-[0.98] transition-all cursor-pointer"
                          >
                            <MessageCircle className="w-4 h-4 shrink-0" />
                            <span>إرسال الملف عبر واتساب</span>
                            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 shrink-0" />
                          </button>
                        </div>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* ============================================================= */}
            {/* LEFT COLUMN (5 Cols): STICKY AUTHORITY & GOOGLE MAPS SIDEBAR  */}
            {/* ============================================================= */}
            <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
              {/* Card 1: Concise Founders & 3 Direct Guarantees */}
              <div className="apple-glass rounded-3xl border border-slate-200/90 p-4 sm:p-6 shadow-[0_16px_40px_-12px_rgba(11,27,61,0.07)] space-y-3.5">
                {/* Founders Identity Row */}
                <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                  <div className="flex -space-x-2 space-x-reverse overflow-hidden shrink-0">
                    {FOUNDERS.map((f) => (
                      <SmoothAvatar key={f.name} src={f.image} alt={f.name} />
                    ))}
                  </div>
                  <div className="min-w-0">
                    <strong className="text-xs sm:text-[13px] font-bold text-brand-navy block truncate">
                      فريق M&A Overseas Consulting
                    </strong>
                    <span className="text-[11px] text-slate-500 font-medium block truncate">
                      مرافقة شخصية مباشرة بدون وسطاء
                    </span>
                  </div>
                </div>

                {/* Live Interactive Selection Tracker */}
                <div className="p-3 rounded-2xl bg-blue-50/60 border border-blue-200/75 space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-bold text-brand-navy">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-brand-electric shrink-0" />
                      <span>اختياراتك الحالية</span>
                    </span>
                    <span className="text-[10px] text-brand-electric font-bold whitespace-nowrap">
                      تحديث تلقائي
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div className="p-2 rounded-xl bg-white border border-slate-200/80 flex items-center gap-1.5 min-w-0">
                      <CountryFlag
                        code={studentCountry === "ma" ? "MA" : "DZ"}
                        size="sm"
                      />
                      <span className="font-bold text-brand-navy truncate">
                        {studentCountry === "ma" ? "المغرب" : "الجزائر"}
                      </span>
                    </div>

                    <div className="p-2 rounded-xl bg-white border border-slate-200/80 flex items-center gap-1.5 min-w-0">
                      <CountryFlag code={selectedDestinationObj.id} size="sm" />
                      <span className="font-bold text-brand-navy truncate">
                        {selectedDestinationObj.name}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 3 Concise Zero-Fluff Guarantee Pills */}
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2.5 p-2.5 rounded-2xl bg-slate-50/90 border border-slate-200/70">
                    <div className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-100 text-brand-electric flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-3.5 h-3.5" />
                    </div>
                    <strong className="text-brand-navy font-bold text-xs">
                      قبول جامعي رسمي مضمون 100%
                    </strong>
                  </div>

                  <div className="flex items-center gap-2.5 p-2.5 rounded-2xl bg-slate-50/90 border border-slate-200/70">
                    <div className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-100 text-brand-electric flex items-center justify-center shrink-0">
                      <Award className="w-3.5 h-3.5" />
                    </div>
                    <strong className="text-brand-navy font-bold text-xs">
                      إعداد احترافي لملف التأشيرة والمنح
                    </strong>
                  </div>

                  <div className="flex items-center gap-2.5 p-2.5 rounded-2xl bg-slate-50/90 border border-slate-200/70">
                    <div className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-100 text-brand-electric flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <strong className="text-brand-navy font-bold text-xs">
                      استقبال في المطار وتأمين السكن الجامعي
                    </strong>
                  </div>
                </div>
              </div>

              {/* Card 2: Official Google Maps Location Card (Agadir - Inzegane) */}
              <div className="rounded-3xl border border-slate-200/90 bg-white p-1.5 shadow-[0_16px_40px_-12px_rgba(11,27,61,0.08)] overflow-hidden relative">
                <div className="relative w-full h-[250px] sm:h-[265px] rounded-[20px] overflow-hidden bg-slate-100">
                  {/* Top-Right Floating Pill Badge */}
                  <a
                    href="https://maps.app.goo.gl/BuLbU3tDXHJ3aFes7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-3 right-3 z-10 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-md text-[11px] sm:text-xs font-bold text-brand-navy hover:text-brand-electric transition-colors active:scale-95 whitespace-nowrap"
                  >
                    <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                    <span>مقرنا الرئيسي بأكادير (إنزكان)</span>
                  </a>

                  {/* Interactive Google Map Embed for Overseas Consulting للدراسة في الخارج */}
                  <iframe
                    title="مقر M&A Overseas Consulting الرسمي على خرائط جوجل"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3441.879!2d-9.5358084!3d30.3625172!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdb3c7105accf743%3A0x28765ffbea4a762c!2zT3ZlcnNlYXMgQ29uc3VsdGluZyDZhNmE2K_Ysdin2LPYqSDZgdmKIOG7p9mE2K7Yp9ix2Kw!5e0!3m2!1sar!2sma!4v1729500000000!5m2!1sar!2sma"
                    className="w-full h-full border-0"
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* =================================================================== */}
      {/* 3. MINIMALIST APPLICATION FOOTER                                    */}
      {/* =================================================================== */}
      <footer className="bg-white/85 border-t border-slate-200/80 py-5 text-xs text-slate-500 relative z-10 mt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-right">
          <p className="font-medium">
            © {new Date().getFullYear()} M&A Overseas Consulting. جميع الحقوق
            محفوظة.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 text-slate-500 font-medium">
            <span className="text-brand-navy font-bold">
              أكادير - إنزكان (شارع مراكش)
            </span>
            <span className="text-slate-300">·</span>
            <span>فيلنيوس (ليتوانيا - المكتب الأوروبي)</span>
            <span className="text-slate-300">·</span>
            <a
              href="https://www.instagram.com/overseas_consulting_"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-electric hover:underline font-bold"
            >
              @overseas_consulting_
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
