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
import { CostCalculatorComponent } from './monitor/cost-calculator/cost-calculator.component';
import { UsersComponent } from './environment/users/users.component';
import { AlertsComponent } from './alerts/alerts.component';
import { CreateEnvironmentComponent } from './environments/create-environment.component';
import { CreateUsersComponent } from './create-users/create-users.component';
import { IdPListComponent } from './id-plist/id-plist.component';
import { AccessTokensComponent } from './access-tokens/access-tokens.component';
import { SettingsComponent } from './environment/settings/settings.component';
import { CreateComputeComponent } from './create-compute/create-compute.component';
import { CreateBackupComponent } from './environment/backups/create/create-backup.component';
import { LearnComponent } from './learn/learn.component';


const titlePrefix = 'Vantage cloud lake |';

const routes: Routes = [
  {
    path: '',
    title: `${titlePrefix} Home`,
    component: HomeComponent,
  },
    {
      path: 'access-management',
      title: "Access management",
      children: [
        {
        path: 'users',
        component: UsersComponent,
      },
      {
        path: 'users/create',
        component: CreateUsersComponent,
      },
      {
        path: 'identity-providers',
        component: IdPListComponent
      },
      {
        path: 'access-tokens',
        component: AccessTokensComponent
      }
      ]
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
        path: 'create',
        component: CreateEnvironmentComponent,
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
            path: 'users',
            component: UsersComponent,
          },
          {
            path: 'compute-groups',
            component: ComputeGroupsComponent,
          },
          {
            path: 'compute-groups/create',
            component: CreateComputeComponent,
          },
          {
            path: 'backups',
            component: BackupsComponent,
          },
          {
            path: 'backups/create',
            component: CreateBackupComponent,
          },
          {
            path: 'data-copy',
            component: BackupsComponent,
          },
          {
            path: 'data-migration',
            component: BackupsComponent,
          },
          {
            path: 'flows',
            component: BackupsComponent,
          },

          {
            path: 'query-grid',
            component: QueryGridComponent,
          },
          {  
            path: 'settings',
            component: SettingsComponent,
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
        path: 'cost-calculator',
        component: CostCalculatorComponent
      },
      {
        path: 'alerts',
        component: AlertsComponent
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
    path: 'learn',
    component: LearnComponent,
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
