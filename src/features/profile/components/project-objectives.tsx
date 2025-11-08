import { Target, ChevronsDownUpIcon, ChevronsUpDownIcon } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { PROJECT_DATA } from "@/features/profile/data/project";

import { Panel, PanelContent, PanelHeader, PanelTitle } from "./panel";

export function ProjectObjectives() {
  return (
    <Panel id="objectives">
      <PanelHeader>
        <PanelTitle>
          Objectives
          <sup className="ml-1 font-mono text-sm text-muted-foreground select-none">
            ({PROJECT_DATA.objectives.length})
          </sup>
        </PanelTitle>
      </PanelHeader>

      <PanelContent>
        <Collapsible defaultOpen asChild>
          <div>
            <CollapsibleTrigger className="group/objectives flex w-full items-center justify-between rounded-lg border border-border bg-muted/30 p-3 text-left transition-colors hover:bg-muted/50 mb-3">
              <div className="flex items-center gap-3">
                <Target className="size-5 text-muted-foreground" />
                <div>
                  <h4 className="font-medium">Project Goals</h4>
                  <p className="text-sm text-muted-foreground">
                    {PROJECT_DATA.objectives.length} primary objectives
                  </p>
                </div>
              </div>
              <div className="shrink-0 text-muted-foreground [&_svg]:size-4">
                <ChevronsDownUpIcon className="hidden group-data-[state=open]/objectives:block" />
                <ChevronsUpDownIcon className="hidden group-data-[state=closed]/objectives:block" />
              </div>
            </CollapsibleTrigger>

            <CollapsibleContent className="overflow-hidden duration-300 data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
              <div className="space-y-3 rounded-lg border border-border bg-muted/20 p-4">
                {PROJECT_DATA.objectives.map((objective, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-medium text-muted-foreground">
                      {index + 1}
                    </span>
                    <span className="text-foreground">{objective}</span>
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

