"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Users,
  ChevronLeft,
  ChevronRight,
  X,
  MessageCircle,
} from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/effect-coverflow";
import { useLanguage, type Language } from "@/context/LanguageContext";

// Crisp SVG Instagram Icon
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

// Crisp SVG YouTube Icon
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

// Official Instagram Verified Badge SVG
function VerifiedBadge({ label }: { label: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-label={label}
      className="w-4 h-4 text-brand-electric fill-brand-electric shrink-0"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.2 14.6l-3.8-3.8 1.4-1.4 2.4 2.4 5.4-5.4 1.4 1.4-6.8 6.8z" />
    </svg>
  );
}

interface TeamMember {
  id: string;
  nameAr: string;
  nameEn: string;
  roleAr: string;
  roleEn: string;
  degreeBadgeAr: string;
  degreeBadgeEn: string;
  highlightsAr: string[];
  highlightsEn: string[];
  bioAr: string;
  bioEn: string;
  image: string;
  instagram: {
    handle: string;
    url: string;
    followers?: string;
  };
  youtube?: {
    handle: string;
    url: string;
  };
  isVerified: boolean;
}

const teamMembers: TeamMember[] = [
  {
    id: "ali",
    nameAr: "علي بنعمر",
    nameEn: "Ali Benamar",
    roleAr: "المؤسس ومستشار التعليم الدولي",
    roleEn: "Founder & International Education Advisor",
    degreeBadgeAr: "ماجستير في التسويق والتجارة الدولية",
    degreeBadgeEn: "M.Sc. in International Marketing & Trade",
    highlightsAr: [
      "ماجستير في التسويق والتجارة الدولية",
      "رئيس قسم الامتثال في شركة دولية",
      "خبير في إعداد ومراجعة الوثائق الأكاديمية والإدارية",
    ],
    highlightsEn: [
      "M.Sc. in International Marketing & Trade",
      "Head of Compliance at an International Company",
      "Expert in Academic & Administrative Document Review",
    ],
    bioAr:
      "يحمل علي بنعمر شهادة الماجستير في التسويق والتجارة الدولية، ويشغل حاليًا منصب رئيس قسم الامتثال في شركة دولية، حيث يتمتع بخبرة في مجال الأعمال الدولية والامتثال التنظيمي والإدارة الاستراتيجية، إضافةً إلى خبرته في إعداد الوثائق الإدارية والأكاديمية ومراجعتها ومتابعة الملفات. ومن خلال تأسيسه لشركة M&A Overseas Consulting، يسعى إلى مرافقة الطلبة وتوجيههم نحو الفرص الأكاديمية المناسبة في أوروبا، مع توفير الدعم اللازم لإعداد الوثائق واستكمال إجراءات التقديم والقبول الجامعي.",
    bioEn:
      "Ali Benamar holds a Master's degree in International Marketing and Trade and currently serves as Head of Compliance at an international company. He brings extensive expertise in international business, regulatory compliance, and strategic management, alongside deep hands-on experience in preparing, reviewing, and tracking administrative and academic files. Through founding M&A Overseas Consulting, he is dedicated to guiding students toward the right academic opportunities in Europe while providing full support in document preparation, university applications, and admission procedures.",
    image: "/team/ali_benamar.jpg",
    instagram: {
      handle: "benamar_a34",
      url: "https://www.instagram.com/benamar_a34/",
      followers: "19K+",
    },
    youtube: {
      handle: "ALI_IN_LITHUANIA",
      url: "https://www.youtube.com/@ALI_IN_LITHUANIA",
    },
    isVerified: true,
  },
  {
    id: "amine",
    nameAr: "محمد أمين جابون",
    nameEn: "M'Amine Jaboune",
    roleAr: "المدير التنفيذي ومستشار التعليم الدولي",
    roleEn: "Managing Director & International Education Advisor",
    degreeBadgeAr: "باحث دكتوراه • ماجستير علاقات دولية",
    degreeBadgeEn: "PhD Researcher • M.A. in International Relations",
    highlightsAr: [
      "باحث بسلك الدكتوراه في علوم التربية",
      "ماجستير في العلاقات الدولية",
      "مسؤول الشراكات الجامعية والتخطيط الأكاديمي",
    ],
    highlightsEn: [
      "PhD Researcher in Education Sciences",
      "Master's Degree in International Relations",
      "Head of University Partnerships & Academic Planning",
    ],
    bioAr:
      "يحمل محمد أمين جابون شهادة الماجستير في العلاقات الدولية، ويواصل حاليًا دراسته لنيل شهادة الدكتوراه في علوم التربية. وبصفته شريكًا مؤسسًا لشركة M&A Overseas Consulting، يساهم في رسم رؤيتها الاستراتيجية وتطوير خدماتها في مجال التعليم الدولي. كما يتولى مسؤولية بناء وتطوير الشراكات مع الجامعات والمؤسسات التعليمية الدولية، وتعزيز علاقات التعاون الأكاديمي بما يفتح آفاقًا تعليمية جديدة أمام الطلبة. ويشارك كذلك في التخطيط الأكاديمي وتوجيه الطلبة خلال مراحل التقديم والقبول الجامعي، ومساعدتهم على اختيار المسارات التعليمية التي تتناسب مع مؤهلاتهم وطموحاتهم المستقبلية.",
    bioEn:
      "M'Amine Jaboune holds a Master's degree in International Relations and is currently pursuing his PhD in Education Sciences. As Co-Founder of M&A Overseas Consulting, he helps shape the firm's strategic vision and expand its international education services. He leads the development of official partnerships with international universities and educational institutions, fostering academic cooperation that opens new horizons for students. He also participates in academic planning and guides students through every stage of application and admission to choose educational pathways aligned with their qualifications and future ambitions.",
    image: "/team/amine_jaboune.jpg",
    instagram: {
      handle: "amine_jaboune",
      url: "https://www.instagram.com/amine_jaboune/",
    },
    isVerified: true,
  },
  {
    id: "marouan",
    nameAr: "مروان بنعمر",
    nameEn: "Marouan Ben Amar",
    roleAr: "مدير العمليات والتنسيق الإداري",
    roleEn: "Director of Operations & Administrative Coordination",
    degreeBadgeAr: "ليسانس في العلوم الاقتصادية",
    degreeBadgeEn: "B.A. in Economic Sciences",
    highlightsAr: [
      "شهادة الليسانس في العلوم الاقتصادية",
      "الإشراف على تنسيق العمليات والإجراءات الإدارية",
      "متابعة ملفات القبول والتواصل مع الطلبة وعائلاتهم",
    ],
    highlightsEn: [
      "Bachelor's Degree in Economic Sciences",
      "Oversight of Operations & Administrative Procedures",
      "Admission File Tracking & Student/Family Coordination",
    ],
    bioAr:
      "يحمل مروان بنعمر شهادة الليسانس في العلوم الاقتصادية، ويتولى الإشراف على تنسيق العمليات ومتابعة الإجراءات الإدارية داخل الشركة. ويساهم في تنظيم ملفات الطلبة، ومتابعة وثائق القبول والتسجيل، وتنسيق التواصل مع الطلبة وعائلاتهم، بما يضمن سير الإجراءات بكفاءة وسلاسة ويوفر تجربة مرافقة منظمة طوال رحلتهم الدراسية.",
    bioEn:
      "Marouan Ben Amar holds a Bachelor's degree in Economic Sciences and oversees operational coordination and administrative procedures within the company. He manages the organization of student files, tracks admission and enrollment documents, and coordinates direct communication with students and their families—ensuring all procedures run smoothly and providing a well-structured guidance experience throughout their academic journey.",
    image: "/team/marouan_ben_amar.jpg",
    instagram: {
      handle: "marouan.ben.amar",
      url: "https://www.instagram.com/marouan.ben.amar/",
      followers: "6K+",
    },
    isVerified: true,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

// Reusable Pure Card UI used identically in both Desktop Grid and Mobile 3D Coverflow
function MemberCard({
  member,
  language,
  isRTL,
  onOpenBio,
}: {
  member: TeamMember;
  language: Language;
  isRTL: boolean;
  onOpenBio: (member: TeamMember) => void;
}) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const displayName = language === "ar" ? member.nameAr : member.nameEn;
  const displayRole = language === "ar" ? member.roleAr : member.roleEn;
  const displayDegree =
    language === "ar" ? member.degreeBadgeAr : member.degreeBadgeEn;
  const displayBio = language === "ar" ? member.bioAr : member.bioEn;
  const DirectionalArrow = isRTL ? ArrowLeft : ArrowRight;

  return (
    <div
      dir={isRTL ? "rtl" : "ltr"}
      className={`apple-glass rounded-3xl p-3 sm:p-3.5 flex flex-col justify-between h-full group hover:border-blue-300 hover:shadow-[0_16px_36px_-10px_rgba(37,99,235,0.14)] transition-all duration-300 select-none ${
        isRTL ? "text-right" : "text-left"
      }`}
    >
      {/* Outer Bezel Content */}
      <div>
        {/* Pure Portrait Image Frame (Clickable to open full bio) */}
        <div
          onClick={() => onOpenBio(member)}
          className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/80 mb-3 select-none cursor-pointer"
        >
          <Image
            src={member.image}
            alt={`${displayName} - ${displayRole}`}
            fill
            sizes="(max-width: 640px) 280px, (max-width: 1024px) 33vw, 240px"
            referrerPolicy="no-referrer"
            onLoad={() => setIsImageLoaded(true)}
            className={`object-cover object-top group-hover:scale-105 transition-[transform,opacity] duration-500 ease-out ${
              isImageLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>

        {/* Member Meta */}
        <div
          className={`space-y-1.5 px-1 ${isRTL ? "text-right" : "text-left"}`}
        >
          {/* Name + Verified Badge immediately following the name */}
          <div className="flex items-center gap-1.5 justify-start">
            <h4
              onClick={() => onOpenBio(member)}
              className="text-base font-bold text-brand-navy group-hover:text-brand-electric transition-colors duration-200 cursor-pointer"
            >
              {displayName}
            </h4>
            {member.isVerified && (
              <VerifiedBadge
                label={language === "ar" ? "حساب موثق" : "Verified Profile"}
              />
            )}
          </div>

          {/* Official Role */}
          <p className="text-xs font-semibold text-brand-electric leading-snug">
            {displayRole}
          </p>

          {/* Academic Credential Pill */}
          <div className="pt-0.5">
            <span className="inline-block text-[10.5px] font-medium text-slate-600 bg-slate-100/90 border border-slate-200/70 px-2 py-0.5 rounded-lg leading-tight">
              {displayDegree}
            </span>
          </div>

          {/* Clamped Full Bio Preview + Read More Trigger */}
          <div
            onClick={() => onOpenBio(member)}
            className="pt-1 cursor-pointer group/bio"
          >
            <p className="text-[11px] text-slate-500 font-normal leading-relaxed line-clamp-3">
              {displayBio}
            </p>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onOpenBio(member);
              }}
              className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-bold text-brand-electric group-hover/bio:text-brand-navy transition-colors cursor-pointer"
            >
              <span>
                {language === "ar" ? "اقرأ النبذة الكاملة" : "Read Full Bio"}
              </span>
              <DirectionalArrow
                className={`w-3 h-3 transition-transform ${
                  isRTL
                    ? "group-hover/bio:-translate-x-0.5"
                    : "group-hover/bio:translate-x-0.5"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Social Profile Footer Pill */}
      <div className="pt-3 mt-3 border-t border-slate-100 px-1 flex items-center gap-1.5">
        <a
          href={member.instagram.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 min-w-0 flex items-center justify-between py-1.5 px-2.5 rounded-xl bg-slate-50 hover:bg-blue-50/80 text-slate-600 hover:text-brand-electric transition-colors duration-150 text-[11px] font-semibold group/link"
          title={
            language === "ar"
              ? `زيارة حساب ${member.nameAr} على انستغرام`
              : `Visit ${member.nameEn}'s Instagram`
          }
        >
          <div className="flex items-center gap-1.5 min-w-0">
            <InstagramIcon className="w-3.5 h-3.5 text-slate-400 group-hover/link:text-brand-electric transition-colors shrink-0" />
            <span dir="ltr" className="tracking-tight truncate">
              @{member.instagram.handle}
            </span>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            {member.instagram.followers && (
              <span className="text-[10px] text-slate-400 font-medium">
                {member.instagram.followers}
              </span>
            )}
            <ExternalLink className="w-3 h-3 text-slate-300 group-hover/link:text-brand-electric transition-colors" />
          </div>
        </a>

        {member.youtube && (
          <a
            href={member.youtube.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={
              language === "ar"
                ? `قناة ${member.nameAr} الرسمية على يوتيوب`
                : `${member.nameEn}'s Official YouTube Channel`
            }
            title={
              language === "ar"
                ? `قناة ${member.nameAr} على يوتيوب (@${member.youtube.handle})`
                : `${member.nameEn} on YouTube (@${member.youtube.handle})`
            }
            className="w-7 h-7 rounded-xl bg-slate-50 hover:bg-red-50 text-slate-500 hover:text-[#DC2626] border border-transparent hover:border-red-100 flex items-center justify-center transition-colors duration-150 shrink-0"
          >
            <YoutubeIcon className="w-3.5 h-3.5" />
          </a>
        )}
      </div>
    </div>
  );
}

export function AboutTeam() {
  const { language, isRTL } = useLanguage();
  const [isMounted, setIsMounted] = useState(false);
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const mobileSwiperRef = useRef<SwiperType | null>(null);

  const DirectionalArrow = isRTL ? ArrowLeft : ArrowRight;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Lock body scroll when either Story Modal or Member Bio Modal is open
  useEffect(() => {
    if (isStoryModalOpen || selectedMember) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isStoryModalOpen, selectedMember]);

  // Handle ESC key to dismiss Modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsStoryModalOpen(false);
        setSelectedMember(null);
      }
    };
    if (isStoryModalOpen || selectedMember) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isStoryModalOpen, selectedMember]);

  return (
    <section
      id="about"
      dir={isRTL ? "rtl" : "ltr"}
      className="relative w-full pt-4 sm:pt-6 pb-12 sm:pb-16 overflow-hidden scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* ================================================================= */}
        {/* TOP EDITORIAL HEADER & VALUE PROPOSITION                          */}
        {/* ================================================================= */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="text-center max-w-4xl mx-auto mb-7 sm:mb-9"
        >
          {/* Section Title (Exact PartnersMarquee typographic style) */}
          <motion.h2
            variants={itemVariants}
            className="text-xl sm:text-2xl lg:text-3xl font-bold text-brand-navy tracking-tight"
          >
            {language === "ar"
              ? "خلف كل قبول جامعي ناجح... فريق ميداني يرافقك"
              : "Behind Every Successful Admission... An On-Ground Team Guiding You"}
          </motion.h2>

          {/* Subtitle (Exact PartnersMarquee typographic style) */}
          <motion.p
            variants={itemVariants}
            className="mt-2 text-xs sm:text-sm text-slate-500 font-medium max-w-xl mx-auto leading-relaxed"
          >
            {language === "ar"
              ? "مستشارون متواجدون ميدانياً بين المغرب وأوروبا لتأمين قبولك ومرافقتك باحترافية كاملة."
              : "Advisors operating on the ground between Morocco and Europe to secure your admission and guide you with complete professionalism."}
          </motion.p>
        </motion.div>

        {/* ================================================================= */}
        {/* THE ASYMMETRICAL ARCHITECTURAL BENTO GRID                         */}
        {/* ================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* --------------------------------------------------------------- */}
          {/* START COLUMN (Bento Authority & Trust Anchor - 5 cols)           */}
          {/* --------------------------------------------------------------- */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 flex flex-col gap-4"
          >
            {/* Primary Trust Anchor Card */}
            <div className="apple-glass rounded-3xl p-6 sm:p-7 relative overflow-hidden border border-slate-200/90 shadow-[0_12px_32px_-10px_rgba(11,27,61,0.06)]">
              {/* Subtle Ambient Radial Glow (Zero filter:blur GPU cost) */}
              <div
                aria-hidden="true"
                className={`absolute top-0 ${
                  isRTL ? "right-0" : "left-0"
                } w-48 h-48 rounded-full pointer-events-none`}
                style={{
                  background:
                    "radial-gradient(circle, rgba(37, 99, 235, 0.08) 0%, rgba(37, 99, 235, 0) 70%)",
                }}
              />

              <div
                className={`relative z-10 space-y-4 ${
                  isRTL ? "text-right" : "text-left"
                }`}
              >
                <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-brand-electric">
                  <ShieldCheck className="w-5 h-5 stroke-[2]" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg sm:text-xl font-bold text-brand-navy">
                    {language === "ar"
                      ? "من واقع التجربة إلى التأسيس"
                      : "Born from First-Hand Experience"}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {language === "ar"
                      ? "لم تُبنَ M&A Overseas Consulting من فراغ، بل انطلقت من تجربة ذاتية خاضها مؤسسونا (علي ومحمد أمين) خلال رحلتهما الدراسية في أوروبا. اختبرا حجم التحديات في أوراق القبول ومساطر التأشيرة، فجعلا من تلك المعاناة جسراً أميناً نرافق به مئات الطلاب اليوم خطوة بخطوة نحو مقاعدهم الجامعية."
                      : "M&A Overseas Consulting was born from the personal study-abroad journey of our founders (Ali and M'Amine) in Europe. Having experienced firsthand the complexities of admission paperwork and visa procedures, they turned those challenges into a trusted bridge—guiding hundreds of students step by step to their university seats today."}
                  </p>

                  <div className="pt-0.5">
                    <button
                      type="button"
                      onClick={() => setIsStoryModalOpen(true)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-electric hover:text-brand-navy active:scale-95 transition-all group cursor-pointer"
                    >
                      <span>
                        {language === "ar"
                          ? "اقرأ قصة التأسيس الكاملة"
                          : "Read Our Full Founding Story"}
                      </span>
                      <DirectionalArrow
                        className={`w-3.5 h-3.5 ${
                          isRTL
                            ? "group-hover:-translate-x-1"
                            : "group-hover:translate-x-1"
                        } transition-transform`}
                      />
                    </button>
                  </div>
                </div>

                {/* 3 Micro Trust Features */}
                <div className="pt-3 border-t border-slate-100 space-y-2.5">
                  <div className="flex items-start gap-2.5 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-brand-electric shrink-0 mt-0.5" />
                    <span>
                      {language === "ar" ? (
                        <>
                          <strong>مقر رسمي مرخص:</strong> إنزكان - شارع مراكش
                          (أكادير).
                        </>
                      ) : (
                        <>
                          <strong>Licensed Official HQ:</strong> Inezgane -
                          Marrakech Ave (Agadir).
                        </>
                      )}
                    </span>
                  </div>

                  <div className="flex items-start gap-2.5 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-brand-electric shrink-0 mt-0.5" />
                    <span>
                      {language === "ar" ? (
                        <>
                          <strong>حضور مباشر في أوروبا:</strong> مكاتب ومرافقة
                          ميدانية في إسبانيا (برشلونة) وليتوانيا (فيلنيوس).
                        </>
                      ) : (
                        <>
                          <strong>Direct Presence in Europe:</strong> On-ground
                          offices and support in Spain (Barcelona) and Lithuania
                          (Vilnius).
                        </>
                      )}
                    </span>
                  </div>

                  <div className="flex items-start gap-2.5 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-brand-electric shrink-0 mt-0.5" />
                    <span>
                      {language === "ar" ? (
                        <>
                          <strong>مرافقة شخصية دون وسطاء:</strong> نأخذ بيدك من
                          التوجيه واختيار التخصص حتى الاستقرار.
                        </>
                      ) : (
                        <>
                          <strong>Direct 1-on-1 Guidance:</strong> No
                          intermediaries—supporting you from choosing your major
                          until settling in.
                        </>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Micro Quick CTA Card (Desktop / PC View: exactly as originally designed) */}
            <div className="hidden sm:flex p-5 rounded-2xl bg-gradient-to-br from-brand-navy to-brand-navy-light text-white relative overflow-hidden shadow-sm items-center justify-between gap-4">
              <div
                className={`space-y-1 ${isRTL ? "text-right" : "text-left"}`}
              >
                <span className="text-[11px] font-bold text-brand-electric-light flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" />
                  <span>
                    {language === "ar"
                      ? "تواصل مباشر مع المؤسسين"
                      : "Direct Contact with the Founders"}
                  </span>
                </span>
                <p className="text-xs text-slate-200 font-medium">
                  {language === "ar"
                    ? "احجز جلسة توجيه مجانية لمناقشة تخصصك المناسب في أوروبا."
                    : "Book a free counseling session to discuss your ideal major in Europe."}
                </p>
              </div>

              <Link
                href="/postuler"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-white text-brand-navy hover:bg-brand-electric hover:text-white text-xs font-bold transition-all duration-200 shrink-0 group shadow-sm active:scale-95"
              >
                <span>{language === "ar" ? "احجز الآن" : "Book Now"}</span>
                <DirectionalArrow
                  className={`w-3.5 h-3.5 ${
                    isRTL
                      ? "group-hover:-translate-x-1"
                      : "group-hover:translate-x-1"
                  } transition-transform`}
                />
              </Link>
            </div>
          </motion.div>

          {/* --------------------------------------------------------------- */}
          {/* END COLUMN (The Leadership Trio - 7 cols)                        */}
          {/* --------------------------------------------------------------- */}
          <div className="lg:col-span-7 w-full">
            {/* ============================================================= */}
            {/* 1. DESKTOP & TABLET VIEW: Fixed 3-Column Bento Grid (>= 640px) */}
            {/* ============================================================= */}
            <div className="hidden sm:grid sm:grid-cols-3 gap-4 lg:gap-[18px]">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.12,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="h-full"
                >
                  <MemberCard
                    member={member}
                    language={language}
                    isRTL={isRTL}
                    onOpenBio={setSelectedMember}
                  />
                </motion.div>
              ))}
            </div>

            {/* ============================================================= */}
            {/* 2. MOBILE VIEW: 3D Coverflow Swipe Carousel (< 640px)          */}
            {/* ============================================================= */}
            <div className="block sm:hidden w-full">
              {isMounted && (
                <div
                  dir="ltr"
                  className="relative w-full overflow-hidden select-none py-1"
                >
                  {/* Top Minimalist Prev / Next Micro Arrows for Mobile */}
                  <div className="flex items-center justify-between px-2 mb-2">
                    <button
                      type="button"
                      onClick={() => mobileSwiperRef.current?.slidePrev()}
                      className="w-8 h-8 rounded-full bg-white border border-slate-200/90 text-brand-navy flex items-center justify-center active:scale-90 shadow-sm transition-transform"
                      aria-label={language === "ar" ? "السابق" : "Previous"}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    <span
                      className="text-[11px] font-bold text-slate-500 tabular-nums"
                      dir={isRTL ? "rtl" : "ltr"}
                    >
                      {language === "ar"
                        ? `${activeMobileIndex + 1} من ${teamMembers.length}`
                        : `${activeMobileIndex + 1} of ${teamMembers.length}`}
                    </span>

                    <button
                      type="button"
                      onClick={() => mobileSwiperRef.current?.slideNext()}
                      className="w-8 h-8 rounded-full bg-white border border-slate-200/90 text-brand-navy flex items-center justify-center active:scale-90 shadow-sm transition-transform"
                      aria-label={language === "ar" ? "التالي" : "Next"}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* 3D Coverflow Swiper */}
                  <Swiper
                    onSwiper={(swiper) => {
                      mobileSwiperRef.current = swiper;
                    }}
                    speed={420}
                    effect={"coverflow"}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={"auto"}
                    slideToClickedSlide={true}
                    initialSlide={0}
                    watchSlidesProgress={true}
                    coverflowEffect={{
                      rotate: 6,
                      stretch: 14,
                      depth: 90,
                      modifier: 1,
                      slideShadows: false,
                    }}
                    modules={[EffectCoverflow]}
                    className="w-full !overflow-visible [touch-action:pan-y]"
                    onSlideChange={(swiper) =>
                      setActiveMobileIndex(swiper.activeIndex)
                    }
                  >
                    {teamMembers.map((member) => (
                      <SwiperSlide key={member.id} className="!w-[272px]">
                        <MemberCard
                          member={member}
                          language={language}
                          isRTL={isRTL}
                          onOpenBio={setSelectedMember}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>

                  {/* 3 Interactive Pagination Dots Indicator */}
                  <div
                    className="flex items-center justify-center gap-1.5 mt-4"
                    aria-hidden="true"
                  >
                    {teamMembers.map((m, idx) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => mobileSwiperRef.current?.slideTo(idx)}
                        aria-label={
                          language === "ar"
                            ? `عرض بطاقة ${m.nameAr}`
                            : `View ${m.nameEn}`
                        }
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          activeMobileIndex === idx
                            ? "w-6 bg-brand-electric"
                            : "w-2 bg-slate-200 hover:bg-slate-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Only: Direct Consultation CTA Card placed under Team Swiper (<640px) */}
            <div className="block sm:hidden mt-4">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-brand-navy to-brand-navy-light text-white relative overflow-hidden shadow-sm flex flex-col items-center text-center gap-3.5">
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-brand-electric-light flex items-center justify-center gap-1.5">
                    <Users className="w-3.5 h-3.5" />
                    <span>
                      {language === "ar"
                        ? "تواصل مباشر مع المؤسسين"
                        : "Direct Contact with the Founders"}
                    </span>
                  </span>
                  <p className="text-xs text-slate-200 font-medium">
                    {language === "ar"
                      ? "احجز جلسة توجيه مجانية لمناقشة تخصصك المناسب في أوروبا."
                      : "Book a free counseling session to discuss your ideal major in Europe."}
                  </p>
                </div>

                <Link
                  href="/postuler"
                  className="w-full inline-flex items-center justify-center gap-1.5 px-6 py-2.5 rounded-full bg-white text-brand-navy hover:bg-brand-electric hover:text-white text-xs font-bold transition-all duration-200 shrink-0 group shadow-sm active:scale-95"
                >
                  <span>{language === "ar" ? "احجز الآن" : "Book Now"}</span>
                  <DirectionalArrow
                    className={`w-3.5 h-3.5 ${
                      isRTL
                        ? "group-hover:-translate-x-1"
                        : "group-hover:translate-x-1"
                    } transition-transform`}
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================================================================= */}
      {/* EXECUTIVE MEMBER BIO MODAL (FULL VERBATIM PROFILE & SWITCHER)      */}
      {/* ================================================================= */}
      <AnimatePresence>
        {selectedMember && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3.5 sm:p-6 overflow-x-hidden overflow-y-auto">
            {/* Backdrop Dimmer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSelectedMember(null)}
              className="fixed inset-0 bg-[#071228]/65 backdrop-blur-sm"
              aria-hidden="true"
            />

            {/* Modal Window Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="member-modal-title"
              className={`relative w-full max-w-xl max-h-[90vh] bg-white rounded-3xl sm:rounded-[32px] border border-slate-200/90 shadow-[0_24px_60px_-12px_rgba(11,27,61,0.3)] flex flex-col overflow-hidden ${
                isRTL ? "text-right" : "text-left"
              } z-10`}
              dir={isRTL ? "rtl" : "ltr"}
            >
              {/* Header Bar */}
              <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-slate-100 bg-slate-50/70 shrink-0">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-electric" />
                  <span className="text-xs font-bold text-brand-navy">
                    {language === "ar"
                      ? "البطاقة التعريفية والمهنية"
                      : "Executive & Academic Profile"}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedMember(null)}
                  className="p-1.5 rounded-full text-slate-400 hover:text-brand-navy hover:bg-slate-200/70 active:scale-90 transition-all cursor-pointer"
                  aria-label={language === "ar" ? "إغلاق النافذة" : "Close modal"}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Quick Team Switcher Tabs */}
              <div className="px-5 sm:px-6 pt-3.5 pb-1 bg-white border-b border-slate-100/80 shrink-0">
                <div className="grid grid-cols-3 gap-2">
                  {teamMembers.map((m) => {
                    const isActive = m.id === selectedMember.id;
                    const tabName = language === "ar" ? m.nameAr : m.nameEn;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setSelectedMember(m)}
                        className={`flex items-center gap-2 p-1.5 sm:p-2 rounded-2xl border ${
                          isRTL ? "text-right" : "text-left"
                        } transition-all cursor-pointer ${
                          isActive
                            ? "bg-blue-50/90 border-brand-electric/40 shadow-xs"
                            : "bg-slate-50/70 border-slate-200/70 hover:bg-slate-100/80 opacity-75 hover:opacity-100"
                        }`}
                      >
                        <div className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-xl overflow-hidden shrink-0 border border-white shadow-xs">
                          <Image
                            src={m.image}
                            alt={tabName}
                            fill
                            sizes="32px"
                            referrerPolicy="no-referrer"
                            className="object-cover object-top"
                          />
                        </div>
                        <span
                          className={`text-[11px] sm:text-xs font-bold truncate ${
                            isActive ? "text-brand-electric" : "text-brand-navy"
                          }`}
                        >
                          {tabName}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Scrollable Member Profile Body */}
              <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
                {/* Executive Identity Header */}
                <div className="flex items-center gap-4">
                  <div className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm shrink-0 bg-slate-100">
                    <Image
                      src={selectedMember.image}
                      alt={
                        language === "ar"
                          ? selectedMember.nameAr
                          : selectedMember.nameEn
                      }
                      fill
                      sizes="80px"
                      referrerPolicy="no-referrer"
                      className="object-cover object-top"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                      <h3
                        id="member-modal-title"
                        className="text-lg sm:text-xl font-bold text-brand-navy"
                      >
                        {language === "ar"
                          ? selectedMember.nameAr
                          : selectedMember.nameEn}
                      </h3>
                      {selectedMember.isVerified && (
                        <VerifiedBadge
                          label={
                            language === "ar" ? "حساب موثق" : "Verified Profile"
                          }
                        />
                      )}
                    </div>

                    <p className="text-xs sm:text-sm font-bold text-brand-electric">
                      {language === "ar"
                        ? selectedMember.roleAr
                        : selectedMember.roleEn}
                    </p>

                    <span className="inline-block text-[11px] font-medium text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-lg border border-slate-200/80">
                      {language === "ar"
                        ? selectedMember.degreeBadgeAr
                        : selectedMember.degreeBadgeEn}
                    </span>
                  </div>
                </div>

                {/* Full Verbatim Biography Box */}
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-50/90 border border-slate-200/80 space-y-2.5">
                  <h4 className="text-xs font-bold text-brand-navy flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-electric" />
                    <span>
                      {language === "ar"
                        ? "النبذة المهنية والأكاديمية"
                        : "Professional & Academic Biography"}
                    </span>
                  </h4>
                  <p className="text-xs sm:text-[14px] text-slate-700 leading-[1.9] font-normal">
                    {language === "ar"
                      ? selectedMember.bioAr
                      : selectedMember.bioEn}
                  </p>
                </div>

                {/* Key Highlights */}
                <div className="space-y-2">
                  <p className="text-[11px] font-bold text-slate-400">
                    {language === "ar"
                      ? "أبرز المؤهلات والمسؤوليات:"
                      : "Key Qualifications & Responsibilities:"}
                  </p>
                  <div className="grid grid-cols-1 gap-2">
                    {(language === "ar"
                      ? selectedMember.highlightsAr
                      : selectedMember.highlightsEn
                    ).map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-2 text-xs text-slate-700 font-medium"
                      >
                        <CheckCircle2 className="w-4 h-4 text-brand-electric shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50/70 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
                <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                  <Link
                    href="/postuler"
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-white bg-brand-navy hover:bg-brand-electric active:scale-95 transition-all shadow-sm"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-brand-electric-light" />
                    <span>
                      {language === "ar"
                        ? "احجز استشارتك الآن"
                        : "Book Your Consultation"}
                    </span>
                    <DirectionalArrow className="w-3.5 h-3.5" />
                  </Link>

                  <a
                    href={selectedMember.instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-full bg-white border border-slate-200/90 text-slate-600 hover:text-brand-electric text-xs font-semibold transition-colors"
                  >
                    <InstagramIcon className="w-3.5 h-3.5" />
                    <span dir="ltr">@{selectedMember.instagram.handle}</span>
                  </a>

                  {selectedMember.youtube && (
                    <a
                      href={selectedMember.youtube.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-full bg-white border border-slate-200/90 text-slate-600 hover:text-[#DC2626] hover:border-red-200 text-xs font-semibold transition-colors"
                    >
                      <YoutubeIcon className="w-3.5 h-3.5" />
                      <span dir="ltr">@{selectedMember.youtube.handle}</span>
                    </a>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedMember(null)}
                  className="w-full sm:w-auto px-4 py-2 rounded-full text-xs font-semibold text-slate-500 hover:bg-slate-200/70 active:scale-95 transition-all cursor-pointer"
                >
                  {language === "ar" ? "إغلاق" : "Close"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ================================================================= */}
      {/* HIGH-END STORY MODAL (APPLE-GRADE LIQUID GLASS OVERLAY)           */}
      {/* ================================================================= */}
      <AnimatePresence>
        {isStoryModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3.5 sm:p-6 overflow-x-hidden overflow-y-auto">
            {/* Backdrop Dimmer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsStoryModalOpen(false)}
              className="fixed inset-0 bg-[#071228]/65 backdrop-blur-sm"
              aria-hidden="true"
            />

            {/* Modal Window Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="story-modal-title"
              className={`relative w-full max-w-2xl max-h-[90vh] bg-white rounded-3xl sm:rounded-[32px] border border-slate-200/90 shadow-[0_24px_60px_-12px_rgba(11,27,61,0.3)] flex flex-col overflow-hidden ${
                isRTL ? "text-right" : "text-left"
              } z-10`}
              dir={isRTL ? "rtl" : "ltr"}
            >
              {/* Header Bar */}
              <div className="flex items-center justify-between px-5 sm:px-7 py-4 sm:py-5 border-b border-slate-100 bg-slate-50/70 shrink-0">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-electric animate-pulse" />
                  <span className="text-xs font-bold text-brand-navy">
                    {language === "ar"
                      ? "عن M&A Overseas Consulting"
                      : "About M&A Overseas Consulting"}
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="text-[11px] font-semibold text-slate-500">
                    {language === "ar" ? "قصة التأسيس" : "Our Founding Story"}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setIsStoryModalOpen(false)}
                  className="p-1.5 rounded-full text-slate-400 hover:text-brand-navy hover:bg-slate-200/70 active:scale-90 transition-all cursor-pointer"
                  aria-label={language === "ar" ? "إغلاق النافذة" : "Close modal"}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Story Body */}
              <div className="p-5 sm:p-7 overflow-y-auto space-y-5">
                {/* Visual Identity Capsule: Founders Cluster */}
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-blue-50/70 border border-blue-100/80">
                  <div
                    className={`flex ${
                      isRTL ? "-space-x-2 space-x-reverse" : "-space-x-2"
                    } overflow-hidden shrink-0`}
                  >
                    {teamMembers.map((m) => (
                      <div
                        key={m.id}
                        className="relative w-9 h-9 rounded-full overflow-hidden border-2 border-white shadow-sm"
                      >
                        <Image
                          src={m.image}
                          alt={language === "ar" ? m.nameAr : m.nameEn}
                          fill
                          sizes="36px"
                          referrerPolicy="no-referrer"
                          className="object-cover object-top"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-brand-navy">
                      {language === "ar"
                        ? "فريق قيادة M&A Overseas Consulting"
                        : "M&A Overseas Consulting Leadership Team"}
                    </p>
                    <p className="text-[11px] text-slate-500 font-medium">
                      {language === "ar"
                        ? "علي بنعمر • محمد أمين جابون • مروان بنعمر"
                        : "Ali Benamar • M'Amine Jaboune • Marouan Ben Amar"}
                    </p>
                  </div>
                </div>

                {/* Main Heading */}
                <h3
                  id="story-modal-title"
                  className="text-lg sm:text-2xl font-bold text-brand-navy tracking-tight leading-snug"
                >
                  {language === "ar"
                    ? "من واقع التجربة إلى التأسيس: كيف تحولت المعاناة إلى جسر أمين؟"
                    : "From Personal Experience to Foundation: Turning Challenges into a Trusted Bridge"}
                </h3>

                {/* Paragraphs */}
                <div className="space-y-3.5 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  <p>
                    {language === "ar" ? (
                      <>
                        تُعتبر <strong>M&A Overseas Consulting</strong> وجهتك
                        الأولى والموثوقة للتوجيه الأكاديمي الدولي، حيث نكرس
                        خبراتنا الميدانية لمساعدة الطلاب على الالتحاق بأبرز
                        الجامعات والأكاديميات الأوروبية. تسعى رؤيتنا إلى جعل
                        التعليم العالي عالمي المستوى في متناول اليد، عبر تقديم
                        حلول متكاملة واستشارات مخصصة تلبي طموح كل طالب وعائلته.
                      </>
                    ) : (
                      <>
                        <strong>M&A Overseas Consulting</strong> is your premier
                        and trusted partner for international academic guidance,
                        dedicating our on-ground expertise to helping students
                        enroll at leading European universities and academies.
                        Our vision is to make world-class higher education
                        accessible through end-to-end solutions and tailored
                        counseling that fulfill the ambitions of every student
                        and their family.
                      </>
                    )}
                  </p>

                  <div
                    className={`p-3.5 rounded-2xl bg-slate-50 ${
                      isRTL
                        ? "border-r-4 border-brand-electric border-y border-l"
                        : "border-l-4 border-brand-electric border-y border-r"
                    } border-slate-100 text-slate-700 italic`}
                  >
                    {language === "ar"
                      ? "«لم تُبْنَ M&A من فراغ، بل انطلقت من واقع تجربة ذاتية خاضها كل من علي ومحمد أمين أثناء رحلتهما الدراسية في الخارج. فقد اختبرا بنفسيهما حجم التحديات والمتاعب التي تواجه الشباب الراغبين في الهجرة التعليمية — بدءاً من تعقيدات أوراق القبول، ووصولاً إلى مساطر الفيزا وخطوات الاستقرار الأولية.»"
                      : "“M&A was not built out of nowhere—it grew directly out of the personal journey experienced by Ali and M'Amine during their own studies abroad. They experienced firsthand the obstacles facing young students pursuing international education—from complex admission paperwork to visa procedures and initial settlement challenges.”"}
                  </div>

                  <p>
                    {language === "ar"
                      ? "دفعهما هذا التحدي الشخصي إلى تأسيس منصة استشارية متخصصة تُشكل جسراً أميناً بين الطلاب وأحلامهم الأكاديمية في أوروبا. نحن لا نكتفي بتقديم النصح النظري، بل نأخذ بيد الطالب خطوة بخطوة، بدءاً من رسم الخطة الدراسية المناسبة واختيار التخصص والجامعة، ووصولاً إلى تأمين المقعد الجامعي والمنح التنافسية وتجهيز ملف التأشيرة باحترافية تامة."
                      : "This personal challenge inspired them to establish a specialized consulting agency that serves as a reliable bridge between students and their academic dreams in Europe. We go far beyond theoretical advice—guiding each student step by step from designing the right study plan and selecting the ideal major and university, to securing official admission, competitive scholarships, and a professionally prepared visa file."}
                  </p>

                  <p>
                    {language === "ar"
                      ? "بفضل هذه الرؤية الميدانية الشاملة وتواجدنا الفعلي بين المغرب وأوروبا، تفخر مؤسستنا اليوم بتقديم الدعم لمئات الطلاب مع المحافظة على نسبة نجاح عالية في استصدار القبولات وتأشيرات السفر، لنظل الخيار الأمثل والداعم الأول لرحلتك نحو النجاح والتميز."
                      : "Thanks to this comprehensive on-ground approach and our active presence across both Morocco and Europe, we are proud to support hundreds of students while maintaining an exceptional success rate in university admissions and student visas—remaining your trusted partner on the path to academic excellence."}
                  </p>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50/70 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
                <Link
                  href="/postuler"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold text-white bg-brand-navy hover:bg-brand-electric active:scale-95 transition-all shadow-sm"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-brand-electric-light" />
                  <span>
                    {language === "ar"
                      ? "احجز استشارتك مع المؤسسين"
                      : "Book a Consultation with the Founders"}
                  </span>
                  <DirectionalArrow className="w-3.5 h-3.5" />
                </Link>

                <button
                  type="button"
                  onClick={() => setIsStoryModalOpen(false)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full text-xs font-semibold text-slate-600 hover:bg-slate-200/70 active:scale-95 transition-all cursor-pointer"
                >
                  {language === "ar" ? "إغلاق" : "Close"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
