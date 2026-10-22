"use client";

import React from "react";
import Image from "next/image";

interface Partner {
  id: number;
  logo: string;
  name: string;
  subtitle?: string;
  type: "horizontal" | "badge";
}

const partners: Partner[] = [
  {
    id: 1,
    logo: "/partners/1.jpeg",
    name: "Széchenyi István Egyetem",
    type: "horizontal",
  },
  {
    id: 11,
    logo: "/partners/11.png",
    name: "Vilnius University",
    type: "horizontal",
  },
  {
    id: 7,
    logo: "/partners/7.jpeg",
    name: "Budapest Metropolitan",
    subtitle: "University",
    type: "badge",
  },
  {
    id: 5,
    logo: "/partners/5.jpeg",
    name: "Vilnius Tech",
    type: "horizontal",
  },
  {
    id: 17,
    logo: "/partners/17.jpeg",
    name: "Vytautas Magnus",
    subtitle: "University",
    type: "badge",
  },
  {
    id: 15,
    logo: "/partners/15.jpeg",
    name: "University of Bucharest",
    type: "horizontal",
  },
  {
    id: 9,
    logo: "/partners/9.jpeg",
    name: "Mykolas Romeris",
    subtitle: "University",
    type: "badge",
  },
  {
    id: 6,
    logo: "/partners/6.jpeg",
    name: "University of Sopron",
    type: "horizontal",
  },
  {
    id: 10,
    logo: "/partners/10.jpeg",
    name: "SMK College",
    subtitle: "Applied Sciences",
    type: "badge",
  },
  {
    id: 16,
    logo: "/partners/16.jpeg",
    name: "Universitatea Babeș-Bolyai",
    type: "horizontal",
  },
  {
    id: 4,
    logo: "/partners/4.jpeg",
    name: "SEDA College",
    subtitle: "Ireland & Malta",
    type: "badge",
  },
  {
    id: 8,
    logo: "/partners/8.jpeg",
    name: "University of Pannonia",
    type: "horizontal",
  },
  {
    id: 13,
    logo: "/partners/13.jpeg",
    name: "Panevėžio Kolegija",
    subtitle: "Applied Sciences",
    type: "badge",
  },
  {
    id: 14,
    logo: "/partners/14.jpeg",
    name: "inlingua Malta",
    type: "horizontal",
  },
  {
    id: 18,
    logo: "/partners/18.jpeg",
    name: "Kauno Kolegija",
    type: "horizontal",
  },
  {
    id: 2,
    logo: "/partners/2.jpeg",
    name: "Atlas Language School",
    type: "horizontal",
  },
  {
    id: 3,
    logo: "/partners/3.jpeg",
    name: "Instituto Hispánico de Murcia",
    type: "horizontal",
  },
];

// Single complete set per half-track provides over 3,500px width, guaranteeing 0.00px loop jump
const halfTrackPartners: Partner[] = partners;

export function PartnersMarquee() {
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const [isInView, setIsInView] = React.useState(true);

  React.useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { rootMargin: "100px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const renderPartnerCard = (partner: Partner, keyPrefix: string, index: number) => (
    <div
      key={`${keyPrefix}-${partner.id}-${index}`}
      className="apple-glass relative flex items-center justify-center h-16 sm:h-[72px] px-5 sm:px-6 rounded-2xl flex-shrink-0 cursor-pointer"
    >
      {partner.type === "badge" ? (
        /* Square Emblem Badge with Typography */
        <div className="flex items-center gap-3">
          <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl overflow-hidden shadow-sm border border-slate-100 flex-shrink-0 bg-white">
            <Image
              src={partner.logo}
              alt={partner.name}
              fill
              sizes="40px"
              referrerPolicy="no-referrer"
              className="object-contain p-0.5"
            />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xs font-bold text-brand-navy tracking-tight whitespace-nowrap">
              {partner.name}
            </span>
            {partner.subtitle && (
              <span className="text-[10px] text-slate-400 font-semibold tracking-tight whitespace-nowrap">
                {partner.subtitle}
              </span>
            )}
          </div>
        </div>
      ) : (
        /* Wide Horizontal University Logo in Authentic Colors (Zero mix-blend-multiply GPU overhead) */
        <div className="relative w-28 sm:w-36 h-8 sm:h-9 flex items-center justify-center">
          <Image
            src={partner.logo}
            alt={partner.name}
            fill
            sizes="(max-width: 640px) 112px, 144px"
            referrerPolicy="no-referrer"
            className="object-contain opacity-90 hover:opacity-100 transition-opacity duration-200"
          />
        </div>
      )}
    </div>
  );

  return (
    <section
      ref={sectionRef}
      id="partners"
      className="relative w-full pt-4 pb-8 sm:pb-10 overflow-x-clip scroll-mt-24 sm:scroll-mt-28"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8 text-center">
        {/* Section Title */}
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-brand-navy tracking-tight">
          شراكات رسمية مع أفضل الجامعات والمعاهد الأوروبية
        </h2>

        {/* Subtitle */}
        <p className="mt-2 text-xs sm:text-sm text-slate-500 font-medium max-w-xl mx-auto leading-relaxed">
          شهادات جامعية ودبلومات معترف بها رسمياً في المغرب، الجزائر، وكافة دول أوروبا.
        </p>
      </div>

      {/* Infinite Horizontal Marquee Container with Static GPU-Cached Horizon Fades */}
      <div dir="ltr" className="relative w-full overflow-hidden select-none">
        {/* Left & Right Horizon Edge Fades (Zero per-frame mask-image alpha buffer cost) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-10 sm:w-24 z-10 bg-gradient-to-r from-[#FAFBFD] to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-10 sm:w-24 z-10 bg-gradient-to-l from-[#FAFBFD] to-transparent"
        />

        {/* Continuous Seamless Infinite Track (Pauses automatically when offscreen) */}
        <div
          className="animate-marquee-infinite flex items-center py-3"
          style={{
            animationDuration: "54s",
            animationPlayState: isInView ? undefined : "paused",
          }}
        >
          <div className="flex items-center gap-4 sm:gap-5 pr-4 sm:pr-5 shrink-0">
            {halfTrackPartners.map((partner, index) =>
              renderPartnerCard(partner, "track-a", index)
            )}
          </div>
          <div
            aria-hidden="true"
            className="flex items-center gap-4 sm:gap-5 pr-4 sm:pr-5 shrink-0"
          >
            {halfTrackPartners.map((partner, index) =>
              renderPartnerCard(partner, "track-b", index)
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

