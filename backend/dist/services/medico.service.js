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
exports.MedicoService = void 0;
class MedicoService {
    constructor(dbConnection) {
        this.db = dbConnection;
    }
    consultaMedicos() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
        select IdMedico, NomMedico 
        from tbl_medico 
        where Activo = 1
        `;
            try {
                const result = yield this.db.request().query(query);
                return result.recordset;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.MedicoService = MedicoService;
