import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, delay, map, switchMap, take, tap, withLatestFrom } from "rxjs/operators";
import { delayRandomToast, loadToasts, loadToastsFailure, loadToastsSuccess, openRandomToast, selectToast } from "./snuff.actions";

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
        switchMap((toasts) => ([loadToastsSuccess({ toasts }), openRandomToast()])),
        catchError((error) => of(loadToastsFailure({ error })))
    ));

    public openRandomToast$ = createEffect(() => this.actions$.pipe(
        ofType(openRandomToast),
        withLatestFrom(this.store.select(selectToastCount)),
        map(([_, count]) => {
            var randomIndex = Math.floor(Math.random() * count + 1);
            return delayRandomToast({ toast: randomIndex });
        })
    ));

    public delayRandomToast$ = createEffect(() => this.actions$.pipe(
        ofType(delayRandomToast),
        delay(500),
        map(({ toast }) => selectToast({ toast }))
    ));

    constructor(
        private actions$: Actions,
        private httpClient: HttpClient,
        private store: Store
    ) { }
}