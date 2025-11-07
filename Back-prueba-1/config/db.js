import mongoose from 'mongoose';

export const mongooseConection = async () => {
    try {
        await mongoose.connect(process.env.DB_URL,{dbName: "prueba-1"});
        console.log("conexión exitosa, bienvenido a MongoDB");
    } catch (error) {
        console.error("error de conexión: ", error);
    }
}