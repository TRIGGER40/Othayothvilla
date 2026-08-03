import { cn } from "@/lib/utils";

/**
 * Elegant placeholder artwork used in place of photography during build.
 * Each scene is a layered gradient with a minimal Kerala-rooted motif (palms,
 * water, arches, sun). Swap <Scene> for <Image> once real photos are ready;
 * the aspect and rounding stay identical.
 */

type Tone = "palm" | "monsoon" | "sand" | "brass";
type Motif = "palms" | "water" | "arch" | "sun" | "auto";

const gradients: Record<Tone, string> = {
  palm: "from-palm-600 via-palm-500 to-palm-400",
  monsoon: "from-monsoon-400 via-monsoon-300 to-palm-400",
  sand: "from-sand-300 via-sand-200 to-linen-200",
  brass: "from-brass-500 via-brass-400 to-sand-300",
};

const inkOnLight = new Set<Tone>(["sand"]);

function Palms({ light }: { light: boolean }) {
  const stroke = light ? "rgba(43,39,35,0.28)" : "rgba(246,241,231,0.5)";
  return (
    <g stroke={stroke} strokeWidth="1.6" fill="none" strokeLinecap="round">
      <path d="M78 100 C78 78 80 60 82 44" />
      <path d="M82 44 C74 40 66 40 58 46 M82 44 C90 40 98 42 104 50 M82 44 C76 36 74 28 76 20 M82 44 C88 36 94 32 102 30 M82 44 C72 44 64 48 58 56" />
      <path d="M30 100 C30 84 31 70 32 58" />
      <path d="M32 58 C26 54 20 54 14 58 M32 58 C38 54 44 55 49 61 M32 58 C28 51 27 44 29 38 M32 58 C37 51 42 48 49 47" />
    </g>
  );
}

function Water({ light }: { light: boolean }) {
  const stroke = light ? "rgba(43,39,35,0.22)" : "rgba(246,241,231,0.55)";
  return (
    <g stroke={stroke} strokeWidth="1.6" fill="none" strokeLinecap="round">
      <path d="M12 70c8 5 16 5 24 0s16-5 24 0 16 5 24 0 16-5 24 0" />
      <path d="M12 82c8 5 16 5 24 0s16-5 24 0 16 5 24 0 16-5 24 0" />
      <path d="M12 94c8 5 16 5 24 0s16-5 24 0 16 5 24 0 16-5 24 0" />
    </g>
  );
}

function Arch({ light }: { light: boolean }) {
  const stroke = light ? "rgba(43,39,35,0.24)" : "rgba(246,241,231,0.5)";
  return (
    <g stroke={stroke} strokeWidth="1.6" fill="none">
      <path d="M44 96V60a20 20 0 0 1 40 0v36" />
      <path d="M20 96V70a12 12 0 0 1 24 0v26" />
      <path d="M84 96V70a12 12 0 0 1 24 0v26" />
      <path d="M8 96h112" />
    </g>
  );
}

function Sun({ light }: { light: boolean }) {
  const c = light ? "rgba(43,39,35,0.18)" : "rgba(246,241,231,0.45)";
  return (
    <g stroke={c} strokeWidth="1.6" fill="none">
      <circle cx="92" cy="34" r="14" />
      <path d="M8 82c10 4 20 4 30 0s20-4 30 0 20 4 30 0 20-4 30 0" />
    </g>
  );
}

const motifByTone: Record<Tone, Motif> = {
  palm: "palms",
  monsoon: "water",
  sand: "arch",
  brass: "sun",
};

export function Scene({
  tone = "palm",
  motif = "auto",
  className,
  label,
  aspect = "aspect-[4/3]",
  rounded = "rounded-2xl",
}: {
  tone?: Tone;
  motif?: Motif;
  className?: string;
  label?: string;
  aspect?: string;
  rounded?: string;
}) {
  const light = inkOnLight.has(tone);
  const resolved: Motif = motif === "auto" ? motifByTone[tone] : motif;

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-gradient-to-br",
        gradients[tone],
        aspect,
        rounded,
        className,
      )}
      role="img"
      aria-label={label ?? "Villa scene placeholder"}
    >
      {/* soft light bloom */}
      <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/15 blur-2xl" />
      <div className="pointer-events-none absolute inset-0 texture-linen opacity-40" />
      <svg
        viewBox="0 0 128 108"
        preserveAspectRatio="xMidYMax meet"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        {resolved === "palms" && <Palms light={light} />}
        {resolved === "water" && <Water light={light} />}
        {resolved === "arch" && <Arch light={light} />}
        {resolved === "sun" && <Sun light={light} />}
      </svg>
      {label && (
        <span
          className={cn(
            "absolute bottom-3 left-4 z-10 text-xs font-medium tracking-wide",
            light ? "text-ink/60" : "text-linen-50/80",
          )}
        >
          {label}
        </span>
      )}
    </div>
  );
}
