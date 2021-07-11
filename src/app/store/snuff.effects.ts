import { Store } from "@ngrx/store";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import {
  catchError,
  map,
  switchMap,
  tap,
  withLatestFrom,
} from "rxjs/operators";
import {
  addToStack,
  applicationReady,
  dislikeToast,
  likeToast,
  loadToasts,
  loadToastsFailure,
  loadToastsSuccess,
  setRandomizeOrder,
  toastsAvailable,
  toggleFavouriteMode,
} from "./snuff.actions";
import {
  selectAvailableIds,
  selectAvailableToastCount,
  selectCurrentToastIds,
  selectIsFavouriteOnlyMode,
  selectLastlyRemovedToastId
} from "./snuff.selectors";

import { HapticsService } from "../shared/services/haptics.service";
import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { shuffle } from "./array-helpers";
import { ToastsService } from "../shared/services/toasts.service";

export const targetCardCount = 5;
const Zero = 0;

@Injectable()
export class SnuffEffects {

  public readonly loadToasts$ = createEffect(() => this.actions$.pipe(
    ofType(loadToasts),
    switchMap(() => this.toastsService.loadToastsAsync()),
    switchMap((toasts) => [loadToastsSuccess({ toasts }), applicationReady()]),
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

  public readonly refillStack$ = createEffect(() => this.actions$.pipe(
    ofType(likeToast, dislikeToast, applicationReady, toggleFavouriteMode),
    tap(() => this.hapticsService.triggerImpact()),
    withLatestFrom(
      this.store.select(selectIsFavouriteOnlyMode),
      this.store.select(selectCurrentToastIds),
      this.store.select(selectAvailableIds),
      this.store.select(selectLastlyRemovedToastId)
    ),
    map(([
      ,
      isFavouriteOnlyMode,
      currentToastIds,
      {
        allIds,
        favouriteIds
      },
      lastlyRemovedToastId
    ]) => {
      const bannedToastIds = [
        ...currentToastIds,
        lastlyRemovedToastId
      ];
      let idRepository = (isFavouriteOnlyMode
        ? favouriteIds
        : allIds)
        .filter((toastId) => !bannedToastIds.includes(toastId));

      const pragmaticCardCount = Math.min(targetCardCount, idRepository.length);
      let remainingToastsToAdd = pragmaticCardCount - currentToastIds.length;
      const toastsToAdd: string[] = [];

      while (remainingToastsToAdd > Zero) {
        const randomIndex = Math.floor(Math.random() * idRepository.length);
        const newToastCandidate = idRepository[randomIndex];
        idRepository = idRepository.filter((_, index) => index !== randomIndex);
        if (newToastCandidate !== undefined
          && toastsToAdd.every((toastId) => (toastId !== newToastCandidate))
          && currentToastIds.every((toastId) => (toastId !== newToastCandidate))) {
          toastsToAdd.push(newToastCandidate);
          remainingToastsToAdd--;
        }
      }

      return addToStack({ toastsToAdd });
    })
  ));

  constructor(
    private actions$: Actions,
    private store: Store,
    private hapticsService: HapticsService,
    private readonly toastsService: ToastsService
  ) { }
}
