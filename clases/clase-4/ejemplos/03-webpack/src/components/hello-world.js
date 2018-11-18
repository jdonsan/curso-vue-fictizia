export default function() {
    const element = document.createElement('div')
    element.innerHTML = _.join(['Hello', 'World'], ' ')
    return element
}