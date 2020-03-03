import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RehearsalComponent } from './rehearsal.component';
import { RehearsalCreateComponent } from './rehearsal-create/rehearsal-create.component';
import { RehearsalUpdateComponent } from './rehearsal-update/rehearsal-update.component';



@NgModule({
  declarations: [RehearsalComponent, RehearsalCreateComponent, RehearsalUpdateComponent],
  imports: [
    CommonModule
  ]
})
export class RehearsalModule { }
