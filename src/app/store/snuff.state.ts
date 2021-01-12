import { Toast } from "./toast";

export interface SnuffState {
    toasts: Toast[],
    currentToast?: number
}