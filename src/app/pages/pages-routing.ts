import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { ProductosComponent } from './productos/productos.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { AuthGuard } from '../guards/auth.guard';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { AdminGuard } from '../guards/admin.guard';

const routes: Routes = [
  {
    path: 'dashboard', component: PagesComponent, canActivate: [AuthGuard],
    children: [
      { path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil de Usuario' } },
      { path: '', component: DashboardComponent, data: { titulo: 'Dashboard' } },
      { path: 'buscar/:termino', component: BusquedaComponent, data: { titulo: 'Busquedas' } },
      { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress' } },
      { path: 'grafica1', component: Grafica1Component, data: { titulo: 'Grafica1' } },
      { path: 'productos', component: ProductosComponent, data: { titulo: 'Productos' } },
      { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' } },
      { path: 'rxjs', component: RxjsComponent, data: { titulo: 'Rxjs' } },

      // Mantenimientos
      { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Mantenimientos de hospitales' } },
      { path: 'medicos', component: MedicosComponent, data: { titulo: 'Mantenimiento de medicos' } },
      { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Mantenimiento de medico' } },
      // Rutas de admin
      { path: 'usuarios', canActivate: [AdminGuard], component: UsuariosComponent, data: { titulo: 'Mantenimiento de usuarios' } },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
