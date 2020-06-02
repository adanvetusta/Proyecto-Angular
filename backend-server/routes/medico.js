var express = require('express');

var mdAutenticacion = require('../middelwares/autenticacion');

var app = express();

var Medico = require('../models/medico');

/**
 * Obtener todos los medicoes
 */
app.get('/', (req, res, next) => {

    var desde = req.query.desde || 0;
    desde = Number(desde);

    Medico.find({})
        .skip(desde)
        .limit(5)
        .populate('usuario', 'nombre email')
        .populate('hospital')
        .exec(
            (err, medicos) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando medicos',
                        errors: err
                    });
                }
                Medico.count({}, (err, count) => {
                    res.status(200).json({
                        ok: true,
                        medicos: medicos,
                        total: count
                    });
                });
            });
});


/**
 * Crear un nuevo medico
 */
app.post('/', mdAutenticacion.verificaToken, (req, res) => {
    var body = req.body;
    var medico = new Medico({
        nombre: body.nombre,
        usuario: req.usuario,
        hospital: body.hospital
    });

    medico.save((err, medicoGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear medico',
                errors: err
            });
        }
        res.status(201).json({
            ok: true,
            medico: medicoGuardado
        });
    });
});


/**
 * Actualizar medico
 */
app.put('/:id', mdAutenticacion.verificaToken, (req, res) => {
    // Obtenemos el id
    var id = req.params.id;
    var body = req.body;

    // Callback: err y el resultado obtenido
    Medico.findById(id, (err, medico) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar medico',
                errors: err
            });
        }
        if (!medico) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El medico con el id ' + id + ' no existe',
                errors: { message: 'No existe un medico con ese ID' }
            });
        }

        // Obtenemos datos del medico
        medico.nombre = body.nombre
        medico.usuario = req.usuario._id;
        medico.hospital = body.hospital;

        medico.save((err, medicoGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al modificar medico',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                medico: medicoGuardado
            });
        });
    });
});


/**
 * Borrar un medico por el id
 */
app.delete('/:id', mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;

    Medico.findByIdAndRemove(id, (err, medicoBorrado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar medico',
                errors: err
            });
        }
        if (!medicoBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un medico con ese ID',
                errors: { message: 'No existe un medico con ese ID' }
            });
        }
        res.status(200).json({
            ok: true,
            medico: medicoBorrado
        });
    })
});


/**
 * Obtener médico
 * @type {app}
 */
app.get('/:id', (req, res) => {
    var id = req.params.id;
    Medico.findById(id)
        .populate('usuario', 'nombre email img')
        .populate('hospital')
        .exec((err, medico)=> {
            if(err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al buscar médico',
                    errors: err
                });
            }
            if(!medico) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'El médico con id ' + id + ' no existe',
                    erros: { message: 'No existe un médico con ese ID'}
                });
            }

            return res.status(200).json({
                ok: true,
                medico: medico
            })
        })
});


module.exports = app;
