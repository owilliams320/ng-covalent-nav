import { Component, HostBinding } from '@angular/core';
import { slideInLeftAnimation } from '../app.animations';
import '@covalent/components/typography';
import '@covalent/components/circular-progress';

@Component({
  selector: 'app-environments',
  templateUrl: './environments.component.html',
  styleUrls: ['./environments.component.scss'],
  animations: [slideInLeftAnimation],
})
export class EnvironmentsComponent {
  @HostBinding('@routeAnimation') routeAnimation = false;  
  @HostBinding('class.td-route-animation') classAnimation = true;

}