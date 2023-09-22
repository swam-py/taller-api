const Cliente = require("../models/Cliente");
const Moto = require("../models/Moto");
const Servicio = require("../models/Servicio");

const obtenerServicios = async (_, res) => {
  try {
    const servicios = await Servicio.find({}).populate([
      {
        path: "moto",
        populate: [{ path: "marca modelo color cliente" }],
      },
    ]);

    if (servicios.length === 0) {
      return res.status(404).json({
        ok: false,
        msg: "No hay servicios en la base de datos",
      });
    }

    return res.json({
      ok: true,
      data: servicios,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Contacta con el admin.",
    });
  }
};

const obtenerServiciosPorMoto = async (req, res) => {
  try {
    const moto = req.params.moto;
    const servicios = await Servicio.find({ moto: moto });

    if (servicios.length === 0) {
      return res.status(404).json({
        ok: false,
        msg: "No hay servicios pertenecientes a esa moto",
      });
    }

    return res.json({
      ok: true,
      data: servicios,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error en el servidor, por favor contacta al administrador del sistema",
    });
  }
};

const obtenerServicio = async (req, res) => {
  try {
    const servicioId = req.params.id;
    const servicio = await Servicio.findById(servicioId).populate([
      {
        path: "moto",
        populate: [{ path: "marca modelo color cliente" }],
      },
    ]);

    if (!servicio) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un servicio con ese id",
      });
    }

    res.json({
      ok: true,
      data: servicio,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Contacta con el admin.",
    });
  }
};

const agregarServicioCompleto = async (req, res) => {
  try {
    const servicioCompleto = req.body;

    const cliente = {
      nombres: servicioCompleto.nombres,
      apellidos: servicioCompleto.apellidos,
      direccion: servicioCompleto.direccion,
      email: servicioCompleto.email,
      telefono: servicioCompleto.telefono,
      whatsapp: servicioCompleto.whatsapp,
    };

    const nuevoCliente = new Cliente(cliente);
    await nuevoCliente.save();

    const moto = {
      marca: servicioCompleto.marca,
      modelo: servicioCompleto.modelo,
      cilindrada: servicioCompleto.cilindrada,
      placa: servicioCompleto.placa,
      color: servicioCompleto.color,
      tipo: servicioCompleto.tipo,
      cliente: nuevoCliente._id,
    };

    const nuevaMoto = new Moto(moto);
    await nuevaMoto.save();

    const servicio = {
      fecha: servicioCompleto.fecha,
      concepto: servicioCompleto.concepto,
      presupuesto: servicioCompleto.presupuesto,
      anticipo: servicioCompleto.anticipo,
      kilometraje: servicioCompleto.kilometraje,
      combustible: servicioCompleto.combustible,
      observaciones: servicioCompleto.observaciones,
      proximo: servicioCompleto.proximo,
      moto: nuevaMoto._id,
    };

    const nuevoServicio = new Servicio(servicio);
    await nuevoServicio.save();

    return res.json({
      ok: true,
      msg: "El cliente, la moto y el servicio han sido registrados",
      servicio: nuevoServicio._id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Contacta con el admin.",
    });
  }
};

const agregarServicioCliente = async (req, res) => {
  try {
    const servicioCliente = req.body;

    const moto = {
      marca: servicioCliente.marca,
      modelo: servicioCliente.modelo,
      cilindrada: servicioCliente.cilindrada,
      placa: servicioCliente.placa,
      color: servicioCliente.color,
      tipo: servicioCliente.tipo,
      cliente: servicioCliente.cliente,
    };

    const nuevaMoto = new Moto(moto);
    await nuevaMoto.save();

    const servicio = {
      fecha: servicioCliente.fecha,
      concepto: servicioCliente.concepto,
      presupuesto: servicioCliente.presupuesto,
      anticipo: servicioCliente.anticipo,
      kilometraje: servicioCliente.kilometraje,
      combustible: servicioCliente.combustible,
      observaciones: servicioCliente.observaciones,
      proximo: servicioCliente.proximo,
      moto: nuevaMoto._id,
    };

    const nuevoServicio = new Servicio(servicio);
    await nuevoServicio.save();

    res.json({
      ok: true,
      msg: `La moto y el servicio han sido registrados`,
      servicio: nuevoServicio._id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Contacta con el admin.",
    });
  }
};

const agregarServicioClienteMoto = async (req, res) => {
  try {
    const servicioMoto = req.body;

    const servicio = {
      fecha: servicioMoto.fecha,
      concepto: servicioMoto.concepto,
      presupuesto: servicioMoto.presupuesto,
      anticipo: servicioMoto.anticipo,
      kilometraje: servicioMoto.kilometraje,
      combustible: servicioMoto.combustible,
      observaciones: servicioMoto.observaciones,
      proximo: servicioMoto.proximo,
      moto: servicioMoto.moto,
    };

    const nuevoServicio = new Servicio(servicio);
    await nuevoServicio.save();

    res.json({
      ok: true,
      msg: `El servicio ha sido registrado`,
      servicio: nuevoServicio._id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Contacta con el admin.",
    });
  }
};

const agregarServicio = async (req, res) => {
  try {
    const servicio = req.body;
    const nuevoServicio = new Servicio(servicio);
    await nuevoServicio.save();

    res.json({
      ok: true,
      msg: `El servicio ha sido registrado`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Contacta con el admin.",
    });
  }
};

const actualizarServicio = async (req, res) => {
  try {
    const servicioId = req.params.id;
    const servicio = await Servicio.findById(servicioId);

    if (!servicio) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un servicio con ese id",
      });
    }

    await Servicio.findByIdAndUpdate(servicioId, req.body);

    return res.json({
      ok: true,
      msg: "Servicio actualizado",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error en el servidor, por favor contacta al administrador del sistema",
    });
  }
};

const eliminarServicio = async (req, res) => {
  try {
    const servicioId = req.params.id;
    const servicio = await Servicio.findById(servicioId);

    if (!servicio) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un servicio con ese id",
      });
    }

    await Servicio.findByIdAndDelete(servicioId);

    return res.json({
      ok: true,
      msg: "Servicio eliminado",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Contacta con el admin.",
    });
  }
};

module.exports = {
  obtenerServicios,
  obtenerServiciosPorMoto,
  obtenerServicio,
  agregarServicioCompleto,
  agregarServicioCliente,
  agregarServicioClienteMoto,
  agregarServicio,
  actualizarServicio,
  eliminarServicio,
};
