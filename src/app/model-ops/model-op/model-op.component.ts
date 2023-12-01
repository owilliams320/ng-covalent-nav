import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { slideInUpAnimation } from 'src/app/app.animations';
import { NavigationService } from 'src/app/navigation.service';
import { ExampleDataSource } from '../model-ops.component';


const ELEMENT_DATA: any[] = [
  {
    id: '423dd435',
    name: 'PMML BYOM Model',
    description: 'PMML BYPM Model Description',
    type: 'BYOM',
    language: 'PMML',
    alerts: false,
    date: 'June 05, 2021 10:30',
  },
  {
    id: '234213aa',
    name: 'R Diabetes Prediction',
    description: 'R GBM for Diabetes Prediction',
    type: 'GIT',
    language: 'R',
    alerts: false,
    date: 'June 03, 2021 15:45',
  },
  {
    id: '234ee112',
    name: 'VAL Demand Forecasting',
    description: 'Demand forecasting example using Vantage Analytics Library (VAL)',
    type: 'GIT',
    language: 'Pyhton',
    alerts: false,
    date: 'June 01, 2021 19:30',
  },
  {
    id: '221dd344',
    name: 'Python Demand Forecasting',
    description: 'Python Random Forest Regression for Demand Forecasting',
    type: 'GIT',
    language: 'Pyhton',
    alerts: false,
    date: 'June 01, 2021 3:30',
  },
  {
    id: '532dd321',
    name: 'Python Diabetes Prediction',
    description: 'Python XGBoost for Diabetes Prediction',
    type: 'GIT',
    language: 'Pyhton',
    alerts: false,
    date: 'June 01, 2021 3:30',
  },
];


@Component({
  selector: 'app-model-op',
  templateUrl: './model-op.component.html',
  styleUrls: ['./model-op.component.scss'],
  animations: [slideInUpAnimation],
})
export class ModelOpComponent {
  sectionName!: string;

  displayedColumns: string[] = ['id', 'name', 'description', 'type', 'language', 'alerts', 'date'];
  dataToDisplay = [...ELEMENT_DATA];

  dataSource = new ExampleDataSource(this.dataToDisplay);

  constructor(private route: ActivatedRoute, private nav: NavigationService) {}

  ngOnInit(): void {
    this.sectionName = this.route.snapshot.paramMap.get('modelOpId') ?? '';
    this.nav.setNavTitle({ name: 'Model ops', route: '/model-ops', sectionName: this.sectionName})
  }
}


