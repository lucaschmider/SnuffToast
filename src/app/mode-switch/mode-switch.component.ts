import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { Mode } from "./mode";

@Component({
  selector: 'snuff-mode-switch',
  templateUrl: './mode-switch.component.html',
  styleUrls: ['./mode-switch.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ModeSwitchComponent),
    multi: true
  }]
})
export class ModeSwitchComponent implements ControlValueAccessor {


  public mode: Mode = Mode.All;
  public disabled: boolean = false;
  public readonly MODES = Mode;
  private onChange: (value: Mode) => void;
  private onTouched: () => void;

  public toggle(): void {
    this.mode = this.mode === Mode.All ? Mode.FavouritesOnly : Mode.All;
    if (this.onChange !== undefined) this.onChange(this.mode);
    if (this.onTouched !== undefined) this.onTouched();
  }

  public writeValue(obj: any): void {
    this.mode = obj === Mode.FavouritesOnly ? Mode.FavouritesOnly : Mode.All;
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

}
