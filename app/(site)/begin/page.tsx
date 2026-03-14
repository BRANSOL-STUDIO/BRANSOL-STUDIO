import { BeginPageView } from "./BeginPageView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Begin a Commission — BRANSOL",
  description:
    "BRANSOL works with a limited number of organisations each year. Tell us about your commission and we will respond within two working days.",
  openGraph: {
    title: "Begin a Commission — BRANSOL",
    description: "We work selectively. Tell us about your organisation and what you are commissioning.",
    siteName: "BRANSOL",
  },
};

export default function BeginPage() {
  return <BeginPageView />;
}
