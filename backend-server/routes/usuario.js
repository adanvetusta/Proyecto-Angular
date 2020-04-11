var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var SEED = require('../config/config').SEED;

var app = express();

var Usuario = require('../models/usuario');

/**
 * Obtener todos los usuarios
 */
app.get('/', (req, res, next) => {
    Usuario.find({}, 'nombre email img role').exec(
        (err, usuarios) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error cargando usuarios',
                    errors: err
                });
            }
            res.status(200).json({
                ok: true,
                usuarios
            });
        });
});


/**
 * Verificar token.
 * Todo lo de abajo depende de este middelware
 */
app.use('/', (req, res, next) => {
    var token = req.query.token;
    jwt.verify(token, SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                mensaje: 'Token incorrecto',
                errors: err
            });
        }
        next();
    });
});


/**
 * Crear un nuevo usuario
 */
app.post('/', (req, res) => {
    var body = req.body;

    var usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        img: body.img,
        role: body.role
    });

    usuario.save((err, usuarioGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear usuarios',
                errors: err
            });
        }
        res.status(201).json({
            ok: true,
            body: usuarioGuardado
        });
    });
});


/**
 * Actualizar usuario (Valdría un patch)
 */
app.put('/:id', (req, res) => {
    // Obtenemos el id
    var id = req.params.id;
    var body = req.body;

    // Callback: err y el resultado obtenido
    Usuario.findById(id, (err, usuario) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errors: err
            });
        }
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El usuario con el id ' + id + ' no existe',
                errors: { message: 'No existe un usuario con ese ID' }
            });
        }

        // Obtenemos datos del usuario
        usuario.nombre = body.nombre
        usuario.email = body.email
        usuario.role = body.role

        usuario.save((err, usuarioGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al modificar usuario',
                    errors: err
                });
            }
            // No mandamos password encriptada
            usuarioGuardado.password = ':)';

            res.status(200).json({
                ok: true,
                usuario: usuarioGuardado
            });
        });
    });
});


/**
 * Borrar un usuario por el id
 */
app.delete('/:id', (req, res) => {
    var id = req.params.id;

    Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar usuario',
                errors: err
            });
        }
        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un usuario con ese ID',
                errors: { message: 'No existe un usuario con ese ID' }
            });
        }
        res.status(200).json({
            ok: true,
            usuario: usuarioBorrado
        });
    })
});

module.exports = app;