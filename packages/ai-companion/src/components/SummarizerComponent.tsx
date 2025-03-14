"use client";
import * as React from "react";
import { Button } from "@repo/ui/components/button";
import { Card, CardContent, CardFooter } from "@repo/ui/components/card";

interface SummarizerComponentProps {
  onSummarize?: () => Promise<string>;
}

export function SummarizerComponent({ onSummarize }: SummarizerComponentProps) {
  const [summary, setSummary] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleSummarize = async () => {
    setLoading(true);
    try {
      const summary = await onSummarize?.();
      setSummary(summary ?? "");
    } catch (error) {
      console.error("Summarization error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-lg mx-auto">
      <CardContent>
        <h2 className="text-xl font-bold mb-4">AI Summarizer</h2>
        {summary && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Summary:</h3>
            <p>{summary}</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={handleSummarize} disabled={loading}>
          {loading ? "Summarizing..." : "Summarize"}
        </Button>
      </CardFooter>
    </Card>
  );
}
