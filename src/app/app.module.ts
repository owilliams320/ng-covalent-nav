import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EnvironmentsComponent } from './environments/environments.component';
import { EditorComponent } from './editor/editor.component';
import { HomeComponent } from './home/home.component';
import { DataProtectionsComponent } from './data-protections/data-protections.component';
import { EnvironmentComponent } from './environment/environment.component';
import { ComputeGroupsComponent } from './environment/compute-groups/compute-groups.component';
import { QueriesComponent } from './environment/queries/queries.component';
import { QueryGridComponent } from './environment/query-grid/query-grid.component';
import { ModelOpsComponent } from './model-ops/model-ops.component';
import { ModelComponent } from './model-ops/model/model.component';
import { ModelOpComponent } from './model-ops/model-op/model-op.component';
import { ModelRunComponent } from './model-ops/model-run/model-run.component';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { CovalentMarkdownNavigatorModule } from '@covalent/markdown-navigator';
import { CovalentCommonModule } from '@covalent/core/common';

import { OverviewComponent } from './monitor/overview/overview.component';
import { BudgetsComponent } from './monitor/budgets/budgets.component';
import { ConsumptionComponent } from './monitor/consumption/consumption.component';
import { DataCatalogComponent } from './data-catalog/data-catalog.component';
import { DataSharingComponent } from './data-sharing/data-sharing.component';
import { AdminDataComponent } from './admin-data/admin-data.component';
import { AdminAccessManagementComponent } from './admin-access-management/admin-access-management.component';
import { AdminEnvironmentsComponent } from './admin-environments/admin-environments.component';
import { SettingsComponent } from './environment/settings/settings.component';
import { EnvironmentOverviewComponent } from './environment/overview/overview.component';
import { FlowsComponent } from './environment/flows/flows.component';
import { BackupsComponent } from './environment/backups/backups.component';
import { ConsumptionDetailComponent } from './monitor/consumption-detail/consumption-detail.component';
import { CostCalculatorComponent } from './monitor/cost-calculator/cost-calculator.component';
import { UsersComponent } from './environment/users/users.component';
import { GlobalSwitcherListComponent } from './global-switcher-list/global-switcher-list.component';
import { GlobalSwitcherOverlayListComponentComponent } from './global-switcher-overlay-list-component/global-switcher-overlay-list-component.component';

@NgModule({
  declarations: [
    AppComponent,
    EnvironmentsComponent,
    EditorComponent,
    HomeComponent,
    DataProtectionsComponent,
    EnvironmentComponent,
    EnvironmentOverviewComponent,
    ComputeGroupsComponent,
    QueriesComponent,
    QueryGridComponent,
    ModelOpsComponent,
    ModelComponent,
    ModelOpComponent,
    ModelRunComponent,
    OverviewComponent,
    BudgetsComponent,
    ConsumptionComponent,
    DataCatalogComponent,
    DataSharingComponent,
    AdminDataComponent,
    AdminAccessManagementComponent,
    AdminEnvironmentsComponent,
    SettingsComponent,
    FlowsComponent,
    BackupsComponent,
    ConsumptionDetailComponent,
    CostCalculatorComponent,
    UsersComponent,
    GlobalSwitcherOverlayListComponentComponent,
    GlobalSwitcherListComponent,

  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatTableModule,
    CovalentCommonModule,
    CovalentMarkdownNavigatorModule,



  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
