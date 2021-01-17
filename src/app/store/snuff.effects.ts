import { Actions, createEffect, ofType } from "@ngrx/effects";
import { addToastsToStack, dislikeToast, likeToast, loadToasts, loadToastsFailure, loadToastsSuccess, refillStack } from "./snuff.actions";
import { catchError, delay, map, switchMap, take, tap, withLatestFrom } from "rxjs/operators";

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Toast } from "./toast";
import { of } from "rxjs";
import { selectToastCount } from "./snuff.selectors";

@Injectable()
export class SnuffEffects {

    public loadToasts$ = createEffect(() => this.actions$.pipe(
        ofType(loadToasts),
        switchMap(() => this.httpClient.get<Toast[]>("/assets/toasts.json")),
        switchMap((toasts) => ([loadToastsSuccess({ toasts }), refillStack({ amount: 5 })])),
        catchError((error) => of(loadToastsFailure({ error })))
    ));

    public refillStack$ = createEffect(() => this.actions$.pipe(
        ofType(refillStack),
        withLatestFrom(this.store.select(selectToastCount)),
        map(([{ amount }, count]) => {
            var indexes = [] as number[];
            for (let index = 0; index < amount; index++) {
                indexes.push(Math.floor(Math.random() * count + 1));
            }
            return addToastsToStack({ toasts: indexes });
        })
    ));

    public readonly handleToastConsumption$ = createEffect(() => this.actions$.pipe(
        ofType(likeToast, dislikeToast),
        map(() => refillStack({ amount: 1 }))
    ));

    constructor(
        private actions$: Actions,
        private httpClient: HttpClient,
        private store: Store
    ) { }
}