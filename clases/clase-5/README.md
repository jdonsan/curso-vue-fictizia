# Clase 5

## Planning del día 

1. Repaso clase anterior
2. Creando un enrutador simple
3. vue-router
4. Ejercicio 'Creando las rutas de mi webapp'

## Índice

- [1. Creando un un enrutador simple](#1-creando-un-un-enrutador-simple)
- [2. `vue-router`](#2-vue-router)
    - [2.1. Introducción](#21-introducción)
    - [2.2. ¿Cómo empezar?](#22-¿cómo-empezar)
    - [2.3. Configurando rutas](#23-configurando-rutas)
        - [2.3.1. Reacciona a cambios en los parámetros](#231-reacciona-a-cambios-en-los-parámetros)
        - [2.3.2. Configuraciones avanzadas](#232-configuraciones-avanzadas)
        - [2.3.3. Prioridad en las relaciones](#233-prioridad-en-las-relaciones)
    - [2.4. Rutas anidadas](#24-rutas-anidadas)
    - [2.5. Programando navegaciones](#25-programando-navegaciones)
        - [2.5.1. Manipulando el histórico de navegación](#251-manipulando-el-histórico-de-navegación)
    - [2.6. Nombrado](#26-nombrado)
        - [2.6.1. Nombrado de rutas](#261-nombrado-de-rutas)
        - [2.6.2. Nombrado de vistas](#262-nombrado-de-vistas)
        - [2.6.3. Nombrado de vistas anidadas](#263-nombrado-de-vistas-anidadas)
    - [2.7. Redirecciones y alias](#27-redirecciones-y-alias)
        - [2.7.1. Redirect](#271-redirect)
        - [2.7.2. Alias](#272-alias)
    - [2.8. Pasando propiedades a un componente de vista](#28-pasando-propiedades-a-un-componente-de-vista)
    - [2.9. Modo histórico de HTML5](#29-modo-histórico-de-html5)
    - [2.10. Navigation Guard](#210-navigation-guard)
        - [2.10.1. Global Guards](#2101-global-guards)
        - [2.10.2. Global Resolve Guards](#2102-global-resolve-guards)
        - [2.10.3. Global After Hooks](#2103-global-after-hooks)
        - [2.10.4. Per-Route Guard](#2104-per-route-guard)
        - [2.10.5. In-Component Guards](#2105-in-component-guards)
        - [2.10.6. The Full Navigation Resolution Flow](#2106-the-full-navigation-resolution-flow)
    - [2.11. Route Meta Fields](#211-route-meta-fields)
    - [2.12. Data Fetching](#212-data-fetching)
        - [2.12.1. Fetching After Navigation](#2121-fetching-after-navigation)
        - [2.12.2. Fetching Before Navigation](#2122-fetching-before-navigation)
    - [2.13. Lazy Loading Routes](#213-lazy-loading-routes)
        - [2.13.1. Grouping Components in the Same Chunk](#2131-grouping-components-in-the-same-chunk)


# 1. Creando un un enrutador simple

Cuando una aplicación empieza a crecer, acaba necesitando la manera de poder gestionar las diferentes pantallas, páginas o vistas que tiene. 

En aplicaciones Web, particularmente en SPAs, la gestión de las diferentes vistas se viene realizando por medio de rutas (urls) locales que nos permitan saber en qué parte de la aplicación nos encontramos y qué componente raíz debemos renderizar.

Si la aplicación que estamos desarrollando es pequeña, podemos crear una gestion de la ruta por nuestra cuenta. Podemos hacer un pequeño enrutador que indique qué componente renderizar.

Un ejemplo podría ser este:

```js
const NotFound = { template: '<p>Page not found</p>' }
const Home = { template: '<p>home page</p>' }
const About = { template: '<p>about page</p>' }

const routes = {
  '/': Home,
  '/about': About
}

new Vue({
  el: '#app',
  data: {
    currentRoute: window.location.pathname
  },
  computed: {
    ViewComponent () {
      return routes[this.currentRoute] || NotFound
    }
  },
  render (h) { return h(this.ViewComponent) }
})
```

Vayamos por partes:

Lo primero que hacemos es definir los componentes de tipo vista que queremos que se rendericen en una determinada ruta dada. Por ejemplo, aquí tenemos 3 componentes tipo vista típicos en una aplicación: `NotFound`, `Home` y `About`:

```js
const NotFound = { template: '<p>Page not found</p>' }
const Home = { template: '<p>home page</p>' }
const About = { template: '<p>about page</p>' }
```

Estos componentes se encontrarán en su respectivo SFC y se importarían luego en el gestor de rutas, pero para que veamos el ejemplo más claro, se incluye todo de seguido.

---

Por otra parte, tenemos la configuración de rutas. Esto no es más que un objeto JSON que contiene la ruta que queremos escuchar y el componentes que tenemos que renderizar.

En este caso lo que indicamos es que cuando el usuario indique en la url la raiz (`/`), se renderizará el componente `Home` y que cuando el usuario indique la ruta `/about`, renderizará el componente `About`:

```js
const routes = {
  '/': Home,
  '/about': About
}
```

---

Lo siguiente es crear nuestra instancia de Vue y manejar de manera dinámica la ruta:

```js
new Vue({
  el: '#app',
  data: {
    currentRoute: window.location.pathname
  },
  computed: {
    ViewComponent () {
      return routes[this.currentRoute] || NotFound
    }
  },
  render (h) { return h(this.ViewComponent) }
})
```

De aquí, detengámonos en 3 puntos. Primero el `data`:

```js
data: {
    currentRoute: window.location.pathname
}
```

Lo que en `data` hacemos es iniciar con la url actual, la variable `currentRouter`.

Después, creamos una propiedad computada que se encargará de cambiar el componente a renderizar a partir de la ruta escrita en `currentRouter`. Si no hay una coincidencia con las rutas configuradas, se renderiza el componente `NotFound`:

```js
computed: {
    ViewComponent () {
        return routes[this.currentRoute] || NotFound
    }
},
```

por último s euna una función de renderizado que se encarga de incluir en el Virtual DOM el componente indicado:

```js
render (h) { return h(this.ViewComponent) }
```

Y ya está. COn ir añadiendo rutas en el fichero de configuración lo tendríamos.

Ahora bien, esto se nos queda algo limitado. ¿Qué ocurre si queremos generar rutas dinámicas (que varios patrones rendericen el mismo componente)? ¿Cómo gestionamos las vistas anidadas o en profundidad)? ¿Cómo puedo pasar parámetros a los componentes de vista?

Es aquí, donde esta solución se nos queda corta y necesitamos una herramienta que nos ayude a hacer más cosas de manera sencilla. Es hora de introducir `vue-router`.

# 2. `vue-router`

## 2.1. Introducción

`vue-roter` es otra de las librerías más utilizadas en el ecosistema vue. Es una librería que nos permite:

* Mapear vistas o rutas anidadas
* Modular la configuración de rutas basada en componentes
* Crear rutas dinámicas con parametros, querys o wildcards
* Mayor control de la navegación
* Nos incluye clases a los links que han sido activados
* Modo HTML5 history o modo hash con auto-fallback en IE9
* Comportamiento del scroll personalizado

## 2.2. ¿Cómo empezar?

Podemos usar `vue-router`de dos maneras dependiendo de cómo esté creada nuestra aplicación. Si no estamos usando `vue-cli` para crear nuestro scaffolding, lo haremos importando la librería después de Vue en nuestro HTML:

```html
<script src="/path/to/vue.js"></script>
<script src="/path/to/vue-router.js"></script>
```

Si estamos usando `vue-cli` para construir nuestra aplicación. Tendremos que instalarla via NPM:

```sh
$ npm install vue-router
```

Y después extender Vue por medio de `Vue.use` en nuestro código:

```js
// router/index.js
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
```

A partir de aquí, podemos empezar a configurar rutas:

```js
// continúa router/index.js
export default new VueRouter({
    // configuración de rutas
})
```

Tenemos que incluir las rutas en nuestra instancia de vue:

```js
// main.js
import router from './router

new Vue({
    el: '#app',
    router
})
```

Y en el HTML, indicar dónde se encontrará la parte dinámica en donde vue-router tiene que renderizar el componente:

```html
<div id="app">
  <h1>Hello App!</h1>
  <p>
    <router-link to="/foo">Go to Foo</router-link>
    <router-link to="/bar">Go to Bar</router-link>
  </p>

  <router-view></router-view>
</div>
```

Ahora solo tenemos que empezar a configurar rutas.

## 2.3. Configurando rutas

Para configurar rutas, es tan fácil como hacíamos en nuestro ejemplo. Indicamos un array con todas las rutas que queramos gestionar:

```js
// router/index.js
import Foo from '@/components/Foo'
import Bar from '@/components/Bar'

export default new VueRouter({
    routes: [
        { 
            path: '/foo', 
            component: Foo 
        },
        { 
            path: '/bar', 
            component: Bar
        }
    ]
})
```

Indicamos la ruta a gestionar (`path`) y el componente a renderizar (`component`)


### 2.3.1. Reacciona a cambios en los parámetros

Podemos crear rutas dinámicas. Esto quiere decir que dentro de nuestra ruta, podemos hacer que varias rutas diferentes rendericen el mismo componente. Esto nos puede ser muy útil para crear rutas que muestran el detalle de productos o el perfil publico de un usuario. 

Por ejemplo, tenemos el siguiente ejemplo:

```js
const User = {
  template: '<div>User</div>'
}

const router = new VueRouter({
  routes: [
    // las partes dinamicas se indican por medio de dos puntos
    { path: '/user/:id', component: User }
  ]
})
```

Como vemos la ruta `/user/1` y la ruta `/user/2` renderizarán el mismo componente. Para crear partes dinámicas, usamos la expresión regular: dos puntos (:) + nombre del parámetro. En este caso anterior la ruta se queda como `/user/:id` donde `user es una ruta estática y `:id` es un parámetro dinamico con nombre `id`.

Gracias a vue-router, esos parámetros son accesibles en los componentes por medio de `$route`. Podemos acceder a todos los parámetros dinámicos accediendo a `$route.params`:

```js
const User = {
    template: '<div>User {{ $route.params.id }}</div>'
}
```

Esto son otros ejemplos de rutas dinámica y de cómo `vue-router` trabajaría con ellas:


| patrón	                    | url relacionada     | $route.params                      |
|-------------------------------|---------------------|------------------------------------|
| /user/:username               | /user/evan          | { username: 'evan' }               |
| /user/:username/post/:post_id | /user/evan/post/123 | { username: 'evan', post_id: 123 } |


Debido a cómo funciona `vue-router` y `vue`, cuando el usuario solo cambia un parámetro de la url, no se realiza el `update` para el renderizado de la vista. Es por eso que tenemos que incluir reactividad para que nuestro componente cambie cuando el valor de un parámetro ha cambiado.

Tenemos dos maneras:

O pormedio de incluir un `watch` a `$route`:

```js
const User = {
  template: '...',
  watch: {
    '$route' (to, from) {
      // reactiona a cambios en la ruta
    }
  }
}
```

O por medio del Navigation Guard llamado `beforeRouteUpdate` que veremos en otra sección:

```js
const User = {
  template: '...',
  beforeRouteUpdate (to, from, next) {
    // reacciona a cambios en la ruta
    // no olvides llamar a next()
  }
}
```

### 2.3.2. Configuraciones avanzadas

Los patrones que podemos usar para el mapeo de rutas es bastante avanzado. Hemos visto los ejemplos que casi siempre usaremos. 

Pero si necesitas un control más exacto de expresiones regulares, recuerda que `vue-router` usa la librería `path-to-regexp`. Échale un vistazo de vez en cuando para ver que patrones avanzados puedes crear.


### 2.3.3. Prioridad en las relaciones

Como hemos visto, las rutas en `vue-router` se configuran en un array. Ten cuidado con el orden en que pongas las rutas porque en cuanto `vue-router` encuentre una ruta que coincida, la dará por valida. Para crear prioridades en tu configuración, ordéna correctamente tu array.

## 2.4. Rutas anidadas

Una de las ventajas de usar `vue-router` es que podemos crear rutas con niveles de profundidad. Esto nos va a permitir crear layouts que generen una sensación de modularidad y reutilización de código, además de una homogeinidad de nuestras interfaces.

Vale, imaginemos que nos encontramos en la sección del usuario donde podemos ver el perfil y los posts de dicho usuario. Me gustaría que al encontrarnos en una sección muy marcada como el usuario, aparecieran ciertos textos o navegaciones en la parte superior y que solo fuese cambiando el contenido interno en relación de la subruta en la que me encuentre. 

Quiero algo como esto:

```
/user/foo/profile                     /user/foo/posts
+------------------+                  +-----------------+
| User             |                  | User            |
| +--------------+ |                  | +-------------+ |
| | Profile      | |  +------------>  | | Posts       | |
| |              | |                  | |             | |
| +--------------+ |                  | +-------------+ |
+------------------+                  +-----------------+
```

Como vemos, la ruta estática `user` pintará un comoponente layout llamado `User` y que según si estoy en la subruta `profile` o `post` se renderizrá el componente `Profile` o `Post`. 

Pues bien, esto en  `vue-router` es tan fácil como hacer esto en nuestra configuración.

Dado este ejemplo, donde teníamos una aplicación que muestra datos del usuario:

```html
<div id="app">
  <router-view></router-view>
</div>
```

```js
const User = {
  template: '<div>User {{ $route.params.id }}</div>'
}

const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User }
  ]
})
```

Vamos a modificar el componente `User` para que nos deje una parte dinámica donde pintar otras vistas:

```js
const User = {
  template: `
    <div class="user">
      <h2>User {{ $route.params.id }}</h2>
      <router-view></router-view>
    </div>
  `
}
```

El `router-view` nos ayuda en esto. Le estamos diciendo a `vue-router` que tiene una zona donde renderizar otros componentes de manera dinámica. Esto no deja de ser un `slot` que vimos en lecciones anteriores.

Ahora en nuestra configuración, lo que hacemos es definir una serie de rutas hijas. Es otro subnivel donde indicamos otro arbol de rutas:

```js
const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User,
      children: [
        {
          // UserProfile será renderizado dentro del <router-view> de User
          // cuando se relacione la ruta con /user/:id/profile
          path: 'profile',
          component: UserProfile
        },
        {
          // UserPosts será renderizado dentro del <router-view> de User
          // cuando se relacione la ruta con /user/:id/posts
          path: 'posts',
          component: UserPosts
        }
      ]
    }
  ]
})
```

Bastante sencillo de hacer vistas muy reutilizables.

Ten cuidado, eso sí, porque con la configuración anterior, si alguien escribiese `/user/1` simplemente, `vue-router` no renderizaría nada dentro de `User`. Que ojo, este puede ser el comportamiento por defecto que queramos.

En caso de querer renderizar algo por defecto. Dentríamos que indicar una ruta hija cuyo `path` sea vacío:

```js
const router = new VueRouter({
  routes: [
    {
      path: '/user/:id', component: User,
      children: [
        // UserHome será renderizado dentro del <router-view> de User
        // cuando se relacione la ruta con /user/:id
        { path: '', component: UserHome },

        // ...otras sub rutas
      ]
    }
  ]
})
```

## 2.5. Programando navegaciones

Una vez que tenemos rutas configurables. Necesitamos un sistema fácil con el que el usuario pueda navegar por nuestra aplicación. `vue-router` nos da dos formas de realizar navegaciones.

1. Un método declarativo por medio del componente de vue `router-link` que no es más que una abstración del tag `a` de html con un par de funcionalidades extra
2. Un método programático en JS donde por medio de la instancia de `router`que se inyecta a los componentes, podemos realizar diferentes acciones.

Podemos hacer 3 acciones con estas dos formas:


1. **Ir a una ruta en concreto**

Esto nos permite indicar la ruta exacta a la que nos tenemos que mover:

| Forma declarativa         | Forma programática   |
|---------------------------|----------------------|
| `<router-link :to="...">` | `router.push(...)`   |

`push` es un método de `router` muy versátil que nos permite indicar todo lo necesario:

```js
// literal string path
router.push('home')

// objeto
router.push({ path: 'home' })

// nombre de la ruta + parámetro
router.push({ name: 'user', params: { userId: 123 }})

// indicando queryString quedaría así: /register?plan=private
router.push({ path: 'register', query: { plan: 'private' }})
```

```js
const userId = 123
router.push({ name: 'user', params: { userId }}) // -> /user/123
router.push({ path: `/user/${userId}` }) // -> /user/123
// cuidado porque la mezcla de los anteriores no funcionaría
router.push({ path: '/user', params: { userId }}) // -> /user
```

2. **Reemplazar ruta**

El caso anterior, guarda la ruta anterior visitada en el histórico de navegación. Puede darse el caso en el que no queramos guardar esa ruta, si no que queremos reemplazarla. Para eso usarémos `replace`.

Uso en sus dos vertientes:


| Forma declarativa                 | Forma programática      |
|-----------------------------------|-------------------------|
| `<router-link :to="..." replace>` | `router.replace(...)`   |

3. Navegar en el histórico de ruta

Podemos tambien movernos por el histórico por medio del método `go`. En este caso no hay forma declarativa ya que esto tiene más que ver con un sistema programñatico.

Veamos diferentes usas:

```js
// Voy hacia delante en el histórico, lo mismo que history.forward()
router.go(1)

// Vuelvo a un registro anterior, lo mismo que history.back()
router.go(-1)

// Adelanto 3 registros en el histórico
router.go(3)

// No hace nada si no existe el salto al que intentamos ir
router.go(-100)
router.go(100)
```

### 2.5.1. Manipulando el histórico de navegación

Si has trabajado con History API antes, habrás visto que `vue-router` lo único que está haciendo es crear un envoltorio sobre esa api para que funcione bien con `vue`. Por tanto `router.push`, `router.replace` y `router.go` dondejan de ser `window.history.pushState`, `window.history.replaceState` y `window.history.go`.

## 2.6. Nombrado 

### 2.6.1. Nombrado de rutas

Puede darse el caso en que nuestras rutas sean tan largas que hacer referencia a ellas en la navegación sea bastante dificil y tedioso. Para ello, podemos incluir un nombre en las rutas para referirnos a ellas.

Simplemente indica un `name`:

```js
const router = new VueRouter({
  routes: [
    {
      path: '/user/:userId',
      name: 'user',
      component: User
    }
  ]
})
```
Y usalo en las navegaciones tanto declarativas:

```html
<router-link :to="{ name: 'user', params: { userId: 123 }}">User</router-link>
```

Como en las programáticas:

```js
router.push({ name: 'user', params: { userId: 123 }})
```

### 2.6.2. Nombrado de vistas

Por otro lado, dependiendo de la complejidad de nuestros componentes, puede darse el caso en que tengamos que indicar distintas vistas al mismo tiempo en un anidamiento. 

Podemos tener esto:

```html
<router-view class="view one"></router-view>
<router-view class="view two" name="a"></router-view>
<router-view class="view three" name="b"></router-view>
```

Donde tenemos un `router-view` con nombre `a` y otra con nombre `b`. Cuando un `router-view` no tiene nombre indica que es el `router-view` por defecto.

Ahora bien, en la configuración, tendremos que indicar tres componentes. Para hacerlo, hacemos que la configuración de `components` sea un objeto donde s eindica el nombre de la vista y el componente a renderizar:

```js
const router = new VueRouter({
  routes: [
    {
      path: '/',
      components: {
        default: Foo,
        a: Bar,
        b: Baz
      }
    }
  ]
})
```
### 2.6.3. Nombrado de vistas anidadas

Nos puede pasar lo mismo con las vistas anidadas y sus componentes hijos. (Hay que pensar en `vue-router` como otro arbol, en este caso de rutas):
```
/settings/emails                                       /settings/profile
+-----------------------------------+                  +------------------------------+
| UserSettings                      |                  | UserSettings                 |
| +-----+-------------------------+ |                  | +-----+--------------------+ |
| | Nav | UserEmailsSubscriptions | |  +------------>  | | Nav | UserProfile        | |
| |     +-------------------------+ |                  | |     +--------------------+ |
| |     |                         | |                  | |     | UserProfilePreview | |
| +-----+-------------------------+ |                  | +-----+--------------------+ |
+-----------------------------------+                  +------------------------------+
```


`UserSettings` tiene varias vistas:

```html
<!-- UserSettings.vue -->
<div>
  <h1>User Settings</h1>
  <NavBar/>
  <router-view/>
  <router-view name="helper"/>
</div>
```

En la configuración quedaría así:

```js
{
  path: '/settings',
  component: UserSettings,
  children: [{
    path: 'emails',
    component: UserEmailsSubscriptions
  }, {
    path: 'profile',
    components: {
      default: UserProfile,
      helper: UserProfilePreview
    }
  }]
}
```

## Ejercicio 'Libro electrónico'

* Tenemos que crear un libro electrónico de un cuento.
* Tenemos que ver el índice en todo momento. 
* Tengo que poder navegar entre los los diferentes capítulos
* Tengo que tener dos flechas de navegación que me permitan ir a al capítulo siguiente y al capítulo anterior

## 2.7. Redirecciones y alias

### 2.7.1. Redirect

Puede darse caso en las que tengamos que hacer redirecciones entre rutas.

Es decir que dada la ruta `/a`, nos redirecione a la ruta `/b`:

```js
const router = new VueRouter({
  routes: [
    { path: '/a', redirect: '/b' }
  ]
})
```

Podemos indicar en la redirección un nombre de ruta para que quede más simple:

```js
const router = new VueRouter({
  routes: [
    { path: '/a', redirect: { name: 'foo' }}
  ]
})
```

Incluso podemos indicar una función para relaizar una redirección lógica:

```js
const router = new VueRouter({
  routes: [
    { path: '/a', redirect: to => {
      // lógica
    }}
  ]
})
```

### 2.7.2. Alias

Podemos tambien indicar un alias. 

La diferencia con una redirección es que una redirección cuando el usuario vista `/a` la url será reemplazada por `/b`.

Por otro lado, un alias de `/a` como `/b` indica que cuando el usuario visita `/b`, en la url aparece `/b`, pero internamente se relacionará con `/a`. Es como si el usuario hubiera visitado `/a` pero seguimos mostrándole `/b`.

Para realizar esto, lo haríamos así:

```js
const router = new VueRouter({
  routes: [
    { path: '/a', component: A, alias: '/b' }
  ]
})
```

La ventaja de esto es que somos libres de mapear estructuras a urls arbitrarias.

## 2.8. Pasando propiedades a un componente de vista

Hemos visto anteriormente que los parámetros de una url son accesibles desde el componente vista que hayamos configurado:

```js
const User = {
  template: '<div>User {{ $route.params.id }}</div>'
}
const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User }
  ]
})
```

Sin embargo, este sistema nos acopla demasiado de $route. Estamos haciendo uso de propiedades que se estan inyectando d euna manera incorrecta. Es por ello que `vue-router` nos permite inyectarlas como propiedades de un componente. 

De esta manera, si metemos un test a este componente vista, no tendremos que mockear una librería más, simplemente estamos jugando con props de vue.

Para hacer esto, tenemos que hacer dos pequeños cambios.

El primero es indica la prop en el componente:

```js
const User = {
  props: ['id'],
  template: '<div>User {{ id }}</div>'
}
```

Y segundo, indicar en la ruta, que a ese componente tenemos que pasarle los parámetros por props con `props: true`

```js
const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User, props: true }
  ]
})
```

Si tenemos varias vistas en un componente, tenemos que indicar el comportamiento de cada una de las vistas. EN este caso, a la vista por defecto se le pasan los parámetros como props, pero a la vista sidebar no porque no hará uso de ellos:

```js
const router = new VueRouter({
  routes: [
    {
      path: '/user/:id',
      components: { default: User, sidebar: Sidebar },
      props: { default: true, sidebar: false }
    }
  ]
})
```

Esta configuración en la ruta admite tres tipos distintos:

1. Boolean

Es el método visto anteriormente. Es el más común, nos mapea todos los parámetros en props.

2. Object

Es un método usado cuando queremos pasar props estáticas. Es decir, son props que no tienen nada que ver con los params. Un ejemplo sería este:

```js
const router = new VueRouter({
  routes: [
    { path: '/promotion/from-newsletter', component: Promotion, props: { newsletterPopup: false } }
  ]
})
```

3. Function

Tambien podemos indicar una función factoría para incluir otros datos en las props, como los datos del queryString o para generar flujos dinámicos:

```js
const router = new VueRouter({
  routes: [
    { path: '/search', component: SearchUser, props: (route) => ({ query: route.query.q }) }
  ]
})
```

## 2.9. Modo histórico de HTML5

Puede darse ocasiones en las que no nos sea útil definir las urls de nuestra aplicación con formato hash. 

Habrá ocsaciones que por límites del negocio, que se necesite indicar las rutas en módo histórico.

La diferencia entre ambos sistemas es este. Imaginemos que queremos mostrar el perfil de un usuario. La forma de ver o definir la url en cada modo es así:

  * Módo hash: https://nuestro-site.com/#/profile
  * Modo history: https://nuestro-site-com/profile

  La segunda forma es:
  
  * Más elengante
  * Menos verbosa (se recuerda mejor por los usuarios). 
  * Mejor para el SEO

Para cambiar a este modo, simplemente tendremos que activarlo indicado en `vue-router` `mode: history`.

```js
const router = new VueRouter({
  mode: 'history',
  routes: [...]
})
```

Eso sí, este sistema rompe un poco el funcionamiento de tu SPA. Al no tener forma al navegador de indicarle que la ruta que estamos haciendo es interna. EL navegador va a realizar una petición a nuestro servidor para indicarle que le proporcione la nueva ruta. 

Lógicamente, nuestra aplicación sigue siendo una SPA por lo que la ruta demanda no existe en el servidor y conseguiremos obtener un 404. 

Para solucionar esto, tenemos que incluir una pequeña configuración en el servidor que estemos trabajando. la idea es que el servidor siempre redirecciones nuestro fichero `index.html` para volver a delegar la gestión de rutas a nuestra SPA.

Por ejemplo, en un servidor apache, la configuración será como esta:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

Si lo que tenemos es un proxy inverso como nginx, la redirección es todavía más simple:

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

Y si directamente estamos en NodeJS. Este script nos permite volver a enviar el `index.html`

```js
const http = require('http')
const fs = require('fs')
const httpPort = 80

http.createServer((req, res) => {
  fs.readFile('index.htm', 'utf-8', (err, content) => {
    if (err) {
      console.log('We cannot open "index.htm" file.')
    }

    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8'
    })

    res.end(content)
  })
}).listen(httpPort, () => {
  console.log('Server listening on: http://localhost:%s', httpPort)
})
```

Por último. Si usamos este sistema de redirección en servidor, tenemos que tener en cuenta que cualquier url que pidamos, se nos devolverá el código de nuestra SPA. Esto quiere decir que si el usuario indica una ruta que no existe, `vue-router` será el encargado de gestionarla.

Esto es bastante sencillo indicando al final de nuestra configuración ul wilcard encargado de mostrar un componente vista de tipo `NotFound`

```js
const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '*', component: NotFoundComponent }
  ]
})
```

## 2.10. Navigation Guard

Al igual que teníamos ua serie de hooks en el ciclo de vida de un componente. Vamos a contar en `vue-router` con un concepto parecido para poder realizar acciones antes o despues de relacionar rutas con componente. Esto es lo que se conoce en `vue-router` como Navigations Guards.

Vamos a contar con:

  * Navigations Guards globales, es decir, un código que se ejecutará antes o después de cada ruta. 
  * Navegatión Guards por ruta, es decir, se ejecutará antes o después d euna ruta determinada.
  * Navitagions Guards por componentes y que solo se ejecutarán en el componente que lo hayamos configurado.

### 2.10.1. Global Guards

Uno de los primeros guards globales con el que contamos es el `beforeEach`. Es decir, que se va a ejecutar antes de que se realice la navegación.

Es un buen sitio para realizar llamadas asíncronas a servidor. Nos puede ayudar a decidir si tenemos que realizar la nevegación o no.

```js
const router = new VueRouter({ ... })

router.beforeEach((to, from, next) => {
  // ...
})
```

Todos los navggatión guards cuentan con estos tres métodos:

  * to: indica la ruta a la que quiero ir.
  * from: indica la ruta desde la que vengo.
  * next: es una función que nos permite indicar si el hook ha terminado su ejecución y tiene que seguir el flujo. Este método permite varios valores de entrada. 
    * Si indico un `false` indica que se interrumpe la navegación programada.
    * Si indico un `true` indica que se confirma la navegación programada.
    * Si indico otra ruta, se provocará una redirección.

Siempre hay que llamar a la función `next` en los hooks o la dejaremos bloqueado el flujo de la aplicación.


### 2.10.2. Global After Hooks

Podemos indicar tambien un hook después de la navegación:

```js
router.afterEach((to, from) => {
  // ...
})
```

Este hooks al ejecutarse después d ela navegación, no puede detener el flujo, por eso no tiene un `next`. Nos puede ser útil para crear depuraciones y ver flujos, pero no para incidir en él.

### 2.10.4. Per-Route Guard

Indicamos en la ruta el hook `beforeEnter` que se comporta igual que `beforeEach`:

```js
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      beforeEnter: (to, from, next) => {
        // ...
      }
    }
  ]
})
```

### 2.10.5. In-Component Guards

Dentro del componente, contamos con tres navigatións guards:

* Antes de entrar en la ruta (`beforeRouteEnter`): se llama antes de que se renderice el componente que ha sido confirmado. No tenemos acceso a los datos de la instancia.
* Antes de actualizar la ruta (`beforeRouteUpdate`): se llama cuando la ruta que está renderizada ha cambiado por algún parámetro. Sí tenemos acceso a los datos de la instancia.
* Antes de irnos de la ruta (`beforeRouteLeave`): se llama antes de irnos de la ruta. Sí tiene acceso a los datos de la instancia.

Podemos definirlos de la siguiente manera:

```js
const Foo = {
  template: `...`,
  beforeRouteEnter (to, from, next) {
    // ...
  },
  beforeRouteUpdate (to, from, next) {
    // ...
  },
  beforeRouteLeave (to, from, next) {
    // ...
  }
}
```

Aunque en el método `beforeRouteEnter` no tenemos acceso a los datos de la instancia, si tenemos acceso dentro de `next`:

```js
beforeRouteEnter (to, from, next) {
  next(vm => {
    // acceso a la instancia del componente via `vm`
  })
}
```

En `beforeRouteUpdate` tenemos total control de la instancia. Simplemente usa `this`:

```js
beforeRouteUpdate (to, from, next) {
  // Solo usa `this`
  this.name = to.params.name
  next()
}
```

Y `beforeRouteLeave` nos puede venir muy bien para evitar equivocaciones del usuario en momento clave:

```js
beforeRouteLeave (to, from, next) {
  const answer = window.confirm('¿Está seguro que quiere abandonar esta pantalla? ¡Tiene datos sin guardar!')
  if (answer) {
    next()
  } else {
    next(false)
  }
}
```

### 2.10.6. The Full Navigation Resolution Flow

Por último, vamos a ver cómo sería el ciclo de ejecución de una navegación completa:

1. Nueva navegación es registrada,
2. Llamamos a los `beforeRouteLeave` registrados del componente que dejamos.
3. Llamamos a los `beforeEach` globales registrados.
4. Llamamos a los `beforeRouteUpdate` registrados si es un cambio de parámetro
5. Llamamos al `beforeEnter` configurado en la ruta.
6. Resolvemos la ruta.
7. Llamamos al `beforeRouteEnter` en el componente al que vamos.
8. Navegación confirmada.
9. Llamamos a los `afterEach` globales registrados.
11. Lanzamos actualizaciones en el DOM.
12. Llamamos a los callbacks pasados a `next` en `beforeRouteEnter`

## 2.11. Route Meta Fields

Existirá ocasiones donde queramos crear configuraciones personalizadas a partir de cierta meta información.

Por ejemplo, puede que queramos indicar si una ruta es de acceso público o privado o si tenemos un sistema de roles, quien tiene acceso y quien no.

Para esto crearon la meta información: Campos que nos indican datos sobre la ruta. Se definen d ela siguiente manera:

```js
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      children: [
        {
          path: 'bar',
          component: Bar,
          // meta campo
          meta: { requiresAuth: true }
        }
      ]
    }
  ]
})
```

Estos datos nos pueden ser muy útiles para luego consultarlo en los navigations guarda. Puede darse el caso en el que estos campos nos indiquen si se require autenticación o no.

```js
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Esta ruta requiere auth, comprobamos si el usuario está logueado
    // si no lo está se le redirige a la pagina de login
    if (!auth.loggedIn()) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // recuerda siempre llamar a next()!!
  }
}
```

## 2.12. Data Fetching

Los navegation guards son un buen momento para realizar llamadas a servidor. Gracias a ellos podemos tener dos aproximaciones.

### 2.12.1. Fetching After Navigation

Un caso en el que da igual cuando se obtengan los datos, en donde podemos cargarlos después de la navegación.

Es el sistema que llevamos usando todos estos días:

```html
<template>
  <div class="post">
    <div class="loading" v-if="loading">
      Loading...
    </div>

    <div v-if="error" class="error">
      {{ error }}
    </div>

    <div v-if="post" class="content">
      <h2>{{ post.title }}</h2>
      <p>{{ post.body }}</p>
    </div>
  </div>
