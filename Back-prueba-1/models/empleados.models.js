import mongoose from "mongoose";

const {Schema} = mongoose;

const empleadoSchema = new Schema({

    nombre: {type: String, required: true},
    apellido: {type: String, required: true},
    apellido2: {type: String, required: false},
    codigoEmpleado: {type: Number, required: true, unique: true},
    codigoDepartamento: {type: Number, required: true}});

    export const empleadoModel = mongoose.model('Empleado', empleadoSchema);