import { NgModule } from '@angular/core';
import {
	MatButtonModule,
	MatFormFieldModule,
	MatIconModule,
	MatInputModule,
	MatListModule,
	MatCheckboxModule,
	MatMenuModule,
	MatSidenavModule,
	MatToolbarModule,
	MatTabsModule,
	MatDatepickerModule,
	MatNativeDateModule,
	MatCardModule,
	MatBadgeModule,
	MatChipsModule,
	MatAutocompleteModule,
	MatSlideToggleModule,
	MatRippleModule,
	MatSelectModule,
	MAT_DATE_LOCALE
} from '@angular/material';

@NgModule({
	imports: [
		MatButtonModule,
		MatToolbarModule,
		MatSidenavModule,
		MatListModule,
		MatIconModule,
		MatMenuModule,
		MatFormFieldModule,
		MatInputModule,
		MatCheckboxModule,
		MatTabsModule,
		MatDatepickerModule,
		MatNativeDateModule,
		MatCardModule,
		MatBadgeModule,
		MatChipsModule,
		MatAutocompleteModule,
		MatSlideToggleModule,
		MatRippleModule,
		MatSelectModule
	],
	exports: [
		MatButtonModule,
		MatToolbarModule,
		MatSidenavModule,
		MatListModule,
		MatIconModule,
		MatMenuModule,
		MatFormFieldModule,
		MatInputModule,
		MatCheckboxModule,
		MatTabsModule,
		MatDatepickerModule,
		MatCardModule,
		MatBadgeModule,
		MatChipsModule,
		MatAutocompleteModule,
		MatSlideToggleModule,
		MatRippleModule,
		MatSelectModule
	],
	providers: [
		MatDatepickerModule,
		{ provide: MAT_DATE_LOCALE, useValue: 'es-ES' }
	]
})
export class MaterialModule { }
