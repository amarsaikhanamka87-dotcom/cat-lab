"use client";

import { useEffect, useState } from "react";

const [photos, setPhotos] = useState<PhotoType[]>([]);
const [isLoading, setIsLoading] = useState(true);
const [error, setError] = useState<string | null>(null);

// Runs once when the page opens.
useEffect(() => {
  const loadPhotos = async () => {
    try {
      // Only training photos. Testing photos are kept secret from the model.
      const response = await fetch("/api/photos?ground=training");
      if (!response.ok) throw new Error("load failed");
      setPhotos(await response.json()); // each photo: { id, url, label }
    } catch (loadError) {
      console.error("[train] load", loadError);
      setError("Could not load your photos. Refresh the page to try again.");
    } finally {
      setIsLoading(false);
    }
  };
  loadPhotos();
}, []);
