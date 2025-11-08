import { AlertCircle, ChevronsDownUpIcon, ChevronsUpDownIcon } from "lucide-react";

import { Markdown } from "@/components/markdown";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Prose } from "@/components/ui/typography";
import { PROJECT_DATA } from "@/features/profile/data/project";

import { Panel, PanelContent, PanelHeader, PanelTitle } from "./panel";

export function ProjectProblem() {
  return (
    <Panel id="problem">
      <PanelHeader>
        <PanelTitle>Problem Statement</PanelTitle>
      </PanelHeader>

      <PanelContent className="space-y-4">
        <Prose>
          <Markdown>{PROJECT_DATA.problem.description}</Markdown>
        </Prose>

        <Collapsible defaultOpen asChild>
          <div>
            <CollapsibleTrigger className="group/pain-points flex w-full items-center justify-between rounded-lg border border-border bg-muted/30 p-3 text-left transition-colors hover:bg-muted/50">
              <div className="flex items-center gap-3">
                <AlertCircle className="size-5 text-muted-foreground" />
                <div>
                  <h4 className="font-medium">Key Pain Points</h4>
                  <p className="text-sm text-muted-foreground">
                    {PROJECT_DATA.problem.painPoints.length} identified issues
                  </p>
                </div>
              </div>
              <div className="shrink-0 text-muted-foreground [&_svg]:size-4">
                <ChevronsDownUpIcon className="hidden group-data-[state=open]/pain-points:block" />
                <ChevronsUpDownIcon className="hidden group-data-[state=closed]/pain-points:block" />
              </div>
            </CollapsibleTrigger>

            <CollapsibleContent className="overflow-hidden duration-300 data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
              <div className="mt-3 space-y-2 rounded-lg border border-border bg-muted/20 p-4">
                {PROJECT_DATA.problem.painPoints.map((point, index) => (
                  <div key={index} className="flex items-baseline gap-3 text-sm">
                    <span className="text-muted-foreground">•</span>
                    <span className="text-muted-foreground leading-relaxed">{point}</span>
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>
      </PanelContent>
    </Panel>
  );
}

