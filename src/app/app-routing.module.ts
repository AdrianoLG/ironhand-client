import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    canActivate: [ AuthGuard ],
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'tareas',
    canActivate: [ AuthGuard ],
    loadChildren: () => import('./components/tasks/tasks.module').then(m => m.TasksModule)
  },
  {
    path: 'cultura',
    canActivate: [ AuthGuard ],
    loadChildren: () => import('./components/culture/culture.module').then(m => m.CultureModule)
  },
  {
    path: 'cuerpo',
    canActivate: [ AuthGuard ],
    loadChildren: () => import('./components/body/body.module').then(m => m.BodyModule)
  },
  {
    path: 'jardin-de-la-alegria',
    canActivate: [ AuthGuard ],
    loadChildren: () => import('./components/joy-garden/joy-garden.module').then(m => m.JoyGardenModule)
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
