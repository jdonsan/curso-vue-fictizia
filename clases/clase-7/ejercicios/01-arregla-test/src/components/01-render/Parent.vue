<template>
    <div><child /></div>
</template>

<script>
import Child from '@/components/01-render/Child'

export default {
    name: "Parent",
    components: {
        Child
    }
}
</script>