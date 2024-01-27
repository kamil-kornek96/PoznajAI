import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
} from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent {
  @Input() checked: boolean = false;
  @Input() label: string = '';
  @Output() checkedChange = new EventEmitter<boolean>();

  onClick() {
    this.checked = !this.checked;
    this.checkedChange.emit(this.checked);
  }
}
