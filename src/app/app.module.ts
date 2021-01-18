import { ActionReducer, MetaReducer, StoreModule } from "@ngrx/store";
import { BrowserModule, HammerModule } from "@angular/platform-browser";
import { featureKey, snuffReducer } from "./store/snuff.reducer";

import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { EffectsModule } from "@ngrx/effects";
import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";
import { HttpClientModule } from "@angular/common/http";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { NgModule } from "@angular/core";
import { ServiceWorkerModule } from "@angular/service-worker";
import { SnuffEffects } from "./store/snuff.effects";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { ToastViewComponent } from "./toast-view/toast-view.component";
import { environment } from "../environments/environment";
import { localStorageSync } from "ngrx-store-localstorage";

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({ keys: [featureKey], rehydrate: true })(reducer);
}
const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    ToastViewComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({ [featureKey]: snuffReducer }, { metaReducers }),
    EffectsModule.forRoot([SnuffEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    HammerModule,
    ServiceWorkerModule.register("ngsw-worker.js", { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
