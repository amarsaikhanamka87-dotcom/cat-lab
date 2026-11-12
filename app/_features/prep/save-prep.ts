export type Prep = {
  photos: { url: string; isCat: boolean }[];
  finders: string[]; // pictures of the pattern finders: empty for now
  layers: { name: string; params: number }[];
  totalParams: number;
};

// Keep the prep summary in the browser for the next step.
export const savePrep = (prep: Prep) => {
  try {
    localStorage.setItem("prep", JSON.stringify(prep));
  } catch (err) {
    console.error("[prep] could not save", err);
  }
};
