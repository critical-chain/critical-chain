import {Component} from 'angular2/core';
import {NgForm} from 'angular2/common';
import {Estimation, EstimationService} from '../../services/estimations';

@Component({
  selector: 'estimations',
  templateUrl: './components/estimations/estimations.html',
  viewProviders: [NgForm]
})
export class EstimationsCmp {
  estimations: Estimation[];
  estimationService: EstimationService;
  newEstimation: Estimation = new Estimation('', undefined);

  newEstimationTitle: string;
  newEstimationValue: number;

  constructor(estimationService: EstimationService) {
    this.estimations = estimationService.getEstimations();
    this.estimationService = estimationService;
  };

  createEstimation() {
    this.estimations.push(this.newEstimation);
    this.newEstimation = new Estimation('', undefined);
  };
  removeEstimation(index) {
    this.estimationService.remove(index);
  };
}
