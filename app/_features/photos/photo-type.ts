export type PhotoType = {
  id: string;
  storagePath: string;
  imageUrl?: string;
  label: "CAT" | "NOT_CAT" | null;
};

export type Ground = "training" | "testing";
