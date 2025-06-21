export class MedicoService {
    private db: any;

    constructor(dbConnection: any) {
        this.db = dbConnection;
    }

    async consultaMedicos(): Promise<any[]> {
        const query = `
        select IdMedico, NomMedico 
        from tbl_medico 
        where Activo = 1
        `;
        try {
            const result = await this.db.request().query(query);
            return result.recordset;
        } catch (error) {
            throw error;
        }
    }
}