import type { Metadata } from "next";
import { PlatformPageView } from "./PlatformPageView";

export const metadata: Metadata = {
  title: "Client Platform — BRANSOL",
  description:
    "Every BRANSOL engagement includes a dedicated client workspace — brief management, live milestones, asset delivery and AI-assisted workflows. Included. No extra cost.",
};

export default function PlatformPage() {
  return <PlatformPageView />;
}
