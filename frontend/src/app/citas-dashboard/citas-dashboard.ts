import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Cita, Medico } from './models';
import { Medicos } from './services/medicos';
import { Agendas } from './services/agendas';
import { AgendaBackendResponse } from './models';

@Component({
  selector: 'app-citas-dashboard',
  templateUrl: './citas-dashboard.html',
  styleUrl: './citas-dashboard.css',
  imports: [CommonModule, FormsModule],
  providers: [Medicos, Agendas]
})
export class CitasDashboard {
  medicos: Medico[] = [];
  filtroMedico: number | '' = '';
  fechaDesde: string = this.getFechaDesde();
  fechaHasta: string = this.getFechaHasta();

  // Paginación
  page: number = 1;
  limit = 25;
  total: number = 0;
  totalPages: number = 1;

  citasFiltradas: Cita[] = [];
  loading: boolean = false;

  constructor(private medicosService: Medicos, private agendasService: Agendas) {
    this.cargarMedicos();
    this.consultarCitas();
  }

  cargarMedicos() {
    this.medicosService.getMedicos().subscribe({
      next: (data) => {
        this.medicos = data
        console.log('Medicos cargados:', this.medicos);
      },
      error: () => this.medicos = []
    });
  }

  consultarCitas() {
    this.loading = true;
    const idMedico = this.filtroMedico ? Number(this.filtroMedico) : 0;
    this.agendasService.getAgendas({
      fechaDesde: this.fechaDesde,
      fechaHasta: this.fechaHasta,
      idMedico,
      page: this.page,
      limit: this.limit
    }).subscribe({
      next: (resp: AgendaBackendResponse) => {
        this.citasFiltradas = resp.data;
        this.total = resp.total;
        this.limit = resp.limit;
        this.page = resp.page;
        this.totalPages = Math.ceil(resp.total / resp.limit) || 1;
        this.loading = false;
      },
      error: () => {
        this.citasFiltradas = [];
        this.total = 0;
        this.totalPages = 1;
        this.loading = false;
      }
    });
  }

  filtrar() {
    this.page = 1;
    this.consultarCitas();
  }

  cambiarPagina(delta: number) {
    const nuevaPagina = this.page + delta;
    if (nuevaPagina >= 1 && nuevaPagina <= this.totalPages) {
      this.page = nuevaPagina;
      this.consultarCitas();
    }
  }

  irAPagina(p: number) {
    if (p >= 1 && p <= this.totalPages) {
      this.page = p;
      this.consultarCitas();
    }
  }

  cambiarTamanioPagina(nuevoTamanio: number) {
    this.limit = Number(nuevoTamanio) || 25;
    this.page = 1;
    this.consultarCitas();
  }

  // trackBy para optimizar el ngFor de citas
  trackCita(index: number, item: Cita) {
    return item.Fecha + '-' + item.Hora;
  }

  trackByIndex(index: number, item: any) {
    return index;
  }

  // Devuelve un array para el ngFor de paginación
  totalPagesArray() {
    return Array(this.totalPages).fill(0);
  }

  paginasVisibles(): number[] {
    const total = this.totalPages;
    const actual = this.page;
    const maxBotones = 10;
    let inicio = Math.max(1, actual - Math.floor(maxBotones / 2));
    let fin = inicio + maxBotones - 1;
    if (fin > total) {
      fin = total;
      inicio = Math.max(1, fin - maxBotones + 1);
    }
    const paginas = [];
    for (let i = inicio; i <= fin; i++) {
      paginas.push(i);
    }
    return paginas;
  }

  private convertirFecha(fecha: string): Date {
    // Convierte 'dd/mm/yyyy' o 'yyyy-mm-dd' a Date
    if (fecha.includes('/')) {
      const [dia, mes, anio] = fecha.split('/');
      return new Date(+anio, +mes - 1, +dia);
    }
    return new Date(fecha);
  }

  private getFechaDesde(): string {
    const mañana = new Date();
    mañana.setDate(mañana.getDate() + 1);
    return mañana.toISOString().slice(0, 10);
  }

  private getFechaHasta(): string {
    const unMesDespues = new Date();
    unMesDespues.setMonth(unMesDespues.getMonth() + 1);
    unMesDespues.setDate(unMesDespues.getDate() + 1);
    return unMesDespues.toISOString().slice(0, 10);
  }
}
