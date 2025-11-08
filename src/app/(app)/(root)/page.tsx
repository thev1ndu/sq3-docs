import type { WebPage, WithContext } from "schema-dts";

import { SITE_INFO } from "@/config/site";
import { ProjectHeader } from "@/features/profile/components/project-header";
import { ProjectIntroduction } from "@/features/profile/components/project-introduction";
import { ProjectObjectives } from "@/features/profile/components/project-objectives";
import { ProjectOutcomes } from "@/features/profile/components/project-outcomes";
import { ProjectProblem } from "@/features/profile/components/project-problem";
import { ProjectScope } from "@/features/profile/components/project-scope";
import { cn } from "@/lib/utils";

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getPageJsonLd()).replace(/</g, "\\u003c"),
        }}
      />

      <div className="mx-auto md:max-w-3xl">
        <ProjectHeader />
        <Separator />

        <ProjectIntroduction />
        <Separator />

        <ProjectProblem />
        <Separator />

        <ProjectObjectives />
        <Separator />

        <ProjectScope />
        <Separator />

        <ProjectOutcomes />
        <Separator />
      </div>
    </>
  );
}

function getPageJsonLd(): WithContext<WebPage> {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: SITE_INFO.name,
    description: SITE_INFO.description,
    url: SITE_INFO.url,
  };
}

function Separator({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-8 w-full border-x border-edge",
        "before:absolute before:-left-[100vw] before:-z-1 before:h-8 before:w-[200vw]",
        "before:bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] before:bg-size-[10px_10px] before:[--pattern-foreground:var(--color-edge)]/56",
        className
      )}
    />
  );
}
