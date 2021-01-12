import { Component, OnInit } from '@angular/core';

import { ToastService } from '../toast.service';

@Component({
  selector: 'snuff-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  constructor(
    private toastService: ToastService
  ) { }

  public openRandomToast(): void {
    this.toastService.nextToast();
  }

}
