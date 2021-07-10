import { Injectable } from "@angular/core";
import { combineLatest } from "rxjs";
import { Store } from "@ngrx/store";
import {
  dislikeToast, likeToast, loadToasts, toggleFavouriteMode,
} from "./store/snuff.actions";
import * as fromSnuff from "./store/snuff.selectors";
import { map } from "rxjs/operators";

const Zero = 0;

@Injectable({
  providedIn: "root",
})
export class ToastService {
  public readonly viewObj$ = combineLatest([
    this.store.select(fromSnuff.selectCurrentToasts),
    this.store.select(fromSnuff.selectIsFavouriteOnlyMode),
    this.store.select(fromSnuff.selectAvailableIds)
  ]).pipe(
    map(([
      displayedToasts,
      isFavouriteOnlyMode,
      availableIds
    ]) => ({
      displayedToasts,
      isFavouriteOnlyMode,
      hasFavourites: availableIds.favouriteIds.length > Zero
    }))
  );


  constructor(
    private store: Store,
  ) { }

  public initializeData(): void {
    this.store.dispatch(loadToasts());
  }

  public like(): void {
    this.store.dispatch(likeToast());
  }

  public dislike(): void {
    this.store.dispatch(dislikeToast());
  }

  public toggleFavouriteOnlyMode(): void {
    this.store.dispatch(toggleFavouriteMode());
  }
}
