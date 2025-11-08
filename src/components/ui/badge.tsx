import React from "react";

import { cn } from "@/lib/utils";

export interface BadgeProps extends React.ComponentProps<"span"> {
  variant?: "default" | "outline" | "secondary";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-lg border px-2 py-0.5 text-xs font-medium",
        {
          "border-border bg-muted text-foreground": variant === "default",
          "border-border bg-transparent": variant === "outline",
          "border-border bg-muted/50 text-muted-foreground": variant === "secondary",
        },
        className
      )}
      {...props}
    />
  );
}

export { Badge };

