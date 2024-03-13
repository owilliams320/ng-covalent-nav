import { Component } from '@angular/core';
import { NavigationService } from '../navigation.service';

@Component({
  selector: 'app-create-compute',
  templateUrl: './create-compute.component.html',
  styleUrl: './create-compute.component.scss'
})
export class CreateComputeComponent {

  previousUrl?: string;

  constructor(private navService: NavigationService) {

  }

  ngOnInit() {
    this.previousUrl = this.navService.getPreviousUrl();
  }

}
