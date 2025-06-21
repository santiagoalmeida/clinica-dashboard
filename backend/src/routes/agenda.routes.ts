import { Router } from 'express';
import { AgendaController } from '../controllers/agenda.controller';
import { dbConnection } from '../database/sqlserver';
import { Express } from 'express-serve-static-core';
import { MedicoController } from '../controllers/medico.controller';

export function setAgendaRoutes(app: Express) {
    const agendaRouter = Router();
    dbConnection.then((pool) => {
        const agendaController = new AgendaController(pool);
        agendaRouter.get('/', agendaController.getAgendas.bind(agendaController));
    });
    app.use('/api/agendas', agendaRouter);
}

export function setMedicosRoutes(app: Express) {
    const medicoRouter = Router();
    dbConnection.then((pool) => {
        const medicoController = new MedicoController(pool);
        medicoRouter.get('/', medicoController.getMedicos.bind(medicoController));
    });
    app.use('/api/medicos', medicoRouter);
}