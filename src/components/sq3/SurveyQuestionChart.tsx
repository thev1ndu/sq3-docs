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

type Props = {
  questionKey: QuestionKey;
  title: string;
  description?: string;
};

export function SurveyQuestionChart({ questionKey, title, description }: Props) {
  const [data, setData] = useState<ApiPoint[]>([]);
  const [meta, setMeta] = useState<{ total: number; updated: string } | null>(
    null
  );

  useEffect(() => {
    fetch(API_URL)
      .then((r) => r.json())
      .then((json: ApiResponse) => {
        setData(json.charts?.[questionKey] ?? []);
        setMeta({
          total: json.totalResponses,
          updated: json.lastUpdated,
        });
      })
      .catch((err) => {
        console.error("Failed to load SQ3 survey stats", err);
      });
  }, [questionKey]);

  if (!data.length) return null;

  // Calculate total for percentage calculation
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div
      className={cn(
        "group/post flex flex-col gap-2 p-2",
        "max-sm:screen-line-before max-sm:screen-line-after",
        "sm:nth-[2n+1]:screen-line-before sm:nth-[2n+1]:screen-line-after"
      )}
    >
      <div className="flex flex-col gap-1 p-2">
        <h3 className="text-lg leading-snug font-medium text-balance">
          {title}
        </h3>

        <p className="font-mono text-sm text-muted-foreground">
          {description}
          {meta ? ` · ${meta.total} responses` : null}
        </p>
      </div>

      <div className="space-y-3 p-2">
        {data.map((item, index) => {
          const percentage = total > 0 ? (item.value / total) * 100 : 0;
          return (
            <div key={index} className="space-y-1.5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-foreground font-medium">{item.label}</span>
                <span className="text-muted-foreground font-mono tabular-nums">
                  {item.value} ({percentage.toFixed(1)}%)
                </span>
              </div>
              <div className="relative h-2 w-full overflow-hidden rounded-full bg-muted">
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

      {meta && (
        <p className="px-2 pb-2 text-[10px] font-mono text-muted-foreground text-right">
          Updated {new Date(meta.updated).toLocaleString()}
        </p>
      )}
    </div>
  );
}

