import { ChevronsDownUpIcon, ChevronsUpDownIcon,XCircle } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { PROJECT_DATA } from "@/features/profile/data/project";

import { Panel, PanelContent, PanelHeader, PanelTitle } from "./panel";

export function ProjectExclusions() {
  return (
    <Panel id="exclusions">
      <PanelHeader>
        <PanelTitle>
          Exclusions
          <sup className="ml-1 font-mono text-sm text-muted-foreground select-none">
            ({PROJECT_DATA.exclusions.length})
          </sup>
        </PanelTitle>
      </PanelHeader>

      <PanelContent>
        <Collapsible asChild>
          <div>
            <CollapsibleTrigger className="group/exclusions mb-3 flex w-full items-center justify-between rounded-lg border border-border bg-muted/30 p-3 text-left transition-colors hover:bg-muted/50">
              <div className="flex items-center gap-3">
                <XCircle className="size-5 text-muted-foreground" />
                <div>
                  <h4 className="font-medium">Out of Scope</h4>
                  <p className="text-sm text-muted-foreground">
                    Features excluded from this version
                  </p>
                </div>
              </div>
              <div className="shrink-0 text-muted-foreground [&_svg]:size-4">
                <ChevronsDownUpIcon className="hidden group-data-[state=open]/exclusions:block" />
                <ChevronsUpDownIcon className="hidden group-data-[state=closed]/exclusions:block" />
              </div>
            </CollapsibleTrigger>

            <CollapsibleContent className="overflow-hidden duration-300 data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
              <div className="space-y-2 rounded-lg border border-border bg-muted/20 p-4">
                <p className="mb-3 text-sm text-muted-foreground">
                  This version excludes the following to maintain focus on the
                  core conversational and marketing capabilities:
                </p>
                {PROJECT_DATA.exclusions.map((exclusion, index) => (
                  <div key={index} className="flex items-baseline gap-3 text-sm">
                    <span className="text-muted-foreground">•</span>
                    <span className="text-muted-foreground leading-relaxed">{exclusion}</span>
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
