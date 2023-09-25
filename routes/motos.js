const { Router } = require("express");
const { obtenerMotos, obtenerMoto, obtenerMotosPorCliente, agregarMoto, actualizarMoto, eliminarMoto } = require("../controllers/motos");
const { validarCampos } = require("../middlewares/validarCampos");
const { param, check } = require("express-validator");

const router = Router();

router.get("/", obtenerMotos);

router.get("/:id", [
    param("id", "El id no es valido"),
    validarCampos
], obtenerMoto);

router.get("/motos/:cliente", [
    param("cliente", "El cliente no es valido"),
    validarCampos
], obtenerMotosPorCliente);

router.post("/", [
    check("marca", "El campo no puede ir vacio").notEmpty(),
    check("modelo", "El campo no puede ir vacio").notEmpty(),
    check("cilindrada", "El campo no puede ir vacio").notEmpty(),
    check("placa", "El campo no puede ir vacio").notEmpty(),
    check("color", "El campo no puede ir vacio").notEmpty(),
    check("tipo", "El campo no puede ir vacio").notEmpty(),
    check("cliente", "El campo no puede ir vacio").isMongoId(),
    validarCampos
], agregarMoto);

router.put("/:id", [
    param("id", "El id no es valido"),
    validarCampos
], actualizarMoto);

router.delete("/:id", [
    param("id", "El id no es valido"),
    validarCampos
], eliminarMoto);

module.exports = router;