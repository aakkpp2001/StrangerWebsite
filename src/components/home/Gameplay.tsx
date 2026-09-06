import { Eye, HandHeart, MessageSquare, Compass } from 'lucide-react';

const highlights = [
  {
    icon: Compass,
    title: 'EXPLORE',
    text: 'Search unfamiliar worlds and uncover places hidden off the beaten path.',
  },
  {
    icon: HandHeart,
    title: 'INTERACT',
    text: 'Talk to characters, examine your surroundings, and discover the details others overlook.',
  },
  {
    icon: MessageSquare,
    title: 'CHOOSE',
    text: 'Your conversations and decisions shape how you experience the people and stories around you.',
  },
  {
    icon: Eye,
    title: 'DISCOVER',
    text: 'Follow clues, uncover mysteries, and slowly reveal what lies beneath the surface.',
  },
];

export default function Gameplay() {
  return (
    <section className="relative py-24 md:py-40 overflow-hidden">
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-void-950 via-void-900/60 to-void-950" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-10">
        <div className="text-center mb-16 md:mb-24">
          <p className="font-pixel text-[8px] text-ember-400/60 tracking-nostalgic mb-6">
            THE EXPERIENCE
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-cream-100 font-light italic leading-tight mb-6">
            Look. Listen. Explore.
          </h2>
          <div className="divider-warm w-24 mx-auto mb-6" />
          <p className="font-body text-cream-400 text-base md:text-lg font-light leading-relaxed max-w-2xl mx-auto">
            Explore strange environments, investigate mysterious places, talk to
            the people you meet, and piece together the story one discovery at a time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-dusk-900/30">
          {highlights.map((item, index) => (
            <div
              key={item.title}
              className="group relative bg-void-950 p-10 md:p-12 transition-colors duration-700 hover:bg-void-900/80"
            >
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 mt-1">
                  <item.icon
                    size={22}
                    className="text-ember-400/60 transition-all duration-700 group-hover:text-ember-400 group-hover:scale-110"
                    strokeWidth={1.2}
                  />
                </div>
                <div>
                  <p className="font-pixel text-[8px] text-cream-200 tracking-nostalgic mb-4">
                    {item.title}
                  </p>
                  <p className="font-body text-cream-400 text-sm md:text-base font-light leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </div>
              {/* Number watermark */}
              <span className="absolute top-6 right-8 font-serif text-5xl text-dusk-800/40 font-light italic select-none">
                0{index + 1}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
