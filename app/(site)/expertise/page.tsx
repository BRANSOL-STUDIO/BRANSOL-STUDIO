import { ExpertisePageView } from "./ExpertisePageView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Expertise — BRANSOL",
  description:
    "Five disciplines. One integrated studio. BRANSOL brings strategic design expertise across brand identity, digital, campaign, credentials, and spatial design.",
};

export default function ExpertisePage() {
  return <ExpertisePageView />;
}
