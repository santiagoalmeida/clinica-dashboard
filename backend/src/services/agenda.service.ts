export class AgendaService {
    private db: any;

    constructor(dbConnection: any) {
        this.db = dbConnection;
    }

    async fetchAgendas({ idMedico, fechaDesde, fechaHasta, page, limit }: { idMedico?: number; fechaDesde: string; fechaHasta: string; page: number; limit: number; }): Promise<{ data: any[]; total: number }> {
        const offset = (page - 1) * limit;
        let baseWhere = `WHERE (a.Cancelada IS NULL OR a.Cancelada = 0)
            AND a.Fecha >= @fechaDesde
            AND a.Fecha <= @fechaHasta`;
        if (idMedico) {
            baseWhere += ` AND med.IdMedico = @idMedico`;
        }
        // Conversión explícita de fecha a varchar para evitar error de tipos
        const totalQuery = `
            SELECT COUNT(DISTINCT 
                CONVERT(varchar, a.Fecha, 23) + '-' + phm.Hora + '-' + CAST(med.IdMedico AS varchar)
            ) as total
            FROM tbl_agenda a
            JOIN tbl_param_horarios_medico phm ON a.IdParamHorarioMedico = phm.IdParamHorariosMedico
            JOIN tbl_motivo m ON a.CodMotivo = m.CodMotivo
            JOIN tbl_medico med ON phm.IdMedico = med.IdMedico
            ${baseWhere}
        `;
        // Consulta para obtener los datos paginados
        let dataQuery = `
            SELECT
                med.IdMedico, 
                med.NomMedico,
                a.Fecha,
                phm.Hora,
                SUM(CASE WHEN m.NomMotivo = 'NUEVA CONSULTA' THEN 1 ELSE 0 END) AS NuevaConsulta,
                SUM(CASE WHEN m.NomMotivo = 'PRIMERA CITA' THEN 1 ELSE 0 END) AS PrimeraCita,
                SUM(CASE WHEN m.NomMotivo = 'CONTROL' THEN 1 ELSE 0 END) AS Control,
                SUM(CASE WHEN m.NomMotivo = 'CONTROL GLAUCOMA' THEN 1 ELSE 0 END) AS ControlGlaucoma,
                SUM(CASE WHEN m.NomMotivo = 'CONTROL POST - YAG CAPSULOTOMÍA' THEN 1 ELSE 0 END) AS ControlPostYag,
                SUM(CASE WHEN m.NomMotivo = 'CONTROL POST-PTERIGION' THEN 1 ELSE 0 END) AS ControlPostPterigion,
                COUNT(*) AS [TotalAgendados],
                phm.NumPacientes AS [CapacidadSistema]
            FROM tbl_agenda a
            JOIN tbl_param_horarios_medico phm ON a.IdParamHorarioMedico = phm.IdParamHorariosMedico
            JOIN tbl_motivo m ON a.CodMotivo = m.CodMotivo
            JOIN tbl_medico med ON phm.IdMedico = med.IdMedico
            ${baseWhere}
            GROUP BY 
                a.Fecha,
                phm.Hora,
                phm.NumPacientes,
                med.NomMedico,
                med.IdMedico
            ORDER BY 
                a.Fecha,
                phm.Hora,
                med.NomMedico,
                med.IdMedico
            OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY;
        `;
        try {
            const request = this.db.request();
            request.input('fechaDesde', fechaDesde);
            request.input('fechaHasta', fechaHasta);
            request.input('offset', offset);
            request.input('limit', limit);
            if (idMedico) {
                request.input('idMedico', idMedico);
            }
            // Total
            const totalResult = await request.query(totalQuery);
            const total = totalResult.recordset[0]?.total || 0;
            // Datos paginados
            const dataResult = await request.query(dataQuery);
            return { data: dataResult.recordset, total };
        } catch (error) {
            if (error instanceof Error) {
                throw new Error('Error fetching agendas: ' + error.message);
            } else {
                throw new Error('Error fetching agendas: ' + String(error));
            }
        }
    }
}