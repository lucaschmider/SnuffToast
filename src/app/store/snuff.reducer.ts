import { addToastsToStack, dislikeToast, likeToast, loadToastsSuccess } from "./snuff.actions";
import { createReducer, on } from "@ngrx/store";

import { SnuffState } from "./snuff.state";

export const featureKey = "Snuff";
export const initialState: SnuffState = {
    toasts: [],
    displayedToasts: [],
    favourites: []
};

export const snuffReducer = createReducer(
    initialState,
    on(loadToastsSuccess, (state, { toasts }) => ({ ...state, toasts })),
    on(addToastsToStack, (state, { toasts }) => ({ ...state, displayedToasts: [...state.displayedToasts, ...toasts] })),
    on(likeToast, ({ displayedToasts, favourites, toasts }) => ({
        toasts,
        displayedToasts: displayedToasts.filter((_, index) => index > 0),
        favourites: [...favourites, displayedToasts[0]]
    })),
    on(dislikeToast, ({ displayedToasts, favourites, toasts }) => ({
        toasts,
        displayedToasts: displayedToasts.filter((_, index) => index > 0),
        favourites
    }))
);