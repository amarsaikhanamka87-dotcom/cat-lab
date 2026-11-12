"use client";

import { useEffect, useState } from "react";
import type { Ground, PhotoType } from "./photo-type";

// Load photos from one ground: "training" (the model learns from them)
// or "testing" (kept secret, used to check the model).
export const usePhotos = (ground: Ground) => {
  const [photos, setPhotos] = useState<PhotoType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Runs once when the page opens.
  useEffect(() => {
    const loadPhotos = async () => {
      try {
        const response = await fetch(`/api/photos?ground=${ground}`);
        if (!response.ok) throw new Error("load failed");
        setPhotos(await response.json()); // each photo: { id, imageUrl, label, ... }
      } catch (loadError) {
        console.error(`[${ground}] load`, loadError);
        setError("Could not load your photos. Refresh the page to try again.");
      } finally {
        setIsLoading(false);
      }
    };
    loadPhotos();
  }, [ground]);

  return { photos, isLoading, error };
};
