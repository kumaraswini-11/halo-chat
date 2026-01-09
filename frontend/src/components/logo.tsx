import { cn } from "@/lib/utils"; // your tailwind cn utility

interface LogoProps {
  light?: boolean; // Light theme version
  brandName?: string; // Brand name text
  className?: string; // Optional extra classes
}

export function Logo({
  light = false,
  brandName = "halo/chat",
  className,
}: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div
        className={cn(
          "flex size-8 items-center justify-center rounded-full",
          light ? "bg-white" : "bg-foreground",
        )}
      >
        <div
          className={cn(
            "size-4 rounded-full",
            light ? "bg-black" : "bg-background",
          )}
        />
      </div>
      <span
        className={cn(
          "text-xl font-bold tracking-tight",
          light ? "text-white" : "text-foreground",
        )}
      >
        {brandName}
      </span>
    </div>
  );
}
