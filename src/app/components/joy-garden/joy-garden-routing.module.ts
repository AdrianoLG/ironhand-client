import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JoyGardenComponent } from './joy-garden.component';
import { PlantCreateComponent } from './plant-create/plant-create.component';
import { SeedCreateComponent } from './seed-create/seed-create.component';
import { WateringCreateComponent } from './watering-create/watering-create.component';
import { WateringUpdateComponent } from './watering-update/watering-update.component';
import { SeedDetailComponent } from './seed-detail/seed-detail.component';

const routes: Routes = [
  { path: '', component: JoyGardenComponent },
  { path: 'plantas/crear', component: PlantCreateComponent },
  { path: 'semillas/crear', component: SeedCreateComponent },
  { path: 'riegos/crear', component: WateringCreateComponent },
  { path: 'plantas/actualizar/:_id', component: PlantCreateComponent },
  { path: 'semillas/:_id', component: SeedDetailComponent },
  { path: 'semillas/actualizar/:_id', component: SeedCreateComponent },
  { path: 'riegos/actualizar/:_id', component: WateringUpdateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JoyGardenRoutingModule { }