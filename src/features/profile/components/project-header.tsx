import Image from "next/image";

import { Prose } from "@/components/ui/typography";
import { SITE_INFO } from "@/config/site";

import { Panel, PanelContent, PanelHeader, PanelTitle } from "./panel";
import { cn } from "@/lib/utils";

export function ProjectHeader() {
  return (
    <Panel>
      <PanelHeader>
        <div className="flex items-center gap-3">
          <div className="flex size-6 shrink-0 items-center justify-center text-muted-foreground select-none">
            {/* Icon slot kept intentionally empty */}
          </div>
          <PanelTitle>
            {/* SQ3 - Smart Business Solution for Sri Lankan SMEs */}
            <div
              className={cn(
                "h-8 px-2",
                "screen-line-after",
                "before:absolute before:-left-[100vw] before:-z-1 before:h-full before:w-[200vw]",
                "before:bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] before:bg-size-[10px_10px] before:[--pattern-foreground:var(--color-edge)]/56"
              )}
            />
          </PanelTitle>
        </div>
      </PanelHeader>
      <PanelContent>
        <div className="space-y-4">
          <div className="overflow-hidden border border-border">
            <Image
              src="/formbanner_v2.png"
              alt="SQ3 banner"
              width={1200}
              height={400}
              className="h-auto w-full object-cover"
              priority
            />
          </div>

          <Prose>
            <p className="leading-relaxed text-muted-foreground">
              SQ3 is a single control centre for all your customer conversations
              across Facebook, Instagram, and your website, built to help Sri
              Lankan SMEs reply faster, stay organised, and never miss a
              message.
            </p>
          </Prose>
        </div>
      </PanelContent>
    </Panel>
  );
}
