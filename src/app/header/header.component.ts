import { Component, OnDestroy } from "@angular/core";
import { Subject, combineLatest } from "rxjs";
import {
  animate, style, transition, trigger,
} from "@angular/animations";
import { map, takeUntil, tap } from "rxjs/operators";

import { FormControl } from "@angular/forms";
import { Mode } from "../mode-switch/mode";
import { ToastService } from "../toast.service";

@Component({
  selector: "snuff-header",
  templateUrl: "./header.component.html",
  styleUrls: [ "./header.component.scss" ],
  animations: [ trigger("zoom", [
      transition(":enter", [
        style({ transform: "scale(0)" }),
        animate("500ms", style({ transform: "scale(1)" })),
      ]),
      transition(":leave", [
        style({ transform: "scale(1)" }),
        animate("500ms", style({ transform: "scale(0)" })),
      ]),
    ]), ],
})
export class HeaderComponent implements OnDestroy {
  public readonly modeControl = new FormControl(Mode.All);

  public readonly destroy$ = new Subject();

  constructor(private readonly toastService: ToastService) {
    combineLatest([
      this.toastService.isFavouriteOnlyMode$,
      this.toastService.favourites$,
    ]).pipe(
      map(([
isFavouriteOnlyMode,
favourites
]) => ({
        mode: isFavouriteOnlyMode ? Mode.FavouritesOnly : Mode.All,
        favouritesAvailable: (favourites !== undefined) && favourites.length > 0,
      })),
      tap(({ favouritesAvailable }) => (favouritesAvailable ? this.modeControl.enable({ emitEvent: false }) : this.modeControl.disable({ emitEvent: false }))),
      tap(({ mode }) => this.modeControl.patchValue(mode, { emitEvent: false })),
      takeUntil(this.destroy$),
    ).subscribe();

    this.modeControl.valueChanges.pipe(
      tap(() => this.toastService.toggleFavouriteOnlyMode()),
      takeUntil(this.destroy$),
    ).subscribe();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public toggleFavouriteOnlyMode(): void {
    this.toastService.toggleFavouriteOnlyMode();
  }
}
