import { animate, style, transition, trigger } from "@angular/animations";

import { Component } from "@angular/core";
import { ToastService } from "./toast.service";

@Component({
  selector: "snuff-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  animations: [
    trigger("fadeOut", [
      transition(":leave", [
        style({ opacity: 1 }),
        animate("500ms ease", style({ opacity: 0, transform: "scale(0.5) translateY(10rem)" }))
      ])
    ])
  ]
})
export class AppComponent {
  constructor(
    public toastService: ToastService
  ) {
    toastService.initializeData();
  }

  public calculateStyles(index: number, totalCount: number): { "z-index": number, "transform": string, "filter": string } {
    const scaleClause = `scale(${(10 - index) / 10})`;
    const translateClause = `translateY(${-index * 3}rem)`;

    return {
      "z-index": totalCount - index,
      transform: `${scaleClause} ${translateClause}`,
      filter: `brightness(${(totalCount - index) / totalCount})`
    };
  }
}
