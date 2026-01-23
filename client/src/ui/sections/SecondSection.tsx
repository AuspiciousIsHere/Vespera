import DesignCard from "@/features/design/DesignCard";
import { useGetPopularDesigns } from "@/features/design/hooks/useGetPopularDesigns";
import PageSpinner from "../PageSpinner";

export default function SecondSection() {
  const { isPending: isGettingPopularDesigns, data: popularDesigns } = useGetPopularDesigns();

  const DesignList = ({ isClone = false }) => (
    <div className="flex gap-8 px-4 animate-infinite-scroll" aria-hidden={isClone}>
      {popularDesigns?.data.map((design) => (
        <div key={isClone ? `clone-${design._id}` : design._id} className="w-87.5 shrink-0">
          <DesignCard design={design} />
        </div>
      ))}
    </div>
  );

  if (isGettingPopularDesigns) return <PageSpinner />;

  return (
    <section className="min-h-screen bg-background py-32 px-8 flex flex-col items-center">
      <div className="max-w-5xl text-center mb-20">
        <h2 className="text-6xl md:text-8xl font-black tracking-tighter bg-clip-text text-transparent bg-linear-to-b from-neutral-950 to-neutral-500 dark:from-white dark:to-neutral-500 relative z-20 mb-10">
          Pulse of Creativity
        </h2>
        <p className="text-xl md:text-2xl text-neutral-400 leading-relaxed">
          Don't just store your work—set it in motion. Vespera is a living gallery where every pixel is evaluated by a global community of elite
          creators. From instant feedback loops to viral discovery, your designs gain the momentum they deserve. Here, a single "like" isn't just a
          metric; it's a handshake with your next collaborator.
        </p>
      </div>

      <div className="w-full overflow-hidden relative mask-[linear-gradient(to_right,transparent_0,black_10%,black_90%,transparent_100%)]">
        <div className="flex flex-nowrap pause-on-hover">
          <DesignList isClone={false} />
          <DesignList isClone={true} />
        </div>
      </div>
    </section>
  );
}
