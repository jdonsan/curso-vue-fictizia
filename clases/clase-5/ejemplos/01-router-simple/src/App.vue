<script>
import router from './router'
import NotFoundView from './views/NotFoundView'

export default {
  name: 'app',

  data() {
    return {
      currentPath: window.location.pathname
    }
  },

  computed: {
    ViewComponent() {
      return router[this.currentPath] || NotFoundView
    }
  },

  render(h) {
    return h(this.ViewComponent) 
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
