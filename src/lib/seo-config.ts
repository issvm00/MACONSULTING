export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.APP_URL ||
  "https://overseas-consulting.com";

export const SITE_NAME = "M&A OVERSEAS CONSULTING";
export const OFFICIAL_EMAIL = "info@overseas-consulting.com";
export const GOOGLE_MAPS_URL = "https://maps.app.goo.gl/6TZ6Wq55QJyhE9yf7";

export const DEFAULT_TITLE_AR =
  "M&A OVERSEAS CONSULTING | الدراسة في أوروبا - قبول جامعي مضمون وفيزا";
export const DEFAULT_TITLE_EN =
  "M&A OVERSEAS CONSULTING | Study in Europe - Guaranteed Admission & Visa";

export const DEFAULT_DESCRIPTION_AR =
  "مكتب معتمد للاستشارات التعليمية ومرافقة الطلاب للدراسة في أوروبا (ليتوانيا، رومانيا، إيطاليا، إسبانيا، المجر، مالطا، أيرلندا). قبول جامعي مضمون خلال 10-20 يوماً، ملف الفيزا، السكن والاستقبال في المطار.";

export const DEFAULT_DESCRIPTION_EN =
  "Certified international education consultancy guiding students across Morocco, Algeria, and the Arab World to study in Europe (Lithuania, Romania, Italy, Spain, Hungary, Malta, Ireland) with 100% guaranteed admission and visa support.";

export const SEO_KEYWORDS = [
  // Arabic Keywords (High-Intent Study in Europe Queries)
  "الدراسة في أوروبا",
  "مكتب الدراسة في الخارج",
  "الدراسة في ليتوانيا",
  "الدراسة في رومانيا",
  "الدراسة في إيطاليا",
  "الدراسة في إسبانيا",
  "الدراسة في المجر",
  "الدراسة في هنغاريا",
  "الدراسة في مالطا",
  "الدراسة في أيرلندا",
  "الدراسة في أوروبا للمغاربة",
  "الدراسة في أوروبا للجزائريين",
  "الدراسة في ليتوانيا للمغاربة",
  "الدراسة في رومانيا للمغاربة",
  "قبول جامعي مضمون في أوروبا",
  "فيزا الدراسة في أوروبا",
  "منح دراسية في أوروبا",
  "تكلفة الدراسة في ليتوانيا",
  "تكلفة الدراسة في أوروبا",
  "مكتب استشارات تعليمية أكادير",
  "مكتب الدراسة بالخارج إنزكان أكادير",
  "علي بنعمر ليتوانيا",
  "محمد أمين جابون",
  "مروان بنعمر",
  // English & French Search Queries
  "M&A Overseas Consulting",
  "overseas-consulting.com",
  "Study in Europe from Morocco",
  "Study in Europe from Algeria",
  "Study in Lithuania",
  "Study in Romania",
  "Study in Italy",
  "Study in Spain",
  "Study in Hungary",
  "Study in Malta",
  "Study in Ireland",
  "European university admission agency Morocco",
  "Etudier en Europe Maroc",
  "Etudier en Lituanie Maroc",
  "Etudier en Roumanie Maroc",
  "Agence études à l'étranger Agadir",
  "Ali Benamar Lithuania",
];

