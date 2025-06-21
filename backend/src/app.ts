import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { setAgendaRoutes, setMedicosRoutes } from './routes/agenda.routes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:4200'
}));

setAgendaRoutes(app);
setMedicosRoutes(app);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});