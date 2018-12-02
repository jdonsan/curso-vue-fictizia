<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <button @click="add('Nuevo todo')">Añadir todo</button>
    <button @click="addAsync">Añadir todo asincrono</button>
    <h3>Estos son los no completados</h3>
    <ul>
      <li v-for="(todo, index) in todos" :key="index">{{ todo.name }}</li>
    </ul>

    <h3>Estos son los completados {{ todosCompletedLength }}</h3>
    <ul>
      <li v-for="(todo, index) in todosCompleted" :key="index">{{ todo.name }}</li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import { ADD } from '@/store/mutations-types'

export default {
  name: 'app',
 // computed: mapState(['todos']),
  computed: {
    ...mapState(['todos']),
    ...mapGetters({
      todosCompleted: 'completed',
      todosCompletedLength: 'completedLength'
    })
  },
  methods: {
    ...mapMutations([ADD]),
   /* add(name) {
      this.$store.commit('add', name)
    }*/
    async addAsync() {
      await this.$store.dispatch('addAsync')
      console.log('Ha ido bien')
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
