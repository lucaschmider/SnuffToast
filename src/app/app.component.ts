import { animate, state, style, transition, trigger } from "@angular/animations";

import { Component } from "@angular/core";
import { ToastService } from "./toast.service";

export function calculateStyles(index: number, totalCount: number): { "z-index": number, "transform": string, "filter": string } {
  const scaleClause = `scale(${(10 - index) / 10})`;
  const translateClause = `translateY(${-index * 3}rem)`;

  return {
    "z-index": totalCount - index,
    transform: `${scaleClause} ${translateClause}`,
    filter: `brightness(${(totalCount - index) / totalCount})`
  };
}

@Component({
  selector: "snuff-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  animations: [
    trigger("cardStack", [
      state("0", style(calculateStyles(0, 5))),
      state("1", style(calculateStyles(1, 5))),
      state("2", style(calculateStyles(2, 5))),
      state("3", style(calculateStyles(3, 5))),
      state("4", style(calculateStyles(4, 5))),
      transition(":leave", [
        style({ opacity: 1 }),
        animate("500ms linear", style({ opacity: 0, transform: "scale(0.5) translateY(10rem)" }))
      ]),
      transition("* <=> *", animate("500ms cubic-bezier(0.68, -0.55, 0.27, 1.55)")),

    ])
  ]
})
export class AppComponent {
  constructor(
    public toastService: ToastService
  ) {
    toastService.initializeData();
  }


}
