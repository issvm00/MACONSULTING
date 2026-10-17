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
    id: 6,
    logo: "/partners/6.jpeg",
    name: "University of Sopron",
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
  {
    id: 4,
    logo: "/partners/4.jpeg",
    name: "SEDA College",
    subtitle: "Ireland & Malta",
    type: "badge",
  },
];

export function PartnersMarquee() {
  // 4 identical sets (24 items total) ensure continuous >5,000px width for infinite zero-gap loop
  const infinitePartners = [
    ...partners,
    ...partners,
    ...partners,
    ...partners,
  ];

  return (
    <section className="relative w-full pt-4 pb-12 sm:pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8 text-center">
        {/* Section Title */}
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-brand-navy tracking-tight">
          شراكات أكاديمية مع كبرى الجامعات الأوروبية
        </h2>

        {/* Subtitle */}
        <p className="mt-2 text-xs sm:text-sm text-slate-500 font-medium max-w-xl mx-auto leading-relaxed">
          دبلومات وبكالوريوس وماستر معترف بها رسمياً في المغرب والجزائر وكافة دول فضاء شنغن
        </p>
      </div>

      {/* Infinite Horizontal Marquee Container with Apple Glass Transparency Mask */}
      <div dir="ltr" className="relative w-full overflow-hidden select-none marquee-mask group">
        
        {/* Apple Frosted Glass Edge Refraction (Left Edge) */}
        <div 
          aria-hidden="true" 
          className="absolute top-0 left-0 bottom-0 w-12 sm:w-20 z-10 pointer-events-none backdrop-blur-[4px] [mask-image:linear-gradient(to_right,black,transparent)]" 
        />

        {/* Apple Frosted Glass Edge Refraction (Right Edge) */}
        <div 
          aria-hidden="true" 
          className="absolute top-0 right-0 bottom-0 w-12 sm:w-20 z-10 pointer-events-none backdrop-blur-[4px] [mask-image:linear-gradient(to_left,black,transparent)]" 
        />

        {/* Continuous Seamless Infinite Track */}
        <div className="animate-marquee-infinite flex items-center gap-4 sm:gap-5 py-3">
          {infinitePartners.map((partner, index) => (
            <div
              key={`${partner.id}-${index}`}
              className="apple-glass relative flex items-center justify-center h-16 sm:h-18 px-5 sm:px-6 rounded-2xl flex-shrink-0 cursor-pointer"
            >
              {partner.type === "badge" ? (
                /* Square Emblem Badge with Typography */
                <div className="flex items-center gap-3">
                  <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl overflow-hidden shadow-2xs border border-slate-100 flex-shrink-0 bg-slate-50">
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      fill
                      className="object-cover"
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
                /* Wide Horizontal University Logo in Authentic Colors */
                <div className="relative w-28 sm:w-34 h-8 sm:h-9 flex items-center justify-center">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    sizes="(max-width: 640px) 112px, 136px"
                    className="object-contain mix-blend-multiply opacity-85 hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
