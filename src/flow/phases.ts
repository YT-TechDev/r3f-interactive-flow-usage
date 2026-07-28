export const PHASES = [
  "origin",
  "expand",
  "align",
  "focus",
  "resolve",
] as const;

export type Phase = (typeof PHASES)[number];
