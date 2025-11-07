import mongoose from "mongoose";

const {Schema} = mongoose;

const departamentosSchema = new Schema({

    nombreDepartamento: {type: String, required: true},
    codigoDepartamento: {type: Number, required: true, unique: true}});

    export const departamentosModel = mongoose.model('Departamentos', departamentosSchema);