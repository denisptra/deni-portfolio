export interface ObjData {
  id: string;
  name: string;
  size: number;
  isSpecial: boolean;
}

// Only the bear is interactive — everything else is room decoration
export const OBJECTS: ObjData[] = [
  { id: "bear", name: "Bear", size: 100, isSpecial: true },
];
