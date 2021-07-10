import { EntityState } from "@ngrx/entity";
import { Toast } from "./toast";

export interface SnuffState extends EntityState<Toast> {
  favourites: string[],
  displayedToastIds: string[],
  favouritesOnly: boolean,
  targetCardCount: number,
  lastRemovedCardId?: string
}
