import { empleadoModel } from "../models/empleados.models.js";

// Crear empleado
export const postEmpleado = async (req, res) => {
    try {
        await empleadoModel.create(req.body);
        return res.status(201).json({"mensaje": "Empleado creado exitosamente"});
    } catch (error) {
        return res.status(500).json({"mensaje": error.message});
    }
};

// Obtener empleados
export const getEmpleados = async (req, res) => {
    try {
        const Allempleados = await empleadoModel.find();
        return res.status(200).json(Allempleados);
    } catch (error) {
        return res.status(500).json({"mensaje": error.message});
    }
};

// Actualizar empleado
export const putEmpleadoById = async (req, res) => {
    try {
        const idEmpleado = req.params.id;
        const dataForUpdate = req.body;
        await empleadoModel.findByIdAndUpdate(idEmpleado, dataForUpdate);
        return res.status(200).json({"mensaje": "Empleado actualizado exitosamente"});
    } catch (error) {
        return res.status(500).json({"mensaje": error.message});
    }
};

// Eliminar empleado   
export const deleteEmpleadoById = async (req, res) => {
    try {
        const idEmpleado = req.params.id;   
        const empleado = await empleadoModel.findByIdAndDelete(idEmpleado);
        return res.status(200).json({"mensaje": "Empleado eliminado exitosamente"});
    } catch (error) {
        return res.status(500).json({"mensaje": error.message});
    }
};