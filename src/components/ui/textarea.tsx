import * as React from "react";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

type TextareaProps = React.ComponentProps<"textarea"> & {
  label?: string;
};

function Textarea({ className, label, id, ...props }: TextareaProps) {
  const createdId = React.useId();

  const textAreaComp = (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      {...props}
    />
  );
  if (label)
    return (
      <div className="grid w-full gap-1.5">
        <Label htmlFor={id ?? createdId}>{label}</Label>
        {textAreaComp}
      </div>
    );
  return textAreaComp;
}

export { Textarea };
