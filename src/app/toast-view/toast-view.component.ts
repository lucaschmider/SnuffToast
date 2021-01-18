import { Component, Input, OnInit } from "@angular/core";

import { Toast } from "../store/toast";

@Component({
  selector: "snuff-toast-view",
  templateUrl: "./toast-view.component.html",
  styleUrls: ["./toast-view.component.scss"]
})
export class ToastViewComponent implements OnInit {

  @Input() public toast: Toast;

  constructor() { }

  ngOnInit(): void {
  }


}
