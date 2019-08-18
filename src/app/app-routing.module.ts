import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth-guard.service';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [ AuthGuard ] },
  { path: 'login', component: LoginComponent },
  { path: 'tareas', canActivate: [ AuthGuard ], loadChildren: () => import('./components/todos/todos.module').then(m => m.TodosModule) },
  { path: 'cuerpo', canActivate: [ AuthGuard ], loadChildren: () => import('./components/body/body.module').then(m => m.BodyModule) }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
