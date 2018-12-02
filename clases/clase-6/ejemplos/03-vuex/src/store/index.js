import Vue from 'vue'
import Vuex from 'vuex'
import { ADD } from './mutations-types'

Vue.use(Vuex)

export default new Vuex.Store({
    strict: true,

    state: {
        todos: [
            { name: 'Mi todo 1', completed: false },
            { name: 'Mi todo 2', completed: true },
            { name: 'Mi todo 3', completed: false }
        ]
    },

    getters: {
        completed: (state) => {
            return state.todos.filter(todo => todo.completed)
        },
        completedLength: (state, getters) => {
            return getters.completed.length
        }
    },

    mutations: {
        [ADD](state, name) {
            state.todos.push({ name, completed: false })
        }
    },

    actions: {
        addAsync({ commit }) {
            return new Promise((resolve) =>{
                setTimeout(() => {
                    commit(ADD, 'Nuevo todo despues de 2 segundos')
                    resolve()
                }, 2000)
            })
        }
    }
})