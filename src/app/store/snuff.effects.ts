import { Actions, createEffect, ofType } from "@ngrx/effects";
import { addToastsToStack, dislikeToast, likeToast, loadToasts, loadToastsFailure, loadToastsSuccess, refillStack, toggleFavouriteMode } from "./snuff.actions";
import { catchError, filter, map, switchMap, withLatestFrom } from "rxjs/operators";
import { selectDisplayedToastCount, selectFavourites, selectIsFavouriteOnlyMode, selectIsInitialized, selectToastCount } from "./snuff.selectors";

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Toast } from "./toast";
import { of } from "rxjs";

@Injectable()
export class SnuffEffects {

    public loadToasts$ = createEffect(() => this.actions$.pipe(
        ofType(loadToasts),
        withLatestFrom(this.store.select(selectIsInitialized)),
        filter(([_, isInitialized]) => !isInitialized),
        switchMap(() => this.httpClient.get<Toast[]>("/assets/toasts.json")),
        switchMap((toasts) => ([loadToastsSuccess({ toasts }), refillStack()])),
        catchError((error) => of(loadToastsFailure({ error })))
    ));

    public refillStack$ = createEffect(() => this.actions$.pipe(
        ofType(refillStack),
        withLatestFrom(
            this.store.select(selectToastCount),
            this.store.select(selectIsFavouriteOnlyMode),
            this.store.select(selectFavourites),
            this.store.select(selectDisplayedToastCount)
        ),
        map(([_, availableToastCount, isFavouriteOnlyMode, favourites, displayedToastCount]) => {
            var indexes = [] as number[];

            for (let index = 0; index < (5 - displayedToastCount); index++) {
                var randomIndex = Math.floor(Math.random() * availableToastCount);
                indexes.push(isFavouriteOnlyMode ? favourites[randomIndex] : randomIndex);
            }

            return addToastsToStack({ toasts: indexes });
        })
    ));

    public readonly handleToastConsumption$ = createEffect(() => this.actions$.pipe(
        ofType(likeToast, dislikeToast),
        map(() => refillStack())
    ));

    public readonly handleModeSwitch$ = createEffect(() => this.actions$.pipe(
        ofType(toggleFavouriteMode),
        map(() => refillStack())
    ));

    constructor(
        private actions$: Actions,
        private httpClient: HttpClient,
        private store: Store
    ) { }
}