import { QnAPipeline } from "@repo/ai-companion/hugface/pipeline";
import { QuestionAnsweringOutput } from "@huggingface/transformers";

type QnAOptions = {
  question: string;
  context: string;
};

export async function qna({ context, question }: QnAOptions) {
  const answerer = await QnAPipeline.getInstance();
  const output = (await answerer(question, context)) as QuestionAnsweringOutput;
  return output;
}
