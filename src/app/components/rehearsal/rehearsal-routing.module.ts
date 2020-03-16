import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RehearsalComponent } from './rehearsal.component';
import { RehearsalCreateComponent } from './rehearsal-create/rehearsal-create.component';
import { RehearsalUpdateComponent } from './rehearsal-update/rehearsal-update.component';


const routes: Routes = [
   { path: '', component: RehearsalComponent },
   { path: 'ensayo/crear', component: RehearsalCreateComponent },
   { path: 'ensayo/editar/:_id', component: RehearsalUpdateComponent }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class RehearsalRoutingModule { }