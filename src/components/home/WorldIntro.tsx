export default function WorldIntro() {
  return (
    <section id="world" className="relative py-24 md:py-40 overflow-hidden">
      {/* Ambient background — distant planet/moon */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.pexels.com/photos/30596303/pexels-photo-30596303.png?auto=compress&cs=tinysrgb&w=1920"
          alt="Earth and its moon floating in the vast expanse of space"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-void-950 via-void-950/80 to-void-950" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Text */}
          <div>
            <p className="font-pixel text-[8px] text-ember-400/60 tracking-nostalgic mb-6">
              THE WORLD
            </p>
            <h2 className="font-serif text-3xl md:text-5xl text-cream-100 font-light italic leading-tight mb-8">
              A Universe<br />Full of Questions
            </h2>
            <div className="divider-warm w-24 mb-8" />
            <p className="font-body text-cream-400 text-base md:text-lg font-light leading-relaxed mb-6">
              Beyond the places we know lies a universe filled with forgotten worlds,
              strange encounters, and stories waiting to be uncovered.
            </p>
            <p className="font-body text-cream-400 text-base md:text-lg font-light leading-relaxed">
              In Stranger, every place has a story, every character has something
              left unsaid, and every choice can bring you closer to the truth.
            </p>
          </div>

          {/* Image — atmospheric environment */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-tr from-dusk-800/30 to-astral-600/20 rounded-sm blur-xl opacity-60 group-hover:opacity-90 transition-opacity duration-1000" />
            <div className="relative overflow-hidden rounded-sm">
              <img
                src="https://images.pexels.com/photos/12363164/pexels-photo-12363164.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="A mysterious fog-laden path through a dense forest"
                className="w-full h-80 md:h-96 object-cover transition-transform duration-[3000ms] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-void-950/60 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
