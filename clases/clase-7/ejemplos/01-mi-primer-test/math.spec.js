import math from './math'

describe('Test para Math', () => {
    describe('Test para sumar', () => {
        it('Deberia devolver 5 cuando sume 2 y 3', () => {
            // Preparar
            const a = 2
            const b = 3

            // Ejecutar
            const result = math.add(a, b)

            // Afirmar
            expect(result).toBe(5)
        })

        it('Deberia devolver error cuando sume 4 y "Hola Mundo"', () => {
            // Preparar y ejecutar juntos
            const result = math.add(4, 'Hola Mundo')

            expect(result).toType(Error)
            expect(result.message).toBe('No puede sumar esto')
        })
    })
})