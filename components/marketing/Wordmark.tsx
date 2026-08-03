import Image from "next/image";
import { cn } from "@/lib/utils";
import { logo } from "@/lib/images";

/**
 * The Othayoth Villa wordmark: the brand's blossom mark paired with the
 * "Othayoth" / "Villa" lockup. Two colour variants cover light and dark
 * backgrounds (see lib/images.ts for the source assets).
 */
export function Wordmark({
  invert = false,
  className,
}: {
  invert?: boolean;
  className?: string;
}) {
  const mark = invert ? logo.horizontalDark : logo.horizontalLight;
  return (
    <span className={cn("inline-flex items-center", className)}>
      <Image
        src={mark.src}
        alt={mark.alt}
        width={mark.width}
        height={mark.height}
        priority
        className="h-9 w-auto"
      />
    </span>
  );
}
