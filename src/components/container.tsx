import React, { PropsWithChildren } from "react";
import classNames from "classnames";

interface ContainerProps {
  variant: "small" | "medium" | "large";
}

export function Container({
  children,
  variant,
}: PropsWithChildren<ContainerProps>) {
  const variantClassMap: Record<typeof variant, string> = {
    small: "max-w-2xl",
    medium: "max-w-4xl",
    large: "max-w-5xl",
  };

  return (
    <div
      className={classNames("w-full px-4 mx-auto", variantClassMap[variant])}
    >
      {children}
    </div>
  );
}