export const DESTINATIONS_SEO = [
  {
    code: "LT",
    nameAr: "ليتوانيا",
    nameEn: "Lithuania",
    cityAr: "فيلنيوس وكاوناس",
    cityEn: "Vilnius & Kaunas",
    tuitionRange: "€2,000 - €4,500 / year",
    livingCost: "€350 - €500 / month",
  },
  {
    code: "RO",
    nameAr: "رومانيا",
    nameEn: "Romania",
    cityAr: "بوخارست وكلوج نابوكا",
    cityEn: "Bucharest & Cluj-Napoca",
    tuitionRange: "€2,500 - €5,000 / year",
    livingCost: "€300 - €450 / month",
  },
  {
    code: "IT",
    nameAr: "إيطاليا",
    nameEn: "Italy",
    cityAr: "ميلانو وروما",
    cityEn: "Milan & Rome",
    tuitionRange: "€1,500 - €4,000 / year",
    livingCost: "€450 - €650 / month",
  },
  {
    code: "ES",
    nameAr: "إسبانيا",
    nameEn: "Spain",
    cityAr: "برشلونة ومدريد",
    cityEn: "Barcelona & Madrid",
    tuitionRange: "€2,500 - €5,500 / year",
    livingCost: "€450 - €650 / month",
  },
  {
    code: "HU",
    nameAr: "المجر (هنغاريا)",
    nameEn: "Hungary",
    cityAr: "بودابست وديبريسين",
    cityEn: "Budapest & Debrecen",
    tuitionRange: "€3,000 - €5,500 / year",
    livingCost: "€350 - €500 / month",
  },
  {
    code: "MT",
    nameAr: "مالطا",
    nameEn: "Malta",
    cityAr: "فاليتا",
    cityEn: "Valletta",
    tuitionRange: "€3,500 - €6,000 / year",
    livingCost: "€450 - €600 / month",
  },
  {
    code: "IE",
    nameAr: "أيرلندا",
    nameEn: "Ireland",
    cityAr: "دبلن",
    cityEn: "Dublin",
    tuitionRange: "€4,500 - €9,000 / year",
    livingCost: "€600 - €850 / month",
  },
];

export const STUDENT_VIDEOS_SEO = [
  {
    id: 1,
    title: "الدراسة بأوروبا بأقل من 3000€ سنوياً مع M&A Overseas Consulting",
    description:
      "دليل شامل حول كيفية الدراسة في جامعات أوروبا المعتمدة بتكلفة أقل من 3000 يورو سنوياً مع ضمان القبول الجامعي والمرافقة الكاملة.",
    thumbnailUrl: `${SITE_URL}/thumbnails/vid%201.webp`,
    contentUrl: `${SITE_URL}/videos/vid%201.mp4`,
    uploadDate: "2025-01-15T10:00:00+00:00",
  },
  {
    id: 2,
    title: "شرط اللغة الإنجليزية للدراسة بالخارج والبدائل المتاحة بدون IELTS",
    description:
      "شرح تفصيلي لشرط اللغة الإنجليزية للدراسة في أوروبا وكيف يمكنك الحصول على قبول جامعي عبر مقابلة تقييمية أو سنة تحضيرية بدون شهادة IELTS أو TOEFL.",
    thumbnailUrl: `${SITE_URL}/thumbnails/vid%202.webp`,
    contentUrl: `${SITE_URL}/videos/vid%202.mp4`,
    uploadDate: "2025-01-20T10:00:00+00:00",
  },
  {
    id: 3,
    title: "الدراسة في ليتوانيا بأقل التكاليف للطلاب من المغرب والجزائر",
    description:
      "كل ما تحتاج معرفته حول الدراسة في ليتوانيا (فيلنيوس وكاوناس): التخصصات المتاحة، تكاليف الدراسة والمعيشة، وفرص العمل للطلاب الدوليين.",
    thumbnailUrl: `${SITE_URL}/thumbnails/vid%203.webp`,
    contentUrl: `${SITE_URL}/videos/vid%203.mp4`,
    uploadDate: "2025-02-01T10:00:00+00:00",
  },
  {
    id: 4,
    title: "نصائح هامة قبل انتهاء فترة التقديم والقبول الجامعي في أوروبا",
    description:
      "توجيهات أساسية للطلاب الراغبين في التسجيل بالجامعات الأوروبية لضمان استخراج القبول الرسمي في الوقت المناسب وتجهيز ملف التأشيرة.",
    thumbnailUrl: `${SITE_URL}/thumbnails/vid%204.webp`,
    contentUrl: `${SITE_URL}/videos/vid%204.mp4`,
    uploadDate: "2025-02-10T10:00:00+00:00",
  },
  {
    id: 5,
    title: "تجربة الدراسة في الخارج والمرافقة الميدانية مع M&A Overseas Consulting",
    description:
      "شهادات وتجارب حية لطلابنا في أوروبا منذ لحظة الاستشارة والقبول حتى الاستقبال في المطار والسكن الجامعي.",
    thumbnailUrl: `${SITE_URL}/thumbnails/vid%205.webp`,
    contentUrl: `${SITE_URL}/videos/vid%205.mp4`,
    uploadDate: "2025-02-18T10:00:00+00:00",
  },
  {
    id: 6,
    title: "الدراسة بالجامعات المجرية (هنغاريا) — الشروط، التخصصات والتكاليف",
    description:
      "دليل الدراسة في المجر (بودابست وديبريسين): جودة التعليم الأوروبي، الشهادات المعترف بها، وتكاليف السكن والمعيشة.",
    thumbnailUrl: `${SITE_URL}/thumbnails/vid%206.webp`,
    contentUrl: `${SITE_URL}/videos/vid%206.mp4`,
    uploadDate: "2025-02-25T10:00:00+00:00",
  },
  {
    id: 7,
    title: "الحصول على إقامة أوروبية وفيزا الدراسة بنسبة نجاح عالية",
    description:
      "خطوات إعداد ملف الفيزا القانوني واستخراج بطاقة الإقامة الدراسية في الاتحاد الأوروبي مع خبراء M&A Overseas Consulting.",
    thumbnailUrl: `${SITE_URL}/thumbnails/vid%207.webp`,
    contentUrl: `${SITE_URL}/videos/vid%207.mp4`,
    uploadDate: "2025-03-05T10:00:00+00:00",
  },
];

