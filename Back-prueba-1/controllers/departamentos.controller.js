import { departamentosModel } from "../models/departamentos.model.js"; 

// Crear departamento
export const postDepartamento = async (req, res) => {
    try { 
        await departamentosModel.create(req.body); 
        return res.status(201).json({"mensaje": "Departamento creado exitosamente"});
    } catch (error) {
        return res.status(500).json({"mensaje": error.message});
    }
};

// Obtener departamentos
export const getDepartamentos = async (req, res) => {
    try {
        const AllDepartamentos = await departamentosModel.find();
        return res.status(200).json(AllDepartamentos);
    } catch (error) {
        return res.status(500).json({"mensaje": error.message});
    }
};

// Actualizar departamento
export const putDepartamentoById = async (req, res) => {  
    try {
        const idDepartamento = req.params.id;
        const dataForUpdate = req.body;
        await departamentosModel.findByIdAndUpdate(idDepartamento, dataForUpdate);
        return res.status(200).json({"mensaje": "Departamento actualizado exitosamente"});
    } catch (error) {
        return res.status(500).json({"mensaje": error.message});
    }
};

// Eliminar departamento
export const deleteDepartamentoById = async (req, res) => {
    try {
        const idDepartamento = req.params.id; // Corregido: era idEmpleado
        await departamentosModel.findByIdAndDelete(idDepartamento); // Corregido: usar departamentosModel
        return res.status(200).json({"mensaje": "Departamento eliminado exitosamente"});
    } catch (error) {
        return res.status(500).json({"mensaje": error.message});
    }
};