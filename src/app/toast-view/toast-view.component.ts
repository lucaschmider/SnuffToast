import { Component, Input } from "@angular/core";

import { Toast } from "../store/toast";

@Component({
  selector: "snuff-toast-view",
  templateUrl: "./toast-view.component.html",
  styleUrls: [ "./toast-view.component.scss" ],
})
export class ToastViewComponent {
  @Input() public toast: Toast;
}
