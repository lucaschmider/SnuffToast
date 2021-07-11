import { Injectable } from "@angular/core";
import { Haptics, ImpactStyle } from "@capacitor/haptics";

@Injectable({
  providedIn: "root",
})
export class HapticsService {

  public triggerImpact(): Promise<void> {
    return Haptics.impact({
      style: ImpactStyle.Heavy
    });
  }
}
