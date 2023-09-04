require("dotenv").config();
const express = require("express");
const conexion = require("./database/config");
const app = express();

conexion();

app.use(express.json());

app.get("/", (_, res) => {
    res.send("Hola mundo desde servidor HTTP");
})

app.use("/api/clientes", require("./routes/clientes"))

app.listen(process.env.PORT ,() => {
    console.log(`app escuchando en: http://localhost:${process.env.PORT}`)
})