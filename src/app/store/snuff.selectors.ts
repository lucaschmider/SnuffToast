import { createFeatureSelector, createSelector } from "@ngrx/store";

import { SnuffState } from "./snuff.state";
import { featureKey } from "./snuff.reducer";

export const selectFeature = createFeatureSelector<SnuffState>(featureKey);
export const selectToastCount = createSelector(
    selectFeature,
    (state) => state.toasts?.length ?? 0
);
export const selectCurrentToasts = createSelector(
    selectFeature,
    (state) => state.displayedToasts.map(index => state.toasts[index])
);