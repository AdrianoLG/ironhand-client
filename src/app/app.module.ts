import { BrowserModule, HammerModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material/material.module';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './guards/auth-guard.service';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { Globals } from './services/globals';
import 'hammerjs';
import { GestureConfig } from '@angular/material';
import { RegisterComponent } from './components/register/register.component';
import { DatePipeModule } from './filters/date-pipe.module';
import { InlineSVGModule } from 'ng-inline-svg';
import { BodyComponent } from './components/home/body/body.component';
import { HouseComponent } from './components/home/house/house.component';
import { AlertsComponent } from './components/home/alerts/alerts.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    BodyComponent,
    HouseComponent,
    AlertsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HammerModule,
    DatePipeModule,
    InlineSVGModule
  ],
  providers: [
    AuthGuard,
    Globals,
    { provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
