import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss']
})
export class CustomInputComponent {
  @Input() inputStyle: string = "";
  @Input() inputPlaceholder: string = "";
  @Input() inputLabel: string = "";
  @Input() inputHint: string = "";
  @Input() inputIcon: string = "";
  @Input() disabled: boolean = false;
  inputClass: string = "normal";
  hintTextClass: string = "hint-text";
  hintIconClass: string = "hint-text-icon";
  isDisabled: boolean = false;
  wrapperClass: string = "custom-input";
  inputIconStyle: string = "";

  ngOnChanges (){
    if(this.disabled){
      this.wrapperClass = "custom-input disabled";
    }
    this.inputClass = "normal " + this.inputStyle;
    this.hintTextClass = "hint-text " + "text-"+this.inputStyle
    this.hintIconClass = "hint-text-icon"
    if(this.inputStyle != ""){
      this.hintIconClass += "-"+this.inputStyle;
    }
    if(this.inputIcon != ""){
      this.inputIconStyle = `background-color: var(--noble-black-600, #1A1D21);background: url(../../../../assets/icons/${this.inputIcon}.svg) no-repeat scroll 16px 12px;padding-left:52px;background-size: 24px 24px;`
    }
  }
}
