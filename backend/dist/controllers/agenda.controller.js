"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgendaController = void 0;
const agenda_service_1 = require("../services/agenda.service");
class AgendaController {
    constructor(dbConnection) {
        this.agendaService = new agenda_service_1.AgendaService(dbConnection);
    }
    getAgendas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idMedico, fechaDesde, fechaHasta, page = 1, limit = 10 } = req.query;
                if (!fechaDesde || !fechaHasta) {
                    return res.status(400).json({
                        message: 'Los parámetros fechaDesde y fechaHasta son obligatorios.'
                    });
                }
                const { data, total } = yield this.agendaService.fetchAgendas({
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
            }
            catch (error) {
                res.status(500).json({
                    message: 'Error fetching agendas',
                    error: error.message || error
                });
            }
        });
    }
}
exports.AgendaController = AgendaController;
