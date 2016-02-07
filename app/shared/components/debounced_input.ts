import {Component, Input, Output} from 'angular2/core';
import {FORM_DIRECTIVES, Control} from 'angular2/common';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'debounce',
  directives: [FORM_DIRECTIVES],
  template: '<input [type]="type" [class]="class" [placeholder]="placeholder" [ngFormControl]="input" />'
})
export class DebouncedInputComponent {
  @Input() type: string = 'text';
  @Input() class: string = 'form-control debounce';
  @Input() placeholder: string;
  @Input() delay: number = 500;

  input = new Control();
  @Output() value: Observable<any> = this.input.valueChanges
                                .debounceTime(this.delay)
                                .distinctUntilChanged();
}
