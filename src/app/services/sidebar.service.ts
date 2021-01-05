import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu = [];

  cargarMenu() {
    this.menu = JSON.parse(localStorage.getItem('menu')) || [];

  }

  // menu: any[] = [
  //   {
  //     titulo: 'Dashboard',
  //     icon: 'nav-icon fas fa-tachometer-alt',
  //     submenu: [
  //       { titulo: 'Main', url: '/' },
  //       { titulo: 'ProgressBar', url: 'progress' },
  //       { titulo: 'Productos', url: 'productos' },
  //       { titulo: 'Promesas', url: 'promesas' },
  //       { titulo: 'Grafica1', url: 'grafica1' },
  //       { titulo: 'Rxjs', url: 'rxjs' },
  //     ]
  //   },
  //   {
  //     titulo: 'Mantenimiento',
  //     icon: 'nav-icon fas fa-cogs',
  //     submenu: [
  //       { titulo: 'Usuarios', url: 'usuarios' },
  //       { titulo: 'Hospitales', url: 'hospitales' },
  //       { titulo: 'Medicos', url: 'medicos' },
  //     ]
  //   }
  // ];

}
