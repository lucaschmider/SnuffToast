import { zoomInOnEnterAnimation, zoomOutOnLeaveAnimation } from 'angular-animations';

import { Component } from '@angular/core';
import { ToastService } from "./toast.service";

@Component({
  selector: 'snuff-root',
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  animations: [
    zoomInOnEnterAnimation(),
    zoomOutOnLeaveAnimation()
  ]
})
export class AppComponent {
  constructor(
    public toastService: ToastService
  ) {
    toastService.initializeData();
  }
}
