import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavigationService } from 'src/app/navigation.service';
import { ExampleDataSource } from '../model-ops.component';

import '@covalent/components/chip';
import '@covalent/components/chip-set';

const ELEMENT_DATA: any[] = [
  {
    id: '234213aa',
    status: 'Trained',
    dataset: 'PIMA Diabetes',
    tags: ['title', 'title', 'title', 'Long tag'],
    date: 'June 05, 2021 10:30',
  },
  {
    id: '234ee112',
    status: 'Deployed',
    dataset: 'PIMA DB2',
    tags: ['title', 'Long tag'],
    date: 'June 03, 2021 15:45',
  },
  {
    id: '221dd344',
    status: 'Trained',
    dataset: 'PIMA Diabetes',
    tags: ['title', 'title', 'Long tag', 'Long tag'],
    date: 'June 01, 2021 19:30',
  },
  {
    id: '532dd321',
    status: 'Evaluated',
    dataset: 'PIMA Diabetes',
    tags: ['title', 'title' ],
    date: 'June 01, 2021 3:30',
  },
];

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.scss']
})
export class ModelComponent {
  sectionName!: string;
  sectionTitle!: string;


  displayedColumns: string[] = ['id', 'status', 'dataset', 'tags', 'date'];
  dataToDisplay = [...ELEMENT_DATA];

  dataSource = new ExampleDataSource(this.dataToDisplay);

  constructor(private route: ActivatedRoute, private nav: NavigationService) {}

  ngOnInit(): void {
    this.sectionTitle = this.route.snapshot.paramMap.get('modelOpId') ?? '';
    this.sectionName = this.route.snapshot.paramMap.get('modelId') ?? '';

    this.nav.setNavTitle({ 
      name:this.sectionTitle, 
      route: `/model-ops/${this.sectionTitle}`,
      sectionName: this.sectionName
    });    
  }
}
