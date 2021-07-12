import { StoreModule } from "@ngrx/store";
import { ArrowLeft, Book, Bookmark } from "angular-feather/icons";
import { BrowserModule, HammerModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { EffectsModule } from "@ngrx/effects";
import { FeatherModule } from "angular-feather";
import { HeaderComponent } from "./header/header.component";
import { ModeSwitchComponent } from "./mode-switch/mode-switch.component";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { SnuffEffects } from "./store/snuff.effects";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { ToastViewComponent } from "./toast-view/toast-view.component";
import { environment } from "../environments/environment";
import { featureKey } from "./store/constants";
import { snuffReducer } from "./store/snuff.reducer";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";

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
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    StoreModule.forRoot({ [featureKey]: snuffReducer }),
    EffectsModule.forRoot([SnuffEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    ReactiveFormsModule,
    FeatherModule.pick({ Book, Bookmark, ArrowLeft }),
    HammerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
