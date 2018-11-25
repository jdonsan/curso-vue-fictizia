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
    }
}
</script>
