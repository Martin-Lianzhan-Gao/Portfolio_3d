import { atom } from "jotai";

// Atom state to track the page transition status, if the page is transitioning, related components can use this to show animations.
export const isTransitioningAtom = atom(false);