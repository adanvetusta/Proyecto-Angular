import { obtenerEquipos } from './arrays';
describe('Pruebas de arrays', () => {
    it('Debe de retornar al menos tres equipos', () => {
        const res = obtenerEquipos();
        expect(res.length).toBe(3);
        expect(res.length).toBeGreaterThanOrEqual(3);
    });
    it('Comprobar que existe el Bayern y el 1860', () => {
        const res = obtenerEquipos();
        expect(res).toContain('Bayern');
        expect(res).toContain('1860');
    });
});
