

const Moto = require("../models/Moto");

const obtenerMotos = async(_, res) => {
    try {
        const motos = await Moto.find({}).populate("cliente", "nombres apellidos")

        if (motos.length === 0) {
            return res.status(404).json({
                ok: false,
                msg: "No existen motos en la BD."
            })
        }

        return res.json({
            ok: true,
            msg: "Motos obtenidas con exito!",
            motos: motos
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Contacta con el admin."
        })
    }
}

const obtenerMoto = async(req, res) => {
    try {
        const id = req.params.id
        const moto = await Moto.findById(id).populate("cliente", "nombres apellidos")

        if (!moto) {
            return res.status(404).json({
                ok: false,
                msg: "No existe moto con ese Id."
            })
        }

        return res.json({
            ok: true,
            msg: "Moto obtenida con exito!",
            moto: moto
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: "Contacta con el admin."
        })
    }
}

const obtenerMotosPorCliente = async(req, res) => {
    try {
        const cliente = req.params.cliente;
        const motos = await Moto.find({cliente: cliente}).populate("cliente", "nombres apellidos")

        if (motos.length === 0) {
            return res.status(404).json({
                ok: false,
                msg: "Este cliente no tiene motos en la BD."
            })
        }

        return res.json({
            ok: true,
            msg: "Motos obtenidas con exito!",
            motos: motos
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: "Contacta con el admin."
        })
    }
}

const agregarMoto = async(req, res) => {
    try {
        const moto = req.body;
        const nuevaMoto = new Moto(moto);
        await nuevaMoto.save();

        return res.json({
            ok: true,
            msg: "Moto agregada con exito!"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: "Contacta con el admin."
        })
    }
}

const actualizarMoto = async(req, res) => {
    try {
        const motoId = req.params.id;
        const moto = await Moto.findById(motoId)

        if (!moto) {
            return res.status(404).json({
                ok: false,
                msg: "No existe moto con ese id."
            })
        }

        await Moto.findByIdAndUpdate(motoId, req.body)

        return res.json({
            ok: true,
            msg: "Moto actualizada."
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Contacta con el admin."
        })
    }
}

const eliminarMoto = async(req, res) => {
    try {
        const motoId = req.params.id;
        const moto = Moto.findById(motoId);

        if (!moto) {
            return res.status(404).json({
                ok: false,
                msg: "No existe moto con ese id."
            })
        }

        await Moto.findByIdAndDelete(motoId);

        return res.json({
            ok: true,
            msg: "Moto eliminada."
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
    obtenerMotos,
    obtenerMoto,
    obtenerMotosPorCliente,
    agregarMoto,
    actualizarMoto,
    eliminarMoto
}