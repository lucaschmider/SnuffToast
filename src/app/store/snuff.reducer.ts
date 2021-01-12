import { createReducer, on } from "@ngrx/store";
import { loadToastsSuccess, selectToast } from "./snuff.actions";

import { SnuffState } from "./snuff.state";

export const featureKey = "Snuff";
export const initialState: SnuffState = {
    toasts: [],
    currentToast: undefined
};

export const snuffReducer = createReducer(
    initialState,
    on(loadToastsSuccess, (state, { toasts }) => ({ ...state, toasts })),
    on(selectToast, (state, { toast }) => ({ ...state, currentToast: toast }))
);