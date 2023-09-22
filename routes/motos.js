const { Router } = require("express");
const { obtenerMotos, obtenerMoto, obtenerMotosPorCliente, agregarMoto, actualizarMoto, eliminarMoto } = require("../controllers/motos");

const router = Router();

router.get("/", obtenerMotos);

router.get("/:id", obtenerMoto);

router.get("/motos/:cliente", obtenerMotosPorCliente);

router.post("/", agregarMoto);

router.put("/:id", actualizarMoto);

router.delete("/:id", eliminarMoto);

module.exports = router;