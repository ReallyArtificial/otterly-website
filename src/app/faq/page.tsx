import type { Metadata } from "next";
import { FaqContent } from "./FaqContent";

export const metadata: Metadata = {
  title: "FAQ · otterly",
  description:
    "Honest answers about self-hosting, team use, rate limits, ToS, and what otterly actually is.",
};

export default function FaqPage() {
  return <FaqContent />;
}
