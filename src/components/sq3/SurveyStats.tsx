"use client";

import { useEffect, useState } from "react";

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
    title: "Interest vs. Reply Speed",
    description: "How often replies arrive before interest drops",
  },
  {
    key: "hiddenDropouts",
    title: "Hidden Dropouts",
    description: "How often people quietly give up",
  },
  {
    key: "lostPoints",
    title: "Where Exactly Do You Get Lost?",
    description: "Stages that confuse customers most",
  },
  {
    key: "lostMessages",
    title: "Messages That Vanish",
    description: "How often complaints / refunds get ignored",
  },
  {
    key: "languageEmotion",
    title: "Language and Emotion",
    description: "Impact of language and tone on mood",
  },
  {
    key: "sq3Usefulness",
    title: "Smart Assistant + Human Backup",
    description: "Perceived usefulness of SQ3 assistant",
  },
];

export function SurveyStats() {
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

  if (loading || !data) {
    return null;
  }

  return (
    <div className="screen-line-before screen-line-after">
      <div className="px-4 py-3">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold">Survey Results</h2>
          <p className="font-mono text-[10px] text-muted-foreground">
            {data.totalResponses} responses
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {surveyQuestions.map((question) => {
            const questionData = data.charts[question.key] || [];
            if (!questionData.length) return null;

            const total = questionData.reduce(
              (sum, item) => sum + item.value,
              0
            );

            return (
              <div key={question.key} className="space-y-1.5">
                <div>
                  <h3 className="text-xs font-medium text-foreground leading-tight">
                    {question.title}
                  </h3>
                </div>

                <div className="space-y-1">
                  {questionData.map((item, index) => {
                    const percentage =
                      total > 0 ? (item.value / total) * 100 : 0;
                    return (
                      <div key={index} className="space-y-0.5">
                        <div className="flex items-start justify-between gap-1 text-[10px] leading-tight">
                          <span className="text-foreground flex-1 break-words">
                            {item.label}
                          </span>
                          <span className="text-muted-foreground font-mono tabular-nums shrink-0">
                            {item.value} ({percentage.toFixed(0)}%)
                          </span>
                        </div>
                        <div className="relative h-1 w-full overflow-hidden rounded-full bg-muted">
                          <div
                            className={cn(
                              "h-full rounded-full transition-all duration-500",
                              "bg-foreground"
                            )}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-3 text-center font-mono text-[10px] text-muted-foreground">
          Updated {new Date(data.lastUpdated).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}

