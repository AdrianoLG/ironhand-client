import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BodyRoutingModule } from './body-routing.module';
import { BodyComponent } from './body.component';
import { MaterialModule } from '../../material/material.module';
import { MealsCreateComponent } from './meals/meals-create/meals-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MealsUpdateComponent } from './meals/meals-update/meals-update.component';
@NgModule({
  declarations: [BodyComponent, MealsCreateComponent, MealsUpdateComponent],
  imports: [
    CommonModule,
    BodyRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class BodyModule { }
