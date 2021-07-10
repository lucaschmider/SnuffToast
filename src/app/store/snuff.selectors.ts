import { createFeatureSelector, createSelector } from "@ngrx/store";

import { SnuffState } from "./snuff.state";
import { featureKey } from "./constants";
import { Toast } from "./toast";

export const selectFeature = createFeatureSelector<SnuffState>(featureKey);

export const selectCurrentToasts = createSelector(
  selectFeature,
  ({ displayedToastIds, entities }) => displayedToastIds
    .reduce((accumulator, currentToastId) => {
      const currentToast = entities[currentToastId];
      if (currentToast !== undefined) accumulator.push(currentToast);
      return accumulator;
    }, [] as Toast[])
);

export const selectCurrentToastIds = createSelector(
  selectFeature,
  ({ displayedToastIds }) => displayedToastIds
);

export const selectIsFavouriteOnlyMode = createSelector(
  selectFeature,
  (state) => state.favouritesOnly,
);

export const selectAvailableToastCount = createSelector(
  selectFeature,
  ({ favourites, ids }) => ({
    favouriteCount: favourites.length,
    totalCount: ids.length,
  }),
);

export const selectAvailableIds = createSelector(
  selectFeature,
  ({ ids, favourites }) => ({
    allIds: ids as string[],
    favouriteIds: favourites
  })
);

export const selectLastlyRemovedToastId = createSelector(
  selectFeature,
  ({ lastRemovedCardId }) => lastRemovedCardId
);
