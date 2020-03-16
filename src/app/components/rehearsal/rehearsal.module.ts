import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RehearsalComponent } from './rehearsal.component';
import { RehearsalCreateComponent } from './rehearsal-create/rehearsal-create.component';
import { RehearsalUpdateComponent } from './rehearsal-update/rehearsal-update.component';
import { RehearsalRoutingModule } from './rehearsal-routing.module';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [RehearsalComponent, RehearsalCreateComponent, RehearsalUpdateComponent],
  imports: [
    CommonModule,
    RehearsalRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class RehearsalModule { }
