const Cliente = require("../models/Cliente");

const obtenerClientes = async (_, res) => {
  try {
    const clientes = await Cliente.find({});

    if (clientes.length === 0) {
      return res.status(404).json({
        ok: false,
        msg: "No hay clientes en la BD.",
      });
    }

    return res.json({
      ok: true,
      msg: "Clientes obtenidos con exito!",
      clientes: clientes,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Contacta con el admin.",
    });
  }
};

const obtenerClientePorId = async (req, res) => {
  try {
    const id = req.params.id;
    const cliente = await Cliente.findById({ _id: id });

    if (!cliente) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un cliente con ese Id.",
      });
    }

    return res.json({
      ok: true,
      msg: "Cliente obtenido con exito!",
      cliente: cliente,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Contacta con el admin.",
    });
  }
};

const obtenerClientePorNombre = async (req, res) => {
  try {
    const nombreCliente = req.params.nombre;
    const cliente = await Cliente.find({
      nombres: { $regex: nombreCliente, $options: "i" },
    });

    if (!cliente) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un cliente con ese nombre",
      });
    }

    return res.json({
      ok: true,
      msg: "Cliente obtenido con exito!",
      cliente: cliente,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Contacta con el admin.",
    });
  }
};

const agregarCliente = async (req, res) => {
  try {
    const cliente = new Cliente(req.body);

    await cliente.save();

    return res.json({
      ok: true,
      msg: "Cliente agregado con exito!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Contacta con el admin.",
    });
  }
};

const actualizarCliente = async (req, res) => {
  try {
    const clienteId = req.params.id;
    const cliente = await Cliente.findById(clienteId);

    if (!cliente) {
      return res.status(404).json({
        ok: false,
        msg: "No existe cliente con ese id.",
      });
    }

    await Cliente.findByIdAndUpdate(clienteId, req.body);

    return res.json({
      ok: true,
      msg: "Cliente actualizado.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Contacta con el admin.",
    });
  }
};

const eliminarCliente = async (req, res) => {
  try {
    const clienteId = req.params.id;
    const cliente = Cliente.findById(clienteId);

    if (!cliente) {
      return res.status(404).json({
        ok: false,
        msg: "No existe cliente con ese id.",
      });
    }

    await Cliente.findByIdAndDelete(clienteId);

    return res.json({
      ok: true,
      msg: "Cliente eliminado.",
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
  obtenerClientes,
  obtenerClientePorId,
  obtenerClientePorNombre,
  agregarCliente,
  actualizarCliente,
  eliminarCliente,
};
