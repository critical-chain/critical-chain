import {Component, ViewEncapsulation} from 'angular2/core';
import {
  RouteConfig,
  ROUTER_DIRECTIVES
} from 'angular2/router';
// import {HTTP_PROVIDERS} from 'angular2/http';

import {HomeCmp} from '../home/home';
import {AboutCmp} from '../about/about';
import {EstimationsCmp} from '../estimations/estimations';
import {NameList} from '../../services/name_list';
import {EstimationService} from '../../services/estimations';

@Component({
  selector: 'app',
  viewProviders: [NameList],
  providers: [EstimationService],
  templateUrl: './components/app/app.html',
  styleUrls: ['./components/app/app.css'],
  encapsulation: ViewEncapsulation.None,
  directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
  { path: '/', component: HomeCmp, as: 'Home' },
  { path: '/about', component: AboutCmp, as: 'About' },
  { path: '/estimations', component: EstimationsCmp, as: 'Estimations' }
])
export class AppCmp {}
