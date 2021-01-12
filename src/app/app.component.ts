import { Component } from '@angular/core';
import { ToastService } from "./toast.service";
@Component({
  selector: 'snuff-root',
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  constructor(
    public toastService: ToastService
  ) {
    toastService.initializeData();
  }
}
