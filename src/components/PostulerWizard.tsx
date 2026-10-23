"use client";

import React, { useState, useEffect, useCallback, useRef, memo, useMemo } from "react";
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
  Award,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Copy,
  RotateCcw,
  Globe,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const TRANSITION_EASE = [0.22, 1, 0.36, 1] as const;

type StudentCountry = "ma" | "other";

type AdvisorId = "karima" | "marouane" | "salma";

// Dedicated WhatsApp Advisors (Step 5 Choice for Student/Parent Comfort)
const RAW_ADVISORS: {
  id: AdvisorId;
  nameAr: string;
  nameEn: string;
  fullTitleAr: string;
  fullTitleEn: string;
  greetingTitleAr: string;
  greetingTitleEn: string;
  rawPhone: string;
}[] = [
  {
    id: "karima",
    nameAr: "كريمة",
    nameEn: "Karima",
    fullTitleAr: "المستشارة كريمة",
    fullTitleEn: "Advisor Karima",
    greetingTitleAr: "أستاذة كريمة",
    greetingTitleEn: "Ms. Karima",
    rawPhone: "212709680036",
  },
  {
    id: "marouane",
    nameAr: "مروان",
    nameEn: "Marouane",
    fullTitleAr: "المستشار مروان",
    fullTitleEn: "Advisor Marouane",
    greetingTitleAr: "أستاذ مروان",
    greetingTitleEn: "Mr. Marouane",
    rawPhone: "37066059704",
  },
  {
    id: "salma",
    nameAr: "سلمى",
    nameEn: "Salma",
    fullTitleAr: "المستشارة سلمى",
    fullTitleEn: "Advisor Salma",
    greetingTitleAr: "أستاذة سلمى",
    greetingTitleEn: "Ms. Salma",
    rawPhone: "212775496303",
  },
];

