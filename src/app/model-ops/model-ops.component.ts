import { Component } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { DataSource } from '@angular/cdk/collections';

export interface PeriodicElement {
  project: string;
  description: string;
  group: string;
  repo: string;
  branch: string;
  status: string;
  date: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    project: 'Demo',
    description: 'In machine learning and statistics',
    group: 'DEMO',
    repo: 'https://github.com/ThinkBigAnalytics/AoaDemoModels.git',
    branch: 'Main',
    status: 'Connected',
    date: 'June 05, 2021 10:30',
  },
  {
    project: 'Test Project',
    description: 'classification is the problem of identifying',
    group: 'DEMO',
    repo: 'https://github.com/ThinkBigAnalytics/AoaDemoModels.git',
    branch: 'Main',
    status: 'Connected',
    date: 'June 03, 2021 15:45',
  },
  {
    project: 'Smart Cities',
    description: 'to which of a set of .... In some of these it',
    group: 'DEMO',
    repo: 'https://github.com/ThinkBigAnalytics/AoaDemoModels.git',
    branch: 'Main',
    status: 'Not Connected',
    date: 'June 01, 2021 19:30',
  },
  {
    project: 'Iris Flower Classification',
    description: 'is employed as a data mining procedure.',
    group: 'DEMO',
    repo: 'https://github.com/ThinkBigAnalytics/AoaDemoModels.git',
    branch: 'Main',
    status: 'Connected',
    date: 'June 01, 2021 3:30',
  },
];

@Component({
  selector: 'app-model-ops',
  templateUrl: './model-ops.component.html',
  styleUrls: ['./model-ops.component.scss']
})
export class ModelOpsComponent {

  displayedColumns: string[] = ['project', 'description', 'group', 'repo', 'branch', 'status', 'date'];
  dataToDisplay = [...ELEMENT_DATA];

  dataSource = new ExampleDataSource(this.dataToDisplay);

}

export class ExampleDataSource extends DataSource<PeriodicElement> {
  private _dataStream = new ReplaySubject<PeriodicElement[]>();

  constructor(initialData: PeriodicElement[]) {
    super();
    this.setData(initialData);
  }

  connect(): Observable<PeriodicElement[]> {
    return this._dataStream;
  }

  disconnect() {}

  setData(data: PeriodicElement[]) {
    this._dataStream.next(data);
  }
}