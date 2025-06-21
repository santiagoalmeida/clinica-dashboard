import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Medico } from '../models';

@Injectable({
  providedIn: 'root'
})
export class Medicos {
  constructor(private http: HttpClient) { }

  getMedicos(): Observable<Medico[]> {
    return this.http.get<Medico[]>(`${environment.apiUrl}/api/medicos`);
  }
}
