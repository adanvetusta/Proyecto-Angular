import { mensaje } from './string';

describe('Pruebas de string', () => {
    it('Debe de regresar un string', () => {
        const respuesta = mensaje('Adán');
        // Forma 1
        expect((typeof respuesta) === 'string');

        // Forma 2
        expect(typeof respuesta).toBe('string');
    });
    it('Debe de retornar un saludo con el nombre enviado', () => {
        const nombre = 'Adán';
        const respuesta = mensaje(nombre);
        expect(respuesta).toBe(`Saludos ${nombre}`);
        expect(respuesta).toContain(nombre);

    });
});
