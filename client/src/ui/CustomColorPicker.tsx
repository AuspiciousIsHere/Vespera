"use client";

import { Copy, Palette, X } from "lucide-react";
import { useState } from "react";

import { Field, FieldGroup } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";

interface CustomColorPickerProps {
  value: string[]; // List of colors
  onChange: (colors: string[]) => void;
  label?: string;
  className?: string;
}

export function CustomColorPicker({ value = [], onChange, label = "Pick a Color", className = "" }: CustomColorPickerProps) {
  const [hex, setHex] = useState<string>("");
  const [r, setR] = useState<string>("0");
  const [g, setG] = useState<string>("0");
  const [b, setB] = useState<string>("0");

  // Convert HEX to RGB
  const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  // Convert RGB to HEX
  const rgbToHex = (r: number, g: number, b: number): string => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
  };

  const addColor = () => {
    if (hex && !value.includes(hex)) {
      onChange([...value, hex]);
    }
  };

  const removeColor = (color: string) => {
    onChange(value.filter((c) => c !== color));
  };

  // Handle HEX change
  const handleHexChange = (newHex: string) => {
    let cleanHex = newHex.trim();
    if (!cleanHex.startsWith("#")) cleanHex = "#" + cleanHex;
    cleanHex = cleanHex.toUpperCase();

    setHex(cleanHex);

    const rgb = hexToRgb(cleanHex);
    if (rgb) {
      setR(rgb.r.toString());
      setG(rgb.g.toString());
      setB(rgb.b.toString());
    }
  };

  // Handle RGB change
  const handleRgbChange = (channel: "r" | "g" | "b", val: string) => {
    const num = val.replace(/\D/g, "");
    const n = Math.max(0, Math.min(255, Number(num || 0)));

    if (channel === "r") setR(n.toString());
    if (channel === "g") setG(n.toString());
    if (channel === "b") setB(n.toString());

    const newHex = rgbToHex(channel === "r" ? n : Number(r), channel === "g" ? n : Number(g), channel === "b" ? n : Number(b));

    setHex(newHex);
  };

  const currentColor = hex || "#000000";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentColor);
    toast.success("Gradient CSS copied to clipboard!", { autoClose: 1000 });
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <Label className="text-xl font-semibold flex items-center gap-2">
        <Palette className="w-5 h-5" />
        {label}
      </Label>

      {/* Large Color Preview */}
      <div
        className="w-full h-32 rounded-xl border-2 border-muted-foreground/30 shadow-inner transition-all"
        style={{ backgroundColor: currentColor }}
      />

      <div className="flex flex-col gap-4">
        {/* HEX Input */}
        <div className="flex gap-4">
          {/* RGB Inputs */}
          <Field className="w-1/2">
            <Label className="text-sm">RGB</Label>
            <FieldGroup className="grid grid-cols-3 gap-2">
              <Field>
                <Input
                  id="r"
                  type="text"
                  value={r}
                  onChange={(e) => handleRgbChange("r", e.target.value)}
                  className="font-mono text-center"
                  maxLength={3}
                />
              </Field>

              <Field>
                <Input
                  id="g"
                  type="text"
                  value={g}
                  onChange={(e) => handleRgbChange("g", e.target.value)}
                  className="font-mono text-center"
                  maxLength={3}
                />
              </Field>

              <Field>
                <Input
                  id="b"
                  type="text"
                  value={b}
                  onChange={(e) => handleRgbChange("b", e.target.value)}
                  className="font-mono text-center"
                  maxLength={3}
                />
              </Field>
            </FieldGroup>
          </Field>

          <div className="w-1/2">
            <Field>
              <Label htmlFor="hex" className="text-sm">
                HEX
              </Label>

              <div className="flex gap-2">
                <Input
                  id="hex"
                  type="text"
                  value={hex}
                  onChange={(e) => handleHexChange(e.target.value)}
                  placeholder="#FF6B6B"
                  className="font-mono uppercase"
                  maxLength={7}
                />

                <input
                  type="color"
                  value={hex.toLowerCase()}
                  onChange={(e) => handleHexChange(e.target.value)}
                  className="w-12 h-10 cursor-pointer rounded"
                />
              </div>
            </Field>
          </div>
        </div>

        {/* Current Value Display */}
        <div className="flex items-center text-sm font-mono bg-muted px-3 py-2 rounded-md">
          Current: {currentColor} → rgb({r}, {g}, {b})
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Button type="button" onClick={addColor}>
          Add Color
        </Button>

        <Button type="button" onClick={copyToClipboard} variant="secondary" size="sm">
          <Copy className="w-4 h-4 mr-2" />
          Copy CSS
        </Button>
      </div>

      {value.length > 0 && (
        <div className="mt-4">
          <Label className="text-sm mb-2 block">Added Colors</Label>
          <div className="flex flex-wrap gap-3">
            {value.map((color) => (
              <div key={color} className="relative group">
                <div className="w-16 h-16 rounded-md border shadow-sm" style={{ backgroundColor: color }} />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute -top-2 -right-2 size-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removeColor(color)}
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
