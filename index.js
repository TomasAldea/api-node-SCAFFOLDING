const connection = require("./database/connection");
const express = require('express')
const cors = require('cors')

console.log("Api node started");

// Conexion bbdd
connection();

// Crear servidor node
const app = express();
const port = "hopeful-fermi.93-189-90-127.plesk.page";

// configurar cors
app.use(cors());

// Convertir datos de cada peticion a objetos js
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.get('/test', (req, res) => {
    const jsonData = {
      message: 'Esta es una respuesta JSON de ejemplo',
      date: new Date()
    };
  
    res.json(jsonData);
});

// cargar rutas
const userRouter = require("./routes/userRoute");
const recipeRouter = require("./routes/recipeRoute");

app.use("/api-user", userRouter)
app.use("/api-recipe", recipeRouter)

// poner servidor a escuchar peticiones http
app.listen(port, () => console.log(`Example app listening on port ${port}!`))