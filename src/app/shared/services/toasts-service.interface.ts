import { InjectionToken } from "@angular/core";
import { Observable } from "rxjs";
import { Toast } from "src/app/store/toast";

export interface IToastsService {
    loadToastsAsync(): Observable<Toast[]>;
}

export const toastsServiceToken = new InjectionToken<IToastsService>("toasts-service");