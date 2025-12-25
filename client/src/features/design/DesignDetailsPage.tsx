import { ArrowLeft, Calendar, Heart, Star, ImageIcon, Copy } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";

import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { hexToHsl, hexToRgb } from "@/utils/colorFormat";
import { DESIGN_IMAGE_URL } from "@/constant/constants";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import useGetDesign from "./hooks/useGetDesign";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "react-toastify";

export default function DesignDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { data, isPending: isGettingDesign, error } = useGetDesign(id || "");
  const [selectedPreview, setSelectedPreview] = useState<string | null>(null);
  const design = data?.data;
  const navigate = useNavigate();

  // Set first image as default when data loads
  useEffect(() => {
    if (design?.images && design.images.length > 0) {
      setSelectedPreview(design.images[0]);
    }
  }, [design]);

  if (isGettingDesign) {
    return <DesignDetailsSkeleton />;
  }

  if (error || !design) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-bold text-destructive">Design not found</h1>
        <Link to="/designs">
          <Button variant="link" className="mt-4">
            <ArrowLeft className="mr-2 size-4" /> Back to designs
          </Button>
        </Link>
      </div>
    );
  }

  console.log(design);

  function copyColor(color: string | null) {
    if (!color) return;
    navigator.clipboard.writeText(color);
    toast.success("Gradient CSS copied to clipboard!", { autoClose: 1000 });
  }

  return (
    <div className="container max-w-6xl mx-auto py-8 px-4 space-y-10">
      {/* Back Button */}
      <Button onClick={() => navigate(-1)} className="inline-flex items-center">
        <ArrowLeft className="mr-2 size-4" />
        Back
      </Button>

      {/* Hero Section: Large Preview + Thumbnails */}
      <section className="space-y-6">
        {/* Main Image Preview */}
        <div className="relative group w-full aspect-video md:aspect-21/9 rounded-2xl overflow-hidden border bg-muted flex items-center justify-center shadow-xl">
          {selectedPreview ? (
            <img
              src={`${DESIGN_IMAGE_URL}/${selectedPreview}`}
              alt="Preview"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex flex-col items-center text-muted-foreground">
              <ImageIcon className="w-12 h-12 mb-2 opacity-20" />
              <p>No images uploaded yet</p>
            </div>
          )}
        </div>

        {design.images.length > 0 && (
          <div className="flex gap-3 overflow-x-auto p-2 scrollbar-hide">
            {design.images.map((image) => (
              <div
                key={image}
                onClick={() => setSelectedPreview(image)}
                className={`relative cursor-pointer shrink-0 w-20 h-20 rounded-lg border-2 transition-all group ${
                  selectedPreview === image ? "border-primary scale-105 shadow-md" : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <div className="w-full h-full overflow-hidden rounded-lg">
                  <img src={`${DESIGN_IMAGE_URL}/${image}`} alt="Thumb" className="w-full h-full object-cover" />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Metadata & Description */}
      <section className="flex flex-col gap-8">
        {/* Header: Stats */}

        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold tracking-tight">{design.name}</h1>

          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2">
              <Star className="size-5 fill-yellow-500 text-yellow-500" />
              <span className="font-bold text-lg">{design.rating.toFixed(1)}</span>
            </div>

            <div className="flex items-center gap-2">
              <Heart className="size-5 text-red-500" />
              <span className="font-bold text-lg">{design.likes}</span>
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="size-5" />
              <span className="text-sm">
                {new Date(design.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>

            {design.tags.length > 0 && (
              <div>
                <span className="text-muted-foreground block mb-3">Tags</span>
                <div className="flex flex-wrap gap-2">
                  {design.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <Separator />

        {/* Left: Description */}
        <div className="md:col-span-2 space-y-10">
          <div className="">
            <h2 className="text-2xl font-semibold mb-4">Description</h2>
            <p className="text-muted-foreground leading-relaxed">{design.description}</p>
          </div>

          {/* Colors */}
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl font-semibold">Colors Used</h2>
            <Badge variant="secondary">{design.colors.length}</Badge>
          </div>
          <div className="flex items-center flex-wrap gap-5">
            {design.colors.map((color) => (
              <HoverCard key={color}>
                <HoverCardTrigger className="group w-20 h-20 relative aspect-square rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                  <div className="w-full h-full" style={{ backgroundColor: color }} />
                </HoverCardTrigger>
                <HoverCardContent className="w-full flex flex-col gap-3">
                  <div className="flex items-center gap-5 justify-between">
                    <div className="flex items-center gap-3">
                      <Button variant="ghost" onClick={() => copyColor(color)}>
                        <Copy />
                      </Button>
                      <p>HEX</p>
                    </div>
                    {color}
                  </div>
                  <div className="flex items-center gap-5 justify-between">
                    <div className="flex items-center gap-3">
                      <Button variant="ghost" onClick={() => copyColor(hexToRgb(color))}>
                        <Copy />
                      </Button>
                      <p>RGB</p>
                    </div>
                    {hexToRgb(color)}
                  </div>
                  <div className="flex items-center gap-5 justify-between">
                    <div className="flex items-center gap-3">
                      <Button variant="ghost" onClick={() => copyColor(hexToHsl(color))}>
                        <Copy />
                      </Button>
                      <p>HSL</p>
                    </div>
                    {hexToHsl(color)}
                  </div>
                </HoverCardContent>
              </HoverCard>
            ))}
          </div>

          {/* Gradients */}
          {design?.gradients.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <h2 className="text-2xl font-semibold">Gradients</h2>
                <Badge variant="secondary">{design.gradients.length}</Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {design.gradients.map((gradient, i) => (
                  <div key={i} className="h-32 rounded-xl shadow-lg border" style={{ backgroundImage: gradient }} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

// Loading Skeleton
function DesignDetailsSkeleton() {
  return (
    <div className="container max-w-6xl mx-auto py-8 px-4 space-y-10">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="aspect-video md:aspect-21/9 rounded-2xl w-full" />
      <div className="flex gap-4 overflow-x-auto pb-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="shrink-0 w-32 h-32 rounded-xl" />
        ))}
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <Skeleton className="h-32" />
          <Skeleton className="h-48" />
        </div>
        <Skeleton className="h-64" />
      </div>
    </div>
  );
}
