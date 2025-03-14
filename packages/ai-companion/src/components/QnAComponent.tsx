"use client";

import * as React from "react";
import { Button } from "@repo/ui/components/button";
import { Card, CardContent, CardFooter } from "@repo/ui/components/card";
import { Textarea } from "@repo/ui/components/textarea";

interface QnAComponentProps {
  onAsk?: (question: string) => Promise<string>;
}

export function QnAComponent({ onAsk }: QnAComponentProps) {
  const [question, setQuestion] = React.useState("");
  const [answer, setAnswer] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleAsk = async () => {
    if (!question.trim()) return;
    setLoading(true);
    try {
      const answer = await onAsk?.(question);
      setAnswer(answer ?? "No answer found!");
    } catch (error) {
      console.error("Error fetching answer:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-lg mx-auto">
      <CardContent>
        <h2 className="text-xl font-bold mb-4">Ask a Question</h2>
        <Textarea
          placeholder="Type your question here..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="mb-4"
        />
        {answer && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Answer:</h3>
            <p>{answer}</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={handleAsk} disabled={loading || !question}>
          {loading ? "Fetching answer..." : "Ask"}
        </Button>
      </CardFooter>
    </Card>
  );
}
