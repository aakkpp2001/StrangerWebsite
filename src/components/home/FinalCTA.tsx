import { Link } from 'react-router-dom';
import { ArrowRight, Mail } from 'lucide-react';
import PixelArtCanvas from '@/components/PixelArtCanvas';
import { drawCTAScene } from '@/components/pixelart/CTAScene';

export default function FinalCTA() {
  return (
    <section className="relative py-32 md:py-48 overflow-hidden">
      {/* Pixel-art deep space scene */}
      <div className="absolute inset-0 z-0">
        <PixelArtCanvas draw={drawCTAScene} scale={3} />
        <div className="absolute inset-0 bg-gradient-to-b from-void-950/40 via-void-950/30 to-void-950" />
      </div>

      {/* Vignette */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, transparent 30%, rgba(7,10,15,0.7) 100%)' }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-10 text-center">
        <h2 className="font-serif text-4xl md:text-6xl text-cream-100 font-light italic leading-tight mb-8 text-glow">
          The Journey<br />Isn't Over.
        </h2>

        <div className="divider-warm w-24 mx-auto mb-8" />

        <p className="font-serif text-lg md:text-xl text-cream-300 font-light italic leading-relaxed mb-4">
          There's still a universe waiting to be explored.
        </p>

        <p className="font-serif text-xl md:text-2xl text-cream-200 font-light italic mb-12">
          Step into Stranger.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <a
            href="#world"
            className="group inline-flex items-center gap-3 px-8 py-3.5 bg-ember-400/10 border border-ember-400/40 text-ember-300 font-body text-sm tracking-wide-sm rounded-sm hover:bg-ember-400/20 hover:border-ember-400/70 transition-all duration-500"
          >
            DISCOVER STRANGER
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-500" />
          </a>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-3 px-8 py-3.5 border border-cream-300/20 text-cream-300 font-body text-sm tracking-wide-sm rounded-sm hover:border-cream-300/50 hover:text-cream-100 transition-all duration-500"
          >
            CONTACT US
            <Mail size={16} className="group-hover:scale-110 transition-transform duration-500" />
          </Link>
        </div>
      </div>
    </section>
  );
}
