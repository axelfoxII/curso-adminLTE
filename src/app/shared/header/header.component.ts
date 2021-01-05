import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  buscar(termino: string) {
    if (termino.length === 0) {
      // this.router.navigateByUrl('/dashboard')
      return;
    }
    this.router.navigateByUrl(`/dashboard/buscar/${termino}`);

  }
  // tslint:disable-next-line: typedef
  logout() {
    this.usuarioService.logout();
  }

}
