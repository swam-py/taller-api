

const { Router } = require("express");
const { obtenerServicios, obtenerServiciosPorMoto, obtenerServicio, agregarServicio, agregarServicioCompleto, agregarServicioCliente, agregarServicioClienteMoto, actualizarServicio, eliminarServicio } = require("../controllers/servicios");
const { validarCampos } = require("../middlewares/validarCampos");
const { param, check } = require("express-validator");

const router = Router();

router.get("/", obtenerServicios);

router.get("/moto/:moto", [
    param("moto", "El moto no es valido").notEmpty(),
    validarCampos
], obtenerServiciosPorMoto);

router.get("/:id", [
    param("id", "El id no es valido").notEmpty(),
    validarCampos
], obtenerServicio);

router.post("/", agregarServicio);

router.post("/completo", [
    check("nombres", "El campo no puede ir vacio").notEmpty(),
    check("apellidos", "El campo no puede ir vacio").notEmpty(),
    check("direccion", "El campo no puede ir vacio").notEmpty(),
    check("email", "El campo no puede ir vacio").notEmpty(),
    check("telefono", "El campo no puede ir vacio").notEmpty(),
    check("whatsapp", "El campo no puede ir vacio").notEmpty(),
    check("marca", "El campo no puede ir vacio").notEmpty(),
    check("modelo", "El campo no puede ir vacio").notEmpty(),
    check("cilindrada", "El campo no puede ir vacio").notEmpty(),
    check("placa", "El campo no puede ir vacio").notEmpty(),
    check("color", "El campo no puede ir vacio").notEmpty(),
    check("tipo", "El campo no puede ir vacio").notEmpty(),
    check("fecha", "El campo no puede ir vacio").notEmpty(),
    check("concepto", "El campo no puede ir vacio").notEmpty(),
    check("presupuesto", "El campo no puede ir vacio").notEmpty(),
    check("anticipo", "El campo no puede ir vacio").notEmpty(),
    check("kilometraje", "El campo no puede ir vacio").notEmpty(),
    check("combustible", "El campo no puede ir vacio").notEmpty(),
    check("observaciones", "El campo no puede ir vacio").notEmpty(),
    check("proximo", "El campo no puede ir vacio").notEmpty(),
    validarCampos
], agregarServicioCompleto);

router.post("/cliente", [
    check("marca", "El campo no puede ir vacio").notEmpty(),
    check("modelo", "El campo no puede ir vacio").notEmpty(),
    check("cilindrada", "El campo no puede ir vacio").notEmpty(),
    check("placa", "El campo no puede ir vacio").notEmpty(),
    check("color", "El campo no puede ir vacio").notEmpty(),
    check("tipo", "El campo no puede ir vacio").notEmpty(),
    check("cliente", "El campo no puede ir vacio").notEmpty(),
    check("fecha", "El campo no puede ir vacio").notEmpty(),
    check("concepto", "El campo no puede ir vacio").notEmpty(),
    check("presupuesto", "El campo no puede ir vacio").notEmpty(),
    check("anticipo", "El campo no puede ir vacio").notEmpty(),
    check("kilometraje", "El campo no puede ir vacio").notEmpty(),
    check("combustible", "El campo no puede ir vacio").notEmpty(),
    check("observaciones", "El campo no puede ir vacio").notEmpty(),
    check("proximo", "El campo no puede ir vacio").notEmpty(),
    validarCampos
], agregarServicioCliente);

router.post("/clientemoto", [
    check("fecha", "El campo no puede ir vacio").notEmpty(),
    check("concepto", "El campo no puede ir vacio").notEmpty(),
    check("presupuesto", "El campo no puede ir vacio").notEmpty(),
    check("anticipo", "El campo no puede ir vacio").notEmpty(),
    check("kilometraje", "El campo no puede ir vacio").notEmpty(),
    check("combustible", "El campo no puede ir vacio").notEmpty(),
    check("observaciones", "El campo no puede ir vacio").notEmpty(),
    check("proximo", "El campo no puede ir vacio").notEmpty(),
    check("moto", "El campo no puede ir vacio").notEmpty(),
    validarCampos
], agregarServicioClienteMoto);

router.put("/:id", [
    param("id", "El id no es valido").notEmpty(),
    validarCampos
], actualizarServicio);

router.delete("/:id", [
    param("id", "El id no es valido").notEmpty(),
    validarCampos
], eliminarServicio);

module.exports = router;
