import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AgendaBackendResponse } from '../models';

@Injectable({
  providedIn: 'root'
})
export class Agendas {
  constructor(private http: HttpClient) { }

  getAgendas(params: { fechaDesde: string; fechaHasta: string; idMedico: number; page?: number; limit?: number }): Observable<AgendaBackendResponse> {
    let httpParams = new HttpParams()
      .set('fechaDesde', params.fechaDesde)
      .set('fechaHasta', params.fechaHasta)
      .set('idMedico', params.idMedico.toString());
    if (params.page) httpParams = httpParams.set('page', params.page.toString());
    if (params.limit) httpParams = httpParams.set('limit', params.limit.toString());
    return this.http.get<AgendaBackendResponse>(`${environment.apiUrl}/api/agendas`, { params: httpParams });
  }
}
