import { Palette, Plus, Trash2, Copy, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";

interface GradientStop {
  color: string;
  position: number; // 0–100
}

interface CustomGradientPickerProps {
  value: string[]; // List of gradients
  onChange: (gradients: string[]) => void;
  label?: string;
  className?: string;
}

export function CustomGradientPicker({ value = [], onChange, label = "Create Gradient", className = "" }: CustomGradientPickerProps) {
  const [stops, setStops] = useState<GradientStop[]>([
    { color: "#667eea", position: 0 },
    { color: "#764ba2", position: 100 },
  ]);

  const [direction, setDirection] = useState("to right");

  // Generate CSS gradient string
  const gradientCSS = `linear-gradient(${direction}, ${stops.map((stop) => `${stop.color} ${stop.position}%`).join(", ")})`;

  const addGradient = () => {
    if (!value.includes(gradientCSS)) {
      onChange([...value, gradientCSS]);
    }
  };

  const removeGradient = (gradient: string) => {
    onChange(value.filter((g) => g !== gradient));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(gradientCSS);
    toast.success("Gradient CSS copied to clipboard!", { autoClose: 1000 });
  };

  const addStop = () => {
    const newPosition = Math.round((stops[stops.length - 1].position + stops[0].position) / 2) || 50;
    setStops([...stops, { color: "#000000", position: newPosition }]);
  };

  const removeStop = (index: number) => {
    if (stops.length <= 2) return;
    setStops(stops.filter((_, i) => i !== index));
  };

  const updateStop = (index: number, field: "color" | "position", val: string) => {
    const newStops = [...stops];
    if (field === "color") {
      newStops[index].color = val;
    } else {
      const pos = Math.max(0, Math.min(100, Number(val) || 0));
      newStops[index].position = pos;
    }
    setStops(newStops);
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <Label className="text-xl font-medium flex items-center gap-2">
        <Palette className="w-5 h-5" />
        {label}
      </Label>

      {/* Large Gradient Preview */}
      <div
        className="w-full h-40 rounded-2xl shadow-2xl border-4 border-white"
        style={{
          backgroundImage: gradientCSS,
        }}
      />

      {/* Direction Selector */}
      <div className="space-y-2">
        <Label className="text-sm">Direction</Label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {["to right", "to left", "to bottom", "to top"].map((dir) => (
            <Button
              key={dir}
              type="button"
              variant={direction === dir ? "default" : "outline"}
              onClick={() => setDirection(dir)}
              className="text-xs py-3"
            >
              {dir.replace("to ", "").charAt(0).toUpperCase() + dir.replace("to ", "").slice(1)}
            </Button>
          ))}
        </div>
      </div>

      {/* Color Stops */}
      <div className="space-y-4">
        <Label className="text-sm">Color Stops</Label>
        {stops.map((stop, index) => (
          <div key={index} className="flex items-end gap-3 bg-muted/50 p-3 rounded-lg">
            {/* Color Picker */}
            <div className="flex-1 space-y-1">
              <Label className="text-xs">Color</Label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={stop.color}
                  onChange={(e) => updateStop(index, "color", e.target.value)}
                  className="w-12 h-10 cursor-pointer rounded"
                />
                <Input
                  type="text"
                  value={stop.color.toUpperCase()}
                  onChange={(e) => updateStop(index, "color", e.target.value)}
                  className="font-mono w-32 py-1"
                  maxLength={7}
                />
              </div>
            </div>

            {/* Position */}
            <div className="space-y-1">
              <Label className="text-xs">Position (%)</Label>
              <Input
                type="number"
                value={stop.position}
                onChange={(e) => updateStop(index, "position", e.target.value)}
                className="w-20 font-mono"
                min={0}
                max={100}
              />
            </div>

            {/* Remove Button */}
            <Button type="button" variant="ghost" size="icon" onClick={() => removeStop(index)} disabled={stops.length <= 2} className="mb-1">
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
        <Button type="button" variant="outline" onClick={addStop} className="w-full py-6">
          <Plus className="w-4 h-4 mr-2" />
          Add Color Stop
        </Button>
      </div>

      {/* Final CSS Output */}
      <div className="text-sm font-mono bg-muted p-3 rounded-md break-all overflow-auto text-nowrap">{gradientCSS}</div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <Button type="button" onClick={addGradient}>
          Add Gradient
        </Button>

        <div className="flex gap-2">
          <Button type="button" onClick={copyToClipboard} variant="secondary" size="sm">
            <Copy className="w-4 h-4 mr-2" />
            Copy CSS
          </Button>
        </div>
      </div>

      {/* Created Gradients List */}
      {value.length > 0 && (
        <div className="mt-4">
          <Label className="text-sm mb-2 block">Added Gradients</Label>
          <div className="flex flex-wrap gap-3">
            {value.map((gradient) => (
              <div key={gradient} className="relative group">
                <div className="w-32 h-16 rounded-md border shadow-sm" style={{ backgroundImage: gradient }} />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon-xs"
                  className="absolute -top-2 -right-2 size-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removeGradient(gradient)}
                >
                  <X className="size-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
