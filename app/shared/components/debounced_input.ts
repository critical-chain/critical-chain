import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {FORM_DIRECTIVES, Control} from 'angular2/common';
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
  @Output() value: EventEmitter<any> = new EventEmitter();

  input = new Control();

  constructor() {
    var eventStream = this.input.valueChanges
                                .debounceTime(this.delay)
                                .distinctUntilChanged();

    eventStream.subscribe(input => this.value.emit(input));
  }
}
