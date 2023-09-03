const mongoose = require("mongoose");

const connection = async () => {
    const bbddName = "recipes_proyect";
    try {
        await mongoose.connect(`mongodb://127.0.0.1:27017/recipes_proyect`);
        console.log(`Conexión a ${bbddName} realizada.`);
    } catch (error) {
        console.log(error);
        throw new Error("Fallo al conectar a la bbdd");
    }
}

module.exports = connection;
