import {Component} from 'angular2/core';
import {NgForm} from 'angular2/common';
import {Estimation, EstimationService} from '../../services/estimations';

@Component({
  selector: 'estimations',
  templateUrl: './components/estimations/estimations.html',
  viewProviders: [NgForm]
})
export class EstimationsCmp {
  estimations: EstimationService;
  newEstimation: Estimation = new Estimation('', undefined);

  newEstimationTitle: string;
  newEstimationValue: number;

  constructor(estimationService: EstimationService) {
    this.estimations = estimationService;
  };

  createEstimation(inputToFocus) {
    this.estimations.add(this.newEstimation);
    this.newEstimation = new Estimation('', undefined);
    inputToFocus.focus();
  };
  removeEstimation(index: number) {
    this.estimations.remove(index);
  };
}
