import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'snuff-mode-switch',
  templateUrl: './mode-switch.component.html',
  styleUrls: ['./mode-switch.component.scss']
})
export class ModeSwitchComponent implements OnInit {
  public active: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
