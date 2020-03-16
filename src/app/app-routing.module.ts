import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'tareas',
    canActivate: [AuthGuard],
    loadChildren: () => import('./components/tasks/tasks.module').then(m => m.TasksModule)
  },
  {
    path: 'cultura',
    canActivate: [AuthGuard],
    loadChildren: () => import('./components/culture/culture.module').then(m => m.CultureModule)
  },
  {
    path: 'cuerpo',
    canActivate: [AuthGuard],
    loadChildren: () => import('./components/body/body.module').then(m => m.BodyModule)
  },
  {
    path: 'jardin-de-la-alegria',
    canActivate: [AuthGuard],
    loadChildren: () => import('./components/joy-garden/joy-garden.module').then(m => m.JoyGardenModule)
  },
  {
    path: 'mantenimiento',
    canActivate: [AuthGuard],
    loadChildren: () => import('./components/maintenance/maintenance.module').then(m => m.MaintenanceModule)
  },
  {
    path: 'aprovisionamiento',
    canActivate: [AuthGuard],
    loadChildren: () => import('./components/provisioning/provisioning.module').then(m => m.ProvisioningModule)
  },
  {
    path: 'ensayos',
    canActivate: [AuthGuard],
    loadChildren: () => import('./components/rehearsal/rehearsal.module').then(m => m.RehearsalModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
