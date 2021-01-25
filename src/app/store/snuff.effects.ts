import { Action, Store } from "@ngrx/store";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import {
  catchError,
  filter,
  map,
  switchMap,
  tap,
  withLatestFrom,
} from "rxjs/operators";
import {
  dislikeToast,
  likeToast,
  loadToasts,
  loadToastsFailure,
  loadToastsSuccess,
  nextIndex,
  setRandomizeOrder,
  toastsAvailable,
} from "./snuff.actions";
import { selectAvailableToastCount, selectIsFavouriteOnlyMode, selectIsInitialized } from "./snuff.selectors";

import { HapticsService } from "../haptics.service";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Toast } from "./toast";
import { of } from "rxjs";
import { shuffle } from "./array-shuffle";
import { toasts } from "./toasts";

@Injectable()
export class SnuffEffects {
  public loadToasts$ = createEffect(() => this.actions$.pipe(
    ofType(loadToasts),
    withLatestFrom(this.store.select(selectIsInitialized)),
    map(([
      ,
      isInitialized
    ]) => (isInitialized ? true : toasts)),
    switchMap((result) => {
      const actionsToDispatch = typeof (result) === "boolean" ? [] : [loadToastsSuccess({ toasts: result })] as Action[];
      actionsToDispatch.push(toastsAvailable());
      return actionsToDispatch;
    }),
    catchError((error) => of(loadToastsFailure({ error }))),
  ));

  public readonly randomizeOrder$ = createEffect(() => this.actions$.pipe(
    ofType(toastsAvailable),
    withLatestFrom(this.store.select(selectAvailableToastCount)),
    map(([
      ,
      { favouriteCount, totalCount }
    ]) => {
      const favouritesOrder = shuffle([...Array(favouriteCount).keys()]);
      const generalOrder = shuffle([...Array(totalCount).keys()]);

      return setRandomizeOrder({ favouritesOrder, generalOrder });
    }),
  ));

  public readonly handleToastConsumption$ = createEffect(() => this.actions$.pipe(
    ofType(likeToast, dislikeToast),
    tap(() => this.hapticsService.triggerImpact()),
    withLatestFrom(this.store.select(selectIsFavouriteOnlyMode)),
    filter(([
      { type },
      isFavouriteOnlyMode
    ]) => !isFavouriteOnlyMode || type !== dislikeToast.type),
    map(() => nextIndex()),
  ));

  constructor(
    private actions$: Actions,
    private store: Store,
    private hapticsService: HapticsService,
  ) { }

}