export function getHomeJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      // 1. Primary EducationalOrganization & LocalBusiness Entity (Knowledge Graph & Local SEO Anchor)
      {
        "@type": [
          "EducationalOrganization",
          "ProfessionalService",
          "LocalBusiness",
        ],
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        alternateName: [
          "M&A Overseas Consulting",
          "Centre M&A Consulting",
          "مكتب M&A للدراسة في أوروبا",
        ],
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          "@id": `${SITE_URL}/#logo`,
          url: `${SITE_URL}/logo/logo.png`,
          contentUrl: `${SITE_URL}/logo/logo.png`,
          caption: SITE_NAME,
        },
        image: `${SITE_URL}/hero-image.png`,
        description: DEFAULT_DESCRIPTION_AR,
        slogan:
          "طريقك نحو الدراسة في أوروبا - قبول جامعي مضمون ومرافقة ميدانية من التوجيه حتى الاستقرار",
        email: OFFICIAL_EMAIL,
        telephone: ["+37066059704", "+212775496303"],
        priceRange: "$$",
        hasMap: GOOGLE_MAPS_URL,
        geo: {
          "@type": "GeoCoordinates",
          latitude: 30.3558,
          longitude: -9.5364,
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
            ],
            opens: "09:00",
            closes: "18:00",
          },
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: "Saturday",
            opens: "09:00",
            closes: "14:00",
          },
        ],
        address: {
          "@type": "PostalAddress",
          streetAddress: "شارع مراكش، إنزكان (Marrakech Avenue, Inezgane)",
          addressLocality: "Agadir - Inezgane",
          addressRegion: "Souss-Massa",
          addressCountry: "MA",
        },
        location: [
          {
            "@type": "Place",
            name: "M&A Overseas Consulting - Headquarters (Agadir, Morocco)",
            hasMap: GOOGLE_MAPS_URL,
            address: {
              "@type": "PostalAddress",
              streetAddress: "Avenue Marrakech, Inezgane",
              addressLocality: "Agadir",
              addressRegion: "Souss-Massa",
              addressCountry: "MA",
            },
          },
          {
            "@type": "Place",
            name: "M&A Overseas Consulting - Lithuania Office (Vilnius)",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Vilnius",
              addressCountry: "LT",
            },
          },
          {
            "@type": "Place",
            name: "M&A Overseas Consulting - Spain Office (Barcelona)",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Barcelona",
              addressCountry: "ES",
            },
          },
        ],
        areaServed: [
          { "@type": "Country", name: "Morocco" },
          { "@type": "Country", name: "Algeria" },
          { "@type": "Country", name: "Tunisia" },
          { "@type": "Country", name: "Lithuania" },
          { "@type": "Country", name: "Romania" },
          { "@type": "Country", name: "Italy" },
          { "@type": "Country", name: "Spain" },
          { "@type": "Country", name: "Hungary" },
          { "@type": "Country", name: "Malta" },
          { "@type": "Country", name: "Ireland" },
        ],
        knowsLanguage: ["ar", "en", "fr"],
        knowsAbout: [
          "Higher Education in Europe",
          "European University Admissions",
          "Student Visa Consular File Preparation",
          "Study in Lithuania",
          "Study in Romania",
          "Study in Italy",
          "Study in Spain",
          "Study in Hungary",
          "Study in Malta",
          "Study in Ireland",
          "Bologna Process & ECTS Accredited Degrees",
          "International Student Accommodation & Airport Pickup",
        ],
        sameAs: [
          GOOGLE_MAPS_URL,
          "https://www.instagram.com/overseas_consulting_",
          "https://www.facebook.com/centremaconsulting/",
          "https://www.youtube.com/@ALI_IN_LITHUANIA",
          "https://www.instagram.com/benamar_a34/",
          "https://www.instagram.com/amine_jaboune/",
          "https://www.instagram.com/marouan.ben.amar/",
        ],
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: "+370-660-59704",
            email: OFFICIAL_EMAIL,
            contactType: "customer service",
            availableLanguage: ["Arabic", "English", "French"],
            areaServed: ["MA", "DZ", "EU"],
          },
          {
            "@type": "ContactPoint",
            telephone: "+212-775-496303",
            email: OFFICIAL_EMAIL,
            contactType: "admissions counseling",
            availableLanguage: ["Arabic", "English", "French"],
            areaServed: ["MA", "DZ"],
          },
        ],
        founder: [
          {
            "@type": "Person",
            "@id": `${SITE_URL}/#ali-benamar`,
            name: "Ali Benamar",
            alternateName: "علي بنعمر",
            jobTitle: "Founder & International Education Advisor",
            description:
              "Holds an M.Sc. in International Marketing & Trade and serves as Senior Coordinator, Agent Implementation at an international company. Expert in European university admissions, regulatory compliance, and academic document review.",
            image: `${SITE_URL}/team/ali_benamar.jpg`,
            sameAs: [
              "https://www.instagram.com/benamar_a34/",
              "https://www.youtube.com/@ALI_IN_LITHUANIA",
            ],
            worksFor: { "@id": `${SITE_URL}/#organization` },
          },
          {
            "@type": "Person",
            "@id": `${SITE_URL}/#amine-jaboune`,
            name: "M'Amine Jaboune",
            alternateName: "محمد أمين جابون",
            jobTitle: "Managing Director & International Education Advisor",
            description:
              "PhD Researcher in Education Sciences and holder of a Master's degree in International Relations. Leads official European university partnerships and strategic academic planning at M&A Overseas Consulting.",
            image: `${SITE_URL}/team/amine_jaboune.jpg`,
            sameAs: ["https://www.instagram.com/amine_jaboune/"],
            worksFor: { "@id": `${SITE_URL}/#organization` },
          },
          {
            "@type": "Person",
            "@id": `${SITE_URL}/#marouan-ben-amar`,
            name: "Marouan Ben Amar",
            alternateName: "مروان بنعمر",
            jobTitle: "Director of Operations & Administrative Coordination",
            description:
              "Holds a Bachelor's degree in Economic Sciences and oversees student admission operations, administrative coordination, and direct family communication at M&A Overseas Consulting.",
            image: `${SITE_URL}/team/marouan_ben_amar.jpg`,
            sameAs: ["https://www.instagram.com/marouan.ben.amar/"],
            worksFor: { "@id": `${SITE_URL}/#organization` },
          },
        ],
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          bestRating: "5",
          worstRating: "1",
          ratingCount: "184",
          reviewCount: "34",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "خدمات الدراسة في أوروبا والتوجيه الجامعي (European Study Abroad Services)",
          itemListElement: DESTINATIONS_SEO.map((dest) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: `الدراسة في ${dest.nameAr} (${dest.nameEn}) - قبول جامعي مضمون وفيزا`,
              description: `استخراج القبول الجامعي الرسمي في ${dest.nameAr} خلال 10 إلى 20 يوم عمل، إعداد ملف التأشيرة، حجز السكن الجامعي، والاستقبال في المطار. الرسوم السنوية التقريبية: ${dest.tuitionRange}.`,
              provider: { "@id": `${SITE_URL}/#organization` },
              areaServed: { "@type": "Country", name: dest.nameEn },
            },
          })),
        },
      },

      // 2. WebSite Entity
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        description: DEFAULT_DESCRIPTION_AR,
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: ["ar", "en"],
      },

      // 3. WebPage Entity
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/#webpage`,
        url: SITE_URL,
        name: DEFAULT_TITLE_AR,
        description: DEFAULT_DESCRIPTION_AR,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
        inLanguage: "ar",
        breadcrumb: { "@id": `${SITE_URL}/#breadcrumb` },
      },

      // 4. BreadcrumbList Entity
      {
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}/#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "الرئيسية | M&A OVERSEAS CONSULTING",
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "تقديم طلب الدراسة والاستشارة المجانية",
            item: `${SITE_URL}/postuler`,
          },
        ],
      },

      // 5. HowTo Schema (8-Step Admission & Visa Guidance Timeline)
      {
        "@type": "HowTo",
        "@id": `${SITE_URL}/#admission-process`,
        name: "مراحل التسجيل والدراسة في أوروبا خطوة بخطوة مع M&A Overseas Consulting",
        description:
          "الدليل الكامل من 8 مراحل للحصول على قبول جامعي مضمون وتأشيرة الدراسة في أوروبا حتى الاستقبال في المطار والسكن الجامعي.",
        totalTime: "P20D",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "استشارة مجانية وتوجيه أكاديمي (Free Consultation & Guidance)",
            text: "نرافق طلابنا في اختيار الجامعة المناسبة، التخصص المثالي، والمدينة الأوروبية الأنسب لميزانيتهم وطموحاتهم.",
            url: `${SITE_URL}/#processus`,
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "إعداد ومراجعة الملف الأكاديمي (Application File Preparation)",
            text: "نتولى إجراءات تجهيز وتقديم الطلبات ومطابقتها للشروط الأكاديمية للجامعات الأوروبية الشريكة.",
            url: `${SITE_URL}/#processus`,
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "التسجيل في الجامعات والمنح (Universities & Scholarships)",
            text: "نساعد طلابنا في التسجيل بالجامعات وتأمين منح دراسية مخفّضة أو كاملة.",
            url: `${SITE_URL}/#processus`,
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "استخراج القبول الجامعي المضمون 100% (100% Guaranteed Admission)",
            text: "نضمن استخراج القبول الجامعي الرسمي (Offer Letter) في فترة قياسية تتراوح بين 10 إلى 20 يوم عمل.",
            url: `${SITE_URL}/#processus`,
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "التقديم للحصول على التأشيرة (Visa Application & Consular File)",
            text: "نعد ملف التأشيرة القانوني بواسطة خبراء ونقوم بحجز موعد القنصلية والتدريب على المقابلة بنسبة نجاح 98.4%.",
            url: `${SITE_URL}/#processus`,
          },
          {
            "@type": "HowToStep",
            position: 6,
            name: "حجز تذاكر الطيران (Group Flight Booking)",
            text: "ننسق حجز تذاكر الطيران للطلبة المتجهين لنفس الجامعة للسفر معاً في مجموعات منظمة.",
            url: `${SITE_URL}/#processus`,
          },
          {
            "@type": "HowToStep",
            position: 7,
            name: "تأمين السكن الجامعي (Student Accommodation)",
            text: "نقوم بحجز مسبق ومضمون لإقامة الطالب في السكن الجامعي (Dormitory) أو شقة طلابية قبل السفر.",
            url: `${SITE_URL}/#processus`,
          },
          {
            "@type": "HowToStep",
            position: 8,
            name: "الاستقبال في المطار والاستقرار (Airport Pickup & Settlement)",
            text: "نستقبل الطلبة في المطار في أوروبا عبر فريقنا الميداني، وننقلهم للسكن مع مواكبتهم في إجراءات الإقامة وفتح الحساب البنكي.",
            url: `${SITE_URL}/#processus`,
          },
        ],
      },

      // 6. ItemList of VideoObject Schemas (7 Student Stories & Informational Videos)
      {
        "@type": "ItemList",
        "@id": `${SITE_URL}/#student-videos`,
        name: "فيديوهات وتجارب الطلاب في أوروبا مع M&A Overseas Consulting",
        itemListElement: STUDENT_VIDEOS_SEO.map((video, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          item: {
            "@type": "VideoObject",
            "@id": `${SITE_URL}/#video-${video.id}`,
            name: video.title,
            description: video.description,
            thumbnailUrl: [video.thumbnailUrl],
            contentUrl: video.contentUrl,
            uploadDate: video.uploadDate,
            inLanguage: "ar",
            publisher: { "@id": `${SITE_URL}/#organization` },
          },
        })),
      },

      // 7. FAQPage Schema (All 8 Core FAQs for Google Rich Snippets & AI Answer Engines)
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq-schema`,
        mainEntity: [
          {
            "@type": "Question",
            name: "هل الشهادات الجامعية في الوجهات الأوروبية السبعة معترف بها رسمياً في المغرب، الجزائر، وباقي دول العالم؟",
            acceptedAnswer: {
              "@type": "Answer",
              text: "نعم بكل تأكيد. جميع الجامعات والمعاهد الأوروبية التي تربطنا بها شراكات رسمية (في ليتوانيا، رومانيا، إيطاليا، إسبانيا، المجر، مالطا، وأيرلندا) هي مؤسسات حكومية وخاصة معتمدة ضمن نظام بولونيا الأوروبي للتعليم العالي (Bologna Process & ECTS). هذا يضمن أن دبلومك معترف به رسمياً في المغرب والجزائر، ويُخوّل لك متابعة الدراسات العليا أو العمل في أي دولة داخل الاتحاد الأوروبي وأمريكا الشمالية دون الحاجة لمعادلة معقدة.",
            },
          },
          {
            "@type": "Question",
            name: "ما هي شروط القبول؟ وهل يُشترط معدل بكالوريا مرتفع أو شهادة لغة مثل IELTS / TOEFL؟",
            acceptedAnswer: {
              "@type": "Answer",
              text: "لا يُشترط الحصول على معدل مرتفع جداً في البكالوريا للقبول في أغلب الجامعات الشريكة، حيث ندرس ملفك بعناية لنوجهك نحو الجامعات والتخصصات التي تتوافق مع معدلك وميزانيتك (الهندسة، إدارة الأعمال، الطب، المعلوميات، واللغات). وإذا لم تكن تتوفر على شهادة IELTS أو TOEFL، نوفر لك إمكانية اجتياز مقابلة تقييمية مبسطة عبر الإنترنت مع الجامعة، أو الالتحاق بسنة تحضيرية للغة في أوروبا.",
            },
          },
          {
            "@type": "Question",
            name: "كم تستغرق عملية استخراج القبول الجامعي والتأشيرة؟ وما معنى ضمان القبول بنسبة 100%؟",
            acceptedAnswer: {
              "@type": "Answer",
              text: "بفضل عقودنا المباشرة مع الجامعات الأوروبية دون وسطاء، نستخرج القبول الجامعي الرسمي (Offer Letter) في ظرف قياسي يتراوح بين 10 إلى 20 يوم عمل فقط بعد اكتمال وثائق الملف. ضمان القبول 100% يعني أننا نراجع ملفك أكاديمياً قبل التقديم ولا نختار إلا الجامعات التي نضمن استيفاءك الكامل لشروطها، ثم يتولى خبراؤنا تجهيز ملف التأشيرة القانوني وحجز موعد القنصلية.",
            },
          },
          {
            "@type": "Question",
            name: "ما هي تكلفة الدراسة والمعيشة السنوية في أوروبا؟ وهل تتوفر منح دراسية مخفّضة؟",
            acceptedAnswer: {
              "@type": "Answer",
              text: "تتميز الوجهات التي نشتغل عليها (مثل ليتوانيا، رومانيا، والمجر) بكونها من أكثر الدول الأوروبية توازناً من حيث الجودة والتكلفة؛ إذ تبدأ الرسوم الدراسية في العديد من التخصصات من حوالي 2000 إلى 4500 يورو سنوياً، بينما تتراوح تكلفة المعيشة والسكن الجامعي بين 300 و500 يورو شهرياً. كما يساعدك فريقنا في التقديم على المنح الدراسية الجزئية أو الكاملة.",
            },
          },
          {
            "@type": "Question",
            name: "كيف تتم طريقة دفع الرسوم الدراسية؟ وما هي شروط الضمان المالي للسفارة؟",
            acceptedAnswer: {
              "@type": "Answer",
              text: "يقوم الطالب وولي أمره بتحويل الرسوم الدراسية مباشرة إلى الحساب البنكي الرسمي للجامعة في أوروبا بعد صدور القبول المبدئي، وتتيح أغلب الجامعات إمكانية الأداء على دفعتين (كل فصل دراسي على حدة). أما بخصوص الضمان المالي لملف التأشيرة، فيكفي تقديم كشف حساب بنكي يثبت القدرة على تغطية مصاريف السنة الأولى دون الحاجة لتجميد المبلغ في حساب مغلق معقد.",
            },
          },
          {
            "@type": "Question",
            name: "هل يحق للطالب العمل بالموازاة مع الدراسة في أوروبا لتغطية مصاريفه الشخصية؟",
            acceptedAnswer: {
              "@type": "Answer",
              text: "نعم، يمنحك تصريح الإقامة الدراسية في دول الاتحاد الأوروبي الحق القانوني في العمل بدوام جزئي (20 ساعة أسبوعياً خلال فترة الدراسة، ودوام كامل 40 ساعة أسبوعياً خلال العطل الصيفية والفصلية). ويرشد فريقنا الميداني في أوروبا الطلاب عند وصولهم حول فتح الحساب البنكي، استخراج بطاقة الإقامة، والبحث عن فرص عمل طلابية.",
            },
          },
          {
            "@type": "Question",
            name: "كيف تتم عملية حجز السكن الجامعي والاستقبال في المطار عند الوصول إلى بلد الدراسة؟",
            acceptedAnswer: {
              "@type": "Answer",
              text: "نحجز لطلابنا تذاكر الطيران للسفر في مجموعات موحدة، ونؤمّن قبل السفر حجزاً رسمياً ومضموناً في السكن الجامعي (Dormitory) أو في شقة طلابية. وفور وصولك إلى المطار في أوروبا، يكون مرافقنا الميداني في استقبالك لنقلك إلى مقر إقامتك ومساعدتك في إجراءات التسجيل النهائي بالجامعة.",
            },
          },
          {
            "@type": "Question",
            name: "أنا طالب من خارج مدينة أكادير أو من الجزائر، كيف يمكنني التسجيل ومتابعة ملفي مع مكتبكم؟",
            acceptedAnswer: {
              "@type": "Answer",
              text: "نواكب مئات الطلاب من كافة المدن المغربية ومن جميع ولايات الجزائر بنفس الدقة؛ يمكنك إما زيارة مقرنا الرسمي المرخص في إنزكان - شارع مراكش (أكادير)، أو إتمام جميع مراحل الاستشارة، توقيع العقد القانوني، وإرسال الوثائق عن بُعد عبر منصتنا الرقمية والواتساب الرسمي مع مستشار مباشر مخصص لك ولعائلتك.",
            },
          },
        ],
      },
    ],
  };
}

export function getPostulerJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_URL}/postuler/#webpage`,
    url: `${SITE_URL}/postuler`,
    name: "تقديم طلب الدراسة والاستشارة المجانية | M&A OVERSEAS CONSULTING",
    description:
      "قدّم طلبك للدراسة في أوروبا واحصل على استشارة أكاديمية مجانية وتقييم شامل لملفك من طرف مستشاري M&A Overseas Consulting.",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#organization` },
    inLanguage: ["ar", "en"],
    potentialAction: {
      "@type": "RegisterAction",
      target: `${SITE_URL}/postuler`,
      name: "حجز استشارة مجانية وتقديم طلب القبول الجامعي في أوروبا",
    },
  };
}
