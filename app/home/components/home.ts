import {Component} from 'angular2/core';
import {DebouncedInputComponent} from '../../shared/components/debounced_input';

@Component({
  selector: 'home',
  templateUrl: './home/components/home.html',
  styleUrls: ['./home/components/home.css'],
  directives: [DebouncedInputComponent]
})
export class HomeCmp {
  public log(value) { console.log(value); }
}
