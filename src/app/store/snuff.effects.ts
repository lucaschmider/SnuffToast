import { Action, Store } from "@ngrx/store";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, filter, map, switchMap, withLatestFrom } from "rxjs/operators";
import { dislikeToast, likeToast, loadToasts, loadToastsFailure, loadToastsSuccess, nextIndex, setRandomizeOrder, toastsAvailable, toggleFavouriteMode } from "./snuff.actions";
import { selectAvailableToastCount, selectIsFavouriteOnlyMode, selectIsInitialized } from "./snuff.selectors";

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Toast } from "./toast";
import { of } from "rxjs";

@Injectable()
export class SnuffEffects {

    public loadToasts$ = createEffect(() => this.actions$.pipe(
        ofType(loadToasts),
        withLatestFrom(this.store.select(selectIsInitialized)),
        switchMap(([_, isInitialized]) => isInitialized ? of(true) : this.httpClient.get<Toast[]>("/assets/toasts.json")),
        switchMap((result) => {
            const actionsToDispatch = typeof (result) === "boolean" ? [] : [loadToastsSuccess({ toasts: result })] as Action[];
            actionsToDispatch.push(toastsAvailable())
            return actionsToDispatch;
        }),
        catchError((error) => of(loadToastsFailure({ error })))
    ));

    public readonly randomizeOrder$ = createEffect(() => this.actions$.pipe(
        ofType(toastsAvailable),
        withLatestFrom(this.store.select(selectAvailableToastCount)),
        map(([_, { favouriteCount, totalCount }]) => {
            const favouritesOrder = SnuffEffects.shuffle([...Array(favouriteCount).keys()]);
            const generalOrder = SnuffEffects.shuffle([...Array(totalCount).keys()]);

            return setRandomizeOrder({ favouritesOrder, generalOrder });
        })
    ));

    public readonly handleToastConsumption$ = createEffect(() => this.actions$.pipe(
        ofType(likeToast, dislikeToast),
        withLatestFrom(this.store.select(selectIsFavouriteOnlyMode)),
        filter(([{ type }, isFavouriteOnlyMode]) => !isFavouriteOnlyMode || type !== dislikeToast.type),
        map(() => nextIndex())
    ));

    constructor(
        private actions$: Actions,
        private httpClient: HttpClient,
        private store: Store
    ) { }

    private static shuffle<T>(input: T[]): T[] {
        var currentIndex = input.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = input[currentIndex];
            input[currentIndex] = input[randomIndex];
            input[randomIndex] = temporaryValue;
        }

        return input;
    }
}