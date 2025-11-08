import Image from "next/image";

import { Prose } from "@/components/ui/typography";
import { SITE_INFO } from "@/config/site";

import { Panel, PanelContent, PanelHeader, PanelTitle } from "./panel";

export function ProjectHeader() {
  return (
    <Panel>
      <PanelHeader>
        <div className="flex items-center gap-3">
          <div className="flex size-6 shrink-0 items-center justify-center text-muted-foreground select-none">
            {/* <Icons.project className="size-5" /> */}
            {/* <Image src="/Q.svg" alt="SQ3" width={64} height={64} /> */}
          </div>
          <PanelTitle></PanelTitle>
        </div>
      </PanelHeader>
      <PanelContent>
        <Prose>
          <p className="leading-relaxed text-muted-foreground">
            {SITE_INFO.description}
          </p>
        </Prose>
      </PanelContent>
    </Panel>
  );
}
