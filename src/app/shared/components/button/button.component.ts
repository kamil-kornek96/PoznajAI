import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() size: 'big' | 'normal' | 'small' = 'normal';
  @Input() style: 'default' | 'outline' | 'grey-1' | 'grey-2' | 'grey-3' =
    'default';
  @Input() disabled: boolean = false;
  @Input() type: string = 'submit';
}
