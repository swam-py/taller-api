const mongoose = require("mongoose");

const conexion = async() => {
    try {
        await mongoose.connect(process.env.MONGOURI);
        console.log("Conectado con exito a la BD");
    } catch (error) {
        console.log(error)
        throw new Error("Fallo al conectarse a la BD");
    }
}

module.exports = conexion;