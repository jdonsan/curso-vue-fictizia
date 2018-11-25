<template>
    <div>
        <h1>Estoy en la vista de usuario {{ $route.params.userId }}</h1>
        <router-view></router-view>
        <router-view name="b"></router-view>
        <router-view name="a"></router-view>
    </div>
</template>

<script>
export default {
    name: 'UserView'
}
</script>

