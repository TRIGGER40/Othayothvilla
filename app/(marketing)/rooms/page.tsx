import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbList } from "@/lib/schema";
import { PageHero } from "@/components/marketing/PageHero";
import { BookingCTA } from "@/components/marketing/BookingCTA";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Scene } from "@/components/ui/Scene";
import { Photo } from "@/components/ui/Photo";
import { Badge } from "@/components/ui/Bits";
import { Icon } from "@/components/icons/Icon";
import { rooms, type Room } from "@/lib/content";
import { villaPhotos } from "@/lib/images";

export const metadata: Metadata = pageMeta("rooms", {
  title: "Rooms & Spaces | 4-Bedroom Villa in Kannur",
  description:
    "Four ensuite bedrooms, living areas, a full kitchen, private pool deck and courtyard garden at Othayoth Villa, a private pool villa in Kannur, Kerala.",
});

const toneFor: Record<string, "palm" | "monsoon" | "sand" | "brass"> = {
  palm: "palm",
  monsoon: "monsoon",
  sand: "sand",
  brass: "brass",
};

function RoomRow({ room, index }: { room: Room; index: number }) {
  const flip = index % 2 === 1;
  return (
    <Reveal>
      <article className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
        <div className={flip ? "lg:order-2" : ""}>
          {room.photo ? (
            <Photo
              src={villaPhotos[room.photo].src}
              alt={villaPhotos[room.photo].alt}
              label={room.name}
              aspect="aspect-[4/3]"
            />
          ) : (
            <Scene tone={toneFor[room.tone]} label={room.name} aspect="aspect-[4/3]" />
          )}
        </div>
        <div className={flip ? "lg:order-1" : ""}>
          <Badge tone="palm">{room.kind}</Badge>
          <h2 className="mt-4 text-display-md text-palm-600">{room.name}</h2>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-stone-400">{room.body}</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {room.features.map((f) => (
              <li
                key={f}
                className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 bg-linen-50 px-3 py-1.5 text-sm text-stone-400"
              >
                <Icon name="check" size={14} className="text-brass-400" />
                {f}
              </li>
            ))}
          </ul>
        </div>
      </article>
    </Reveal>
  );
}

export default function RoomsPage() {
  return (
    <>
      <JsonLd data={breadcrumbList([{ name: "Home", path: "/" }, { name: "Rooms & Spaces", path: "/rooms" }])} />
      <PageHero
        eyebrow="Rooms & Spaces"
        title="Four bedrooms and the spaces that hold them together"
        intro="Every room opens toward the green or the water. Here is the whole home, space by space."
        photo="livingDining"
      />

      <Section tone="linen" size="lg">
        <div className="space-y-16 sm:space-y-24">
          {rooms.map((room, i) => (
            <RoomRow key={room.name} room={room} index={i} />
          ))}
        </div>
      </Section>

      <BookingCTA />
    </>
  );
}
