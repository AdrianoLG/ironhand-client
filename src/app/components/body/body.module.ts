import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BodyRoutingModule } from './body-routing.module';
import { BodyComponent } from './body.component';
import { MaterialModule } from '../../material/material.module';
import { MealsCreateComponent } from './meals/meals-create/meals-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MealsUpdateComponent } from './meals/meals-update/meals-update.component';
import { SuggestionCreateComponent } from './meals/suggestion-create/suggestion-create.component';
import { SuggestionUpdateComponent } from './meals/suggestion-update/suggestion-update.component';
import { CompletedCreateComponent } from './exercise/completed-create/completed-create.component';
import { CompletedUpdateComponent } from './exercise/completed-update/completed-update.component';
import { ListCreateComponent } from './exercise/list-create/list-create.component';
import { ListUpdateComponent } from './exercise/list-update/list-update.component';
@NgModule({
  declarations: [
    BodyComponent,
    MealsCreateComponent,
    MealsUpdateComponent,
    SuggestionCreateComponent,
    SuggestionUpdateComponent,
    CompletedCreateComponent,
    CompletedUpdateComponent,
    ListCreateComponent,
    ListUpdateComponent
  ],
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
