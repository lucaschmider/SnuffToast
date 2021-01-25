import {
  Capacitor,
  HapticsImpactStyle,
  Plugins,
} from "@capacitor/core";

import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

const { Haptics } = Plugins;

@Injectable({
  providedIn: "root",
})
export class HapticsService {
  public triggerImpact(): void {
    if (environment.disableHaptics) return;
    
    if (HapticsService.IsAvailable()) {
      Haptics.impact({
        style: HapticsImpactStyle.Heavy,
      });
    }
  }

  private static IsAvailable(): boolean {
    const HapticsIsAvailable = Capacitor.isPluginAvailable("Haptics");
    return HapticsIsAvailable;
  }
}
