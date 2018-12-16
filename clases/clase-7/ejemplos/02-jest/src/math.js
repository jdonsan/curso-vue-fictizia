export default {
    add(...values) {
        return values.reduce((a, b) => a + b, 0)
    },
    sub(...values) {
        return values.reduce((a, b) => a - b, 0)
    },
    mult(...values) {
        return values.reduce((a, b) => a * b, 0)
    },
    div(...values) {
        return values.reduce((a, b) => a / b, 0)
    }
}