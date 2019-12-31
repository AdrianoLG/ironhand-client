import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material/material.module';
import { MaintenanceRoutingModule } from './maintenance-routing.module';
import { MaintenanceComponent } from './maintenance.component';
import { CleanupCreateComponent } from './cleanup-create/cleanup-create.component';
import { PlantCreateComponent } from './plant-create/plant-create.component';
import { PlantUpdateComponent } from './plant-update/plant-update.component';
import { CleanupUpdateComponent } from './cleanup-update/cleanup-update.component';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InlineSVGModule } from 'ng-inline-svg';

@NgModule({
  declarations: [
    MaintenanceComponent,
    CleanupCreateComponent,
    PlantCreateComponent,
    PlantUpdateComponent,
    CleanupUpdateComponent
  ],
  imports: [
    CommonModule,
    MaintenanceRoutingModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    InlineSVGModule.forRoot()
  ]
})
export class MaintenanceModule {}
