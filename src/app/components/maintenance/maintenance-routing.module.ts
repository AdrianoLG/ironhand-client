import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaintenanceComponent } from './maintenance.component';
import { CleanupCreateComponent } from './cleanup-create/cleanup-create.component';
import { CleanupUpdateComponent } from './cleanup-update/cleanup-update.component';
import { PlantCreateComponent } from './plant-create/plant-create.component';
import { PlantUpdateComponent } from './plant-update/plant-update.component';


const routes: Routes = [
  { path: '', component: MaintenanceComponent },
  { path: 'limpieza/crear', component: CleanupCreateComponent },
  { path: 'limpieza/editar/:_id', component: CleanupUpdateComponent },
  { path: 'plantas/crear', component: PlantCreateComponent },
  { path: 'plantas/editar/:_id', component: PlantUpdateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaintenanceRoutingModule { }
