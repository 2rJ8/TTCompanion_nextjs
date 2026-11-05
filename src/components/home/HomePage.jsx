import CollectionsSection from "./CollectionsSection";
import HeroSection from "./HeroSection";
import NewsSection from "./NewsSection";

export default function HomePage({ featuredGameName = "pandemic" }) {
  return (
    <main id="main-content">
      <HeroSection gameName={featuredGameName} />
      <NewsSection />
      <CollectionsSection />
    </main>
  );
}
