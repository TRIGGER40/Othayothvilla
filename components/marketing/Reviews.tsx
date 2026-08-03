import { reviews } from "@/lib/content";
import { Card } from "@/components/ui/Card";
import { StarRating } from "@/components/ui/Bits";
import { Reveal } from "@/components/ui/Reveal";

export function Reviews() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {reviews.map((r, i) => (
        <Reveal key={r.name} delay={i * 80} as="article">
          <Card className="h-full p-7">
            <StarRating value={r.stars} />
            <blockquote className="mt-4 font-serif text-lg leading-relaxed text-palm-600">
              &ldquo;{r.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-5 text-sm text-stone-400">
              <span className="font-medium text-ink">{r.name}</span> · {r.from}
            </figcaption>
          </Card>
        </Reveal>
      ))}
    </div>
  );
}
