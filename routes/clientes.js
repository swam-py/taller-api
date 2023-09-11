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

router.get("/buscar/id/:id", obtenerClientePorId);

router.get("/buscar/nombre/:nombre", );

router.post("/", agregarCliente);

router.put("/:id", actualizarCliente);

router.delete("/:id", eliminarCliente);

module.exports = router;
