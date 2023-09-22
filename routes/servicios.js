

const { Router } = require("express");
const { obtenerServicios, obtenerServiciosPorMoto, obtenerServicio, agregarServicio, agregarServicioCompleto, agregarServicioCliente, agregarServicioClienteMoto, actualizarServicio, eliminarServicio } = require("../controllers/servicios");

const router = Router();

router.get("/", obtenerServicios);

router.get("/moto/:moto", obtenerServiciosPorMoto);

router.get("/:id", obtenerServicio);

router.post("/", agregarServicio);

router.post("/completo", agregarServicioCompleto);

router.post("/cliente", agregarServicioCliente);

router.post("/clientemoto", agregarServicioClienteMoto);

router.put("/:id", actualizarServicio);

router.delete("/:id", eliminarServicio);

module.exports = router;
