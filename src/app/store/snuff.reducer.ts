import { createReducer, on } from "@ngrx/store";
import {
  dislikeToast, likeToast, loadToastsSuccess, nextIndex, setRandomizeOrder, toggleFavouriteMode,
} from "./snuff.actions";

import { SnuffState } from "./snuff.state";
import { calculateDisplayedToastCount } from "./snuff.selectors";

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
  on(nextIndex, (state) => ({ ...state, index: state.index < (calculateAvailableToastsInCurrentMode(state) - 1) ? state.index + 1 : 0 })),
  on(likeToast, (state) => ({
    ...state,
    favourites: state.favouritesOnly ? state.favourites : [
...state.favourites,
state.regularOrder[state.index]
],
  })),
  on(dislikeToast, (state) => ({
    ...state,
    favouritesOnly: state.favouritesOnly && state.favourites.length > 1,
    favourites: state.favouritesOnly ? state.favourites.filter((_, index) => state.index !== index) : state.favourites,
  })),
  on(toggleFavouriteMode, (state) => ({ ...state, favouritesOnly: !state.favouritesOnly, index: 0 })),
  on(setRandomizeOrder, (state, { favouritesOrder, generalOrder }) => ({ ...state, favourites: favouritesOrder, regularOrder: generalOrder })),
);

export const calculateAvailableToastsInCurrentMode = ({ favouritesOnly, favourites, regularOrder }: SnuffState) => (favouritesOnly ? favourites : regularOrder).length;