const RAW_FOUNDERS = [
  { nameAr: "علي بنعمر", nameEn: "Ali Benamar", image: "/team/ali_benamar.jpg" },
  {
    nameAr: "محمد أمين جابون",
    nameEn: "M'Amine Jaboune",
    image: "/team/amine_jaboune.jpg",
  },
  {
    nameAr: "مروان بنعمر",
    nameEn: "Marouan Ben Amar",
    image: "/team/marouan_ben_amar.jpg",
  },
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
    <div className="relative w-9 h-9 rounded-full overflow-hidden border-2 border-white bg-slate-100 shadow-sm shrink-0">
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

// Crisp SVG Country Flags (Morocco, International Globe + 7 European Study Destinations)
const CountryFlag = memo(function CountryFlag({
  code,
  size = "md",
}: {
  code: string;
  size?: "sm" | "md" | "lg";
}) {
  if (code === "UNDECIDED") {
    return null;
  }

  const sizeClasses =
    size === "lg"
      ? "w-6 h-6 sm:w-7 sm:h-7"
      : size === "md"
      ? "w-5 h-5 sm:w-6 sm:h-6"
      : "w-4 h-4";

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
      case "OTHER": // International Globe Icon for "بلد آخر"
        return (
          <svg viewBox="0 0 24 24" className="w-full h-full">
            <rect width="24" height="24" fill="#EFF6FF" />
            <circle
              cx="12"
              cy="12"
              r="7.2"
              fill="none"
              stroke="#2563EB"
              strokeWidth="1.5"
            />
            <ellipse
              cx="12"
              cy="12"
              rx="3.4"
              ry="7.2"
              fill="none"
              stroke="#2563EB"
              strokeWidth="1.3"
            />
            <line
              x1="4.8"
              y1="12"
              x2="19.2"
              y2="12"
              stroke="#2563EB"
              strokeWidth="1.3"
            />
            <line
              x1="6"
              y1="8.8"
              x2="18"
              y2="8.8"
              stroke="#2563EB"
              strokeWidth="1.1"
            />
            <line
              x1="6"
              y1="15.2"
              x2="18"
              y2="15.2"
              stroke="#2563EB"
              strokeWidth="1.1"
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

const RAW_DESTINATIONS = [
  { id: "LT", nameAr: "ليتوانيا", nameEn: "Lithuania", fullWidth: false },
  { id: "RO", nameAr: "رومانيا", nameEn: "Romania", fullWidth: false },
  { id: "IT", nameAr: "إيطاليا", nameEn: "Italy", fullWidth: false },
  { id: "ES", nameAr: "إسبانيا", nameEn: "Spain", fullWidth: false },
  { id: "HU", nameAr: "المجر", nameEn: "Hungary", fullWidth: false },
  { id: "IE", nameAr: "أيرلندا", nameEn: "Ireland", fullWidth: false },
  { id: "MT", nameAr: "مالطا", nameEn: "Malta", fullWidth: true },
  {
    id: "UNDECIDED",
    nameAr: "لم أحدد الوجهة بعد — وجّهوني للأفضل",
    nameEn: "Undecided Yet — Guide Me to the Best Fit",
    fullWidth: true,
  },
];

const RAW_STUDY_LEVELS = [
  {
    id: "bac",
    titleAr: "مرحلة البكالوريا / الثانوية العامة (حاليًا أو حاصل عليها)",
    titleEn: "High School / Baccalaureate (Current Student or Graduate)",
    shortTitleAr: "بكالوريا / ثانوية عامة",
    shortTitleEn: "High School / Baccalaureate",
  },
  {
    id: "higher",
    titleAr: "طالب جامعي (Bac+2 / إجازة / بكالوريوس)",
    titleEn: "University Student (Associate / Bachelor's Degree)",
    shortTitleAr: "طالب جامعي / دبلوم عالي",
    shortTitleEn: "University / Higher Degree",
  },
];

const RAW_BAC_STREAMS_BY_COUNTRY: Record<
  StudentCountry,
  Array<{ id: string; labelAr: string; labelEn: string }>
> = {
  ma: [
    {
      id: "pc_svt",
      labelAr: "علوم فيزيائية / SVT",
      labelEn: "Physical / Life & Earth Sciences (PC / SVT)",
    },
    {
      id: "sm_tech",
      labelAr: "علوم رياضية أو تقنية",
      labelEn: "Mathematical or Technical Sciences",
    },
    {
      id: "eco",
      labelAr: "علوم اقتصادية وتدبير",
      labelEn: "Economics & Management Sciences",
    },
    {
      id: "lettres",
      labelAr: "آداب وعلوم إنسانية",
      labelEn: "Literature & Humanities",
    },
  ],
  other: [
    {
      id: "intl_sci",
      labelAr: "المسار العلمي (علوم / رياضيات)",
      labelEn: "Scientific Track (STEM / Math & Sciences)",
    },
    {
      id: "intl_eco",
      labelAr: "اقتصاد وإدارة أعمال",
      labelEn: "Economics & Business Track",
    },
    {
      id: "intl_lettres",
      labelAr: "آداب، لغات وعلوم إنسانية",
      labelEn: "Literature, Languages & Humanities",
    },
    {
      id: "intl_tech",
      labelAr: "مسار تقني / تكنولوجي أو شهادة دولية",
      labelEn: "Technical Track or International Diploma (IB / A-Levels)",
    },
  ],
};

const RAW_BAC_YEARS = [
  { id: "this_year", labelAr: "هذه السنة", labelEn: "This Year" },
  { id: "last_year", labelAr: "السنة الفائتة", labelEn: "Last Year" },
  { id: "two_years_ago", labelAr: "قبل سنتين", labelEn: "2 Years Ago" },
  {
    id: "more_than_two",
    labelAr: "أكثر من سنتين",
    labelEn: "Over 2 Years Ago",
  },
];

const RAW_TARGET_FIELDS = [
  {
    id: "eng_it",
    titleAr: "الهندسة، المعلوميات و AI",
    titleEn: "Engineering, Computer Science & AI",
    fullWidth: false,
  },
  {
    id: "med_health",
    titleAr: "الطب، الصيدلة وعلوم الصحة",
    titleEn: "Medicine, Pharmacy & Health Sciences",
    fullWidth: false,
  },
  {
    id: "business",
    titleAr: "إدارة الأعمال والتجارة",
    titleEn: "Business Administration & Management",
    fullWidth: false,
  },
  {
    id: "prep_lang",
    titleAr: "السنة التحضيرية للغة",
    titleEn: "English Foundation / Preparatory Year",
    fullWidth: false,
  },
  {
    id: "other_field",
    titleAr: "تخصص آخر / أحتاج مساعدة للاختيار",
    titleEn: "Other Major / Need Academic Guidance",
    fullWidth: true,
  },
];

const RAW_LANGUAGE_LEVELS = [
  {
    id: "beginner",
    tag: "A1 - A2",
    titleAr: "مستوى مبتدئ (A1 - A2)",
    titleEn: "Beginner Level (A1 - A2)",
    fullWidth: false,
  },
  {
    id: "intermediate",
    tag: "B1 - B2",
    titleAr: "متوسط إلى جيد (B1 - B2)",
    titleEn: "Intermediate to Good (B1 - B2)",
    fullWidth: false,
  },
  {
    id: "advanced",
    tag: "B2+ / IELTS",
    titleAr: "مستوى متقدم (B2+ / IELTS) — جاهز للقبول المباشر",
    titleEn: "Advanced (B2+ / IELTS) — Ready for Direct Admission",
    fullWidth: true,
  },
];

const RAW_BUDGET_RANGES = [
  {
    id: "eco",
    titleAr: "2,500€ - 4,000€ سنوياً",
    titleEn: "€2,500 – €4,000 / year",
  },
  {
    id: "mid",
    titleAr: "4,000€ - 6,000€ سنوياً",
    titleEn: "€4,000 – €6,000 / year",
  },
  { id: "plus", titleAr: "+6,000€ سنوياً", titleEn: "€6,000+ / year" },
  {
    id: "advice",
    titleAr: "مناقشة التكاليف والمنح",
    titleEn: "Discuss Tuition & Scholarships",
  },
];

const RAW_CONSULT_MODES_BY_COUNTRY: Record<
  StudentCountry,
  Array<{ id: string; titleAr: string; titleEn: string }>
> = {
  ma: [
    {
      id: "office_agadir",
      titleAr: "حضورياً في مقر أكادير (إنزكان)",
      titleEn: "In-Person at Agadir HQ (Inezgane)",
    },
    {
      id: "remote_ma",
      titleAr: "عن بُعد عبر واتساب (جميع المدن)",
      titleEn: "Remote via WhatsApp (All Cities)",
    },
  ],
  other: [
    {
      id: "remote_intl_full",
      titleAr: "استشارة ومواكبة شاملة عن بُعد (عبر واتساب)",
      titleEn: "Full Remote Consultation & Support (via WhatsApp)",
    },
    {
      id: "remote_intl_eu",
      titleAr: "توجيه مباشر مع مكتبنا في أوروبا",
      titleEn: "Direct Guidance with Our European Office",
    },
  ],
};

const RAW_STEP_META = [
  {
    number: 1,
    titleAr: "البلد والوجهة الدراسية",
    titleEn: "Country & Study Destination",
  },
  {
    number: 2,
    titleAr: "المستوى والتخصص",
    titleEn: "Academic Level & Major",
  },
  {
    number: 3,
    titleAr: "اللغة والميزانية",
    titleEn: "Language & Tuition Budget",
  },
  {
    number: 4,
    titleAr: "المعلومات الشخصية",
    titleEn: "Personal Information",
  },
  {
    number: 5,
    titleAr: "اختيار المستشار والإرسال",
    titleEn: "Select Advisor & Submit",
  },
];

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3v6Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function PostulerWizard() {
  const { isRTL, toggleLanguage } = useLanguage();
  const [step, setStep] = useState<number>(1);
  const [isLogoLoaded, setIsLogoLoaded] = useState<boolean>(false);

  // Localized dictionaries mapped dynamically to active language
  const ADVISORS = useMemo(
    () =>
      RAW_ADVISORS.map((a) => ({
        id: a.id,
        name: isRTL ? a.nameAr : a.nameEn,
        fullTitle: isRTL ? a.fullTitleAr : a.fullTitleEn,
        greetingTitle: isRTL ? a.greetingTitleAr : a.greetingTitleEn,
        rawPhone: a.rawPhone,
      })),
    [isRTL]
  );

  const FOUNDERS = useMemo(
    () =>
      RAW_FOUNDERS.map((f) => ({
        name: isRTL ? f.nameAr : f.nameEn,
        image: f.image,
      })),
    [isRTL]
  );

  const DESTINATIONS = useMemo(
    () =>
      RAW_DESTINATIONS.map((d) => ({
        id: d.id,
        name: isRTL ? d.nameAr : d.nameEn,
        fullWidth: d.fullWidth,
      })),
    [isRTL]
  );

  const STUDY_LEVELS = useMemo(
    () =>
      RAW_STUDY_LEVELS.map((l) => ({
        id: l.id,
        title: isRTL ? l.titleAr : l.titleEn,
        shortTitle: isRTL ? l.shortTitleAr : l.shortTitleEn,
      })),
    [isRTL]
  );

  const BAC_STREAMS_BY_COUNTRY = useMemo(
    () => ({
      ma: RAW_BAC_STREAMS_BY_COUNTRY.ma.map((s) => ({
        id: s.id,
        label: isRTL ? s.labelAr : s.labelEn,
      })),
      other: RAW_BAC_STREAMS_BY_COUNTRY.other.map((s) => ({
        id: s.id,
        label: isRTL ? s.labelAr : s.labelEn,
      })),
    }),
    [isRTL]
  );

  const BAC_YEARS = useMemo(
    () =>
      RAW_BAC_YEARS.map((y) => ({
        id: y.id,
        label: isRTL ? y.labelAr : y.labelEn,
      })),
    [isRTL]
  );

  const TARGET_FIELDS = useMemo(
    () =>
      RAW_TARGET_FIELDS.map((f) => ({
        id: f.id,
        title: isRTL ? f.titleAr : f.titleEn,
        fullWidth: f.fullWidth,
      })),
    [isRTL]
  );

  const LANGUAGE_LEVELS = useMemo(
    () =>
      RAW_LANGUAGE_LEVELS.map((l) => ({
        id: l.id,
        tag: l.tag,
        title: isRTL ? l.titleAr : l.titleEn,
        fullWidth: l.fullWidth,
      })),
    [isRTL]
  );

  const BUDGET_RANGES = useMemo(
    () =>
      RAW_BUDGET_RANGES.map((b) => ({
        id: b.id,
        title: isRTL ? b.titleAr : b.titleEn,
      })),
    [isRTL]
  );

  const CONSULT_MODES_BY_COUNTRY = useMemo(
    () => ({
      ma: RAW_CONSULT_MODES_BY_COUNTRY.ma.map((c) => ({
        id: c.id,
        title: isRTL ? c.titleAr : c.titleEn,
      })),
      other: RAW_CONSULT_MODES_BY_COUNTRY.other.map((c) => ({
        id: c.id,
        title: isRTL ? c.titleAr : c.titleEn,
      })),
    }),
    [isRTL]
  );

  const STEP_META = useMemo(
    () =>
      RAW_STEP_META.map((s) => ({
        number: s.number,
        title: isRTL ? s.titleAr : s.titleEn,
      })),
    [isRTL]
  );

  // Step 1 State
  const [studentCountry, setStudentCountry] = useState<StudentCountry>("ma");
  const [destination, setDestination] = useState<string>("LT");

  // Step 2 State
  const [studyLevel, setStudyLevel] = useState<string>("bac");
  const [bacStream, setBacStream] = useState<string>("pc_svt");
  const [bacYear, setBacYear] = useState<string>("this_year");
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

  // Step 5 State (Selected Advisor)
  const [selectedAdvisorId, setSelectedAdvisorId] =
    useState<AdvisorId>("karima");

  // Submission / Confirmation State
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [generatedWhatsappUrl, setGeneratedWhatsappUrl] = useState<string>("");
  const [generatedMessageText, setGeneratedMessageText] = useState<string>("");
  const [copiedRequest, setCopiedRequest] = useState<boolean>(false);
  const copyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Read optional query parameters on mount (e.g. ?destination=RO or ?country=other)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const destParam = params.get("destination")?.toUpperCase();
    if (destParam && RAW_DESTINATIONS.some((d) => d.id === destParam)) {
      setDestination(destParam);
    }
    const countryParam = params.get("country")?.toLowerCase();
    if (
      countryParam === "other" ||
      countryParam === "dz" ||
      countryParam === "algeria"
    ) {
      setStudentCountry("other");
      setBacStream("intl_sci");
      setConsultMode("remote_intl_full");
    }
    return () => {
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
    };
  }, []);

  // Synchronize country-specific defaults when switching between Morocco and Other Countries
  const handleSelectCountry = useCallback((country: StudentCountry) => {
    setStudentCountry(country);
    if (country === "ma") {
      setBacStream((prev) => (prev.startsWith("intl_") ? "pc_svt" : prev));
      setConsultMode((prev) =>
        prev.startsWith("remote_intl") ? "remote_ma" : prev
      );
    } else {
      setBacStream((prev) => (!prev.startsWith("intl_") ? "intl_sci" : prev));
      setConsultMode((prev) =>
        !prev.startsWith("remote_intl") ? "remote_intl_full" : prev
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
  const selectedAdvisorObj =
    ADVISORS.find((a) => a.id === selectedAdvisorId) || ADVISORS[0];

  const handleStep4Next = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || !studentCity.trim()) {
      return;
    }
    goToStep(5);
  };

  const buildWhatsappPayload = useCallback(
    (refCode: string) => {
      const cleanName = fullName.trim();
      const cleanPhone = phone.trim();
      const cleanCity = studentCity.trim();
      const cleanNotes = notes.trim();

      const locationSummary = isRTL
        ? studentCountry === "ma"
          ? `المغرب 🇲🇦 (${cleanCity})`
          : `${cleanCity} 🌍`
        : studentCountry === "ma"
        ? `Morocco 🇲🇦 (${cleanCity})`
        : `${cleanCity} 🌍`;

      const messageLines = isRTL
        ? [
            `السلام عليكم ${selectedAdvisorObj.greetingTitle} (فريق M&A Overseas Consulting)،`,
            `أود تقديم طلب استشارة وتوجيه للدراسة في أوروبا (رقم المرجع: ${refCode}):`,
            ``,
            `• الطالب(ة): ${cleanName}`,
            `• البلد والمدينة: ${locationSummary}`,
            `• رقم الهاتف: ${cleanPhone}`,
            `• الوجهة المفضلة: ${selectedDestinationObj.name}`,
            `• المستوى الدراسي: ${selectedStudyLevelObj.title}`,
            `• المسار وسنة الشهادة: ${selectedStreamObj.label} (${selectedYearObj.label})`,
            `• التخصص المطلوب: ${selectedFieldObj.title}`,
            `• مستوى اللغة: ${selectedLangObj.title}`,
            `• الميزانية التقريبية: ${selectedBudgetObj.title}`,
            `• طريقة المواكبة: ${selectedConsultObj.title}`,
          ]
        : [
            `Hello ${selectedAdvisorObj.greetingTitle} (M&A Overseas Consulting Team),`,
            `I would like to request an admissions consultation to study in Europe (Ref: ${refCode}):`,
            ``,
            `• Student Name: ${cleanName}`,
            `• Country & City: ${locationSummary}`,
            `• Phone / WhatsApp: ${cleanPhone}`,
            `• Preferred Destination: ${selectedDestinationObj.name}`,
            `• Academic Level: ${selectedStudyLevelObj.title}`,
            `• Track & Graduation Year: ${selectedStreamObj.label} (${selectedYearObj.label})`,
            `• Target Major: ${selectedFieldObj.title}`,
            `• English Proficiency: ${selectedLangObj.title}`,
            `• Estimated Tuition Budget: ${selectedBudgetObj.title}`,
            `• Consultation Mode: ${selectedConsultObj.title}`,
          ];

      if (cleanNotes) {
        messageLines.push(
          isRTL
            ? `• ملاحظة إضافية: ${cleanNotes}`
            : `• Additional Notes: ${cleanNotes}`
        );
      }

      messageLines.push(
        ``,
        isRTL
          ? `أرغب في تحديد موعد جلسة التوجيه المجانية ومناقشة الخطوات القادمة.`
          : `I would like to schedule my free orientation session and discuss the next steps.`
      );

      const fullText = messageLines.join("\n");
      const whatsappUrl = `https://wa.me/${selectedAdvisorObj.rawPhone}?text=${encodeURIComponent(
        fullText
      )}`;

      return { fullText, whatsappUrl };
    },
    [
      fullName,
      phone,
      studentCity,
      notes,
      isRTL,
      studentCountry,
      selectedAdvisorObj,
      selectedDestinationObj,
      selectedStudyLevelObj,
      selectedStreamObj,
      selectedYearObj,
      selectedFieldObj,
      selectedLangObj,
      selectedBudgetObj,
      selectedConsultObj,
    ]
  );

  // Keep confirmation message & WhatsApp URL synchronized if user switches language on the confirmation screen
  useEffect(() => {
    if (!submittedRef) return;
    const { fullText, whatsappUrl } = buildWhatsappPayload(submittedRef);
    setGeneratedMessageText(fullText);
    setGeneratedWhatsappUrl(whatsappUrl);
  }, [submittedRef, buildWhatsappPayload]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const cleanName = fullName.trim();
    const cleanPhone = phone.trim();
    const cleanCity = studentCity.trim();

    if (!cleanName || !cleanPhone || !cleanCity) {
      goToStep(4);
      return;
    }

    const year = new Date().getFullYear();
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const refPrefix = studentCountry === "ma" ? "MA" : "INTL";
    const refCode = `MA-${refPrefix}-${year}-${randomDigits}`;

    const { fullText, whatsappUrl } = buildWhatsappPayload(refCode);

    setGeneratedMessageText(fullText);
    setGeneratedWhatsappUrl(whatsappUrl);
    setSubmittedRef(refCode);

    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    // Trigger anchor click to open WhatsApp cleanly in a new tab
    const tempAnchor = document.createElement("a");
    tempAnchor.href = whatsappUrl;
    tempAnchor.target = "_blank";
    tempAnchor.rel = "noopener noreferrer";
    document.body.appendChild(tempAnchor);
    tempAnchor.click();
    document.body.removeChild(tempAnchor);
  };

  const handleCopyRequest = useCallback(async () => {
    if (!generatedMessageText || typeof navigator === "undefined") return;
    try {
      await navigator.clipboard?.writeText(generatedMessageText);
    } catch {
      // Fallback for restricted clipboard contexts
      const textarea = document.createElement("textarea");
      textarea.value = generatedMessageText;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    setCopiedRequest(true);
    if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
    copyTimerRef.current = setTimeout(() => setCopiedRequest(false), 2500);
  }, [generatedMessageText]);

  const cardTextAlign = isRTL ? "text-right" : "text-left";
  const inputIconPos = isRTL ? "right-0 pr-3.5" : "left-0 pl-3.5";
  const inputPadding = isRTL ? "pr-10 pl-4" : "pl-10 pr-4";

  return (
    <div
      dir={isRTL ? "rtl" : "ltr"}
      className="min-h-screen flex flex-col font-sans text-brand-navy relative overflow-x-clip select-none"
    >
      {/* =================================================================== */}
      {/* 1. DISTRACTION-FREE STICKY APPLICATION HEADER                       */}
      {/* =================================================================== */}
      <header className="sticky top-0 z-40 bg-white/95 md:backdrop-blur-md border-b border-slate-200/80 h-16 sm:h-[68px] flex items-center shadow-sm transform-gpu">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between relative">
          {/* Start: Back to Home Button */}
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-600 hover:text-brand-electric transition-colors py-2 px-2.5 sm:px-3 rounded-full hover:bg-slate-100/80 active:scale-95"
          >
            {isRTL ? (
              <ArrowRight className="w-4 h-4 text-brand-electric shrink-0" />
            ) : (
              <ArrowLeft className="w-4 h-4 text-brand-electric shrink-0" />
            )}
            <span className="whitespace-nowrap sm:hidden">
              {isRTL ? "الرئيسية" : "Home"}
            </span>
            <span className="whitespace-nowrap hidden sm:inline">
              {isRTL ? "العودة للرئيسية" : "Back to Home"}
            </span>
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

          {/* End: Language Toggle + Direct WhatsApp Support Capsule */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            <button
              type="button"
              dir="ltr"
              onClick={toggleLanguage}
              title={isRTL ? "Switch to English" : "التبديل إلى العربية"}
              aria-label={isRTL ? "Switch to English" : "التبديل إلى العربية"}
              className="inline-flex items-center gap-1 sm:gap-1.5 pl-2 sm:pl-2.5 pr-1 sm:pr-1.5 py-1 rounded-full bg-[#F3F6FB] hover:bg-[#EBF1FA] border border-[#DCE5F2] shadow-[0_2px_6px_rgba(11,27,61,0.04),inset_0_1px_0_rgba(255,255,255,0.9)] active:scale-95 transition-all duration-200 cursor-pointer select-none shrink-0"
            >
              <Globe className="w-3.5 h-3.5 text-[#7A92B4] stroke-[1.9] shrink-0" />
              <span
                className={`px-2 sm:px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-extrabold tracking-tight transition-all duration-200 ${
                  !isRTL
                    ? "bg-[#0044CC] text-white shadow-[0_2px_6px_rgba(0,68,204,0.28)]"
                    : "text-[#334E68] hover:text-brand-navy"
                }`}
              >
                EN
              </span>
              <span
                className={`px-2 sm:px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold transition-all duration-200 ${
                  isRTL
                    ? "bg-[#0044CC] text-white shadow-[0_2px_6px_rgba(0,68,204,0.28)]"
                    : "text-[#334E68] hover:text-brand-navy"
                }`}
              >
                العربية
              </span>
            </button>

            <a
              href={`https://wa.me/${selectedAdvisorObj.rawPhone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-full bg-blue-50/90 hover:bg-brand-electric text-brand-navy hover:text-white border border-blue-200/75 text-[11px] sm:text-xs font-bold shadow-sm transition-all duration-200 active:scale-95 whitespace-nowrap group"
            >
              <MessageCircle className="w-3.5 h-3.5 text-brand-electric group-hover:text-white transition-colors shrink-0" />
              <span className="sm:hidden">
                {isRTL ? "مساعدة" : "Help"}
              </span>
              <span className="hidden sm:inline">
                {isRTL ? "تحتاج مساعدة؟" : "Need Help?"}
              </span>
            </a>
          </div>
        </div>
      </header>

      {/* =================================================================== */}
      {/* 2. MAIN WIZARD BODY                                                 */}
      {/* =================================================================== */}
      <main className="flex-grow py-6 sm:py-10 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top 5-Step Segmented Progress Bar */}
          <div className="max-w-3xl mx-auto mb-6 sm:mb-9">
            <div className="flex items-center justify-between gap-2 text-xs sm:text-sm font-semibold mb-2.5">
              <span className="text-slate-500 truncate">
                {isRTL ? `الخطوة ${step} من 5:` : `Step ${step} of 5:`}{" "}
                <strong className="text-brand-navy font-bold">
                  {STEP_META[step - 1]?.title}
                </strong>
              </span>

              <span className="text-brand-electric font-bold bg-white px-3 py-1 rounded-full text-[11px] sm:text-xs border border-slate-200/90 shadow-sm tabular-nums whitespace-nowrap shrink-0">
                {isRTL ? `${step * 20}% مكتمل` : `${step * 20}% Completed`}
              </span>
            </div>

            {/* 5 Interactive Progress Segments */}
            <div className="grid grid-cols-5 gap-2 sm:gap-2.5 w-full">
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
            {/* PRIMARY COLUMN (7 Cols): INTERACTIVE MULTI-STEP CARD          */}
            {/* ============================================================= */}
            <div className="relative lg:col-span-7 apple-glass rounded-3xl sm:rounded-[32px] border border-slate-200/90 p-5 sm:p-8 lg:p-9 shadow-[0_20px_50px_-14px_rgba(11,27,61,0.09)] overflow-hidden">
              {/* Zero-Blur GPU Radial Top Lighting */}
              <div
                aria-hidden="true"
                className={`absolute -top-24 ${
                  isRTL ? "-right-24" : "-left-24"
                } w-72 h-72 rounded-full pointer-events-none`}
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
                      className="space-y-6 text-center py-3"
                    >
                      <div className="w-16 h-16 rounded-3xl bg-blue-50 border border-blue-200/80 text-brand-electric flex items-center justify-center mx-auto shadow-sm">
                        <CheckCircle2 className="w-9 h-9 stroke-[2.2]" />
                      </div>

                      <div className="space-y-2">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold text-brand-navy tabular-nums">
                          <span>
                            {isRTL
                              ? "مرجع الطلب الرسمي:"
                              : "Official Application Ref:"}
                          </span>
                          <span className="text-brand-electric">
                            {submittedRef}
                          </span>
                        </div>
                        <h2 className="text-xl sm:text-2xl font-bold text-brand-navy">
                          {isRTL
                            ? `تم تجهيز طلب الاستشارة بنجاح، ${fullName}!`
                            : `Your Consultation Request is Ready, ${fullName}!`}
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                          {isRTL ? (
                            <>
                              اضغط على الزر أسفله لفتح واتساب وإرسال معلوماتك
                              مباشرة إلى{" "}
                              <strong className="text-brand-navy">
                                {selectedAdvisorObj.fullTitle}
                              </strong>
                              .
                            </>
                          ) : (
                            <>
                              Click the button below to open WhatsApp and send
                              your application details directly to{" "}
                              <strong className="text-brand-navy">
                                {selectedAdvisorObj.fullTitle}
                              </strong>
                              .
                            </>
                          )}
                        </p>
                      </div>

                      {/* Direct WhatsApp Launch Button */}
                      <div className="pt-1 flex flex-col sm:flex-row items-center justify-center gap-3">
                        <a
                          href={generatedWhatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full sm:w-auto h-12 px-7 rounded-2xl bg-brand-electric hover:bg-brand-navy text-white font-bold text-xs sm:text-sm shadow-md shadow-brand-electric/20 inline-flex items-center justify-center gap-2.5 whitespace-nowrap transition-all active:scale-95 group"
                        >
                          <MessageCircle className="w-4 h-4 shrink-0" />
                          <span>
                            {isRTL
                              ? `فتح واتساب مع ${selectedAdvisorObj.fullTitle}`
                              : `Open WhatsApp with ${selectedAdvisorObj.fullTitle}`}
                          </span>
                          {isRTL ? (
                            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 shrink-0" />
                          ) : (
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 shrink-0" />
                          )}
                        </a>

                        <button
                          type="button"
                          onClick={handleCopyRequest}
                          className="w-full sm:w-auto h-12 px-5 rounded-2xl bg-slate-100 hover:bg-slate-200/80 text-brand-navy font-bold text-xs inline-flex items-center justify-center gap-2 whitespace-nowrap transition-all active:scale-95 cursor-pointer"
                        >
                          <Copy className="w-3.5 h-3.5 text-brand-electric shrink-0" />
                          <span>
                            {copiedRequest
                              ? isRTL
                                ? "تم نسخ تفاصيل الطلب ✓"
                                : "Application Details Copied ✓"
                              : isRTL
                              ? "نسخ نص الطلب"
                              : "Copy Request Text"}
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
                          <span>
                            {isRTL ? "تعديل المعلومات" : "Edit Information"}
                          </span>
                        </button>

                        <Link
                          href="/"
                          className="hover:text-brand-navy transition-colors"
                        >
                          {isRTL
                            ? "العودة إلى الصفحة الرئيسية"
                            : "Return to Home Page"}
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
                      className="space-y-6 sm:space-y-7"
                    >
                      <h1 className="text-lg sm:text-2xl font-bold text-brand-navy leading-snug tracking-tight">
                        {isRTL
                          ? "حدد بلد الإقامة والوجهة الدراسية المفضلة"
                          : "Select Your Country of Residence & Preferred Study Destination"}
                      </h1>

                      {/* 1A: Student Country Selector — Country Flag / Globe + Title + Check */}
                      <div className="space-y-3">
                        <label className="block text-xs sm:text-[13px] font-bold text-slate-600">
                          {isRTL
                            ? "1. من أي بلد تتواصل معنا؟"
                            : "1. Which country are you contacting us from?"}
                        </label>
                        <div className="grid grid-cols-2 gap-3 sm:gap-3.5">
                          {[
                            {
                              id: "ma" as StudentCountry,
                              flag: "MA",
                              title: isRTL ? "المغرب" : "Morocco",
                            },
                            {
                              id: "other" as StudentCountry,
                              flag: "OTHER",
                              title: isRTL ? "بلد آخر" : "Another Country",
                            },
                          ].map((c) => {
                            const isSelected = studentCountry === c.id;
                            return (
                              <button
                                key={c.id}
                                type="button"
                                onClick={() => handleSelectCountry(c.id)}
                                className={`min-h-[60px] sm:min-h-[64px] px-3.5 sm:px-4 py-3.5 rounded-2xl border ${cardTextAlign} transition-all duration-150 cursor-pointer flex items-center justify-between gap-2.5 active:scale-[0.98] ${
                                  isSelected
                                    ? "bg-blue-50/90 border-2 border-brand-electric ring-4 ring-brand-electric/10 shadow-sm"
                                    : "bg-slate-50/80 border-slate-200/90 hover:border-blue-200 hover:bg-white"
                                }`}
                              >
                                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                                  <CountryFlag code={c.flag} size="md" />
                                  <strong
                                    className={`text-[13px] sm:text-[15px] font-bold leading-snug ${
                                      isSelected
                                        ? "text-brand-electric"
                                        : "text-brand-navy"
                                    }`}
                                  >
                                    {c.title}
                                  </strong>
                                </div>

                                <div
                                  className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                                    isSelected
                                      ? "bg-brand-electric text-white"
                                      : "border border-slate-300 bg-white"
                                  }`}
                                >
                                  {isSelected && (
                                    <Check className="w-3 h-3 stroke-[3]" />
                                  )}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* 1B: Target European Destination — Country Flags Only */}
                      <div className="space-y-3">
                        <label className="block text-xs sm:text-[13px] font-bold text-slate-600">
                          {isRTL
                            ? "2. ما هي وجهتك الدراسية المفضلة في أوروبا؟"
                            : "2. What is your preferred study destination in Europe?"}
                        </label>
                        <div className="grid grid-cols-2 gap-3 sm:gap-3.5">
                          {DESTINATIONS.map((dest) => {
                            const isSelected = destination === dest.id;
                            return (
                              <button
                                key={dest.id}
                                type="button"
                                onClick={() => setDestination(dest.id)}
                                className={`${
                                  dest.fullWidth ? "col-span-2" : ""
                                } min-h-[60px] sm:min-h-[64px] px-4 py-3.5 rounded-2xl border ${cardTextAlign} transition-all duration-150 cursor-pointer flex items-center justify-between gap-3 active:scale-[0.98] ${
                                  isSelected
                                    ? "bg-blue-50/90 border-2 border-brand-electric ring-4 ring-brand-electric/10 shadow-sm"
                                    : "bg-white border-slate-200/90 hover:border-blue-200 hover:bg-slate-50/60"
                                }`}
                              >
                                <div className="flex items-center gap-3 min-w-0">
                                  <CountryFlag code={dest.id} size="md" />
                                  <strong
                                    className={`text-[13px] sm:text-[15px] font-bold leading-snug ${
                                      isSelected
                                        ? "text-brand-electric"
                                        : "text-brand-navy"
                                    }`}
                                  >
                                    {dest.name}
                                  </strong>
                                </div>

                                <div
                                  className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                                    isSelected
                                      ? "bg-brand-electric text-white"
                                      : "border border-slate-300 bg-white"
                                  }`}
                                >
                                  {isSelected && (
                                    <Check className="w-3 h-3 stroke-[3]" />
                                  )}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Step 1 Sleek Action Bar */}
                      <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2.5 sm:gap-3">
                        <span className="text-xs text-slate-400 font-medium whitespace-nowrap shrink-0">
                          {isRTL ? "الخطوة 1 من 5" : "Step 1 of 5"}
                        </span>
                        <button
                          type="button"
                          onClick={() => goToStep(2)}
                          className="group h-12 px-4 sm:px-7 rounded-2xl bg-brand-navy hover:bg-brand-electric text-white font-bold text-xs sm:text-sm inline-flex items-center justify-center gap-2 whitespace-nowrap transition-all active:scale-[0.98] cursor-pointer shadow-sm min-w-0"
                        >
                          <span className="truncate">
                            {isRTL
                              ? "متابعة للمعلومات الدراسية"
                              : "Continue to Academic Profile"}
                          </span>
                          {isRTL ? (
                            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 shrink-0" />
                          ) : (
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 shrink-0" />
                          )}
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
                      className="space-y-6 sm:space-y-7"
                    >
                      <h2 className="text-lg sm:text-2xl font-bold text-brand-navy leading-snug tracking-tight">
                        {isRTL
                          ? "حدد مستواك الدراسي والتخصص المطلوب"
                          : "Select Your Academic Level & Target Major"}
                      </h2>

                      {/* 2A: Current Study Level — Pure Minimalist Cards (No Icons) */}
                      <div className="space-y-3">
                        <label className="block text-xs sm:text-[13px] font-bold text-slate-600">
                          {isRTL
                            ? "1. مستواك الدراسي الحالي:"
                            : "1. Your current academic level:"}
                        </label>
                        <div className="grid grid-cols-2 gap-3 sm:gap-3.5">
                          {STUDY_LEVELS.map((lvl) => {
                            const isSelected = studyLevel === lvl.id;
                            return (
                              <button
                                key={lvl.id}
                                type="button"
                                onClick={() => setStudyLevel(lvl.id)}
                                className={`min-h-[62px] sm:min-h-[66px] px-4 py-3.5 rounded-2xl border ${cardTextAlign} transition-all duration-150 cursor-pointer flex items-center justify-between gap-2.5 active:scale-[0.98] ${
                                  isSelected
                                    ? "bg-blue-50/90 border-2 border-brand-electric ring-4 ring-brand-electric/10 shadow-sm"
                                    : "bg-slate-50/80 border-slate-200/90 hover:border-blue-200 hover:bg-white"
                                }`}
                              >
                                <strong
                                  className={`text-[13px] sm:text-sm font-bold leading-snug ${
                                    isSelected
                                      ? "text-brand-electric"
                                      : "text-brand-navy"
                                  }`}
                                >
                                  {lvl.shortTitle}
                                </strong>

                                <div
                                  className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                                    isSelected
                                      ? "bg-brand-electric text-white"
                                      : "border border-slate-300 bg-white"
                                  }`}
                                >
                                  {isSelected && (
                                    <Check className="w-3 h-3 stroke-[3]" />
                                  )}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* 2B: Country-Adaptive Baccalaureate / High School Stream */}
                      <div className="space-y-3">
                        <label className="block text-xs sm:text-[13px] font-bold text-slate-600">
                          {isRTL
                            ? studentCountry === "ma"
                              ? "2. شعبة البكالوريا:"
                              : "2. المسار الدراسي (البكالوريا / الثانوية العامة):"
                            : studentCountry === "ma"
                            ? "2. Baccalaureate Stream:"
                            : "2. High School / Academic Track:"}
                        </label>
                        <div className="grid grid-cols-2 gap-3 sm:gap-3.5">
                          {currentStreams.map((b) => {
                            const isSelected = bacStream === b.id;
                            return (
                              <button
                                key={b.id}
                                type="button"
                                onClick={() => setBacStream(b.id)}
                                className={`min-h-[62px] sm:min-h-[66px] px-4 py-3.5 rounded-2xl ${cardTextAlign} transition-all duration-150 cursor-pointer flex items-center justify-between gap-2.5 active:scale-[0.98] ${
                                  isSelected
                                    ? "bg-blue-50/90 border-2 border-brand-electric text-brand-electric ring-4 ring-brand-electric/10 shadow-sm"
                                    : "bg-slate-50/80 border border-slate-200/90 text-brand-navy hover:border-blue-200 hover:bg-white"
                                }`}
                              >
                                <strong className="text-[13px] sm:text-sm font-bold leading-snug">
                                  {b.label}
                                </strong>
                                <div
                                  className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                                    isSelected
                                      ? "bg-brand-electric text-white"
                                      : "border border-slate-300 bg-white"
                                  }`}
                                >
                                  {isSelected && (
                                    <Check className="w-3 h-3 stroke-[3]" />
                                  )}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* 2C: Baccalaureate / Graduation Year — Evergreen Relative Options */}
                      <div className="space-y-3">
                        <label className="block text-xs sm:text-[13px] font-bold text-slate-600">
                          {isRTL
                            ? studentCountry === "ma"
                              ? "3. سنة الحصول على البكالوريا (أو آخر شهادة):"
                              : "3. سنة التخرج (البكالوريا / الثانوية أو آخر شهادة):"
                            : studentCountry === "ma"
                            ? "3. Baccalaureate Year (or Latest Degree):"
                            : "3. Graduation Year (High School or Latest Degree):"}
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
                          {BAC_YEARS.map((y) => {
                            const isSelected = bacYear === y.id;
                            return (
                              <button
                                key={y.id}
                                type="button"
                                onClick={() => setBacYear(y.id)}
                                className={`min-h-[54px] sm:min-h-[58px] px-3 py-3 rounded-2xl text-center text-[13px] sm:text-sm font-bold transition-all duration-150 cursor-pointer active:scale-[0.98] ${
                                  isSelected
                                    ? "bg-blue-50/90 border-2 border-brand-electric text-brand-electric ring-4 ring-brand-electric/10 shadow-sm"
                                    : "bg-slate-50/80 border border-slate-200/90 text-slate-700 hover:border-blue-200 hover:bg-white"
                                }`}
                              >
                                {y.label}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* 2D: Target Academic Major — Pure Minimalist Cards (No Icons) */}
                      <div className="space-y-3">
                        <label className="block text-xs sm:text-[13px] font-bold text-slate-600">
                          {isRTL
                            ? "4. التخصص المطلوب في أوروبا:"
                            : "4. Target Major in Europe:"}
                        </label>
                        <div className="grid grid-cols-2 gap-3 sm:gap-3.5">
                          {TARGET_FIELDS.map((field) => {
                            const isSelected = targetField === field.id;
                            return (
                              <button
                                key={field.id}
                                type="button"
                                onClick={() => setTargetField(field.id)}
                                className={`${
                                  field.fullWidth ? "col-span-2" : ""
                                } min-h-[62px] sm:min-h-[66px] px-4 py-3.5 rounded-2xl border ${cardTextAlign} transition-all duration-150 cursor-pointer flex items-center justify-between gap-2.5 active:scale-[0.98] ${
                                  isSelected
                                    ? "bg-blue-50/90 border-2 border-brand-electric ring-4 ring-brand-electric/10 shadow-sm"
                                    : "bg-white border-slate-200/90 hover:border-blue-200 hover:bg-slate-50/60"
                                }`}
                              >
                                <strong
                                  className={`text-[13px] sm:text-sm font-bold leading-snug ${
                                    isSelected
                                      ? "text-brand-electric"
                                      : "text-brand-navy"
                                  }`}
                                >
                                  {field.title}
                                </strong>

                                <div
                                  className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                                    isSelected
                                      ? "bg-brand-electric text-white"
                                      : "border border-slate-300 bg-white"
                                  }`}
                                >
                                  {isSelected && (
                                    <Check className="w-3 h-3 stroke-[3]" />
                                  )}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Step 2 Sleek Action Bar */}
                      <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2.5 sm:gap-3">
                        <button
                          type="button"
                          onClick={() => goToStep(1)}
                          className="h-12 px-4 sm:px-5 rounded-2xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 font-bold text-xs sm:text-sm inline-flex items-center gap-2 whitespace-nowrap transition-colors cursor-pointer active:scale-95 shrink-0"
                        >
                          {isRTL ? (
                            <ArrowRight className="w-4 h-4 shrink-0" />
                          ) : (
                            <ArrowLeft className="w-4 h-4 shrink-0" />
                          )}
                          <span>{isRTL ? "السابق" : "Previous"}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => goToStep(3)}
                          className="group h-12 px-5 sm:px-7 rounded-2xl bg-brand-navy hover:bg-brand-electric text-white font-bold text-xs sm:text-sm inline-flex items-center justify-center gap-2 whitespace-nowrap transition-all active:scale-[0.98] cursor-pointer shadow-sm min-w-0"
                        >
                          <span className="truncate">
                            {isRTL ? "الخطوة التالية" : "Next Step"}
                          </span>
                          {isRTL ? (
                            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 shrink-0" />
                          ) : (
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 shrink-0" />
                          )}
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
                      className="space-y-6 sm:space-y-7"
                    >
                      <h2 className="text-lg sm:text-2xl font-bold text-brand-navy leading-snug tracking-tight">
                        {isRTL
                          ? "حدد مستوى اللغة، الميزانية وطريقة المواكبة"
                          : "Select Your English Level, Tuition Budget & Consultation Mode"}
                      </h2>

                      {/* 3A: English Level — First 2 Side-by-Side (grid-cols-2), 3rd Advanced Full-Width (col-span-2) */}
                      <div className="space-y-3">
                        <label className="block text-xs sm:text-[13px] font-bold text-slate-600">
                          {isRTL
                            ? "1. مستواك في اللغة الإنجليزية:"
                            : "1. Your English proficiency level:"}
                        </label>
                        <div className="grid grid-cols-2 gap-3 sm:gap-3.5">
                          {LANGUAGE_LEVELS.map((lvl) => {
                            const isSelected = englishLevel === lvl.id;
                            return (
                              <button
                                key={lvl.id}
                                type="button"
                                onClick={() => setEnglishLevel(lvl.id)}
                                className={`${
                                  lvl.fullWidth ? "col-span-2" : ""
                                } min-h-[62px] sm:min-h-[66px] px-4 py-3.5 rounded-2xl border ${cardTextAlign} transition-all duration-150 cursor-pointer flex items-center justify-between gap-2.5 active:scale-[0.98] ${
                                  isSelected
                                    ? "bg-blue-50/90 border-2 border-brand-electric ring-4 ring-brand-electric/10 shadow-sm"
                                    : "bg-slate-50/80 border-slate-200/90 hover:border-blue-200 hover:bg-white"
                                }`}
                              >
                                <strong
                                  className={`text-[13px] sm:text-sm font-bold leading-snug ${
                                    isSelected
                                      ? "text-brand-electric"
                                      : "text-brand-navy"
                                  }`}
                                >
                                  {lvl.title}
                                </strong>

                                <div
                                  className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                                    isSelected
                                      ? "bg-brand-electric text-white"
                                      : "border border-slate-300 bg-white"
                                  }`}
                                >
                                  {isSelected && (
                                    <Check className="w-3 h-3 stroke-[3]" />
                                  )}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* 3B: Annual Tuition Budget Range — Spacious 2x2 Cards */}
                      <div className="space-y-3">
                        <label className="block text-xs sm:text-[13px] font-bold text-slate-600">
                          {isRTL
                            ? "2. الميزانية السنوية التقريبية:"
                            : "2. Estimated annual tuition budget:"}
                        </label>
                        <div className="grid grid-cols-2 gap-3 sm:gap-3.5">
                          {BUDGET_RANGES.map((b) => {
                            const isSelected = budgetRange === b.id;
                            return (
                              <button
                                key={b.id}
                                type="button"
                                onClick={() => setBudgetRange(b.id)}
                                className={`min-h-[62px] sm:min-h-[66px] px-4 py-3.5 rounded-2xl border ${cardTextAlign} transition-all duration-150 cursor-pointer flex items-center justify-between gap-2.5 active:scale-[0.98] ${
                                  isSelected
                                    ? "bg-blue-50/90 border-2 border-brand-electric ring-4 ring-brand-electric/10 shadow-sm"
                                    : "bg-white border-slate-200/90 hover:border-blue-200 hover:bg-slate-50/60"
                                }`}
                              >
                                <strong
                                  className={`text-[13px] sm:text-sm font-bold leading-snug ${
                                    isSelected
                                      ? "text-brand-electric"
                                      : "text-brand-navy"
                                  }`}
                                >
                                  {b.title}
                                </strong>
                                <div
                                  className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                                    isSelected
                                      ? "bg-brand-electric text-white"
                                      : "border border-slate-300 bg-white"
                                  }`}
                                >
                                  {isSelected && (
                                    <Check className="w-3 h-3 stroke-[3]" />
                                  )}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* 3C: Country-Adaptive Consultation Mode — Pure Minimalist Cards (No Icons) */}
                      <div className="space-y-3">
                        <label className="block text-xs sm:text-[13px] font-bold text-slate-600">
                          {isRTL
                            ? "3. طريقة الاستشارة والمواكبة:"
                            : "3. Preferred consultation & support mode:"}
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                          {currentConsultModes.map((mode) => {
                            const isSelected = consultMode === mode.id;
                            return (
                              <button
                                key={mode.id}
                                type="button"
                                onClick={() => setConsultMode(mode.id)}
                                className={`min-h-[62px] sm:min-h-[66px] px-4 py-3.5 rounded-2xl border ${cardTextAlign} transition-all duration-150 cursor-pointer flex items-center justify-between gap-3 active:scale-[0.99] ${
                                  isSelected
                                    ? "bg-blue-50/90 border-2 border-brand-electric ring-4 ring-brand-electric/10 shadow-sm"
                                    : "bg-slate-50/80 border-slate-200/90 hover:border-blue-200 hover:bg-white"
                                }`}
                              >
                                <strong
                                  className={`text-[13px] sm:text-sm font-bold leading-snug ${
                                    isSelected
                                      ? "text-brand-electric"
                                      : "text-brand-navy"
                                  }`}
                                >
                                  {mode.title}
                                </strong>

                                <div
                                  className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                                    isSelected
                                      ? "bg-brand-electric text-white"
                                      : "border border-slate-300 bg-white"
                                  }`}
                                >
                                  {isSelected && (
                                    <Check className="w-3 h-3 stroke-[3]" />
                                  )}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Step 3 Sleek Action Bar */}
                      <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2.5 sm:gap-3">
                        <button
                          type="button"
                          onClick={() => goToStep(2)}
                          className="h-12 px-4 sm:px-5 rounded-2xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 font-bold text-xs sm:text-sm inline-flex items-center gap-2 whitespace-nowrap transition-colors cursor-pointer active:scale-95 shrink-0"
                        >
                          {isRTL ? (
                            <ArrowRight className="w-4 h-4 shrink-0" />
                          ) : (
                            <ArrowLeft className="w-4 h-4 shrink-0" />
                          )}
                          <span>{isRTL ? "السابق" : "Previous"}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => goToStep(4)}
                          className="group h-12 px-5 sm:px-7 rounded-2xl bg-brand-navy hover:bg-brand-electric text-white font-bold text-xs sm:text-sm inline-flex items-center justify-center gap-2 whitespace-nowrap transition-all active:scale-[0.98] cursor-pointer shadow-sm min-w-0"
                        >
                          <span className="truncate">
                            {isRTL ? "الخطوة التالية" : "Next Step"}
                          </span>
                          {isRTL ? (
                            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 shrink-0" />
                          ) : (
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 shrink-0" />
                          )}
                        </button>
                      </div>
                    </motion.div>
                  ) : step === 4 ? (
                    /* ======================================================= */
                    /* STEP 4: PERSONAL CONTACT INFORMATION                    */
                    /* ======================================================= */
                    <motion.div
                      key="step-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.22, ease: TRANSITION_EASE }}
                    >
                      <form
                        onSubmit={handleStep4Next}
                        className="space-y-5 sm:space-y-6"
                      >
                        <h2 className="text-lg sm:text-2xl font-bold text-brand-navy leading-snug tracking-tight">
                          {isRTL
                            ? "أدخل معلوماتك الشخصية للانتقال لاختيار المستشار"
                            : "Enter Your Personal Details to Proceed to Advisor Selection"}
                        </h2>

                        {/* Live Selection Recap Box */}
                        <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200/80 space-y-2.5">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5 text-xs font-bold text-brand-navy">
                              <Sparkles className="w-3.5 h-3.5 text-brand-electric shrink-0" />
                              <span>
                                {isRTL
                                  ? "ملخص اختياراتك"
                                  : "Your Selection Summary"}
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => goToStep(1)}
                              className="text-xs font-bold text-brand-electric hover:underline cursor-pointer whitespace-nowrap"
                            >
                              {isRTL ? "تعديل الاختيارات" : "Edit Selections"}
                            </button>
                          </div>

                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
                            <div className="p-3 rounded-xl bg-white border border-slate-200/80">
                              <span className="block text-[10px] text-slate-500 font-medium">
                                {isRTL ? "الوجهة" : "Destination"}
                              </span>
                              <div className="flex items-center gap-1.5 mt-1">
                                <CountryFlag
                                  code={selectedDestinationObj.id}
                                  size="sm"
                                />
                                <strong className="text-brand-navy font-bold text-xs truncate">
                                  {selectedDestinationObj.name}
                                </strong>
                              </div>
                            </div>

                            <div className="p-3 rounded-xl bg-white border border-slate-200/80">
                              <span className="block text-[10px] text-slate-500 font-medium">
                                {isRTL ? "التخصص" : "Major"}
                              </span>
                              <strong className="block text-brand-navy font-bold text-xs truncate mt-1">
                                {selectedFieldObj.title}
                              </strong>
                            </div>

                            <div className="p-3 rounded-xl bg-white border border-slate-200/80 col-span-2 sm:col-span-1">
                              <span className="block text-[10px] text-slate-500 font-medium">
                                {isRTL ? "بلد الإقامة" : "Country of Residence"}
                              </span>
                              <div className="flex items-center gap-1.5 mt-1">
                                <CountryFlag
                                  code={
                                    studentCountry === "ma" ? "MA" : "OTHER"
                                  }
                                  size="sm"
                                />
                                <strong className="text-brand-navy font-bold text-xs truncate">
                                  {studentCountry === "ma"
                                    ? isRTL
                                      ? "المغرب"
                                      : "Morocco"
                                    : studentCity.trim() ||
                                      (isRTL
                                        ? "بلد آخر"
                                        : "Another Country")}{" "}
                                  ({selectedLangObj.tag})
                                </strong>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Form Inputs */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs sm:text-[13px] font-bold text-slate-600 mb-2">
                              {isRTL
                                ? "الاسم الكامل للطالب(ة)"
                                : "Student's Full Name"}{" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                              <div
                                className={`absolute inset-y-0 ${inputIconPos} flex items-center pointer-events-none text-slate-400`}
                              >
                                <User className="w-4 h-4" />
                              </div>
                              <input
                                type="text"
                                required
                                maxLength={80}
                                autoComplete="name"
                                placeholder={
                                  isRTL
                                    ? "مثال: أمين بنعلي"
                                    : "e.g., Amine Benali"
                                }
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className={`select-text w-full ${inputPadding} py-3.5 bg-slate-50/90 border border-slate-200/90 rounded-2xl text-sm text-brand-navy placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand-electric/10 focus:border-brand-electric transition-all shadow-sm`}
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs sm:text-[13px] font-bold text-slate-600 mb-2">
                              {isRTL
                                ? "رقم الهاتف (واتساب)"
                                : "Phone Number (WhatsApp)"}{" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                              <div
                                className={`absolute inset-y-0 ${inputIconPos} flex items-center pointer-events-none text-slate-400`}
                              >
                                <Phone className="w-4 h-4" />
                              </div>
                              <input
                                type="tel"
                                inputMode="tel"
                                required
                                maxLength={25}
                                autoComplete="tel"
                                placeholder={
                                  studentCountry === "ma"
                                    ? "06XX-XXXXXX"
                                    : "+XXX XX XXX XXXX"
                                }
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                dir="ltr"
                                className={`select-text w-full ${inputPadding} py-3.5 bg-slate-50/90 border border-slate-200/90 rounded-2xl text-sm text-brand-navy placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand-electric/10 focus:border-brand-electric transition-all shadow-sm ${cardTextAlign}`}
                              />
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs sm:text-[13px] font-bold text-slate-600 mb-2">
                            {isRTL
                              ? studentCountry === "ma"
                                ? "المدينة الحالية في المغرب"
                                : "البلد والمدينة الحالية"
                              : studentCountry === "ma"
                              ? "Current City in Morocco"
                              : "Current Country & City"}{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <div
                              className={`absolute inset-y-0 ${inputIconPos} flex items-center pointer-events-none text-slate-400`}
                            >
                              <MapPin className="w-4 h-4" />
                            </div>
                            <input
                              type="text"
                              required
                              maxLength={80}
                              autoComplete="address-level2"
                              placeholder={
                                isRTL
                                  ? studentCountry === "ma"
                                    ? "أكادير، الدار البيضاء، الرباط، مراكش..."
                                    : "مثال: الجزائر، تونس، مصر، السعودية، قطر..."
                                  : studentCountry === "ma"
                                  ? "Agadir, Casablanca, Rabat, Marrakech..."
                                  : "e.g., Algeria, Tunisia, Egypt, UAE, Qatar..."
                              }
                              value={studentCity}
                              onChange={(e) => setStudentCity(e.target.value)}
                              className={`select-text w-full ${inputPadding} py-3.5 bg-slate-50/90 border border-slate-200/90 rounded-2xl text-sm text-brand-navy placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand-electric/10 focus:border-brand-electric transition-all shadow-sm`}
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs sm:text-[13px] font-bold text-slate-600 mb-2">
                            {isRTL
                              ? "سؤال أو ملاحظة إضافية للمستشار (اختياري)"
                              : "Additional Question or Note for the Advisor (Optional)"}
                          </label>
                          <textarea
                            rows={2}
                            maxLength={400}
                            placeholder={
                              isRTL
                                ? "اكتب أي استفسار حول التخصص، المنح أو الإجراءات..."
                                : "Write any questions regarding majors, scholarships, or admission procedures..."
                            }
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            className="select-text w-full px-4 py-3 bg-slate-50/90 border border-slate-200/90 rounded-2xl text-sm text-brand-navy placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand-electric/10 focus:border-brand-electric transition-all resize-none shadow-sm"
                          />
                        </div>

                        {/* Step 4 Sleek Action Bar -> Advances to Step 5 */}
                        <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2.5 sm:gap-3">
                          <button
                            type="button"
                            onClick={() => goToStep(3)}
                            className="h-12 px-4 sm:px-5 rounded-2xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 font-bold text-xs sm:text-sm inline-flex items-center gap-2 whitespace-nowrap transition-colors cursor-pointer active:scale-95 shrink-0"
                          >
                            {isRTL ? (
                              <ArrowRight className="w-4 h-4 shrink-0" />
                            ) : (
                              <ArrowLeft className="w-4 h-4 shrink-0" />
                            )}
                            <span>{isRTL ? "السابق" : "Previous"}</span>
                          </button>

                          <button
                            type="submit"
                            className="group flex-1 sm:flex-initial min-w-0 h-12 px-4 sm:px-7 rounded-2xl bg-brand-navy hover:bg-brand-electric text-white font-bold text-xs sm:text-sm inline-flex items-center justify-center gap-2 whitespace-nowrap transition-all active:scale-[0.98] cursor-pointer shadow-sm"
                          >
                            <span className="truncate">
                              {isRTL
                                ? "متابعة لاختيار المستشار"
                                : "Continue to Select Advisor"}
                            </span>
                            {isRTL ? (
                              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 shrink-0" />
                            ) : (
                              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 shrink-0" />
                            )}
                          </button>
                        </div>
                      </form>
                    </motion.div>
                  ) : (
                    /* ======================================================= */
                    /* STEP 5: CHOOSE PREFERRED ADVISOR & SEND VIA WHATSAPP    */
                    /* ======================================================= */
                    <motion.div
                      key="step-5"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.22, ease: TRANSITION_EASE }}
                    >
                      <form
                        onSubmit={handleSubmit}
                        className="space-y-6 sm:space-y-7"
                      >
                        <div className="space-y-2">
                          <h2 className="text-lg sm:text-2xl font-bold text-brand-navy leading-snug tracking-tight">
                            {isRTL
                              ? "اختر المستشار(ة) المفضل للتواصل معك عبر واتساب"
                              : "Select Your Preferred Admissions Advisor on WhatsApp"}
                          </h2>
                          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                            {isRTL ? (
                              <>
                                حرصاً على راحتك وخصوصيتك، يمكنك كطالب(ة) أو ولي
                                أمر اختيار التواصل المباشر مع{" "}
                                <strong className="text-brand-navy">
                                  مستشارة
                                </strong>{" "}
                                أو{" "}
                                <strong className="text-brand-navy">
                                  مستشار
                                </strong>{" "}
                                حسب ما يناسبك:
                              </>
                            ) : (
                              <>
                                For your comfort and privacy as a student or
                                parent, you can choose to connect directly with
                                a{" "}
                                <strong className="text-brand-navy">
                                  female
                                </strong>{" "}
                                or{" "}
                                <strong className="text-brand-navy">
                                  male
                                </strong>{" "}
                                admissions advisor:
                              </>
                            )}
                          </p>
                        </div>

                        {/* 3 Selectable Advisor Cards — Pure Minimalist (Advisor Title Only) */}
                        <div className="space-y-3">
                          {ADVISORS.map((advisor) => {
                            const isSelected = selectedAdvisorId === advisor.id;
                            return (
                              <button
                                key={advisor.id}
                                type="button"
                                onClick={() => setSelectedAdvisorId(advisor.id)}
                                className={`w-full min-h-[60px] sm:min-h-[64px] px-4 sm:px-5 py-3.5 rounded-2xl border ${cardTextAlign} transition-all duration-150 cursor-pointer flex items-center justify-between gap-3 active:scale-[0.99] ${
                                  isSelected
                                    ? "bg-blue-50/90 border-2 border-brand-electric ring-4 ring-brand-electric/10 shadow-sm"
                                    : "bg-slate-50/80 border-slate-200/90 hover:border-blue-200 hover:bg-white"
                                }`}
                              >
                                <strong
                                  className={`text-sm sm:text-base font-bold leading-snug ${
                                    isSelected
                                      ? "text-brand-electric"
                                      : "text-brand-navy"
                                  }`}
                                >
                                  {advisor.fullTitle}
                                </strong>

                                <div
                                  className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                                    isSelected
                                      ? "bg-brand-electric text-white shadow-sm"
                                      : "border border-slate-300 bg-white"
                                  }`}
                                >
                                  {isSelected && (
                                    <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[3]" />
                                  )}
                                </div>
                              </button>
                            );
                          })}
                        </div>

                        {/* Quick Summary of Applicant Before Sending */}
                        <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50/90 border border-slate-200/80 space-y-2 text-xs">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-slate-500 font-bold whitespace-nowrap">
                              {isRTL ? "بيانات مقدم الطلب" : "Applicant Details"}
                            </span>
                            <button
                              type="button"
                              onClick={() => goToStep(4)}
                              className="text-brand-electric font-bold hover:underline cursor-pointer whitespace-nowrap"
                            >
                              {isRTL ? "تعديل البيانات" : "Edit Details"}
                            </button>
                          </div>
                          <div className="pt-2 border-t border-slate-200/70 flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
                            <strong
                              dir="auto"
                              className="text-brand-navy font-bold text-xs sm:text-[13px] break-words"
                            >
                              {fullName}
                            </strong>
                            <span
                              dir="ltr"
                              className="text-slate-600 font-bold tabular-nums text-xs"
                            >
                              {phone}
                            </span>
                          </div>
                        </div>

                        {/* Step 5 Final Submit Bar */}
                        <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2.5 sm:gap-3">
                          <button
                            type="button"
                            onClick={() => goToStep(4)}
                            className="h-12 px-4 sm:px-5 rounded-2xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 font-bold text-xs sm:text-sm inline-flex items-center gap-2 whitespace-nowrap transition-colors cursor-pointer active:scale-95 shrink-0"
                          >
                            {isRTL ? (
                              <ArrowRight className="w-4 h-4 shrink-0" />
                            ) : (
                              <ArrowLeft className="w-4 h-4 shrink-0" />
                            )}
                            <span>{isRTL ? "السابق" : "Previous"}</span>
                          </button>

                          <button
                            type="submit"
                            className="group flex-1 sm:flex-initial min-w-0 h-12 px-4 sm:px-7 rounded-2xl bg-brand-electric hover:bg-brand-navy text-white font-bold text-xs sm:text-sm shadow-md shadow-brand-electric/20 inline-flex items-center justify-center gap-2 whitespace-nowrap active:scale-[0.98] transition-all cursor-pointer"
                          >
                            <MessageCircle className="w-4 h-4 shrink-0" />
                            <span className="truncate">
                              {isRTL ? (
                                <>
                                  إرسال إلى {selectedAdvisorObj.fullTitle}
                                  <span className="hidden sm:inline">
                                    {" "}
                                    عبر واتساب
                                  </span>
                                </>
                              ) : (
                                <>
                                  Send to {selectedAdvisorObj.fullTitle}
                                  <span className="hidden sm:inline">
                                    {" "}
                                    via WhatsApp
                                  </span>
                                </>
                              )}
                            </span>
                            {isRTL ? (
                              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 shrink-0" />
                            ) : (
                              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 shrink-0" />
                            )}
                          </button>
                        </div>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* ============================================================= */}
            {/* SECONDARY COLUMN (5 Cols): STICKY AUTHORITY & MAPS SIDEBAR    */}
            {/* ============================================================= */}
            <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-5">
              {/* Card 1: Concise Founders & 3 Direct Guarantees */}
              <div className="apple-glass rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-[0_16px_40px_-12px_rgba(11,27,61,0.07)] space-y-4">
                {/* Founders Identity Row */}
                <div className="flex items-center gap-3 pb-3.5 border-b border-slate-100">
                  <div
                    className={`flex ${
                      isRTL ? "-space-x-2 space-x-reverse" : "-space-x-2"
                    } overflow-hidden shrink-0`}
                  >
                    {FOUNDERS.map((f) => (
                      <SmoothAvatar key={f.image} src={f.image} alt={f.name} />
                    ))}
                  </div>
                  <div className="min-w-0">
                    <strong className="text-xs sm:text-sm font-bold text-brand-navy block truncate">
                      {isRTL
                        ? "فريق M&A Overseas Consulting"
                        : "M&A Overseas Consulting Team"}
                    </strong>
                    <span className="text-[11px] sm:text-xs text-slate-500 font-medium block truncate mt-0.5">
                      {isRTL
                        ? "مرافقة شخصية مباشرة بدون وسطاء"
                        : "Direct personal guidance with zero intermediaries"}
                    </span>
                  </div>
                </div>

                {/* Live Interactive Selection Tracker */}
                <div className="p-3.5 rounded-2xl bg-blue-50/60 border border-blue-200/75 space-y-2.5">
                  <div className="flex items-center justify-between text-xs font-bold text-brand-navy">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-brand-electric shrink-0" />
                      <span>
                        {isRTL ? "اختياراتك الحالية" : "Your Current Selections"}
                      </span>
                    </span>
                    <span className="text-[11px] text-brand-electric font-bold whitespace-nowrap">
                      {isRTL ? "تحديث تلقائي" : "Live Update"}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5 text-xs">
                    <div className="p-2.5 rounded-xl bg-white border border-slate-200/80 flex items-center gap-2 min-w-0">
                      <CountryFlag
                        code={studentCountry === "ma" ? "MA" : "OTHER"}
                        size="sm"
                      />
                      <span className="font-bold text-brand-navy truncate">
                        {studentCountry === "ma"
                          ? isRTL
                            ? "المغرب"
                            : "Morocco"
                          : studentCity.trim() ||
                            (isRTL ? "بلد آخر" : "Another Country")}
                      </span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-white border border-slate-200/80 flex items-center gap-2 min-w-0">
                      <CountryFlag code={selectedDestinationObj.id} size="sm" />
                      <span className="font-bold text-brand-navy truncate">
                        {selectedDestinationObj.name}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 3 Concise Zero-Fluff Guarantee Pills */}
                <div className="space-y-2.5 text-xs">
                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50/90 border border-slate-200/70">
                    <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-100 text-brand-electric flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <strong className="text-brand-navy font-bold text-xs sm:text-[13px]">
                      {isRTL
                        ? "قبول جامعي رسمي مضمون 100%"
                        : "100% Guaranteed Official University Admission"}
                    </strong>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50/90 border border-slate-200/70">
                    <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-100 text-brand-electric flex items-center justify-center shrink-0">
                      <Award className="w-4 h-4" />
                    </div>
                    <strong className="text-brand-navy font-bold text-xs sm:text-[13px]">
                      {isRTL
                        ? "إعداد احترافي لملف التأشيرة والمنح"
                        : "Expert Visa File & Scholarship Preparation"}
                    </strong>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50/90 border border-slate-200/70">
                    <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-100 text-brand-electric flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <strong className="text-brand-navy font-bold text-xs sm:text-[13px]">
                      {isRTL
                        ? "استقبال في المطار وتأمين السكن الجامعي"
                        : "Airport Pickup & Guaranteed Student Housing"}
                    </strong>
                  </div>
                </div>
              </div>

              {/* Card 2: Official Google Maps Location Card (Agadir - Inzegane) */}
              <div className="rounded-3xl border border-slate-200/90 bg-white p-1.5 shadow-[0_16px_40px_-12px_rgba(11,27,61,0.08)] overflow-hidden relative transform-gpu">
                <div className="relative w-full h-[255px] sm:h-[270px] rounded-[20px] overflow-hidden bg-slate-100">
                  {/* Top-Right Floating Pill Badge (kept at right-3 so it never overlaps Google Maps' top-left place box) */}
                  <a
                    href="https://maps.app.goo.gl/BuLbU3tDXHJ3aFes7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-3 right-3 z-10 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-md text-[11px] sm:text-xs font-bold text-brand-navy hover:text-brand-electric transition-colors active:scale-95 whitespace-nowrap"
                  >
                    <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                    <span>
                      {isRTL
                        ? "مقرنا الرئيسي بأكادير (إنزكان)"
                        : "Main Headquarters — Agadir (Inezgane)"}
                    </span>
                  </a>

                  {/* Interactive Google Map Embed for Overseas Consulting */}
                  <iframe
                    title={
                      isRTL
                        ? "مقر M&A Overseas Consulting الرسمي على خرائط جوجل"
                        : "Official M&A Overseas Consulting Headquarters on Google Maps"
                    }
                    src={
                      isRTL
                        ? "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3441.879!2d-9.5358084!3d30.3625172!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdb3c7105accf743%3A0x28765ffbea4a762c!2zT3ZlcnNlYXMgQ29uc3VsdGluZyDZhNmE2K_Ysdin2LPYqSDZgdmKIOG7p9mE2K7Yp9ix2Kw!5e0!3m2!1sar!2sma!4v1729500000000!5m2!1sar!2sma"
                        : "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3441.879!2d-9.5358084!3d30.3625172!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdb3c7105accf743%3A0x28765ffbea4a762c!2zT3ZlcnNlYXMgQ29uc3VsdGluZyDZhNmE2K_Ysdin2LPYqSDZgdmKIOG7p9mE2K7Yp9ix2Kw!5e0!3m2!1sen!2sma!4v1729500000000!5m2!1sen!2sma"
                    }
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
      <footer className="bg-white/90 backdrop-blur-md border-t border-slate-200/80 py-6 text-xs text-slate-500 relative z-10 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          {/* Row 1: Official Offices & European Branches as Prestigious Pill Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs">
            {/* Headquarters (Agadir / Inezgane) */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-200/90 text-brand-navy shadow-2xs">
              <CountryFlag code="MA" size="sm" />
              <span className="font-bold">
                {isRTL ? "أكادير - إنزكان" : "Agadir - Inezgane"}
              </span>
              <span className="text-[11px] text-slate-500 font-normal">
                {isRTL
                  ? "(شارع مراكش - المقر الرئيسي)"
                  : "(Marrakech Ave - Main HQ)"}
              </span>
            </div>

            {/* Barcelona European Office */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/90 text-slate-700 shadow-2xs hover:border-brand-electric/40 transition-colors">
              <CountryFlag code="ES" size="sm" />
              <span className="font-bold text-brand-navy">
                {isRTL ? "برشلونة" : "Barcelona"}
              </span>
              <span className="text-[11px] text-slate-500 font-normal">
                {isRTL
                  ? "(إسبانيا - المكتب الأوروبي)"
                  : "(Spain - European Office)"}
              </span>
            </div>

            {/* Vilnius European Office */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/90 text-slate-700 shadow-2xs hover:border-brand-electric/40 transition-colors">
              <CountryFlag code="LT" size="sm" />
              <span className="font-bold text-brand-navy">
                {isRTL ? "فيلنيوس" : "Vilnius"}
              </span>
              <span className="text-[11px] text-slate-500 font-normal">
                {isRTL
                  ? "(ليتوانيا - المكتب الأوروبي)"
                  : "(Lithuania - European Office)"}
              </span>
            </div>
          </div>

          {/* Row 2: Bottom Sub-Bar (Copyright + Styled Social Pills) */}
          <div
            className={`pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-center ${
              isRTL ? "sm:text-right" : "sm:text-left"
            }`}
          >
            <p className="text-[11px] text-slate-400 font-medium">
              © {new Date().getFullYear()} M&A Overseas Consulting.{" "}
              {isRTL ? "جميع الحقوق محفوظة." : "All rights reserved."}
            </p>

            <div className="flex items-center gap-2">
              <a
                href="https://www.instagram.com/overseas_consulting_"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 hover:bg-pink-50 text-slate-600 hover:text-pink-600 border border-slate-200/70 text-[11px] font-semibold transition-all hover:scale-105 active:scale-95 shadow-2xs"
              >
                <InstagramIcon className="w-3.5 h-3.5 text-pink-500" />
                <span>{isRTL ? "انستغرام" : "Instagram"}</span>
              </a>
              <a
                href="https://www.facebook.com/centremaconsulting/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 hover:bg-blue-50 text-slate-600 hover:text-blue-600 border border-slate-200/70 text-[11px] font-semibold transition-all hover:scale-105 active:scale-95 shadow-2xs"
              >
                <FacebookIcon className="w-3.5 h-3.5 text-blue-600" />
                <span>{isRTL ? "فيسبوك" : "Facebook"}</span>
              </a>
              <a
                href="https://www.youtube.com/@ALI_IN_LITHUANIA"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 hover:bg-red-50 text-slate-600 hover:text-red-600 border border-slate-200/70 text-[11px] font-semibold transition-all hover:scale-105 active:scale-95 shadow-2xs"
              >
                <YoutubeIcon className="w-3.5 h-3.5 text-red-600" />
                <span>{isRTL ? "يوتيوب" : "YouTube"}</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
