"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type ApiPoint = { label: string; value: number };

type Props = {
  description: string;
  data: ApiPoint[];
  questionKey?: string;
  title: string;
};

const usefulnessLabels: Record<string, string> = {
  "1": "Not useful at all",
  "2": "Slightly useful",
  "3": "Moderately useful",
  "4": "Very useful",
  "5": "Extremely useful",
};

export function SurveyQuestionItem({ description, data, questionKey }: Props) {
  if (!data.length) return null;

  const total = data.reduce((sum, item) => sum + item.value, 0);
  const maxValue = Math.max(...data.map((item) => item.value));

  // Map labels for usefulness question
  const mappedData =
    questionKey === "sq3Usefulness"
      ? data.map((item) => ({
          ...item,
          label: usefulnessLabels[item.label] || item.label,
        }))
      : data;

  // Sort by value descending for visual hierarchy
  const sortedData = [...mappedData].sort((a, b) => b.value - a.value);

  return (
    <div
      className={cn(
        "group/post flex flex-col gap-2 p-2",
        "max-sm:screen-line-before max-sm:screen-line-after",
        "sm:nth-[2n+1]:screen-line-before sm:nth-[2n+1]:screen-line-after"
      )}
    >
      <div className="flex flex-col gap-1 p-2">
        {description && (
          <p className="font-mono text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        )}
      </div>

      <div className="space-y-2.5 p-2">
        {sortedData.map((item, index) => {
          const percentage = total > 0 ? (item.value / total) * 100 : 0;
          const isTop = item.value === maxValue;

          return (
            <div
              key={index}
              className={cn(
                "flex items-start gap-3 py-1.5",
                "border-l-2 border-transparent pl-3 transition-colors",
                isTop && "border-l-foreground/30"
              )}
            >
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-start gap-2">
                  <span
                    className={cn(
                      "text-sm leading-relaxed break-words",
                      isTop
                        ? "font-semibold text-foreground"
                        : "font-medium text-foreground/90"
                    )}
                  >
                    {item.label}
                  </span>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <Badge
                  variant={isTop ? "default" : "outline"}
                  className={cn(
                    "font-mono tabular-nums",
                    isTop && "border-foreground/20"
                  )}
                >
                  {item.value}
                </Badge>
                <span
                  className={cn(
                    "font-mono text-xs tabular-nums",
                    isTop
                      ? "font-medium text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {percentage.toFixed(1)}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
