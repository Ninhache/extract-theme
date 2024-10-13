import React from "react";
import { cn } from "../lib/utils";

type LabelProps = { htmlFor: string } & React.HTMLAttributes<HTMLLabelElement>;

const Label: React.FC<LabelProps> = ({
  htmlFor,
  className = "",
  ...props
}: LabelProps) => {
  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className
      )}
      {...props}
    />
  );
};

export default Label;
