import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class HapticsService {
  public triggerImpact(): void {
  }

  private static IsAvailable(): boolean {
    return false;
  }
}
