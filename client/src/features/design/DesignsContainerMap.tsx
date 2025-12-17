import type { DesignList } from "@/types/design";
import DesignCard from "./DesignCard";

interface DesignsContainerMapPropTypes {
  designs: DesignList | undefined;
}

export default function DesignsContainerMap({ designs }: DesignsContainerMapPropTypes) {
  return (
    <div className="w-full grid grid-cols-4 gap-x-5 gap-y-10">
      {designs && designs?.total > 0 ? (
        designs?.data.map((design) => <DesignCard key={design._id} design={design} />)
      ) : (
        <p className="col-span-full text-center text-muted-foreground">This user hasn't created any design yet.</p>
      )}
    </div>
  );
}
