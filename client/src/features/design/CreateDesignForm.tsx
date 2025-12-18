import { UploadCloud, Image as ImageIcon, CirclePlus, X } from "lucide-react";
import { useEffect, useState, type ChangeEvent } from "react";
import { useForm } from "react-hook-form";

import { CustomGradientPicker } from "@/ui/CustomGradientPicker";
import { CustomColorPicker } from "@/ui/CustomColorPicker";
import { Field, FieldLabel } from "@/components/ui/field";
import { useCreateDesign } from "./hooks/useCreateDesign";
import type { DesignFormInput } from "@/types/design";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ImageItem {
  id: string;
  file: File;
  previewUrl: string;
}

export default function CreateDesignForm() {
  const [selectedPreview, setSelectedPreview] = useState<string | null>(null);
  const [uploadedImages, setUploadedImages] = useState<ImageItem[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [gradients, setGradients] = useState<string[]>([]);
  const { isCreatingDesign, createNewDesign } = useCreateDesign();

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<DesignFormInput>({
    mode: "onSubmit", // Validate only on submit → errors only after clicking Create
    defaultValues: {
      name: "",
      description: "",
      images: [],
      colors: [],
      gradients: [],
    },
  });

  // Register custom fields for validation on submit
  useEffect(() => {
    register("images", {
      validate: () => uploadedImages.length > 0 || "At least one image is required",
    });
    register("colors", {
      validate: () => colors.length > 0 || "At least one color is required",
    });
    register("gradients"); // Optional – no validation
  }, [register, uploadedImages.length, colors.length]);

  // Sync local state to form (without triggering validation early)
  useEffect(() => {
    setValue(
      "images",
      uploadedImages.map((img) => img.file),
      { shouldValidate: false }
    );
    setValue("colors", colors, { shouldValidate: false });
    setValue("gradients", gradients, { shouldValidate: false });
  }, [uploadedImages, colors, gradients, setValue]);

  // Image handlers
  function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || e.target.files.length === 0) return;

    const newFiles = Array.from(e.target.files);
    const newImages = newFiles.map((file) => ({
      id: String(Date.now() + Math.random()),
      file,
      previewUrl: URL.createObjectURL(file),
    }));

    setUploadedImages((prev) => [...prev, ...newImages]);
    setSelectedPreview(newImages[newImages.length - 1].previewUrl);
    e.target.value = "";
  }

  const selectImage = (previewUrl: string) => setSelectedPreview(previewUrl);

  const removeImage = (id: string) => {
    const newList = uploadedImages.filter((img) => img.id !== id);
    setUploadedImages(newList);
    setSelectedPreview(newList[0]?.previewUrl || null);
  };

  useEffect(() => {
    if (uploadedImages.length === 0) {
      setSelectedPreview(null);
    } else if (!uploadedImages.some((img) => img.previewUrl === selectedPreview)) {
      setSelectedPreview(uploadedImages[0].previewUrl);
    }
  }, [uploadedImages]);

  // Cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      uploadedImages.forEach((img) => URL.revokeObjectURL(img.previewUrl));
    };
  }, []);

  console.log(uploadedImages);

  const onSubmit = async (data: DesignFormInput) => {
    // Trigger validation for all custom fields on submit
    const results = await trigger(["images", "colors"]);
    if (!results) return;

    // Create FormData manually — this is the key fix!
    const formData = new FormData();

    // Append text fields
    formData.append("name", data.name.trim());
    formData.append("description", data.description.trim());

    // Append each image file individually (with a name like images[0], images[1]...)
    uploadedImages.forEach((image) => {
      formData.append("images", image.file); // "images" as field name, file as value
    });

    // Append colors as JSON string (or individual fields)
    formData.append("colors", JSON.stringify(colors));

    // Append gradients (optional)
    if (gradients.length > 0) {
      formData.append("gradientCss", JSON.stringify(gradients));
    }
    // TODO: Send to backend here
    createNewDesign(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full mx-auto py-12 px-4 max-w-6xl space-y-10">
      {/* Images Section */}
      <section className="flex flex-col space-y-6">
        <h1 className="text-4xl font-bold tracking-tight">Create New Design</h1>

        <div className="relative group w-full aspect-video md:aspect-21/9 rounded-2xl overflow-hidden border bg-muted flex items-center justify-center shadow-xl">
          {selectedPreview ? (
            <img src={selectedPreview} alt="Preview" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          ) : (
            <div className="flex flex-col items-center text-muted-foreground">
              <ImageIcon className="w-12 h-12 mb-2 opacity-20" />
              <p>No images uploaded yet</p>
            </div>
          )}

          <Label htmlFor="image-upload" className="absolute bottom-4 right-4 cursor-pointer">
            <div className="bg-primary text-primary-foreground px-4 py-2 rounded-full shadow-lg flex items-center gap-2 hover:bg-primary/90 transition-all">
              <UploadCloud className="w-4 h-4" />
              <span className="text-sm font-medium">Add Images</span>
            </div>
            <Input id="image-upload" type="file" multiple accept="image/*" className="hidden" onChange={handleImageChange} />
          </Label>
        </div>

        {uploadedImages.length > 0 && (
          <div className="flex gap-3 overflow-x-auto p-2 scrollbar-hide">
            {uploadedImages.map((image) => (
              <div
                key={image.id}
                onClick={() => selectImage(image.previewUrl)}
                className={`relative cursor-pointer shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                  selectedPreview === image.previewUrl ? "border-primary scale-105 shadow-md" : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <img src={image.previewUrl} alt="Thumb" className="w-full h-full object-cover" />
                <Button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage(image.id);
                  }}
                  variant="ghost"
                  className="absolute top-1 right-1 size-5 p-0"
                >
                  <X />
                </Button>
              </div>
            ))}
          </div>
        )}

        {/* Error shown only after submit attempt */}
        {errors.images && <p className="text-destructive text-sm">{errors.images.message}</p>}
      </section>

      {/* Form Fields */}
      <div className="space-y-10 max-w-4xl mx-auto w-full">
        <Field>
          <FieldLabel htmlFor="name" className="text-lg font-semibold">
            Design Name
          </FieldLabel>
          <Input
            id="name"
            placeholder="e.g., Crimson Sunrise"
            className="h-12 text-lg"
            {...register("name", { required: "Design name is required" })}
          />
          {errors.name && <p className="text-destructive text-sm mt-1">{errors.name.message}</p>}
        </Field>

        <Field>
          <FieldLabel htmlFor="description" className="text-lg font-semibold">
            Description
          </FieldLabel>
          <Textarea
            id="description"
            placeholder="Tell the story behind this piece..."
            rows={6}
            {...register("description", { required: "Description is required" })}
          />
          {errors.description && <p className="text-destructive text-sm mt-1">{errors.description.message}</p>}
        </Field>

        <div className="space-y-12">
          <div>
            <CustomColorPicker value={colors} onChange={setColors} label="Choose Colors" />
            {errors.colors && <p className="text-destructive text-sm mt-2">{errors.colors.message}</p>}
          </div>

          <CustomGradientPicker value={gradients} onChange={setGradients} label="Create Gradients (Optional)" />
        </div>

        {/* Button always enabled */}
        <Button type="submit" disabled={isCreatingDesign} className="w-full h-14 text-lg font-bold">
          <CirclePlus className="size-6 mr-2" />
          {isSubmitting ? "Creating..." : "Create Design"}
        </Button>
      </div>
    </form>
  );
}
