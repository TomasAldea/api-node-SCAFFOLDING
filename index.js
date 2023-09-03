const connection = require("./database/connection");
const express = require('express')
const cors = require('cors')

console.log("Api node started");

// Conexion bbdd
connection();

// Crear servidor node
const app = express();
const port = 3000;

// configurar cors
app.use(cors());

// Convertir datos de cada peticion a objetos js
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// cargar rutas
const userRouter = require("./routes/userRoute");
const recipeRouter = require("./routes/recipeRoute");

app.use("/api-user", userRouter)
app.use("/api-recipe", recipeRouter)

// poner servidor a escuchar peticiones http
app.listen(port, () => console.log(`Example app listening on port ${port}!`))