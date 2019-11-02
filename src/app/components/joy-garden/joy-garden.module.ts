import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material/material.module';
import { JoyGardenComponent } from './joy-garden.component';
import { JoyGardenRoutingModule } from './joy-garden-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlantCreateComponent } from './plant-create/plant-create.component';
import { SeedCreateComponent } from './seed-create/seed-create.component';
import { WateringCreateComponent } from './watering-create/watering-create.component';
import { WateringUpdateComponent } from './watering-update/watering-update.component';
import { SeedDetailComponent } from './seed-detail/seed-detail.component';
import { SeedUpdateComponent } from './seed-update/seed-update.component';
import { PlantUpdateComponent } from './plant-update/plant-update.component';

@NgModule({
	declarations: [
		JoyGardenComponent,
		PlantCreateComponent,
		SeedCreateComponent,
		WateringCreateComponent,
		WateringUpdateComponent,
		SeedDetailComponent,
		PlantUpdateComponent,
		SeedUpdateComponent
	],
	imports: [ CommonModule, MaterialModule, FormsModule, ReactiveFormsModule, JoyGardenRoutingModule ]
})
export class JoyGardenModule {}
