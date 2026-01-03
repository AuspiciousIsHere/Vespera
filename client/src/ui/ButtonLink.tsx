import { Button } from "@/components/ui/button";
import type React from "react";
import { Link } from "react-router";

interface ButtonLinkPropTypes {
  to: string;
  variant?: "default" | "outline" | "ghost" | "destructive" | "secondary" | "link";
  children?: React.ReactNode;
  className?: string;
}

export default function ButtonLink({ to, variant = "default", children, className }: ButtonLinkPropTypes) {
  return (
    <Button className={`${className}`} variant={variant}>
      <Link to={to} className="flex items-center gap-2 h-full p-0 m-0">
        {children}
      </Link>
    </Button>
  );
}
