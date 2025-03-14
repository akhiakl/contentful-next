import * as React from "react";
import { qna } from "@/actions/qna";
import { QnAComponent } from "@/components/QnAComponent";

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
