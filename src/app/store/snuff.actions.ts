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

export const refillStack = createAction(
    "[Snuff] refill stack",
    props<{ amount: number }>()
)

export const addToastsToStack = createAction(
    "[Snuff] add toast to stack",
    props<{ toasts: number[] }>()
);

export const likeToast = createAction(
    "[Snuff] like toast"
);

export const dislikeToast = createAction(
    "[Snuff] dislike toast"
);
