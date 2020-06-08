import { Jugador } from './clase';

describe('Pruebas de clase', () => {
    let jugador = new Jugador();

    beforeEach(() => {
        jugador = new Jugador();
    });

    afterEach(() => {
        jugador.hp = 100;
    });

    it('Debe de retornar 80 de hp si recibe 20 de daño', () => {
        const res = jugador.recibeDanio(20);
        expect(res).toBe(80);
    });

    it('Debe de retornar 50 de hp si recibe 50 de daño', () => {
        const res = jugador.recibeDanio(50);
        expect(res).toBe(50);
    });

    it('Debe de retornar 0 de hp si recibe 100 de daño', () => {
        const res = jugador.recibeDanio(100);
        expect(res).toBe(0);
    });

    it('Debe de retornar 0 de hp si recibe 101 de daño', () => {
        const res = jugador.recibeDanio(101);
        expect(res).toBe(0);
    });

    it('Debe de retornar 1 de hp si recibe 99 de daño', () => {
        const res = jugador.recibeDanio(99);
        expect(res).toBe(1);
    });
});
