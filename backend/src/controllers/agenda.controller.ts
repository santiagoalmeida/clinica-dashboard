import { Request, Response } from 'express';
import { AgendaService } from '../services/agenda.service';

export class AgendaController {
    private agendaService: AgendaService;

    constructor(dbConnection: any) {
        this.agendaService = new AgendaService(dbConnection);
    }

    public async getAgendas(req: Request, res: Response) {
        try {
            const { idMedico, fechaDesde, fechaHasta, page = 1, limit = 10 } = req.query;

            if (!fechaDesde || !fechaHasta) {
                return res.status(400).json({
                    message: 'Los parámetros fechaDesde y fechaHasta son obligatorios.'
                });
            }

            const { data, total } = await this.agendaService.fetchAgendas({
                idMedico: idMedico ? Number(idMedico) : undefined,
                fechaDesde: String(fechaDesde),
                fechaHasta: String(fechaHasta),
                page: Number(page),
                limit: Number(limit)
            });
            res.status(200).json({
                data,
                total,
                page: Number(page),
                limit: Number(limit)
            });
        } catch (error: any) {
            res.status(500).json({
                message: 'Error fetching agendas',
                error: error.message || error
            });
        }
    }
}