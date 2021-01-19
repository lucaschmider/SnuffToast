import { createAction, props } from "@ngrx/store";

import { Toast } from "./toast";

export const loadToasts = createAction(
    "[Snuff] load toats"
);

export const loadToastsSuccess = createAction(
    "[Snuff] load toasts success",
    props<{ toasts: Toast[] }>()
);

export const loadToastsFailure = createAction(
    "[Snuff] load toasts failure",
    props<{ error: any }>()
);

export const setRandomizeOrder = createAction(
    "[Snuff] set randomized order",
    props<{ generalOrder: number[], favouritesOrder: number[] }>()
);

export const nextIndex = createAction(
    "[Snuff] next index"
);

export const likeToast = createAction(
    "[Snuff] like toast"
);

export const dislikeToast = createAction(
    "[Snuff] dislike toast"
);

export const toggleFavouriteMode = createAction(
    "[Snuff] toggle favourite only mode"
);

export const toastsAvailable = createAction(
    "[Snuff] toasts available"
);