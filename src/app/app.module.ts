import { ActionReducer, MetaReducer, StoreModule } from "@ngrx/store";
import { ArrowLeft, Book, Bookmark } from "angular-feather/icons";
import { BrowserModule, HammerModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { EffectsModule } from "@ngrx/effects";
import { FeatherModule } from "angular-feather";
import { HeaderComponent } from "./header/header.component";
import { HttpClientModule } from "@angular/common/http";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { ModeSwitchComponent } from './mode-switch/mode-switch.component';
import { NgModule } from "@angular/core";
import { ServiceWorkerModule } from "@angular/service-worker";
import { SnuffEffects } from "./store/snuff.effects";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { ToastViewComponent } from "./toast-view/toast-view.component";
import { environment } from "../environments/environment";
import { featureKey } from "./store/constants";
import { localStorageSync } from "ngrx-store-localstorage";
import { snuffReducer } from "./store/snuff.reducer";

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({ keys: [featureKey], rehydrate: true })(reducer);
}
const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];


@NgModule({
  declarations: [
    AppComponent,
    ToastViewComponent,
    HeaderComponent,
    ModeSwitchComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({ [featureKey]: snuffReducer }, { metaReducers }),
    EffectsModule.forRoot([SnuffEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    HttpClientModule,
    FeatherModule.pick({ Book, Bookmark, ArrowLeft }),
    MatButtonModule,
    MatIconModule,
    HammerModule,
    ServiceWorkerModule.register("ngsw-worker.js", { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
