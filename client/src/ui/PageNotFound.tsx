import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty";
import ButtonLink from "./ButtonLink";

export default function PageNotFound() {
  return (
    <Empty className="flex items-center justify-center h-screen">
      <EmptyHeader>
        <EmptyTitle className="font-bold text-4xl mb-2">404 - Not Found</EmptyTitle>
        <EmptyDescription className="text-xl w-2xl">The page you&apos;re looking for doesn&apos;t exist.</EmptyDescription>
      </EmptyHeader>

      <EmptyContent>
        <EmptyDescription>
          <ButtonLink to="/">Back to Home</ButtonLink>
        </EmptyDescription>
      </EmptyContent>
    </Empty>
  );
}
