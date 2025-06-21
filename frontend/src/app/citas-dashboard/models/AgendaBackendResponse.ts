import { Cita } from "./Cita";

export interface AgendaBackendResponse {
  data: Cita[];
  total: number;
  page: number;
  limit: number;
}
