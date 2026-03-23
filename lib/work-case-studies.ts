import type { StaticImageData } from "next/image";

import globtekHero from "@/images/archive/GLOBTEK/Globtek_Homepage.png";
import globtekHeroPreview from "@/images/archive/GLOBTEK/Globtek_Hero_Preview.png";
import globtekMegaMenu from "@/images/archive/GLOBTEK/Globtek_Homepage_Mega-Menu.png";
import globtekPanelRail from "@/images/archive/GLOBTEK/Globtek_Rail-Infrastructure.png";
import globtekPanelRoads from "@/images/archive/GLOBTEK/Globtek_Roads & Transport.png";
import globtekHeroBanner from "@/images/archive/GLOBTEK/Globtek_Hero_Banner.png";

import globtekBrandProfiles from "@/images/archive/GLOBTEK/BRANDING/Globtek_Profiles_Mockup.png";
import globtekRailProfile from "@/images/archive/GLOBTEK/BRANDING/Globtek_Rail-Profile_Mockup.png";
import globtekMugMockup from "@/images/archive/GLOBTEK/BRANDING/Globtek_Mug_Mockup.jpg";
import globtekOutdoorGazebo1 from "@/images/archive/GLOBTEK/OUTDOOR/GLOBTEK_Gazebo_Mockup_1_Q325.jpg";
import globtekOutdoorGazebo2 from "@/images/archive/GLOBTEK/OUTDOOR/GLOBTEK_Gazebo_Mockup_2_Q325.jpg";
import globtekStationeryDiaries from "@/images/archive/GLOBTEK/Stationery/Globtek_Stationery_Diaries.jpg";
import globtekVehicleBakkie from "@/images/archive/GLOBTEK/VEHICLE/Globtek_Vehicle-Branding_Bakkie.png";
import globtekVehicleBakkieFinal from "@/images/archive/GLOBTEK/VEHICLE/Globtek_Vehicle-Branding_Bakkie_final.jpg";
import globtekVehicleBakkieRight from "@/images/archive/GLOBTEK/VEHICLE/Globtek_Vehicle-Branding_Bakkie_right.png";
import globtekVehicleBakkieFront from "@/images/archive/GLOBTEK/VEHICLE/Untitled-3.png";
import globtekVehicleBakkieBack from "@/images/archive/GLOBTEK/VEHICLE/Globtek_Vehicle-Branding_Bakkie_back.png";
import globtekVehicleBmwRight from "@/images/archive/GLOBTEK/VEHICLE/Globtek_Hatchback_Car_Mockup_BMW_Right-Side.jpg";
import globtekVehicleBmwFront from "@/images/archive/GLOBTEK/VEHICLE/Globtek_Hatchback_Car_Mockup_BMW_Front-Side.jpg";
import globtekVehicleBmwBack from "@/images/archive/GLOBTEK/VEHICLE/Globtek_Hatchback_Car_Mockup_BMW_Back.jpg";
import globtekVehicleBmwBackSide from "@/images/archive/GLOBTEK/VEHICLE/Globtek_Hatchback_Car_Mockup_BMW_Back-Side.jpg";

export interface WorkCaseStudyProcessStep {
  title: string;
  text: string;
}

export interface WorkCaseStudyBigStat {
  val: string;
  label: string;
}

export interface WorkCaseStudyStats {
  duration: string;
  scope: string;
  team: string;
}

export interface WorkCaseStudyImages {
  hero: StaticImageData;
  cardHero?: StaticImageData;
  panels?: StaticImageData[];
  mug?: StaticImageData;
  stationery?: {
    diaries: StaticImageData;
  };
  vehicle?: {
    bt50: {
      left: StaticImageData;
      right: StaticImageData;
      front: StaticImageData;
      back: StaticImageData;
    };
    bmw: {
      right: StaticImageData;
      rear3q: StaticImageData;
      rear: StaticImageData;
      front3q: StaticImageData;
    };
  };
  outdoor?: {
    gazebo1: StaticImageData;
    gazebo2: StaticImageData;
  };
  profiles?: {
    profiles: StaticImageData;
    railProfile: StaticImageData;
  };
  website?: {
    homepage: StaticImageData;
    megaMenu: StaticImageData;
    railInfra: StaticImageData;
  };
}

