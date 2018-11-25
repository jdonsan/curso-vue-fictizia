import Vue from 'vue'
import VueRouter from 'vue-router'

import HomeView from '@/views/HomeView'
import AboutView from '@/views/AboutView'
import UserView from '@/views/UserView'
import PostView from '@/views/PostView'
import ProfileView from '@/views/ProfileView'
import NotFoundView from '@/views/NotFoundView'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: HomeView,
            beforeEnter: (to, from, next) => {
                console.log('Cuando entra en Home', to, from)
                next()    
            },
            meta: {
                private: true,
                role: ['ADMIN']
            }
        },
        {
            name: 'about',
            path: '/about',
            alias: '/otro',
            component: AboutView,
            meta: {
                private: false
            }
        },
        {
            // ruta dinámica
            name: 'user',
            path: '/user/:userId',
            component: UserView,

            // Varias partes dinámicas en un component
            /*components: {
                default: UserView,
                a: UserAView,
                b: UserBView
            },*/

            // vistas anidadas
            children: [
                {
                    name: 'user-post',
                    path: 'post/:postId',
                    component: PostView,
                    props: function(route) {
                        return {
                            postId: parseInt(route.params.postId),
                            name: 'Jose'
                        }
                    },
                    meta: {
                        private: true,
                        role: ['ADMIN', 'USER']
                    }
                },
                {
                    path: 'profile',
                    component: ProfileView
                }
            ]
        },
        // ruta wildcard
        {
            path: '*',
            component: NotFoundView
        }
    ]
})

router.beforeEach((to, from, next) => {
    console.log('Se ejecuta antes', to, from)
    next()
/*
    if(to.meta.isPrivate) {
        if (user.isLogged) {
            next()
        } else {
            next({ path: '/login' })
        }
    } else {
        next()
    }
*/
})

export default router

