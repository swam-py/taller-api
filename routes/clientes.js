const { Router } = require("express");
const {
  obtenerClientes,
  obtenerClientePorId,
  agregarCliente,
  actualizarCliente,
  eliminarCliente,
} = require("../controllers/clientes");

const router = Router();

router.get("/", obtenerClientes);

router.get("/buscar/:id", obtenerClientePorId);

router.post("/", agregarCliente);

router.put("/:id", actualizarCliente);

router.delete("/:id", eliminarCliente);

module.exports = router;
