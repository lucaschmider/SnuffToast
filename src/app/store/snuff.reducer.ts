import { createReducer, on } from "@ngrx/store";
import {
  dislikeToast,
  likeToast,
  loadToastsSuccess,
  nextIndex,
  setRandomizeOrder,
  toggleFavouriteMode,
} from "./snuff.actions";

import { SnuffState } from "./snuff.state";

const zeroBasedOffset = 1;
const startIndex = 0;
const indexDelta = 1;
const minimumRequiredFavourites = 1;

export const isIndexResetNeeded =
  ({ favouritesOnly, favourites, regularOrder, index }: SnuffState): boolean => {
    const maximumIndex = (favouritesOnly ? favourites : regularOrder).length - zeroBasedOffset;
    return index < maximumIndex;
  };

export const initialState: SnuffState = {
  toasts: [],
  favourites: [],
  favouritesOnly: false,
  index: 0,
  regularOrder: [],
  targetCardCount: 5,
};

export const snuffReducer = createReducer(
  initialState,
  on(loadToastsSuccess, (state, { toasts }) => ({ ...state, toasts })),
  on(nextIndex, (state) => ({
    ...state,
    index: isIndexResetNeeded(state) ? state.index + indexDelta : startIndex
  })),
  on(likeToast, (state) => ({
    ...state,
    favourites: state.favouritesOnly ? state.favourites : [
      ...state.favourites,
      state.regularOrder[state.index]
    ],
  })),
  on(dislikeToast, (state) => ({
    ...state,
    favouritesOnly: state.favouritesOnly && state.favourites.length > minimumRequiredFavourites,
    favourites: state.favouritesOnly ? state.favourites.filter((_, index) => state.index !== index) : state.favourites,
  })),
  on(toggleFavouriteMode, (state) => ({ ...state, favouritesOnly: !state.favouritesOnly, index: 0 })),
  on(setRandomizeOrder,
    (state, { favouritesOrder, generalOrder }) =>
      ({ ...state, favourites: favouritesOrder, regularOrder: generalOrder })),
);
