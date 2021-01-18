import { Toast } from "./toast";

export interface SnuffState {
    toasts: Toast[],
    displayedToasts: number[],
    favourites: number[],
    favouritesOnly: boolean
}