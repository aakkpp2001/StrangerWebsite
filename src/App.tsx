function App() {
  return (
    <div className="min-h-screen bg-void-950 grain relative">
      <div className="vignette absolute inset-0 pointer-events-none" />
      <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
        <div className="animate-fade-up text-center max-w-2xl">
          <p className="font-pixel text-[10px] text-ember-400 tracking-nostalgic mb-8">
            STRANGER
          </p>
          <h1 className="font-serif text-5xl md:text-6xl text-cream-100 text-glow italic font-light leading-tight mb-6">
            Some memories
            <br />
            travel farther than light.
          </h1>
          <div className="divider-warm mx-auto w-32 my-8" />
          <p className="font-body text-cream-400 text-lg font-light leading-relaxed">
            A point-and-click sci-fi RPG about the worlds we leave behind,
            the people we carry with us, and the distance between.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
