import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { DrinksService } from 'src/app/services/drinks/drinks.service';
import { FoodProductsService } from 'src/app/services/food-products/food-products.service';
import { CocktailsService } from 'src/app/services/cocktails/cocktails.service';
import { RecipeesService } from 'src/app/services/recipees/recipees.service';
import { Drink } from 'src/app/models/drink';
import { FoodProduct } from 'src/app/models/food-product';
import { Cocktail } from 'src/app/models/cocktail';
import { Recipee } from 'src/app/models/recipee';
import { Tab, SelectedTabService } from 'src/app/services/tabs/selected-tab.service';

@Component({
  selector: 'app-provisioning',
  templateUrl: './provisioning.component.html',
  styleUrls: ['./provisioning.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProvisioningComponent implements OnInit {
  filterFood: any;
  filterDrinks: any;
  filterRecipees: any;
  filterCocktails: any;
  drinks: Drink[];
  food: FoodProduct[];
  cocktails: Cocktail[];
  recipees: Recipee[];
  drinksCount: number;
  foodCount: number;
  cocktailsCount: number;
  recipeesCount: number;
  selectedIndex: number;
  selectedIndex2: number;
  currentTabs: Tab[];
  tabGroup: number;

  constructor(
    private _selectedTabService: SelectedTabService,
    private _drinksService: DrinksService,
    private _foodService: FoodProductsService,
    private _cocktailsService: CocktailsService,
    private _recipeesService: RecipeesService,
    private _router: Router
  ) { }

  ngOnInit() {
    this._selectedTabService.currentTabs.subscribe(currentTabs => {
      this.currentTabs = currentTabs;
      for (const currentTab of currentTabs) {
        if (currentTab.name === 'provisioning') {
          this.tabGroup = currentTabs.indexOf(currentTab);
          this.selectedIndex = currentTab.selected;
          this.selectedIndex2 = 0;
        }
      }
    });
    console.log(`TabGroup ${this.tabGroup}, SelectedIndex ${this.selectedIndex}`);
    this.getDrinks();
    this.getFood();
    this.getCocktails();
    this.getRecipees();
    console.log(`Food ${this.food}, Drink ${this.drinks}, Cocktails ${this.cocktails}, Recipees: ${this.recipees}`);
  }

  addSomething(): void {
    switch (this.selectedIndex) {
      case 0:
        if (this.selectedIndex2 === 0) {
          this._router.navigate(['aprovisionamiento/comida/crear']);
        } else if (this.selectedIndex2 === 1) {
          this._router.navigate(['aprovisionamiento/receta/crear']);
        } else {
          console.log('Something wrong');
        }
        break;
      case 1:
        if (this.selectedIndex2 === 0) {
          this._router.navigate(['aprovisionamiento/bebida/crear']);
        } else if (this.selectedIndex2 === 1) {
          this._router.navigate(['aprovisionamiento/coctel/crear']);
        } else {
          console.log('Something wrong');
        }
        break;
      default:
        console.log('No more cases. Check the code.');
    }
  }

  getDrinks() {
    this._drinksService.getDrinks().subscribe(drinks => {
      this.drinksCount = drinks.count;
      this.drinks = drinks.drinks;
    }, error => {
      if (error.status === 401) {
        this._router.navigate(['/login']);
      }
    });
  }

  getFood() {
    this._foodService.getFoodProducts().subscribe(food => {
      this.foodCount = food.count;
      this.food = food.products;
    });
  }

  getCocktails() {
    this._cocktailsService.getCocktails().subscribe(cocktails => {
      this.cocktailsCount = cocktails.count;
      this.cocktails = cocktails.cocktails;
    });
  }

  getRecipees() {
    this._recipeesService.getRecipees().subscribe(recipees => {
      this.recipeesCount = recipees.count;
      this.recipees = recipees.recipees;
    });
  }

  changeSelectedIndex($event): void {
    const tabIndex = $event.index;
    this.selectedIndex = tabIndex;
    this.currentTabs[this.tabGroup].selected = tabIndex;
    this._selectedTabService.changeTabs(this.currentTabs);
    console.log(`TabGroup ${this.tabGroup}, SelectedIndex ${this.selectedIndex}, OtherIndex ${this.selectedIndex2}`);
  }

  changeSelectedIndex2($event): void {
    this.selectedIndex2 = $event.index;
    console.log(`TabGroup ${this.tabGroup}, SelectedIndex ${this.selectedIndex}, OtherIndex ${this.selectedIndex2}`);
  }

}
