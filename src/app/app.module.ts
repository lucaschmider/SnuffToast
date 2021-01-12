import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { NgModule } from '@angular/core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { ToastViewComponent } from './toast-view/toast-view.component';
import { environment } from '../environments/environment';

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
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    MatButtonModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
