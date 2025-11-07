import express from "express";
import { postEmpleado, getEmpleados, putEmpleadoById, deleteEmpleadoById } from "../controllers/empleados.controller.js";

const empleadoRouter = express.Router();

empleadoRouter.post("/crear", postEmpleado);
empleadoRouter.get("/mostrar", getEmpleados);
empleadoRouter.put("/actualizar/:id", putEmpleadoById);
empleadoRouter.delete("/borrar/:id", deleteEmpleadoById);

export default empleadoRouter;