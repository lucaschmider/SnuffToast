import { animate, animation, style, transition, trigger } from "@angular/animations";

import { Component } from "@angular/core";
import { ToastService } from "../toast.service";
import { combineLatest } from "rxjs";
import { map } from "rxjs/operators";

@Component({
  selector: "snuff-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
  animations: [
    trigger("zoom", [
      transition(":enter", [
        style({ transform: "scale(0)" }),
        animate("500ms", style({ transform: "scale(1)" }))
      ]),
      transition(":leave", [
        style({ transform: "scale(1)" }),
        animate("500ms", style({ transform: "scale(0)" }))
      ])
    ])
  ]
})
export class HeaderComponent {

  public mode$ = combineLatest([
    this.toastService.isFavouriteOnlyMode$,
    this.toastService.favourites$
  ]).pipe(
    map(([isFavouriteOnlyMode, favourites]) => ({
      isFavouriteOnlyMode,
      showButton: (favourites !== undefined) && favourites.length > 0
    }))
  );

  constructor(private readonly toastService: ToastService) { }

  public toggleFavouriteOnlyMode(): void {
    this.toastService.toggleFavouriteOnlyMode();
  }
}
