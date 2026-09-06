import { Link } from 'react-router-dom';
import { ArrowDown, ArrowRight } from 'lucide-react';
import Starfield from '@/components/Starfield';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image — lone character under vast starry sky */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.pexels.com/photos/1473/sky-man-person-night.jpg?auto=compress&cs=tinysrgb&w=1920"
          alt="A lone figure standing beneath a vast starry night sky"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-void-950/50 via-void-950/40 to-void-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-void-950/70 via-transparent to-void-950/70" />
      </div>

      <Starfield density={60} className="z-[1] opacity-50" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div className="animate-fade-in">
          <p className="font-pixel text-[9px] md:text-[10px] text-ember-400/80 tracking-nostalgic mb-8 md:mb-10">
            A POINT-AND-CLICK SCI-FI RPG
          </p>
        </div>

        <h1 className="animate-fade-up font-serif text-6xl md:text-8xl lg:text-9xl text-cream-100 text-glow italic font-light tracking-wide-sm mb-6 md:mb-8" style={{ animationDelay: '0.2s', opacity: 0 }}>
          Stranger
        </h1>

        <p className="animate-fade-up font-serif text-xl md:text-3xl text-cream-200 font-light italic leading-snug mb-8 md:mb-10" style={{ animationDelay: '0.5s', opacity: 0 }}>
          Somewhere beyond the stars,<br className="hidden md:block" /> someone is waiting.
        </p>

        <p className="animate-fade-up font-body text-sm md:text-base text-cream-400 font-light leading-relaxed max-w-2xl mx-auto mb-10 md:mb-14" style={{ animationDelay: '0.8s', opacity: 0 }}>
          Stranger is a point-and-click sci-fi RPG about exploration, mystery,
          and the connections that survive across impossible distances.
        </p>

        <div className="animate-fade-up flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6" style={{ animationDelay: '1.1s', opacity: 0 }}>
          <a
            href="#world"
            className="group inline-flex items-center gap-3 px-8 py-3.5 bg-ember-400/10 border border-ember-400/40 text-ember-300 font-body text-sm tracking-wide-sm rounded-sm hover:bg-ember-400/20 hover:border-ember-400/70 transition-all duration-500"
          >
            ENTER THE WORLD
            <ArrowDown size={16} className="group-hover:translate-y-1 transition-transform duration-500" />
          </a>
          <Link
            to="/about"
            className="group inline-flex items-center gap-3 px-8 py-3.5 border border-cream-300/20 text-cream-300 font-body text-sm tracking-wide-sm rounded-sm hover:border-cream-300/50 hover:text-cream-100 transition-all duration-500"
          >
            LEARN MORE
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-500" />
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="w-px h-12 bg-gradient-to-b from-transparent via-cream-300/30 to-cream-300/50 animate-drift" />
      </div>
    </section>
  );
}
