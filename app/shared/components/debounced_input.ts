import {Component, Input, Output, EventEmitter, ElementRef} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'debounce',
  directives: [FORM_DIRECTIVES],
  template: '<input [type]="type" [class]="class" [placeholder]="placeholder" [(ngModel)]="inputValue" />'
})
export class DebouncedInputComponent {
  @Input() type: string = 'text';
  @Input() class: string = 'form-control debounce';
  @Input() placeholder: string;
  @Input() delay: number = 500;
  @Output() value: EventEmitter<any> = new EventEmitter();

  public inputValue: string;

  constructor(private elementRef: ElementRef) {
    var eventStream = Observable.fromEvent(elementRef.nativeElement, 'change')
                                .map(() => this.inputValue)
                                .debounceTime(this.delay)
                                .distinctUntilChanged();

    eventStream.subscribe(input => this.value.emit(input));
  }
}
