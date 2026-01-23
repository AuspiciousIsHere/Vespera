import { Empty, EmptyDescription, EmptyHeader } from "@/components/ui/empty";
import { TbWorld } from "react-icons/tb";

export default function ChatEmptyPage() {
  return (
    <div className="w-full h-full flex flex-col items-center">
      <Empty>
        <EmptyHeader>
          <TbWorld className="text-secondary size-36" />
        </EmptyHeader>
        <EmptyDescription>Start Chating With Other Artists</EmptyDescription>
      </Empty>
    </div>
  );
}
