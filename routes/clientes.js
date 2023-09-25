const { Router } = require("express");
const {
  obtenerClientes,
  obtenerClientePorId,
  agregarCliente,
  actualizarCliente,
  eliminarCliente,
  obtenerClientePorNombre,
} = require("../controllers/clientes");
const { check, param } = require("express-validator");
const { validarCampos } = require("../middlewares/validarCampos");

const router = Router();

router.get("/" , obtenerClientes);

router.get("/busqueda/id/:id", [
  param("id", "El id no es valido"),
  validarCampos
], obtenerClientePorId);

router.get("/busqueda/nombre/:nombre", [
  param("nombre", "El nombre no es valido"),
  validarCampos
], obtenerClientePorNombre);

router.post("/", [
  check("nombres", "Nombres no puede ir vacio").not().isEmpty(),
  check("apellidos", "Apellidos no puede ir vacio").notEmpty(),
  check("telefono", "No es un telefono valido").notEmpty().isLength({min: 10, max: 14}),
  check("email", "No es un email valido").isEmail(),
  check("whatsapp", "No es un whatsapp valido").notEmpty().isLength({min: 10, max: 14}),
  validarCampos
] , agregarCliente);

router.put("/:id", [
  param("id", "El id no es valido"),
  validarCampos
], actualizarCliente);

router.delete("/:id", [
  param("id", "El id no es valido"),
  validarCampos
], eliminarCliente);

module.exports = router;
