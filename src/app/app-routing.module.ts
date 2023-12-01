import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EnvironmentsComponent } from './environments/environments.component';
import { EditorComponent } from './editor/editor.component';
import { DataProtectionsComponent } from './data-protections/data-protections.component';
import { EnvironmentComponent } from './environment/environment.component';
import { ComputeGroupsComponent } from './environment/compute-groups/compute-groups.component';
import { QueriesComponent } from './environment/queries/queries.component';
import { ModelOpsComponent } from './model-ops/model-ops.component';
import { ModelOpComponent } from './model-ops/model-op/model-op.component';
import { ModelComponent } from './model-ops/model/model.component';
import { ModelRunComponent } from './model-ops/model-run/model-run.component';
import { OverviewComponent } from './monitor/overview/overview.component';
import { BudgetsComponent } from './monitor/budgets/budgets.component';
import { ConsumptionComponent } from './monitor/consumption/consumption.component';
import { QueriesMonitorComponent } from './monitor/queries/queries.component';
import { DataCatalogComponent } from './data-catalog/data-catalog.component';
import { DataSharingComponent } from './data-sharing/data-sharing.component';
import { AdminAccessManagementComponent } from './admin-access-management/admin-access-management.component';
import { AdminDataComponent } from './admin-data/admin-data.component';
import { AdminEnvironmentsComponent } from './admin-environments/admin-environments.component';
import { EnvironmentOverviewComponent } from './environment/overview/overview.component';
import { FlowsComponent } from './environment/flows/flows.component';
import { BackupsComponent } from './environment/backups/backups.component';
import { ConsumptionDetailComponent } from './monitor/consumption-detail/consumption-detail.component';
import { QueryGridComponent } from './environment/query-grid/query-grid.component';

const titlePrefix = 'Vantage cloud lake |';

const routes: Routes = [
  {
    path: '',
    title: `${titlePrefix} Home`,
    component: HomeComponent,
  },
  {
    path: 'data-catalog',
    title: `${titlePrefix} Data catalog`,
    component: DataCatalogComponent,
  },
  {
    path: 'data-sharing',
    title: `${titlePrefix} Data sharing`,
    component: DataSharingComponent,
  },
  {
    path: 'environments',
    title: `${titlePrefix} Environments`,
    children: [
      {
        path: '',
        component: EnvironmentsComponent,
      },
      {
        path: ':id',
        component: EnvironmentComponent,
        children: [
          {
            path: '',
            component: EnvironmentOverviewComponent,
          },
          {
            path: 'backups',
            component: BackupsComponent,
          },
          {
            path: 'compute-groups',
            component: ComputeGroupsComponent,
          },
          {
            path: 'flows',
            component: FlowsComponent,
          },
          {
            path: 'queries',
            component: QueryGridComponent,
          },
        ],
      },
    ],
  },
  {
    path: 'editor',
    title: `${titlePrefix} Editor`,
    component: EditorComponent,
  },
  {
    path: 'admin',
    title: `${titlePrefix} Admin`,
    children: [
      {
        path: 'data',
        component: AdminDataComponent
      },
      {
        path: 'access-management',
        component: AdminAccessManagementComponent
      },
      {
        path: 'environments',
        component: AdminEnvironmentsComponent
      }
    ]
  },
  {
    path: 'monitor',
    title: `${titlePrefix} Monitor`,
    children: [
      {
        path: '',
        component: OverviewComponent
      },
      {
        path: 'budgets',
        component: BudgetsComponent
      },
      {
        path: 'consumption',
        component: ConsumptionComponent
      },
      {
        path: 'consumption/:id',
        component: ConsumptionDetailComponent
      },
      {
        path: 'queries',
        component: QueriesComponent
      }
    ]
  },
  {
    path: 'model-ops',
    title: `${titlePrefix} Model Ops`,
    children: [
      {
        path: '',
        component: ModelOpsComponent,
      },
      {
        path: ':modelOpId',
        component: ModelOpComponent,
      },
      {
        path: ':modelOpId/deployments',
        component: ModelOpComponent,
      },
      {
        path: ':modelOpId/data-sets',
        component: ModelOpComponent,
      },
      {
        path: ':modelOpId/alerts',
        component: ModelOpComponent,
      },
      {
        path: ':modelOpId/settings',
        component: ModelOpComponent,
      },
      {
        path: ':modelOpId/model/:modelId',
        component: ModelComponent,
      },
      {
        path: ':modelOpId/model/:modelId/commit-history',
        component: ModelComponent,
      },
      {
        path: ':modelOpId/model/:modelId/alerts',
        component: ModelComponent,
      },
      {
        path: ':modelOpId/model/:modelId/run/:modelRunId',
        component: ModelRunComponent,
      },
      {
        path: ':modelOpId/model/:modelId/run/:modelRunId/life-cycle',
        component: ModelRunComponent,
      },
      {
        path: ':modelOpId/model/:modelId/run/:modelRunId/artifacts',
        component: ModelRunComponent,
      },
      {
        path: ':modelOpId/model/:modelId/run/:modelRunId/jobs',
        component: ModelRunComponent,
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
