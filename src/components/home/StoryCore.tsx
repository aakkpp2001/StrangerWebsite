import PixelArtCanvas from '@/components/PixelArtCanvas';
import { drawStoryScene } from '@/components/pixelart/StoryScene';

export default function StoryCore() {
  return (
    <section className="relative py-24 md:py-40 overflow-hidden">
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-void-950 via-dusk-950/40 to-void-950" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-2 gap-16 md:gap-20 items-center">
          {/* Pixel-art scene — two characters in warm interior */}
          <div className="relative group order-2 md:order-1">
            <div className="absolute -inset-1 bg-gradient-to-br from-ember-400/20 to-dusk-700/30 rounded-sm blur-xl opacity-50 group-hover:opacity-80 transition-opacity duration-1000" />
            <div className="relative overflow-hidden rounded-sm h-80 md:h-[28rem] bg-void-950">
              <PixelArtCanvas draw={drawStoryScene} scale={3} />
              <div className="absolute inset-0 bg-gradient-to-t from-void-950/40 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Text */}
          <div className="order-1 md:order-2">
            <p className="font-pixel text-[8px] text-ember-400/60 tracking-nostalgic mb-6">
              THE HEART
            </p>
            <h2 className="font-serif text-3xl md:text-5xl text-cream-100 font-light italic leading-tight mb-8">
              Some Stories Are<br />About Finding Someone.
            </h2>
            <div className="divider-warm w-24 mb-8" />
            <p className="font-body text-cream-400 text-base md:text-lg font-light leading-relaxed mb-6">
              Stranger is a story about distance, memory, loneliness, and the
              people we choose to hold onto.
            </p>
            <p className="font-body text-cream-400 text-base md:text-lg font-light leading-relaxed mb-6">
              As you explore unfamiliar worlds, you'll meet characters with their
              own hopes, fears, and secrets.
            </p>
            <p className="font-body text-cream-300 text-base md:text-lg font-light leading-relaxed italic">
              What begins as a journey through the unknown may become something
              much more personal.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
