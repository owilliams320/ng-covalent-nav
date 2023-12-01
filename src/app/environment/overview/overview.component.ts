import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import '@covalent/components/action-ribbon';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class EnvironmentOverviewComponent {

  sectionName!: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.sectionName = this.route.snapshot.paramMap.get('id') ?? '';
  }
}
