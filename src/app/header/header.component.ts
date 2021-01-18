import { Component } from '@angular/core';
import { ToastService } from '../toast.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'snuff-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  public mode$ = this.toastService.isFavouriteOnlyMode$.pipe(
    map((isFavouriteOnlyMode) => ({ isFavouriteOnlyMode }))
  );

  constructor(private readonly toastService: ToastService) { }

  public toggleFavouriteOnlyMode(): void {
    this.toastService.toggleFavouriteOnlyMode();
  }
}
