import { createEntityAdapter } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { firstArrayIndex, removeFirstElement } from "./array-helpers";
import {
  addToStack,
  dislikeToast,
  likeToast,
  loadToastsSuccess,
  toggleFavouriteMode,
} from "./snuff.actions";

import { SnuffState } from "./snuff.state";
import { Toast } from "./toast";

const entityAdapter = createEntityAdapter<Toast>({
  selectId: ({ toastId }) => toastId
});

export const initialState: SnuffState = entityAdapter.getInitialState({
  favourites: [],
  favouritesOnly: false,
  targetCardCount: 5,
  displayedToastIds: []
});

export const snuffReducer = createReducer(
  initialState,
  on(loadToastsSuccess, (state, { toasts }) => entityAdapter.addMany(toasts, state)),
  on(toggleFavouriteMode, (state) => ({
    ...state,
    favouritesOnly: !state.favouritesOnly,
    displayedToastIds: []
  })),
  on(likeToast, (state) => {
    const currentToast = state.displayedToastIds[firstArrayIndex];
    const isAlreadyFavourite = state.favourites.includes(currentToast);

    return {
      ...state,
      lastRemovedCardId: currentToast,
      displayedToastIds: removeFirstElement(state.displayedToastIds),
      favourites: isAlreadyFavourite
        ? state.favourites
        : [
          ...state.favourites,
          currentToast
        ]
    };
  }),
  on(dislikeToast, (state) => {
    const currentToast = state.displayedToastIds[firstArrayIndex];
    const isAlreadyFavourite = state.favourites.includes(currentToast);

    return {
      ...state,
      lastRemovedCardId: currentToast,
      displayedToastIds: removeFirstElement(state.displayedToastIds),
      favourites: isAlreadyFavourite
        ? state.favourites.filter((toastId) => toastId !== currentToast)
        : state.favourites
    };
  }),
  on(addToStack, (state, { toastsToAdd }) => ({
    ...state,
    displayedToastIds: [
      ...state.displayedToastIds,
      ...toastsToAdd
    ]
  }))
);
