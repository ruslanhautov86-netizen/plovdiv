import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Promotions } from "@/components/sections/Promotions";
import { MenuPreview } from "@/components/sections/MenuPreview";
import { Events } from "@/components/sections/Events";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Promotions />
      <MenuPreview />
      <Events />
    </>
  );
}
