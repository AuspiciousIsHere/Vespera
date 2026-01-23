import FourthSection from "@/ui/sections/FourthSection";
import SecondSection from "@/ui/sections/SecondSection";
import ThirdSection from "@/ui/sections/ThirdSection";
import FirstSection from "@/ui/sections/FirstSection";
import Footer from "@/ui/Footer";

export default function EntryPage() {
  return (
    <div className="relative w-full flex flex-col bg-background overflow-hidden">
      <main>
        <FirstSection />
        <SecondSection />
        <ThirdSection />
        <FourthSection />
      </main>

      <Footer />
    </div>
  );
}
