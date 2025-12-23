import { Spinner } from "@/components/ui/spinner";

export default function PageSpinner() {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
      <Spinner className="size-10" />
    </div>
  );
}
