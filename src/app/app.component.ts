import { Component, OnDestroy } from "@angular/core";
import { Origin, Point } from "./shared/models/point";
import { cardStack, firstCardIndex } from "./shared/card-stack";
import { tap } from "rxjs/operators";

import { HammerPan, HammerPanEnd, HammerPanEventData } from "./shared/models/hammer-pan-event-data";
import { Subject } from "rxjs";
import { ToastViewService } from "./toast-view/toast-view.service";

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
  public readonly viewObj$ = this.toastViewService.viewObj$.pipe(
    tap(() => this.firstOffset = Origin)
  );

  constructor(
    private readonly toastViewService: ToastViewService
  ) {
    toastViewService.initializeData();
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
      this.toastViewService.like();
    } else {
      this.toastViewService.dislike();
    }
  }
}
