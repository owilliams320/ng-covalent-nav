import { Component } from '@angular/core';
import { NavigationService } from '../navigation.service';

@Component({
  selector: 'app-create-users',
  templateUrl: './create-users.component.html',
  styleUrl: './create-users.component.scss'
})
export class CreateUsersComponent {

  previousUrl?: string;

  constructor(private navService: NavigationService) {

  }

  ngOnInit() {
    this.previousUrl = this.navService.getPreviousUrl();
  }

}
