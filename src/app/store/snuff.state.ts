import { Toast } from "./toast";

export interface SnuffState {
  toasts: Toast[],
  regularOrder: number[],
  favourites: number[],
  index: number,
  favouritesOnly: boolean,
  targetCardCount: number
}
