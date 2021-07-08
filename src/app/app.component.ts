import { Component, OnDestroy } from "@angular/core";
import { Origin, Point } from "./point";
import { cardStack, firstCardIndex } from "./card-stack";
import { takeUntil, tap } from "rxjs/operators";

import { HammerPan, HammerPanEnd, HammerPanEventData } from "./HammerPanEventData";
import { Subject } from "rxjs";
import { ToastService } from "./toast.service";

const safeSpaceRatio = 0.3;

@Component({
  selector: "snuff-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  animations: [cardStack],
})
export class AppComponent implements OnDestroy {
  private firstOffset: Point = Origin;

  private readonly destroy$ = new Subject();

  public readonly displayedToasts$ = this.toastService.currentToasts$.pipe(
    tap(() => this.firstOffset = Origin),
  );

  constructor(
    private readonly toastService: ToastService
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
    if (index !== firstCardIndex) return { transform: "" };

    const maximumCardRotation = 120;
    const sideCount = 2;
    return {
      transform: `translate(${this.firstOffset.x}px, ${this.firstOffset.y}px)`
        + `rotateZ(${this.firstOffset.x * maximumCardRotation / (sideCount * window.innerWidth)}deg)`,
    };
  }

  public onPan(index: number, event: Event): void {
    if (index !== firstCardIndex || event.type !== HammerPan) return;

    const { deltaX, deltaY } = event as HammerPanEventData;
    this.firstOffset = { x: deltaX, y: deltaY };
  }

  public onPanEnd(index: number, event: Event): void {
    if (index !== firstCardIndex || event.type !== HammerPanEnd) return;

    const { deltaX } = event as HammerPanEventData;
    if (Math.abs(deltaX) < safeSpaceRatio * window.innerWidth) {
      this.firstOffset = Origin;
      return;
    }

    const directionDefiningThresholdX = 0;
    if (deltaX < directionDefiningThresholdX) {
      this.toastService.like();
    } else {
      this.toastService.dislike();
    }
  }
}
