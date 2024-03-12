import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import '@covalent/components/action-ribbon';
import { NavigationService } from '../navigation.service';

@Component({
  selector: 'app-create-environment',
  templateUrl: './create-environment.component.html',
  styleUrl: './create-environment.component.scss'
})
export class CreateEnvironmentComponent {

  sectionName!: string;

  constructor(private route: ActivatedRoute, private router: Router, private navService: NavigationService) {}

  previousUrl?: string;

  ngOnInit(): void {
    this.previousUrl = this.navService.getPreviousUrl();
    this.route.paramMap.subscribe((params) => {
      this.sectionName = params.get('id') ?? '';
    });
  }
}
