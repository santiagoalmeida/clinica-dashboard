import { Request, Response } from 'express';
import { MedicoService } from '../services/medico.service';

export class MedicoController {
    private medicoService: MedicoService;

    constructor(dbConnection: any) {
        this.medicoService = new MedicoService(dbConnection);
    }

    public async getMedicos(_req: Request, res: Response) {
        try {
            const medicos = await this.medicoService.consultaMedicos();
            res.status(200).json(medicos);
        } catch (error: any) {
            res.status(500).json({
                message: 'Error fetching médicos',
                error: error.message || error
            });
        }
    }
}