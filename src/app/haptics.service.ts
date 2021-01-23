import {
  Capacitor,
  HapticsImpactStyle,
  Plugins
} from '@capacitor/core';

import { Injectable } from '@angular/core';

const { Haptics } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class HapticsService {

  public triggerImpact(): void {
    if (HapticsService.IsAvailable()) {
      Haptics.impact({
        style: HapticsImpactStyle.Heavy
      });
    }
  }

  private static IsAvailable(): boolean {
    const HapticsIsAvailable = Capacitor.isPluginAvailable('Haptics');
    return HapticsIsAvailable;
  }
}
