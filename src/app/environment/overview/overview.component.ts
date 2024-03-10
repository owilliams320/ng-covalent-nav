import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import '@covalent/components/action-ribbon';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class EnvironmentOverviewComponent {

  sectionName!: string;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.sectionName = params.get('id') ?? '';
    });
  }
}
