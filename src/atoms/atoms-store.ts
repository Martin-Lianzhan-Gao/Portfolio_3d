import { atom } from "jotai";
import { brisbane } from "@/data/cities";

// Atom state to track the page transition status, if the page is transitioning, related components can use this to show animations.
export const isTransitioningAtom = atom(false);

// Atom state to track the current city, used to determine which city is currently displayed on the map.
export const currentCityAtom = atom<{ longitude: number; latitude: number }>(brisbane);