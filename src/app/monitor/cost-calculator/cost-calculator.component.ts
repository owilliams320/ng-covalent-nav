import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavigationService } from 'src/app/navigation.service';

import '@covalent/components/select'

@Component({
  selector: 'app-cost-calculator',
  templateUrl: './cost-calculator.component.html',
  styleUrls: ['./cost-calculator.component.scss']
})
export class CostCalculatorComponent {

  sectionName!: string;

  constructor(private route: ActivatedRoute, private nav: NavigationService) {}

  ngOnInit(): void {
    this.sectionName = this.route.snapshot.paramMap.get('id') ?? '';
    this.nav.setNavTitle({name: 'Consumption', route: '/monitor/consumption', sectionName:this.sectionName});
  }

}
