import {Component} from 'angular2/core';
import {Estimation, EstimationService} from '../../services/estimations';

@Component({
  selector: 'estimations',
  templateUrl: './components/estimations/estimations.html',
  providers: [EstimationService]
  //styleUrls: ['./components/home/home.css']
})
export class EstimationsCmp {
  estimations: Estimation[];

  newEstimationTitle: string;
  newEstimationValue: string;

  constructor(estimationService: EstimationService) {
    this.estimations = estimationService.getEstimations();
  };

  createEstimation() {
    this.estimations.push(new Estimation(this.newEstimationTitle, +this.newEstimationValue));
    this.newEstimationTitle = '';
    this.newEstimationValue = '';
  };
}
