
export default {
    // metodo: add
    // entradas: a y b
    // salida: return 
    add(a, b) {
        try {
            return a + b
        } catch {
            return new Error('No puede sumar esto')
        }
    }
}