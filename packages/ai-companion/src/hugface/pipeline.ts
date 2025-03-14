import {
  pipeline,
  ProgressCallback,
  SummarizationPipeline as HGSummarizationPipeline,
  QuestionAnsweringPipeline,
} from "@huggingface/transformers";

export class SummarizationPipeline {
  static model = "Xenova/distilbart-cnn-6-6";
  static instance: Promise<HGSummarizationPipeline> | null = null;

  static async getInstance(progress_callback?: ProgressCallback) {
    if (this.instance === null) {
      this.instance = pipeline("summarization", this.model, {
        progress_callback,
      });
    }
    return this.instance;
  }
}

export class QnAPipeline {
  static model = "Xenova/distilbert-base-cased-distilled-squad";
  static instance: Promise<QuestionAnsweringPipeline> | null = null;

  static async getInstance(progress_callback?: ProgressCallback) {
    if (this.instance === null) {
      this.instance = pipeline("question-answering", this.model, {
        progress_callback,
      });
    }
    return this.instance;
  }
}
