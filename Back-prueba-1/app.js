import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { mongooseConection } from "./config/db.js";
import departamentoRouter from "./routes/departamentos.routes.js";
import empleadoRouter from "./routes/empleados.routes.js";

const app = express();
dotenv.config();
const port = process.env.PORT;
mongooseConection();

app.use(express.json()); 

app.get("/", (req, res) => {
    res.send("Bienvenido a la API de Prueba-1");
});
app.use(cors());
app.use("/departamentos", departamentoRouter);
app.use("/empleados", empleadoRouter);

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});