import { Component, OnInit } from "@angular/core";

import { ToastService } from "../toast.service";

@Component({
  selector: "snuff-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"]
})
export class FooterComponent {

  constructor(
    private toastService: ToastService
  ) { }

  public likeToast(): void {
    this.toastService.like();
  }

  public dislikeToast(): void {
    this.toastService.dislike();
  }

}
