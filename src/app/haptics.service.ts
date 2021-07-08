import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class HapticsService {
  public triggerImpact(): void { 
    throw new Error("Not implemented");
  }

  private static IsAvailable(): boolean {
    return false;
  }
}
