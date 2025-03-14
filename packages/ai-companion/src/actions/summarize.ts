import { SummarizationPipeline } from "@repo/ai-companion/hugface/pipeline";
import { SummarizationOutput } from "@huggingface/transformers";

type SummarizeOptions = {
  text: string;
};

export async function summarize({ text }: SummarizeOptions) {
  const generator = await SummarizationPipeline.getInstance();
  const result = (await generator(text, {
    max_new_tokens: 100,
  } as any)) as SummarizationOutput;
  return result;
}
