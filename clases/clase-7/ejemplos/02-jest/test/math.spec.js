import math from '../src/math'

describe('Pruebas de la librería Math', () => {
    describe('Pruebas para add', () => {
        it('Debería sumar 2, 3 y 4 y devolver 9', () => {
            const result = math.add(2, 3, 4)
            expect(result).toBe(9)
        })

        it('Deberia sumar 2, -3, 4 y devolver 3', () => {
            const result = math.add(2, -3, 4)
            expect(result).toBe(3)
        })
    })

    describe('Pruebas para sub', () => {
        it('Debería restar 9, 4 y 3 y devolver -16', () => {
            const result = math.sub(9, 4, 3)
            expect(result).toBe(-16)
        })
    })
})