import Hero from '@/components/home/Hero';
import WorldIntro from '@/components/home/WorldIntro';
import StoryCore from '@/components/home/StoryCore';
import Gameplay from '@/components/home/Gameplay';
import Characters from '@/components/home/Characters';
import VisualStorytelling from '@/components/home/VisualStorytelling';
import Nostalgia from '@/components/home/Nostalgia';
import FinalCTA from '@/components/home/FinalCTA';

export default function Home() {
  return (
    <>
      <Hero />
      <WorldIntro />
      <StoryCore />
      <Gameplay />
      <Characters />
      <VisualStorytelling />
      <Nostalgia />
      <FinalCTA />
    </>
  );
}
