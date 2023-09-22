const { Router } = require("express");
const {
  obtenerClientes,
  obtenerClientePorId,
  agregarCliente,
  actualizarCliente,
  eliminarCliente,
  obtenerClientePorNombre,
} = require("../controllers/clientes");

const router = Router();

router.get("/", obtenerClientes);

router.get("/busqueda/id/:id", obtenerClientePorId);

router.get("/busqueda/nombre/:nombre", obtenerClientePorNombre);

router.post("/", agregarCliente);

router.put("/:id", actualizarCliente);

router.delete("/:id", eliminarCliente);

module.exports = router;
