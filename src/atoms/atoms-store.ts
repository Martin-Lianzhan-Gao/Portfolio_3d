import { atom } from "jotai";
import { brisbane } from "@/data/cities";

// track the page transition status, if the page is transitioning, related components can use this to show animations.
export const isTransitioningAtom = atom(false);

// track the current city, used to determine which city is currently displayed on the map.
export const currentCityAtom = atom<{ longitude: number; latitude: number }>(brisbane);

// track whether the current city is the user's current location or not.
export const isCurrentCityAtom = atom(true);

// track whether the corresponding position is currently selected, otherwise alert warning.
export const isCurrentCitySelectedAtom = atom(false);

// track whether the alert card is currently visible or not.
export const isAlertCardVisibleAtom = atom(false);

// track info-card zoom-in and zoom-out
export const isInfoCardZoomedAtom = atom(false);