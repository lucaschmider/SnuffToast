import { Component, OnDestroy } from "@angular/core";
import { Origin, Point } from "./point";
import { cardStack, firstCardIndex } from "./card-stack";
import { takeUntil, tap } from "rxjs/operators";

import { HammerPanEventData } from "./HammerPanEventData";
import { Subject } from "rxjs";
import { ToastService } from "./toast.service";

const safeSpaceRatio = 0.3;
const cardCount = 5;

@Component({
  selector: "snuff-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  animations: [cardStack(cardCount)],
})
export class AppComponent implements OnDestroy {
  private firstOffset: Point = Origin;

  private readonly destroy$ = new Subject();

  public readonly displayedToasts$ = this.toastService.currentToasts$.pipe(
    tap(() => this.firstOffset = Origin),
  );

  constructor(
    private readonly toastService: ToastService,
  ) {
    toastService.initializeData();

    this.toastService.isFavouriteOnlyMode$.pipe(
      tap(() => this.firstOffset = { x: 0, y: 0 }),
      takeUntil(this.destroy$),
    ).subscribe();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public getStyles(index: number): { transform: string } {
    if (index !== firstCardIndex) return;

    const maximumCardRotation = 120;
    const sideCount = 2;
    return {
      transform: `translate(${this.firstOffset.x}px, ${this.firstOffset.y}px)`
        + `rotateZ(${this.firstOffset.x * maximumCardRotation / (sideCount * window.innerWidth)}deg)`,
    };
  }

  public onPan(index: number, { deltaX, deltaY }: HammerPanEventData): void {
    if (index !== firstCardIndex) return;
    this.firstOffset = { x: deltaX, y: deltaY };
  }

  public onPanEnd(index: number, event?: HammerPanEventData): void {
    if (index !== firstCardIndex || event?.deltaX === undefined) return;


    if (Math.abs(event.deltaX) < safeSpaceRatio * window.innerWidth) {
      this.firstOffset = Origin;
      return;
    }

    const directionDefiningThresholdX = 0;
    if (event.deltaX < directionDefiningThresholdX) {
      this.toastService.like();
    } else {
      this.toastService.dislike();
    }
  }
}
