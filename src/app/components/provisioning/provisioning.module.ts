import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material/material.module';
import { ProvisioningComponent } from './provisioning.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProvisioningRoutingModule } from './provisioning-routing.module';
import { FoodCreateComponent } from './food-create/food-create.component';
import { FoodDetailComponent } from './food-detail/food-detail.component';
import { FoodUpdateComponent } from './food-update/food-update.component';
import { DrinkCreateComponent } from './drink-create/drink-create.component';
import { DrinkDetailComponent } from './drink-detail/drink-detail.component';
import { DrinkUpdateComponent } from './drink-update/drink-update.component';
import { CocktailCreateComponent } from './cocktail-create/cocktail-create.component';
import { CocktailDetailComponent } from './cocktail-detail/cocktail-detail.component';
import { CocktailUpdateComponent } from './cocktail-update/cocktail-update.component';
import { RecipeeCreateComponent } from './recipee-create/recipee-create.component';
import { RecipeeDetailComponent } from './recipee-detail/recipee-detail.component';
import { RecipeeUpdateComponent } from './recipee-update/recipee-update.component';
import { MatTabsModule } from '@angular/material';
import { CollectionPipeModule } from 'src/app/filters/collection-pipe.module';


@NgModule({
  declarations: [
    ProvisioningComponent,
    FoodCreateComponent,
    FoodDetailComponent,
    FoodUpdateComponent,
    DrinkCreateComponent,
    DrinkDetailComponent,
    DrinkUpdateComponent,
    CocktailCreateComponent,
    CocktailDetailComponent,
    CocktailUpdateComponent,
    RecipeeCreateComponent,
    RecipeeDetailComponent,
    RecipeeUpdateComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ProvisioningRoutingModule,
    RouterModule,
    MatTabsModule,
    CollectionPipeModule
  ]
})
export class ProvisioningModule { }
