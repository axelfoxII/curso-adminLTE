import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesRoutingModule } from './pages/pages-routing';
import { NopageFoundComponent } from './nopage-found/nopage-found.component';
import { AuthRoutingModule } from './auth/auth-routing';



const routes: Routes = [
            {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
            {path: '**', component: NopageFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes),
                 PagesRoutingModule,
                 AuthRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
