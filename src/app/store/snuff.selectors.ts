import { createFeatureSelector, createSelector } from "@ngrx/store";

import { SnuffState } from "./snuff.state";
import { featureKey } from "./constants";
import { map } from "rxjs/operators";

export const selectFeature = createFeatureSelector<SnuffState>(featureKey);
export const selectToastCount = createSelector(
    selectFeature,
    ({ favourites, favouritesOnly, toasts }) => favouritesOnly ? favourites.length : toasts.length
);

export const selectDisplayedToastCount = createSelector(
    selectFeature,
    (state) => calculateDisplayedToastCount(state)
);

export const selectCurrentToasts = createSelector(
    selectFeature,
    selectDisplayedToastCount,
    ({ favourites, favouritesOnly, toasts, index, regularOrder }, displayedToastCount) => {
        console.log("Change");

        //console.log({ favourites, favouritesOnly, toasts, index, regularOrder, displayedToastCount });
        const targetArray = (favouritesOnly ? favourites : regularOrder);
        //console.log(`TargetArray: ${JSON.stringify(targetArray)}`);
        const slicedArray = targetArray.slice(index, index + displayedToastCount);
        //console.log(`SlicedArray: ${JSON.stringify(slicedArray)}`);
        const mappedArray = slicedArray.map(index => toasts[index])
        //console.log(`MappedArray: ${JSON.stringify(mappedArray)}`);
        return mappedArray;
    }
);

export const selectIsFavouriteOnlyMode = createSelector(
    selectFeature,
    (state) => state.favouritesOnly
);

export const selectFavourites = createSelector(
    selectFeature,
    (state) => state.favourites
);

export const selectIsInitialized = createSelector(
    selectFeature,
    (state) => state.toasts !== undefined && state.toasts.length > 0
);



export const selectAvailableToastCount = createSelector(
    selectFeature,
    (state) => ({
        favouriteCount: state.favourites.length,
        totalCount: state.toasts.length
    })
);

export const calculateDisplayedToastCount =
    ({ targetCardCount, favourites, toasts, favouritesOnly }: SnuffState): number =>
        Math.min(targetCardCount, (favouritesOnly ? favourites : toasts).length);