</template>
```

```js
export default {
  data () {
    return {
      loading: false,
      post: null,
      error: null
    }
  },
  mounted () {
    // obtiene los datos cuando la vista está creada
    this.fetchData()
  },
  watch: {
    // llama otra vez si la ruta ha cambiado
    '$route': 'fetchData'
  },
  methods: {
    fetchData () {
      this.error = this.post = null
      this.loading = true
      // reemplaza `getPost` con tu api de obtención de datos
      getPost(this.$route.params.id, (err, post) => {
        this.loading = false
        if (err) {
          this.error = err.toString()
        } else {
          this.post = post
        }
      })
    }
  }
}
```

### 2.12.2. Fetching Before Navigation

O puede que necesitemos saber si hay navegación a partir de los datos de servidor. En este caso usaremos, los navegation guardas:

```js
export default {
  data () {
    return {
      post: null,
      error: null
    }
  },

  beforeRouteEnter (to, from, next) {
    getPost(to.params.id, (err, post) => {
      next(vm => vm.setData(err, post))
    })
  },

  beforeRouteUpdate (to, from, next) {
    this.post = null
    getPost(to.params.id, (err, post) => {
      this.setData(err, post)
      next()
    })
  },

  methods: {
    setData (err, post) {
      if (err) {
        this.error = err.toString()
      } else {
        this.post = post
      }
    }
  }
}
```

## 2.13. Lazy Loading Routes

Podemos cargar módulos de manera asíncrona y bajo demanda.

```js
const Foo = () => Promise.resolve({ /* component definition */ })
```

```js
import('./Foo.vue') // returns a Promise
```

```js
const Foo = () => import('./Foo.vue')
```

```js
const router = new VueRouter({
  routes: [
    { path: '/foo', component: Foo }
  ]
})
```

### 2.13.1. Grouping Components in the Same Chunk

```js
const Foo = () => import(/* webpackChunkName: "group-foo" */ './Foo.vue')
const Bar = () => import(/* webpackChunkName: "group-foo" */ './Bar.vue')
const Baz = () => import(/* webpackChunkName: "group-foo" */ './Baz.vue')
```

#  3. Ejercicio "navegación por roles"

* Tenemos que crear 4 rutas que hagan lo siguiente:
  * A la ruta **login** 
    * Pueden acceder todas las personas (público)
    * Se tiene que indicar alias y password
  * A la ruta **register**
    * Pueden acceder todas las personas (público)
    * Se tiene que indicar datos de usuario como formulario de registro (4-5 mínimo)
  * A la ruta **home** puede acceder usuarios registrados con role (user y admin)
    * Tienen que mostrarse los datos del usuario
  * A la ruta **admin** solo pueden acceder los admin
    * Tienen que poder gestionar los datos de cualquier usuario
    * El admin puede hacer admin a otros usuarios.

* A un usuario sin acceso a una ruta, se le redirigirá a **login**
* Habrá un botón de Log out que nos llevará a **login** y que nos cerrará la sesión.
* Todo se tiene que guardar en localstorage.

