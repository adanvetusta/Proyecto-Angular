var express = require('express');

var fileUpload = require('express-fileupload');
var fs = require('fs');
var app = express();

var Usuario = require('../models/usuario');
var Medico = require('../models/medico');
var Hospital = require('../models/hospital');

app.use(fileUpload());

app.put('/:tipo/:id', (req, res, next) => {
    var tipo = req.params.tipo;
    var id = req.params.id;

    // Tipos de colección
    var tiposValidos = ['hospitales', 'medicos', 'usuarios'];

    if (tiposValidos.indexOf(tipo) < 0) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Tipo de colección no válida',
            err: { message: 'Tipo de colección no válida' }
        });
    }

    if (!req.files) {
        return res.status(400).json({
            ok: false,
            mensaje: 'No subió nada',
            err: { message: 'No ha subido ninguna imagen' }
        });
    }

    // Obtener el nombre del archivo
    var archivo = req.files.imagen;
    var palabrasNombreArchivo = archivo.name.split('.');
    var extensionArchivo = palabrasNombreArchivo[palabrasNombreArchivo.length - 1];

    // Solo aceptamos estas extensiones
    var extensionesValidas = ['png', 'jpg', 'gif', 'jpeg'];

    // Validar que es una extensión válida
    if (extensionesValidas.indexOf(extensionArchivo) < 0) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Extensión no válida',
            err: { message: 'Las extensiones válidas son: ' + extensionesValidas.join(', ') }
        });
    }

    // Nombre de archivo personalizado (id_usuario-número random.extensión)
    var nombreArchivo = `${ id }-${ new Date().getMilliseconds() }.${extensionArchivo}`;

    // Mover el archivo del temporal a un path específico
    var path = `./upload/${ tipo }/${ nombreArchivo }`;

    archivo.mv(path, err => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al mover arhivo',
                err: err
            });
        }
        subirPorTipo(tipo, id, nombreArchivo, res);
    })
});


function subirPorTipo(tipo, id, nombreArchivo, res) {
    if (tipo === 'usuarios') {
        Usuario.findById(id, (err, usuario) => {
            usuario.img = nombreArchivo;
            usuario.save((err, usuarioActualizado) => {
                return res.status(200).json({
                    ok: true,
                    mensaje: 'Imagen de usuario subida/actualizada',
                    usuario: usuarioActualizado
                });
            })
        });
    }
    if (tipo === 'medicos') {

    }
    if (tipo === 'hospitales') {

    }
}

module.exports = app;