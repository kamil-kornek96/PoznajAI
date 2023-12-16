import { Component, Input, Output, EventEmitter,OnChanges } from '@angular/core';

@Component({
  selector: 'app-custom-checkbox',
  templateUrl: './custom-checkbox.component.html',
  styleUrls: ['./custom-checkbox.component.scss']
})
export class CustomCheckboxComponent {
  @Input() checked: boolean = false;
  @Input() label: string = "";
  @Output() checkedChange = new EventEmitter<boolean>();

  onClick() {
    this.checked = !this.checked;
    this.checkedChange.emit(this.checked);
  }
}
