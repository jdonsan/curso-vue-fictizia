<template>
    <div>
        <h1>Esto es un post de mi web</h1>
        <h2>Este es el post numero {{ postId }}, {{ name }}</h2>
    </div>
</template>

<script>
export default {
    name: 'PostView',
    props: {
        postId: Number,
        name: String
    }
}
</script>

<style>

</style>
