const scenes = [
  {
    src: 'https://images.pexels.com/photos/20101316/pexels-photo-20101316.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'A lone figure walking through a foggy illuminated street at night',
    span: 'md:col-span-2',
    height: 'h-64 md:h-80',
  },
  {
    src: 'https://images.pexels.com/photos/7651301/pexels-photo-7651301.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'A dark moody interior of an abandoned industrial space with natural light',
    span: '',
    height: 'h-64 md:h-80',
  },
  {
    src: 'https://images.pexels.com/photos/35030856/pexels-photo-35030856.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'A narrow cobblestone street illuminated by warm lights at night',
    span: '',
    height: 'h-64 md:h-80',
  },
  {
    src: 'https://images.pexels.com/photos/32947933/pexels-photo-32947933.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Two people silhouetted against a sunset on a serene desert landscape',
    span: 'md:col-span-2',
    height: 'h-64 md:h-80',
  },
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
              className={`group relative overflow-hidden rounded-sm ${scene.span}`}
            >
              <img
                src={scene.src}
                alt={scene.alt}
                className={`w-full ${scene.height} object-cover transition-all duration-[3000ms] group-hover:scale-105`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-void-950/70 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-700" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
