const MyButtonLocal = {
    name: 'my-button-local',

    template: `
        <button @click="onAdd">{{ count }}</button>
    `,

    data() {
        return {
            count: 0
        }
    },

    methods: {
        onAdd() {
            this.count += 1
        }
    }
}

Vue.component('my-button', {
    template: `
        <div>
            <button @click="onAdd">{{ count }}</button>
            <my-button-local></my-button-local>
        </div>
    `,

    components: {
        MyButtonLocal
    },

    data() {
        return {
            count: 0
        }
    },

    methods: {
        onAdd() {
            this.count += 1
        }
    }
})

const app = new Vue({
    el: '#my-app',

    data() {
        return {
            name: 'Jose',
            count: 0
        }
    },

    methods: {
        onAdd() {
            this.count += 1
        }
    }
})