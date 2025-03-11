import React from "react";
import { CalendarIcon } from "lucide-react";
import { FormatDate } from "@/components/format-date";

type BlogDateProps = {
  date: string;
};

const BlogDate = ({ date }: BlogDateProps) => {
  return (
    <span className="flex items-center">
      <CalendarIcon className="text-primary" height={16} />
      <FormatDate date={new Date(date)} />
    </span>
  );
};

export default BlogDate;
