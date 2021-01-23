import { Component, OnDestroy } from "@angular/core";
import { animate, state, style, transition, trigger } from "@angular/animations";
import { takeUntil, tap } from "rxjs/operators";

import { Subject } from "rxjs";
import { ToastService } from "./toast.service";

export function calculateStyles(index: number, totalCount: number): { "z-index": number, "transform"?: string, "filter"?: string } {
  if (index === 0) return { "z-index": totalCount - index };
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
      state("void", style(calculateStyles(5, 5))),
      transition(":leave", [
        style({ opacity: 1 }),
        animate("500ms linear", style({ opacity: 0, transform: "scale(0.5) translateY(10rem)" }))
      ]),
      transition("* <=> *", animate("500ms cubic-bezier(0.68, -0.55, 0.27, 1.55)")),

    ])
  ]
})
export class AppComponent implements OnDestroy {
  private firstOffset: {
    x: number,
    y: number
  } = { x: 0, y: 0 };

  private readonly destroy$ = new Subject();
  public readonly displayedToasts$ = this.toastService.currentToasts$.pipe(
    tap(() => this.firstOffset = { x: 0, y: 0 })
  );

  constructor(
    private readonly toastService: ToastService
  ) {
    toastService.initializeData();

    this.toastService.isFavouriteOnlyMode$.pipe(
      tap(() => this.firstOffset = { x: 0, y: 0 }),
      takeUntil(this.destroy$)
    ).subscribe();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public getStyles(index: number): { transform: string } {
    if (index !== 0) return;

    return {
      transform: `translate(${this.firstOffset.x}px, ${this.firstOffset.y}px) rotateZ(${this.firstOffset.x * 120 / (2 * window.innerWidth)}deg)`
    };
  }

  public onPan(index: number, { deltaX, deltaY }: any): void {
    if (index !== 0) return;
    this.firstOffset = { x: deltaX, y: deltaY };
  }

  public onPanEnd(index: number, event: any): void {
    if (index !== 0 || event?.deltaX === undefined) return;

    if (Math.abs(event.deltaX) < 0.3 * window.innerWidth) {
      this.firstOffset = { x: 0, y: 0 };
      return;
    }

    if (event.deltaX < 0) {
      this.toastService.like();
    } else {
      this.toastService.dislike();
    }
  }

}
