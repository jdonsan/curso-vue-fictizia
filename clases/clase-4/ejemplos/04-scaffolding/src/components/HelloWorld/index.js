import './style.scss'

export default {
    name: 'HelloWorld',

    render: function (h) {
        return h(
            'div',
            { attrs: { class: 'hello-world' } },
            [h('h1', 'Hola ' + this.name)]
        )
    },

    /*
    template: `
        <div class="hello-world">
            <h1>Hola {{ name }}</h1>
        </div>
    `,
    */
    data() {
        return {
            name: 'José Antonio'
        }
    }
}