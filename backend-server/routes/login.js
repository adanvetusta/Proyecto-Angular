var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var SEED = require('../config/config').SEED;
var app = express();
var Usuario = require('../models/usuario');


// Google
var CLIENT_ID = require('../config/config').CLIENT_ID;
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(CLIENT_ID);

var mdAutenticacion = require('../middelwares/autenticacion');

/**
 * Autentificación normal
 */
app.post('/', (req, res) => {
    var body = req.body;
    Usuario.findOne({ email: body.email }, (err, usuarioDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuarios',
                errors: err
            });
        }
        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Credenciales incorrectas - email',
                errors: err
            });
        }



        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Credenciales incorrectas - password',
                errors: err
            });
        }

        // Creamos token
        usuarioDB.password = '';
        var token = jwt.sign({ usuario: usuarioDB }, SEED, { expiresIn: 14400 }) //expira en 4 horas

        return res.status(200).json({
            ok: true,
            mensaje: 'login post correcto',
            usuario: usuarioDB,
            token: token,
            id: usuarioDB._id,
            menu: obtenerMenu(usuarioDB.role)
        });
    });
});


/**
 * Autentificación Google (Método POST recomendado)
 */

async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    // Toda la información del usuario.
    const payload = ticket.getPayload();
    return {
        nombre: payload.name,
        google: true,
        email: payload.email,
        picture: payload.picture,
        payload
    }
}

app.post('/google', async(req, res) => {

    var token = req.body.token;

    // async porque es un await (promesa)
    var googleUser = await verify(token)
        .catch(e => {
            return res.status(403).json({
                ok: false,
                mensaje: 'Token no válido'
            });
        });

    Usuario.findOne({ email: googleUser.email }, (err, usuarioDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errors: err
            });
        } else if (usuarioDB) {
            if (!usuarioDB.google) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Debe de usar su autenticación normal',
                    errors: err
                });
            } else {
                var token = jwt.sign({ usuario: usuarioDB }, SEED, { expiresIn: 14400 }) //expira en 4 horas
                return res.status(200).json({
                    ok: true,
                    mensaje: 'login post correcto',
                    usuario: usuarioDB,
                    token: token,
                    id: usuarioDB._id,
                    menu: obtenerMenu(usuarioDB.role)
                });
            }
        } else { // Si el usuario no existe, hay que crearlo
            var usuario = new Usuario();
            usuario.nombre = googleUser.nombre;
            usuario.email = googleUser.email;
            usuario.img = googleUser.picture;
            usuario.google = true;
            usuario.password = '_';
            usuario.save((err, usuarioDB) => {
                var token = jwt.sign({ usuario: usuarioDB }, SEED, { expiresIn: 14400 }) //expira en 4 horas
                return res.status(200).json({
                    ok: true,
                    mensaje: 'login post correcto',
                    usuario: usuarioDB,
                    token: token,
                    menu: obtenerMenu(usuarioDB.role)
                        //id: usuarioDB._id
                });
            });
        }
    });
});

/**
 * Regresar menú en función del rol de usuario
 * @param role
 */
function obtenerMenu(role) {

    const menu = [
        {
            titulo: 'Principal',
            icono: 'mdi mdi-gauge',
            submenu: [
                {
                    titulo: 'Dashboard', url: '/dashboard'
                },
                {
                    titulo: 'ProgressBar', url: '/progress'
                },
                {
                    titulo: 'Gráficas', url: '/graficas1'
                },
                {
                    titulo: 'Promesas', url: '/promesas'
                },
                {
                    titulo: 'RxJs', url: '/rxjs'
                }
            ]
        },
        {
            titulo: 'Mantenimiento',
            icono: 'mdi mdi-folder-lock-open',
            submenu: [
                {
                    titulo: 'Hospitales', url: '/hospitales'
                },
                {
                    titulo: 'Medicos', url: '/medicos'
                }
            ]
        }
    ];


    if(role === 'ADMIN_ROLE') {
        // unshift lo pone al principio, el push al final
        menu[1].submenu.unshift( {
            titulo: 'Usuarios', url: '/usuarios'
        });
    }
    return menu;
}


app.get('/renuevaToken', mdAutenticacion.verificaToken,(req, res) => {

    var token = jwt.sign({ usuario: req.usuario }, SEED, { expiresIn: 14400 }) //expira en 4 horas

    res.status(200).json({
        ok: true,
        token: token
    });
});



module.exports = app;
