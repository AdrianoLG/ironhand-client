import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BodyRoutingModule } from './body-routing.module';
import { BodyComponent, DialogComponent } from './body.component';
import { MaterialModule } from '../../material/material.module';
@NgModule({
  declarations: [BodyComponent, DialogComponent],
  entryComponents: [DialogComponent],
  imports: [
    CommonModule,
    BodyRoutingModule,
    MaterialModule
  ]
})
export class BodyModule { }
