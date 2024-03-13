import { Component } from '@angular/core';
import { NavigationService } from 'src/app/navigation.service';

@Component({
  selector: 'app-create-backup',
  templateUrl: './create-backup.component.html',
  styleUrl: './create-backup.component.scss'
})
export class CreateBackupComponent {
  previousUrl?: string;

  constructor(private navService: NavigationService) {

  }

  ngOnInit() {
    this.previousUrl = this.navService.getPreviousUrl();
  }
}
