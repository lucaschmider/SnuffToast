import { zoomInOnEnterAnimation, zoomOutOnLeaveAnimation } from 'angular-animations';

import { Component } from '@angular/core';
import { ToastService } from "./toast.service";

@Component({
  selector: 'snuff-root',
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  animations: [
    zoomInOnEnterAnimation({ duration: 250 }),
    zoomOutOnLeaveAnimation({ duration: 250 })
  ]
})
export class AppComponent {
  constructor(
    public toastService: ToastService
  ) {
    toastService.initializeData();
  }
}
