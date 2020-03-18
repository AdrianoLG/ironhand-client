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
  MAT_DATE_LOCALE,
  DateAdapter,
  MatSliderModule
} from '@angular/material';
import { StartOnMondayDateAdapter } from './date-adapter';

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
    MatSelectModule,
    MatSliderModule
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
    MatSelectModule,
    MatSliderModule
  ],
  providers: [
    MatDatepickerModule,
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    { provide: DateAdapter, useClass: StartOnMondayDateAdapter }
  ]
})
export class MaterialModule { }
