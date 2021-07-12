import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { Toast } from "src/app/store/toast";
import { toasts } from "./toasts";
import { IToastsService } from "./toasts-service.interface";
import { v4 } from "uuid";

@Injectable({
  providedIn: "root"
})
export class MockedToastsService implements IToastsService {

  loadToastsAsync(): Observable<Toast[]> {
    return of(toasts).pipe(
      map((t) => t.map(({ text, title }) => ({
        text,
        title,
        toastId: v4()
      } as Toast)))
    );
  }
}
