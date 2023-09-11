


const Cliente = require("../models/Cliente");

const obtenerClientes = async(req, res) => {
    try {
        const clientes = await Cliente.find({});

        res.json({
            ok: true,
            msg: "Clientes obtenidos con exito!",
            clientes: clientes
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Contacta con el admin."
        })
    }
}

const obtenerClientePorId = async(req, res) => {
    const id = req.params.id;
    try{
        const result = await Cliente.findById({_id: id})
        res.json({
            ok: true,
            msg: result
        })
    }catch (error){
        return res.send({error: error.message})
    }   
}

const agregarCliente = async(req, res) => {
    try {
        const cliente = new Cliente(req.body);

        await cliente.save();

        res.json({
            ok: true,
            msg: "Cliente agregado con exito!"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Contacta con el admin."
        })
    }
}

const actualizarCliente = async(req, res) => {
    try {
        const clienteId = req.params.id;
        const cliente = await Cliente.findById(clienteId)

        if (!cliente) {
            return res.status(404).json({
                ok: false,
                msg: "No existe cliente con ese id."
            })
        }

        await Cliente.findByIdAndUpdate(clienteId, req.body)

        return res.json({
            ok: true,
            msg: "Cliente actualizado."
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Contacta con el admin."
        })
    }
}

const eliminarCliente = async(req, res) => {
    try {
        const clienteId = req.params.id;
        const cliente = Cliente.findById(clienteId);

        if (!cliente) {
            return res.status(404).json({
                ok: false,
                msg: "No existe cliente con ese id."
            })
        }

        await Cliente.findByIdAndDelete(clienteId);

        return res.json({
            ok: true,
            msg: "Cliente eliminado."
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Contacta con el admin."
        })
    }
}

module.exports = {
    obtenerClientes,
    obtenerClientePorId,
    agregarCliente,
    actualizarCliente,
    eliminarCliente
}