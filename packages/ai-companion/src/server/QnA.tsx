import * as React from "react";
import { qna } from "@repo/ai-companion/actions/qna";
import { QnAComponent } from "@repo/ai-companion/components/QnAComponent";

type QnAProps = {
  context?: string;
};

const QnA = ({ context }: QnAProps) => {
  if (!context) return null;
  return (
    <QnAComponent
      onAsk={async (question) => {
        "use server";
        const { answer } = await qna({
          question,
          context,
        });
        return answer;
      }}
    />
  );
};

export { QnA };
