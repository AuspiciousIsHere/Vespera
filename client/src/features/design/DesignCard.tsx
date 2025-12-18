import { Heart, ImageIcon, Star } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Design } from "@/types/design";

interface DesignCardProps {
  design: Design;
}

export default function DesignCard({ design }: DesignCardProps) {
  return (
    <Card className="flex flex-col p-0 overflow-hidden transition-shadow duration-300 hover:shadow-lg hover:cursor-pointer">
      <div className="relative h-48 w-full overflow-hidden bg-muted">
        {design.images.length > 0 ? (
          <img
            src={`http://localhost:5000/public/img/designs/${design.images[0]}`}
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
        <CardTitle className="text-lg">{design.name}</CardTitle>
        <CardDescription className="line-clamp-2">{design.description}</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col p-4 pt-0 grow">
        <div className="flex justify-between items-center text-sm text-muted-foreground mb-3">
          <span className="flex items-center">
            <Heart className="w-4 h-4 mr-1 fill-red-500 text-red-500" />
            {design.likes.toLocaleString()}
          </span>
          <span className="flex items-center">
            <Star className="w-4 h-4 mr-1 fill-amber-400 text-amber-400" />
            {design.rating.toFixed(1)}
          </span>
        </div>
        <div className="mt-auto flex flex-wrap gap-1">
          {design.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="px-2 py-0.5 text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
