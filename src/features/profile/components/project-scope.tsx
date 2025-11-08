import {
  BarChart3,
  Brain,
  ChevronsDownUpIcon,
  ChevronsUpDownIcon,
  Heart,
  Mail,
  MessageSquare,
  Target,
} from "lucide-react";

import { Icons } from "@/components/icons";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { PROJECT_DATA } from "@/features/profile/data/project";

import { Panel, PanelHeader, PanelTitle } from "./panel";

const moduleIcons = {
  "social-integration": MessageSquare,
  "knowledge-base": Brain,
  "intent-classification": Target,
  "email-marketing": Mail,
  "sentiment-analyzer": Heart,
  "analytics": BarChart3,
};

export function ProjectScope() {
  return (
    <Panel id="modules">
      <PanelHeader>
        <PanelTitle>
          Modules
          <sup className="ml-1 font-mono text-sm text-muted-foreground select-none">
            ({PROJECT_DATA.scope.modules.length})
          </sup>
        </PanelTitle>
      </PanelHeader>

      <div className="pr-2 pl-4">

        {PROJECT_DATA.scope.modules.map((module, index) => {
          const Icon =
            moduleIcons[module.id as keyof typeof moduleIcons] || Icons.project;
          return (
            <Collapsible key={module.id} defaultOpen={index === 0} asChild>
              <div className="border-b border-edge">
                <div className="flex items-center">
                  <div className="mx-4 flex size-6 shrink-0 items-center justify-center text-muted-foreground select-none">
                    <Icon className="size-5" />
                  </div>

                  <div className="flex-1 border-l border-dashed border-edge">
                    <CollapsibleTrigger className="group/module flex w-full items-center gap-4 p-4 pr-2 text-left select-none">
                      <div className="flex-1">
                        <h3 className="mb-1 leading-snug font-medium text-balance font-sans">
                          {module.title}
                        </h3>
                        <p className="line-clamp-2 text-sm text-muted-foreground font-mono">
                          {module.description}
                        </p>
                      </div>

                      <div
                        className="shrink-0 text-muted-foreground [&_svg]:size-4"
                        aria-hidden
                      >
                        <ChevronsDownUpIcon className="hidden group-data-[state=open]/module:block" />
                        <ChevronsUpDownIcon className="hidden group-data-[state=closed]/module:block" />
                      </div>
                    </CollapsibleTrigger>
                  </div>
                </div>

                <CollapsibleContent className="overflow-hidden duration-300 data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
                  <div className="space-y-3 border-t border-dashed border-edge p-4">
                    <div>
                      <p className="mb-3 text-sm font-medium font-sans">Key Features</p>
                      <ul className="space-y-2">
                        {module.features.map((feature, featureIndex) => (
                          <li
                            key={featureIndex}
                            className="flex items-baseline gap-3 text-sm font-mono"
                          >
                            <span className="text-muted-foreground">•</span>
                            <span className="leading-relaxed text-muted-foreground">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>
          );
        })}
      </div>
    </Panel>
  );
}
