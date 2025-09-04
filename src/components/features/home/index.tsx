// components

import AboutArea from "./about";
import FAQsArea from "./faq";
import HeroArea from "./hero";

export const HomePage = () => {
  return (
    <main className="min-h-screen">
      <HeroArea />
      <AboutArea />
      <FAQsArea />
    </main>
  );
};
