import { Routes } from '@angular/router';
import { CitasDashboard } from './citas-dashboard/citas-dashboard';
import { Inicio } from './inicio/inicio';

export const routes: Routes = [
  { path: '', component: Inicio },
  { path: 'citas', component: CitasDashboard }
];
