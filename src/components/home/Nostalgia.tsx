import PixelArtCanvas from '@/components/PixelArtCanvas';
import { drawNostalgiaScene } from '@/components/pixelart/NostalgiaScene';

export default function Nostalgia() {
  return (
    <section className="relative py-24 md:py-40 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-void-950 via-dusk-950/50 to-void-950" />
        <div className="absolute inset-0 bg-gradient-to-br from-ember-500/5 via-transparent to-dusk-800/10" />
      </div>

      {/* Pixel-art nostalgia scene — CRT TV glowing in a dark room */}
      <div className="absolute right-0 bottom-0 w-full md:w-1/2 h-64 md:h-full opacity-30 z-0">
        <PixelArtCanvas draw={drawNostalgiaScene} scale={3} />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-10 text-center">
        <p className="font-pixel text-[8px] text-ember-400/70 tracking-nostalgic mb-8">
          FOR THOSE WHO REMEMBER
        </p>

        <h2 className="font-serif text-3xl md:text-5xl text-cream-100 font-light italic leading-tight mb-10 text-glow-ember">
          For Those Who Remember
        </h2>

        <div className="divider-warm w-24 mx-auto mb-10" />

        <p className="font-serif text-xl md:text-2xl text-cream-200 font-light italic leading-relaxed mb-6">
          Some journeys stay with us.
        </p>

        <p className="font-body text-cream-400 text-base md:text-lg font-light leading-relaxed mb-6">
          If you've been here before, Stranger is an invitation to return.
        </p>

        <p className="font-body text-cream-300 text-base md:text-lg font-light leading-relaxed italic">
          And if you're discovering it for the first time, perhaps this is where
          your journey begins.
        </p>
      </div>
    </section>
  );
}
