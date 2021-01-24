import { ActionReducer, MetaReducer, StoreModule } from "@ngrx/store";
import { ArrowLeft, Book, Bookmark } from "angular-feather/icons";
import { BrowserModule, HammerModule } from "@angular/platform-browser";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { EffectsModule } from "@ngrx/effects";
import { FeatherModule } from "angular-feather";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { ServiceWorkerModule } from "@angular/service-worker";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { localStorageSync } from "ngrx-store-localstorage";
import { HeaderComponent } from "./header/header.component";
import { ModeSwitchComponent } from "./mode-switch/mode-switch.component";
import { SnuffEffects } from "./store/snuff.effects";
import { ToastViewComponent } from "./toast-view/toast-view.component";
import { environment } from "../environments/environment";
import { featureKey } from "./store/constants";
import { AppComponent } from "./app.component";
import { snuffReducer } from "./store/snuff.reducer";

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({ keys: [ featureKey ], rehydrate: true })(reducer);
}
const metaReducers: Array<MetaReducer<any, any>> = [ localStorageSyncReducer ];

@NgModule({
  declarations: [
    AppComponent,
    ToastViewComponent,
    HeaderComponent,
    ModeSwitchComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({ [featureKey]: snuffReducer }, { metaReducers }),
    EffectsModule.forRoot([ SnuffEffects ]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    HttpClientModule,
    ReactiveFormsModule,
    FeatherModule.pick({ Book, Bookmark, ArrowLeft }),
    HammerModule,
  ],
  providers: [],
  bootstrap: [ AppComponent ],
})
export class AppModule { }