export interface WorkCaseStudy {
  id: string;
  variant?: "default" | "globtek-branding";
  num: string;
  name: string;
  sector: string;
  disciplines: string[];
  disciplineLabel: string;
  year: string;
  accentColor: string;
  accentHex: string;
  excerpt: string;
  overview: string;
  challenge: string;
  deliverables: string[];
  stats: WorkCaseStudyStats;
  tags: string[];
  process: WorkCaseStudyProcessStep[];
  bigStat?: WorkCaseStudyBigStat;
  images: WorkCaseStudyImages;
}

export const WORK_CASE_STUDIES: Record<string, WorkCaseStudy> = {
  globtek: {
    id: "globtek",
    variant: "globtek-branding",
    num: "19",
    name: "Globtek",
    sector: "Professional Services",
    disciplines: ["Brand Identity", "Outdoor", "Vehicle", "Design System"],
    disciplineLabel: "Brand Identity · Outdoor · Vehicle",
    year: "2025",
    accentColor: "var(--ember)",
    accentHex: "#e43d30",
    excerpt:
      "Brand identity rollout for Globtek — profiles, outdoor collateral, vehicle branding, and a credentials-led website experience.",
    overview:
      "Globtek required a brand system that stayed coherent when it left the studio. We built rules that work across vehicle wraps, outdoor collateral, company profiles, and website structure — maintaining legibility, hierarchy, and recognisable brand behaviour in the real constraints of production and printing.",
    challenge:
      "Brand systems fail when the rules are too abstract. Outdoor and vehicle applications demand ruthless clarity: strong hierarchy, fast readability at distance, and contrast behaviour that survives variable daylight and material finishes.",
    deliverables: [
      "Primary brand identity system — mark, typography, and colour rules",
      "Outdoor application suite — signage + environmental templates",
      "Vehicle branding system — livery layouts and usage rules",
      "Client-facing profile mockups — presented consistently across formats",
      "Brand governance guidelines — usage, spacing, and typography hierarchy",
    ],
    stats: {
      duration: "Ongoing since 2025",
      scope: "Brand identity across outdoor, vehicle & profiles",
      team: "2 designers",
    },
    tags: [
      "Professional Services",
      "Brand Identity",
      "Outdoor",
      "Vehicle",
      "Profiles",
      "Design System",
    ],
    process: [
      {
        title: "Discovery",
        text: "Audit of existing assets and stakeholder alignment on what must remain unchanged — and what should evolve for rollout.",
      },
      {
        title: "Brand System",
        text: "Mark, typography, and colour behaviour specified with clear rules for hierarchy and readability across surfaces.",
      },
      {
        title: "Application Framework",
        text: "Outdoor and vehicle templates designed as a system — not separate one-offs.",
      },
      {
        title: "Production Support",
        text: "Fabrication-aware guidance for print/placement constraints. Templates tuned for real-world legibility.",
      },
      {
        title: "Governance",
        text: "Usage guidelines and handover so internal teams can apply the system correctly without continual studio oversight.",
      },
    ],
    bigStat: { val: "2026", label: "Rollout evolution" },
    images: {
      hero: globtekHeroBanner,
      cardHero: globtekHeroPreview,
      vehicle: {
        bt50: {
          left: globtekVehicleBakkieFinal,
          right: globtekVehicleBakkieRight,
          front: globtekVehicleBakkieFront,
          back: globtekVehicleBakkieBack,
        },
        bmw: {
          right: globtekVehicleBmwRight,
          rear3q: globtekVehicleBmwBackSide,
          rear: globtekVehicleBmwBack,
          front3q: globtekVehicleBmwFront,
        },
      },
      mug: globtekMugMockup,
      stationery: {
        diaries: globtekStationeryDiaries,
      },
      outdoor: {
        gazebo1: globtekOutdoorGazebo1,
        gazebo2: globtekOutdoorGazebo2,
      },
      profiles: {
        profiles: globtekBrandProfiles,
        railProfile: globtekRailProfile,
      },
      website: {
        homepage: globtekHero,
        megaMenu: globtekMegaMenu,
        railInfra: globtekPanelRail,
      },
    },
  },
};

