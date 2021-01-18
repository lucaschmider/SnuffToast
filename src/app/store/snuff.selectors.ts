import { createFeatureSelector, createSelector } from "@ngrx/store";

import { SnuffState } from "./snuff.state";
import { featureKey } from "./snuff.reducer";

export const selectFeature = createFeatureSelector<SnuffState>(featureKey);
export const selectToastCount = createSelector(
    selectFeature,
    ({ favourites, favouritesOnly, toasts }) => favouritesOnly ? favourites.length : toasts.length
);
export const selectCurrentToasts = createSelector(
    selectFeature,
    (state) => state.displayedToasts.map(index => state.toasts[index])
);

export const selectIsFavouriteOnlyMode = createSelector(
    selectFeature,
    (state) => state.favouritesOnly
);

export const selectFavourites = createSelector(
    selectFeature,
    (state) => state.favourites
);