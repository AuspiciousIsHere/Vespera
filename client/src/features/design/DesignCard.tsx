import { Heart, ImageIcon, Star } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DESIGN_IMAGE_URL } from "@/constant/constants";
import { Badge } from "@/components/ui/badge";
import type { Design } from "@/types/design";
import ButtonLink from "@/ui/ButtonLink";

interface DesignCardProps {
  design: Design;
}

export default function DesignCard({ design }: DesignCardProps) {
  return (
    <Card className="flex flex-col p-0 overflow-hidden transition-shadow duration-300 hover:dark:shadow-none hover:dark:border-secondary hover:shadow-lg">
      <div className="relative h-48 w-full overflow-hidden bg-muted">
        {design.images.length > 0 ? (
          <img
            src={`${DESIGN_IMAGE_URL}/${design.images[0]}`}
            alt={design.name}
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            <ImageIcon className="h-8 w-8" />
          </div>
        )}
      </div>

      <CardHeader className="space-y-1 px-4">
        <CardTitle className="text-lg flex items-center gap-4">
          <div>{design.name}</div>

          <span className="flex items-center text-sm">
            <Star className="w-4 h-4 mr-1 fill-amber-400 text-amber-400" />
            {design.rating.toFixed(1)}
          </span>

          <span className="flex items-center text-sm">
            <Heart className="w-4 h-4 mr-1 fill-red-500 text-red-500" />
            {design.likes.toLocaleString()}
          </span>
        </CardTitle>
        <CardDescription className="line-clamp-2">{design.description}</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col justify-end items-end p-4 pt-0 grow h-24">
        <ButtonLink to={`/design/${design._id}`} className="w-fit mb-2">
          See more
        </ButtonLink>
      </CardContent>
    </Card>
  );
}
