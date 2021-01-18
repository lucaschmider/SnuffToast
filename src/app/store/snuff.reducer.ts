import { addToastsToStack, dislikeToast, likeToast, loadToastsSuccess, toggleFavouriteMode } from "./snuff.actions";
import { createReducer, on } from "@ngrx/store";

import { SnuffState } from "./snuff.state";

export const featureKey = "Snuff";
export const initialState: SnuffState = {
    toasts: [],
    displayedToasts: [],
    favourites: [],
    favouritesOnly: false
};

export const snuffReducer = createReducer(
    initialState,
    on(loadToastsSuccess, (state, { toasts }) => ({ ...state, toasts })),
    on(addToastsToStack, (state, { toasts }) => ({ ...state, displayedToasts: [...state.displayedToasts, ...toasts] })),
    on(likeToast, ({ displayedToasts, favourites, toasts, favouritesOnly }) => ({
        toasts,
        displayedToasts: displayedToasts.filter((_, index) => index > 0),
        favourites: [...favourites, displayedToasts[0]],
        favouritesOnly
    })),
    on(dislikeToast, ({ displayedToasts, favourites, toasts, favouritesOnly }) => ({
        toasts,
        displayedToasts: displayedToasts.filter((_, index) => index > 0),
        favourites,
        favouritesOnly
    })),
    on(toggleFavouriteMode, (state) => ({ ...state, favouritesOnly: !state.favouritesOnly, displayedToasts: [] }))
);