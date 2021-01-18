import * as fromSnuff from "./store/snuff.selectors";

import { dislikeToast, likeToast, loadToasts, toggleFavouriteMode } from "./store/snuff.actions";

import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { Toast } from "./store/toast";

@Injectable({
  providedIn: "root"
})
export class ToastService {
  public currentToasts$: Observable<Toast[]> = this.store.select(fromSnuff.selectCurrentToasts);
  public isFavouriteOnlyMode$: Observable<boolean> = this.store.select(fromSnuff.selectIsFavouriteOnlyMode);
  public favourites$: Observable<number[]> = this.store.select(fromSnuff.selectFavourites);

  constructor(
    private store: Store
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
