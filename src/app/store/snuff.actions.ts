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

export const openRandomToast = createAction(
    "[Snuff] pries"
);

export const selectToast = createAction(
    "[Snuff] select toast",
    props<{ toast: number }>()
);

export const delayRandomToast = createAction(
    "[Snuff] delay toast",
    props<{ toast: number }>()
);
