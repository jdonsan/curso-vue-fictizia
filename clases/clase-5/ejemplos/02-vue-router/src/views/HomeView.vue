<template>
    <div>
        <h1>Me encuentro en la Home</h1>
        <hello-world></hello-world>
    </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld'

export default {
    name: 'HomeView',
    components: {
        HelloWorld
    },

    data() {
        return {
            name: 'jose'
        }
    },

    beforeRouteEnter(to, from, next) {
        console.log('Esto es antes de renderizar el compo', to, from)
       /* axios.get().then(data => {
            next((vm) => {
                vm.name = data
            })
        })*/
        next()
    },

    beforeRouteUpdate(to, from, next) {
        console.log('Esto es antes de actualizar el compo', to, from)
       /* axios.get().then(data => {
            this.name = data
            next()
        })
        */
       next()
    },

    beforeRouteLeave(to, from, next) {
        console.log('Esto es antes de salir', to, from)
        this.name
        next()
    },

}
</script>
