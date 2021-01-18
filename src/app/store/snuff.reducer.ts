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
    on(likeToast, (state) => {
        const newFavourites = [...state.favourites];
        if (!state.favouritesOnly) newFavourites.push(state.displayedToasts[0]);

        return {
            ...state,
            displayedToasts: state.displayedToasts.filter((_, index) => index > 0),
            favourites: newFavourites
        };
    }),
    on(dislikeToast, ({ displayedToasts, favourites, toasts, favouritesOnly }) => ({
        toasts,
        displayedToasts: displayedToasts.filter((toast, index) => index > 0 && toast !== displayedToasts[0]),
        favourites: favouritesOnly ? favourites.filter((_, index) => index > 0) : favourites,
        favouritesOnly: favouritesOnly && favourites.length > 1
    })),
    on(toggleFavouriteMode, (state) => ({ ...state, favouritesOnly: !state.favouritesOnly, displayedToasts: [] }))
);