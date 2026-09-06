import PixelArtCanvas from '@/components/PixelArtCanvas';
import { drawCharacterPortrait } from '@/components/pixelart/CharacterScenes';

const characters = [
  {
    number: '01',
    name: 'THE TRAVELER',
    description: 'Someone searching for answers in a universe that seems determined to keep them hidden.',
    variant: 0,
  },
  {
    number: '02',
    name: 'THE STRANGER',
    description: 'Someone who knows more than they are willing to say.',
    variant: 1,
  },
  {
    number: '03',
    name: 'THE ONE WHO REMEMBERS',
    description: 'Some memories are better left forgotten. Others are impossible to escape.',
    variant: 2,
  },
];

export default function Characters() {
  return (
    <section className="relative py-24 md:py-40 overflow-hidden">
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-void-950 via-dusk-950/30 to-void-950" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10">
        <div className="text-center mb-16 md:mb-20">
          <p className="font-pixel text-[8px] text-ember-400/60 tracking-nostalgic mb-6">
            THE PEOPLE
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-cream-100 font-light italic leading-tight mb-6">
            Everyone Has a Story
          </h2>
          <div className="divider-warm w-24 mx-auto mb-6" />
          <p className="font-body text-cream-400 text-base md:text-lg font-light leading-relaxed max-w-2xl mx-auto">
            Across the universe, you'll meet people who may change your journey
            in ways you don't expect.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {characters.map((char) => (
            <div key={char.number} className="group">
              {/* Pixel-art portrait */}
              <div className="relative overflow-hidden rounded-sm mb-6 h-72 md:h-80 bg-void-950">
                <PixelArtCanvas draw={(ctx, w, h, time) => drawCharacterPortrait(ctx, w, h, time, char.variant)} scale={3} />
                <div className="absolute inset-0 bg-gradient-to-t from-void-950/60 via-transparent to-transparent pointer-events-none" />
                {/* Number */}
                <span className="absolute top-4 left-5 font-pixel text-[8px] text-ember-400/70 tracking-nostalgic">
                  {char.number}
                </span>
              </div>

              {/* Text */}
              <p className="font-pixel text-[8px] text-cream-200 tracking-nostalgic mb-4">
                {char.name}
              </p>
              <p className="font-body text-cream-400 text-sm font-light leading-relaxed italic">
                {char.description}
              </p>
            </div>
          ))}
        </div>

        <p className="text-center mt-12 font-body text-xs text-cream-400/50 font-light italic">
          These are conceptual placeholders, subject to change as the story unfolds.
        </p>
      </div>
    </section>
  );
}
