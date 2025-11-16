import { Markdown } from "@/components/markdown";
import { Prose } from "@/components/ui/typography";
import { PROJECT_DATA } from "@/features/profile/data/project";

import { Panel, PanelContent } from "./panel";

export function ProjectIntroduction() {
  return (
    <Panel id="introduction">
      {/* <PanelHeader>
        <PanelTitle>Introduction</PanelTitle>
      </PanelHeader> */}

      <PanelContent className="space-y-4">
        <Prose>
          <Markdown>{PROJECT_DATA.introduction.description}</Markdown>
        </Prose>
        <Prose>
          <Markdown>{PROJECT_DATA.introduction.context}</Markdown>
        </Prose>
      </PanelContent>
    </Panel>
  );
}
