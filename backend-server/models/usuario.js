var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// Definimos schema en BD.
var usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es necesario']
    },
    password: {
        type: String,
        required: [true, 'El contraseña es necesaria']
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        required: true,
        default: 'USER_ROLE'
    },
});

// Necesitamos exportarlo para usarlo fuera...
module.exports = mongoose.model('Usuario', usuarioSchema);