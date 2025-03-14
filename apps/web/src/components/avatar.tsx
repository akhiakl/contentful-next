"use client";

import * as React from "react";
import Image, { ImageProps } from "next/image";
import { cn } from "@repo/ui/lib/utils";

type ImageLoadingStatus = "idle" | "loading" | "loaded" | "error";

type AvatarProps = Omit<ImageProps, "src" | "width" | "height" | "size"> & {
  src: string | undefined;
  size: ImageProps["width"];
  children?: React.ReactNode;
  delayMs?: number;
  imgClassName?: string;
  fallbackClassName?: string;
};

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  size,
  className,
  imgClassName,
  fallbackClassName,
  children: fallback,
  delayMs,
  ...imageProps
}) => {
  const [imageLoadingStatus, setImageLoadingStatus] =
    React.useState<ImageLoadingStatus>("idle");
  const [canRenderFallback, setCanRenderFallback] = React.useState(
    delayMs === undefined
  );
  const imageUrl = src?.startsWith("//") ? `https:${src}` : src;
  React.useEffect(() => {
    if (delayMs !== undefined) {
      const timerId = window.setTimeout(
        () => setCanRenderFallback(true),
        delayMs
      );
      return () => window.clearTimeout(timerId);
    }
  }, [delayMs]);

  const handleLoadingStatusChange = (status: ImageLoadingStatus) => {
    setImageLoadingStatus(status);
  };

  return (
    <span
      className={cn(
        "relative flex size-8 shrink-0 overflow-hidden rounded-full",
        className
      )}
    >
      {imageUrl && imageLoadingStatus !== "error" && (
        <Image
          width={size}
          height={size}
          {...imageProps}
          className={cn("aspect-square size-full", imgClassName)}
          src={imageUrl}
          alt={alt}
          onLoadingComplete={() => handleLoadingStatusChange("loaded")}
          onError={() => handleLoadingStatusChange("error")}
        />
      )}
      {canRenderFallback && imageLoadingStatus !== "loaded" && (
        <span
          className={cn(
            "bg-muted border border-muted-foreground flex size-full items-center justify-center rounded-full text-muted-foreground text-sm font-bold",
            fallbackClassName
          )}
        >
          {fallback}
        </span>
      )}
    </span>
  );
};

export { Avatar };
