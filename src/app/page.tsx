import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { MenuPreview } from "@/components/sections/MenuPreview";
import { Events } from "@/components/sections/Events";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <MenuPreview />
      <Events />
    </>
  );
}
