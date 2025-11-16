import type { Metadata } from "next";
import { SurveyPageClient } from "./SurveyPageClient";

export const metadata: Metadata = {
  title: "Survey",
  description:
    "Insights from our user survey on customer messaging challenges and SQ3 impact.",
};

export default function SurveyPage() {
  return <SurveyPageClient />;
}
