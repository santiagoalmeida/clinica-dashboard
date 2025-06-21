import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-top-nav',
  imports: [],
  templateUrl: './top-nav.html',
  styleUrl: './top-nav.css'
})
export class TopNav implements OnInit {
  fechaActual: string = '';
  tituloPagina: string = 'Fundación Oftalmológica del Valle';

  @Output() toggleSidebar = new EventEmitter<void>();

  constructor(private router: Router) {}

  ngOnInit() {
    this.actualizarFecha();
    setInterval(() => this.actualizarFecha(), 60000); // Actualiza cada minuto
    this.setTituloPorRuta(this.router.url);
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.setTituloPorRuta(event.urlAfterRedirects);
      }
    });
  }

  setTituloPorRuta(url: string) {
    if (url.startsWith('/citas')) {
      this.tituloPagina = 'Consulta de agenda de citas';
    } else if (url === '/' || url.startsWith('/inicio')) {
      this.tituloPagina = 'Dashboard';
    } else {
      this.tituloPagina = 'Fundación Oftalmológica del Valle';
    }
  }

  actualizarFecha() {
    const ahora = new Date();
    const opciones: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    const hora = ahora.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: false });
    const fecha = ahora.toLocaleDateString('es-ES', opciones);
    this.fechaActual = `${fecha} ${hora}`;
  }

  onToggleSidebar() {
    this.toggleSidebar.emit();
  }
}