<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">

    <!-- navegaciones semánticas con router-link -->
    <div>
      <router-link to="/" class="otra-class">Home</router-link>
      <router-link :to="{ name: 'about' }" replace>About</router-link>
      <router-link :to="{ name: 'user-post', params: { userId: 100, postId: 500 } }">User by Post</router-link>
    </div>

    <!-- navegaciones programáticas con $router -->
    <div>
      <button @click="goTo('/')">Home</button>
      <button @click="goTo('/about')">About</button>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",

  data() {
    return {
      private: false,
    }
  },
  methods: {
    goTo(path) {
      if(this.private) {
        this.$router.push(path)
      } else {
        this.$router.push('/hola')
      //  this.$router.replace('/hola')
      //  this.$router.go(1)
      }
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.router-link-exact-active{
  color: red;
}
</style>
