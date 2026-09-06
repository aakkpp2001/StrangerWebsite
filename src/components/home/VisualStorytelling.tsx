import PixelArtCanvas from '@/components/PixelArtCanvas';
import {
  drawTownScene,
  drawShipInterior,
  drawConversationScene,
  drawPlanetScene,
  drawStructureScene,
} from '@/components/pixelart/GalleryScenes';

const scenes = [
  { draw: drawTownScene, alt: 'A quiet alien town at night', span: 'md:col-span-2', height: 'h-64 md:h-80' },
  { draw: drawShipInterior, alt: 'A quiet spaceship interior with a viewing port', span: '', height: 'h-64 md:h-80' },
  { draw: drawConversationScene, alt: 'Two characters in a nighttime conversation', span: '', height: 'h-64 md:h-80' },
  { draw: drawPlanetScene, alt: 'A mysterious alien planet landscape with two moons', span: 'md:col-span-2', height: 'h-64 md:h-80' },
  { draw: drawStructureScene, alt: 'An ancient unexplained structure', span: '', height: 'h-64 md:h-80' },
];

export default function VisualStorytelling() {
  return (
    <section className="relative py-24 md:py-40 overflow-hidden">
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-void-950 via-void-900/50 to-void-950" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10">
        <div className="text-center mb-16 md:mb-20">
          <p className="font-pixel text-[8px] text-ember-400/60 tracking-nostalgic mb-6">
            FRAGMENTS
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-cream-100 font-light italic leading-tight">
            A Glimpse Beyond<br />the Familiar
          </h2>
          <div className="divider-warm w-24 mx-auto mt-8" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {scenes.map((scene, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-sm bg-void-950 ${scene.span} ${scene.height}`}
            >
              <PixelArtCanvas draw={scene.draw} scale={3} />
              <div className="absolute inset-0 bg-gradient-to-t from-void-950/50 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
