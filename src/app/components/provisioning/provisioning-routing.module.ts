import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProvisioningComponent } from './provisioning.component';
import { RecipeeCreateComponent } from './recipee-create/recipee-create.component';
import { RecipeeUpdateComponent } from './recipee-update/recipee-update.component';
import { RecipeeDetailComponent } from './recipee-detail/recipee-detail.component';
import { CocktailCreateComponent } from './cocktail-create/cocktail-create.component';
import { CocktailDetailComponent } from './cocktail-detail/cocktail-detail.component';
import { CocktailUpdateComponent } from './cocktail-update/cocktail-update.component';
import { FoodCreateComponent } from './food-create/food-create.component';
import { FoodDetailComponent } from './food-detail/food-detail.component';
import { FoodUpdateComponent } from './food-update/food-update.component';
import { DrinkCreateComponent } from './drink-create/drink-create.component';
import { DrinkDetailComponent } from './drink-detail/drink-detail.component';
import { DrinkUpdateComponent } from './drink-update/drink-update.component';

const routes: Routes = [
   { path: '', component: ProvisioningComponent },
   { path: 'receta/crear', component: RecipeeCreateComponent },
   { path: 'receta/actualizar/:_id', component: RecipeeUpdateComponent },
   { path: 'receta/:_id', component: RecipeeDetailComponent },
   { path: 'comida/crear', component: FoodCreateComponent },
   { path: 'comida/actualizar/:_id', component: FoodUpdateComponent },
   { path: 'comida/:_id', component: FoodDetailComponent },
   { path: 'bebida/crear', component: DrinkCreateComponent },
   { path: 'bebida/actualizar/:_id', component: DrinkUpdateComponent },
   { path: 'bebida/:_id', component: DrinkDetailComponent },
   { path: 'coctel/crear', component: CocktailCreateComponent },
   { path: 'coctel/actualizar/:_id', component: CocktailUpdateComponent },
   { path: 'coctel/:_id', component: CocktailDetailComponent }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class ProvisioningRoutingModule { }