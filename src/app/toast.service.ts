import * as fromSnuff from "./store/snuff.selectors";

import { loadToasts, openRandomToast } from "./store/snuff.actions";

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from "@ngrx/store";
import { Toast } from "./store/toast";

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  public currentToast$: Observable<Toast> = this.store.select(fromSnuff.selectCurrentToast);
  constructor(
    private store: Store
  ) { }

  public initializeData(): void {
    this.store.dispatch(loadToasts());
  }

  public nextToast(): void {
    this.store.dispatch(openRandomToast());
  }
}
