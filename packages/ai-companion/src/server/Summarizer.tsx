import * as React from "react";
import { SummarizerComponent } from "@repo/ai-companion/components/SummarizerComponent";
import { summarize } from "@repo/ai-companion/actions/summarize";

type SummarizerProps = {
  context?: string;
};

const Summarizer = ({ context }: SummarizerProps) => {
  if (!context) return null;
  return (
    <SummarizerComponent
      onSummarize={async () => {
        "use server";
        const data = await summarize({
          text: context,
        });
        return JSON.stringify(data, null, 2);
      }}
    />
  );
};

export { Summarizer };
