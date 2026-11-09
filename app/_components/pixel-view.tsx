"use client";

import React from "react";
import * as tf from "@tensorflow/tfjs";

export const SIZE = 64; // every photo becomes 64 x 64 dots

// Download one photo into the browser.
export const loadImage = async (url: string) => {
  const img = new Image();
  img.crossOrigin = "anonymous"; // without this, TensorFlow is not allowed to read the pixels
  img.src = url;
  await img.decode();
  return img;
};

// One photo becomes a grid of numbers: 64 x 64 dots x 3 colors.
export const toNumbers = (img: HTMLImageElement) =>
  tf.tidy(
    () =>
      tf.browser
        .fromPixels(img) // photo -> numbers from 0 to 255, shape [h, w, 3]
        .resizeBilinear([SIZE, SIZE]) // shrink to 64 x 64
        .toFloat()
        .div(255), // 0-255 becomes 0-1
  ) as tf.Tensor3D;

type Pixel = { x: number; y: number; r: number; g: number; b: number };

// Shows what the model "sees": the 64x64 grid, and the numbers of the pixel under the mouse.
export function PixelView({ url }: { url: string }) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const valuesRef = React.useRef<Float32Array | null>(null);
  const [original, setOriginal] = React.useState<string>("");
  const [hover, setHover] = React.useState<Pixel | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let cancelled = false;
    let tensor: tf.Tensor3D | null = null;

    (async () => {
      try {
        const img = await loadImage(url);
        if (cancelled) return;
        setOriginal(`${img.naturalWidth} × ${img.naturalHeight}`);

        tensor = toNumbers(img);
        valuesRef.current = (await tensor.data()) as Float32Array; // flat: [r,g,b, r,g,b, ...]
        if (cancelled || !canvasRef.current) return;
        await tf.browser.toPixels(tensor, canvasRef.current); // draw the 64x64 grid
      } catch (e) {
        if (!cancelled) setError((e as Error).message);
      } finally {
        tensor?.dispose(); // free GPU memory
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [url]);

  if (error) {
    return <p className="p-2 text-[12px] text-red-600">Pixels: {error}</p>;
  }

  return (
    <div className="flex flex-col gap-1 p-2 text-[12px] text-[var(--muted)]">
      <canvas
        ref={canvasRef}
        width={SIZE}
        height={SIZE}
        onMouseLeave={() => setHover(null)}
        className="aspect-square w-full cursor-crosshair rounded-[8px]"
        style={{ imageRendering: "pixelated" }}
      />
      {/* <p>
        {original || "…"} → {SIZE}×{SIZE}×3 ={" "}
        {(SIZE * SIZE * 3).toLocaleString()} numbers
      </p> */}
    </div>
  );
}
