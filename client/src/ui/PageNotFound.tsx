import { Link } from "react-router";

import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty";
import { Button } from "@/components/ui/button";

export default function PageNotFound() {
  return (
    <Empty className="flex items-center justify-center h-screen">
      <EmptyHeader>
        <EmptyTitle className="font-bold text-4xl mb-2">404 - Not Found</EmptyTitle>
        <EmptyDescription className="text-xl w-2xl">The page you&apos;re looking for doesn&apos;t exist.</EmptyDescription>
      </EmptyHeader>

      <EmptyContent>
        <EmptyDescription>
          <Button>
            <Link to="/">Back to Home</Link>
          </Button>
        </EmptyDescription>
      </EmptyContent>

      {/* <EmptyContent>
        <EmptyDescription>
          Need help? <a href="#">Contact support</a>
        </EmptyDescription>
      </EmptyContent> */}
    </Empty>
  );
}
