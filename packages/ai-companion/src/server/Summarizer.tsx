import * as React from "react";
import { SummarizerComponent } from "@/components/SummarizerComponent";
import { summarize } from "@/actions/summarize";

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
