import { Button } from "@/components/ui/button";
import type React from "react";
import { Link } from "react-router";

interface ButtonLinkPropTypes {
  to: string;
  variant?: "default" | "outline" | "ghost" | "destructive" | "secondary" | "link";
  children?: React.ReactNode;
}

export default function ButtonLink({ to, variant = "default", children }: ButtonLinkPropTypes) {
  return (
    <Button className="p-0 m-0" variant={variant}>
      <Link to={to} className="flex items-center gap-2 h-full px-4">
        {children}
      </Link>
    </Button>
  );
}
