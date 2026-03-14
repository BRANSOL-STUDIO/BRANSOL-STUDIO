import { StudioPageView } from "./StudioPageView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Studio — BRANSOL",
  description:
    "BRANSOL is a Ballito-based strategic design studio on the KwaZulu-Natal North Coast. We work with a small number of organisations each year — selectively, deeply, and without compromise.",
};

export default function StudioPage() {
  return <StudioPageView />;
}
