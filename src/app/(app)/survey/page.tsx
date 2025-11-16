"use client";

import { useEffect, useState } from "react";

import { SurveyQuestionItem } from "@/components/sq3/SurveyQuestionItem";
import { cn } from "@/lib/utils";

type QuestionKey =
  | "interestSpeed"
  | "hiddenDropouts"
  | "lostPoints"
  | "lostMessages"
  | "languageEmotion"
  | "sq3Usefulness";

type ApiPoint = { label: string; value: number };

type ApiResponse = {
  totalResponses: number;
  charts: Record<QuestionKey, ApiPoint[]>;
  lastUpdated: string;
};

const API_URL =
  "https://script.google.com/macros/s/AKfycbyjn_cAiuo99acxvovq4s_WTnUHy_EKYq3Ek1uYC0ZaTk1uybPERbEGGYsWL4W9Ass/exec";

const surveyQuestions: Array<{
  key: QuestionKey;
  title: string;
  description: string;
}> = [
  {
    key: "interestSpeed",
    title: "",
    description: "How often replies arrive before interest drops",
  },
  {
    key: "hiddenDropouts",
    title: "",
    description:
      "In the last 3 months, how many times did you quietly give up on buying something because of slow, confusing, or missing replies from a business on Instagram or Facebook?",
  },
  {
    key: "lostMessages",
    title: "",
    description:
      "How often important messages like complaints, refund requests, or discount questions get ignored",
  },
  {
    key: "languageEmotion",
    title: "",
    description:
      "Impact of language and tone on customer experience (e.g., preferring Sinhala but receiving rough English, or cold robotic replies)",
  },
  {
    key: "sq3Usefulness",
    title: "",
    description:
      "Usefulness of a smart assistant that replies instantly in Sinhala or English, provides accurate info, notices confusion, and escalates to real staff for refunds/returns/discounts",
  },
];

export default function SurveyPage() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_URL)
      .then((r) => r.json())
      .then((json: ApiResponse) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load SQ3 survey stats", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="mx-auto border-x border-edge md:max-w-3xl">
      <div
        className={cn(
          "h-8 px-2",
          "screen-line-after",
          "before:absolute before:-left-[100vw] before:-z-1 before:h-full before:w-[200vw]",
          "before:bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] before:bg-size-[10px_10px] before:[--pattern-foreground:var(--color-edge)]/56"
        )}
      />

      <div className="screen-line-after px-4">
        <h1 className="text-3xl font-semibold">Survey</h1>
      </div>

      <div className="screen-line-after p-4">
        <p className="font-mono text-sm text-balance text-muted-foreground">
          Insights from our user survey on customer messaging challenges and
          SQ3&apos;s impact
          {data && ` · ${data.totalResponses} responses`}
        </p>
      </div>

      {loading ? (
        <div className="screen-line-after p-4">
          <p className="font-mono text-sm text-muted-foreground">
            Loading survey data...
          </p>
        </div>
      ) : data ? (
        <div className="screen-line-after">
          <div className="relative pt-4 pb-8">
            <div className="absolute inset-0 -z-1 grid grid-cols-1 gap-4 max-sm:hidden sm:grid-cols-2">
              <div className="border-r border-edge"></div>
              <div className="border-l border-edge"></div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {surveyQuestions.map((question) => {
                const questionData = data.charts[question.key] || [];
                return (
                  <SurveyQuestionItem
                    key={question.key}
                    title={question.title}
                    description={question.description}
                    data={questionData}
                    questionKey={question.key}
                  />
                );
              })}
            </div>
          </div>
        </div>
      ) : null}

      {data && (
        <div className="p-4">
          <p className="text-center font-mono text-xs text-muted-foreground">
            Updated {new Date(data.lastUpdated).toLocaleString()}
          </p>
        </div>
      )}

      <div className="h-4" />
    </div>
  );
}
