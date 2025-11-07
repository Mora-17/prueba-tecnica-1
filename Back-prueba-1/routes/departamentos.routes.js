import express from "express";
import { postDepartamento, getDepartamentos, putDepartamentoById, deleteDepartamentoById } from "../controllers/departamentos.controller.js";

const departamentosRouter = express.Router();

departamentosRouter.post("/", postDepartamento);
departamentosRouter.get("/", getDepartamentos);
departamentosRouter.put("/:id", putDepartamentoById);
departamentosRouter.delete("/:id", deleteDepartamentoById);

export default departamentosRouter;