import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
} from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  @Input() value: string = '';
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();
  @Input() inputStyle: string = '';
  @Input() inputPlaceholder: string = '';
  @Input() inputLabel: string = '';
  @Input() inputHint: string = '';
  @Input() inputIcon: string = '';
  @Input() disabled: boolean = false;
  @Input() type: string = '';
  inputClass: string = 'normal';
  hintTextClass: string = 'hint-text';
  hintIconClass: string = 'hint-text-icon';
  isDisabled: boolean = false;
  wrapperClass: string = 'custom-input';
  inputIconStyle: string = '';

  ngOnChanges() {
    if (this.disabled) {
      this.wrapperClass = 'custom-input disabled';
    }
    this.inputClass = 'normal ' + this.inputStyle;
    this.hintTextClass = 'hint-text ' + 'text-' + this.inputStyle;
    this.hintIconClass = 'hint-text-icon';
    if (this.inputStyle != '') {
      this.hintIconClass += '-' + this.inputStyle;
    }
    if (this.inputIcon != '') {
      this.inputIconStyle = `background-color: var(--noble-black-600, #1A1D21);background: url(../../../../assets/icons/${this.inputIcon}.svg) no-repeat scroll 16px 12px;padding-left:52px;background-size: 24px 24px;`;
    }
  }

  handleOnChange(event: any) {
    this.value = event.target.value;
    this.valueChange.emit(this.value);
  }
}
