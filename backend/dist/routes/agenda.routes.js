"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setMedicosRoutes = exports.setAgendaRoutes = void 0;
const express_1 = require("express");
const agenda_controller_1 = require("../controllers/agenda.controller");
const sqlserver_1 = require("../database/sqlserver");
const medico_controller_1 = require("../controllers/medico.controller");
function setAgendaRoutes(app) {
    const agendaRouter = (0, express_1.Router)();
    sqlserver_1.dbConnection.then((pool) => {
        const agendaController = new agenda_controller_1.AgendaController(pool);
        agendaRouter.get('/', agendaController.getAgendas.bind(agendaController));
    });
    app.use('/api/agendas', agendaRouter);
}
exports.setAgendaRoutes = setAgendaRoutes;
function setMedicosRoutes(app) {
    const medicoRouter = (0, express_1.Router)();
    sqlserver_1.dbConnection.then((pool) => {
        const medicoController = new medico_controller_1.MedicoController(pool);
        medicoRouter.get('/', medicoController.getMedicos.bind(medicoController));
    });
    app.use('/api/medicos', medicoRouter);
}
exports.setMedicosRoutes = setMedicosRoutes;
