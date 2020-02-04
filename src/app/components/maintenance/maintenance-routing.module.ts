import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaintenanceComponent } from './maintenance.component';
import { CleanupCreateComponent } from './cleanup-create/cleanup-create.component';
import { CleanupUpdateComponent } from './cleanup-update/cleanup-update.component';
import { PlantCreateComponent } from './plant-create/plant-create.component';
import { PlantUpdateComponent } from './plant-update/plant-update.component';
import { PlantDetailComponent } from './plant-detail/plant-detail.component';
import { WateringCreateComponent } from './watering-create/watering-create.component';
import { TransplantCreateComponent } from './transplant-create/transplant-create.component';


const routes: Routes = [
  { path: '', component: MaintenanceComponent },
  { path: 'limpieza/crear', component: CleanupCreateComponent },
  { path: 'limpieza/editar/:_id', component: CleanupUpdateComponent },
  { path: 'plantas/crear', component: PlantCreateComponent },
  { path: 'plantas/:_id', component: PlantDetailComponent },
  { path: 'plantas/editar/:_id', component: PlantUpdateComponent },
  { path: 'plantas/:_id/riego/crear', component: WateringCreateComponent },
  { path: 'plantas/:_id/trasplante/crear', component: TransplantCreateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaintenanceRoutingModule { }
