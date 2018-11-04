# Clase 3

## Planning del día 

1. Repaso clase anterior
2. Formularios
3. Comunicación entre componentes
4. Propiedades computadas y Watchers
5. Ejercicio "Registro de usuarios"
6. Conceptos avanzados de Vue
7. Ejercicio "Carrito de la compra"

## Índice 

* [1. Formularios](#1.-Formularios)
    * [1.1. Uso básico](#1.1.-Uso-básico)
        * [1.1.1. Texto](#1.1.1.-Texto)
        * [1.1.2. Texto multilínea](#1.1.2.-Texto-multilínea)
        * [1.1.3. Checkbox](#1.1.3.-Checkbox)
        * [1.1.4. Radio](#1.1.4.-Radio)
        * [1.1.5. Select](#1.1.5.-Select)
    * [1.2. Enlazando valores](#1.2.-Enlazando-valores)
        * [1.2.1. Checkbox](#1.2.1.-Checkbox)
        * [1.2.2. Radio](#1.2.2.-Radio)
        * [1.2.3. Select](#1.2.3-Select)
    * [1.3. Modificadores](#1.3.-Modificadores)
* [2. Comunicación entre componentes](#2.-Comunicación-entre-componentes)
    * [2.1. Props](#2.1.-Props)
        * [2.1.1. Nomenclatura de las props](#2.1.1.-Nomenclatura-de-las-props)
        * [2.1.2. Tipado de las props](#2.1.2.-Tipado-de-las-props)
        * [2.1.3. Pasando props estáticas o dinámicas](#2.1.3.-Pasando-props-estáticas-o-dinámicas)
            * [2.1.3.1. Pasando un número](#2.1.3.1.-Pasando-un-número)
            * [2.1.3.2. Pasando un booleano](#2.1.3.2.-Pasando-un-booleano)
            * [2.1.3.3. Pasando un array](#2.1.3.3.-Pasando-un-array)
            * [2.1.3.4. Pasando un objeto](#2.1.3.4.-Pasando-un-objeto)
            * [2.1.3.5. Pasando las propiedades de un objeto](#2.1.3.5.-Pasando-las-propiedades-de-un-objeto)
        * [2.1.4. Flujos en una única dirección](#2.1.4.-Flujos-en-una-única-dirección)
        * [2.1.5. Validación de props](#2.1.5.-Validación-de-props)
        * [2.1.6. Atributos que no son props](#2.1.6.-Atributos-que-no-son-props)
    * [2.2. Evento personalizados](#2.2.-Evento-personalizados)
        * [2.2.1. Nomenclatura de los eventos personalizados](#2.2.1.-Nomenclatura-de-los-eventos-personalizados)
        * [2.2.2. Enlazando eventos nativos a un componente](#2.2.2.-Enlazando-eventos-nativos-a-un-componente)
        * [2.2.3. El modificador `.sync`](#2.2.3.-El-modificador-.sync)
* [3. Propiedades computadas y watchers](3.-Propiedades-computadas-y-watchers)
    * [3.1. Ejemplo básico](#3.1-Ejemplo-básico)
    * [3.2. Propiedades computadas vs Métodos](#3.2.-Propiedades-computadas-vs-Métodos)
    * [3.3. Propiedades computadas vs propiedades observadas](#3.3.-Propiedades-computadas-vs-propiedades-observadas)
    * [3.4. Asignando valores a propiedades computadas](#3.4.-Asignando-valores-a-propiedades-computadas)
* [4. Ejercicio "Registro de usuarios"](#Ejercicio-"Registro-de-usuarios")
* [5. Conceptos avanzados de Vue](#5.-Conceptos-avanzados-de-Vue)
    * [5.1. Slots](#5.1.-Slots)
        * [5.1.1. Slot Content](#5.1.1.-Slot-Content)
        * [5.1.2. Nombrado de slots](#5.1.2.-Nombrado-de-slots)
        * [5.1.3. Slot por defecto](#5.1.3.-Slot-por-defecto)
        * [5.1.4. Scope de compilación](#5.1.4.-Scope-de-compilación)
    * [5.2. Filtros](#5.2.-Filtros)
    * [5.3. Directivas](#5.3.-Directivas)
        * [5.3.1. Ciclo de vida de una directiva y los hooks](#5.3.1.-Ciclo-de-vida-de-una-directiva-y-los-hooks)
        * [5.3.2. Parámetros de los hooks](#5.3.2.-Parámetros-de-los-hooks)
        * [5.3.3. Shorthand](#5.3.3.-Shorthand)
        * [5.3.4. Objeto como parámetro de la directiva](#5.3.4.-Objeto-como-parámetro-de-la-directiva)
    * [5.4. Mixins](#5.4.-Mixins)
        * [5.4.1. Cómo mezcla los objetos](#5.4.1.-Cómo-mezcla-los-objetos)
        * [5.4.2. Mixins globales](#5.4.2.-Mixins-globales)
* [6. Ejercicio "Carrito de la compra"](#6.-Ejercicio-"Carrito-de-la-compra")

# 1. Formularios

## 1.1. Uso básico

Al igual que nosotros podemos enlazar datos de un modelo para que se muestren por pantalla, podemos enlazar elementos de formulario como `input` o `select` para obtener datos de los usuarios y guardarlos en nuestros modelos.

La manera de hacerlo es por medio de la directiva `v-model`. Es una directiva que nos permite hacer doble enlace de datos y que no es más que azucar sintáctico de todo lo que ya hemos enseñado en el curso.

> TIP: recuerda que cuando indcas `v-model` en un elemento de tu formulario, el valor inicial de estos elementos será ignorado. Si necesitas un valor por defecto en tu formulario, inicializa tus modelos en `data`.

### 1.1.1. Texto

Empecemos por el uso más simple:

```html
<input v-model="message" placeholder="Edítame">
<p>El mensaje es: {{ message }}</p>
```

### 1.1.2. Texto multilínea

Con los `textarea` tambien funciona:

```html
<span>El mensaje multilínea es:</span>
<p style="white-space: pre-line;">{{ message }}</p>
<br>
<textarea v-model="message" placeholder="Añade múltiples líneas"></textarea>
```

### 1.1.3. Checkbox

Si queremos guardar un valor booleano, podemos usar un simple checkbox:

```html
<input type="checkbox" id="checkbox" v-model="checked">
<label for="checkbox">{{ checked }}</label>
```

Y si queremos guardar el valor de varias opciones:

```html
<div id='example-3'>
  <input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
  <label for="jack">Jack</label>
  <input type="checkbox" id="john" value="John" v-model="checkedNames">
  <label for="john">John</label>
  <input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
  <label for="mike">Mike</label>
  <br>
  <span>Nombres confirmados: {{ checkedNames }}</span>
</div>
```
```js
new Vue({
  el: '#example-3',
  data: {
    checkedNames: []
  }
})
```
Se guardarán en un array. Algo muy útil si necesitamos iterar entre las seleccionadas.

### 1.1.4. Radio

Si tenemos que elegir entre una de las opciones dadas, usaremos un `radiobutton`:

```html
<input type="radio" id="one" value="Uno" v-model="picked">
<label for="one">Uno</label>
<br>
<input type="radio" id="two" value="Dos" v-model="picked">
<label for="two">Dos</label>
<br>
<span>Elección: {{ picked }}</span>
```

### 1.1.5. Select

Si tenemos un `select` de opción única:

```html
<select v-model="selected">
  <option disabled value="">Por favor, selecciona uno</option>
  <option>A</option>
  <option>B</option>
  <option>C</option>
</select>
<span>Seleccionado: {{ selected }}</span>
```
```js
new Vue({
  el: '...',
  data: {
    selected: ''
  }
})
```

> TIP: Recuerda que si el valor inicial no corresponde con ninguno de los valores seleccionables, el `select` se quedará en un estado de no seleccionado.

Y si contamos con una selección múltiple: 

```html
<select v-model="selected" multiple>
  <option>A</option>
  <option>B</option>
  <option>C</option>
</select>
<br>
<span>Seleccionados: {{ selected }}</span>
```

Si queremos combinarlo con un `v-for`:

```html
<select v-model="selected">
  <option v-for="option in options" v-bind:value="option.value">
    {{ option.text }}
  </option>
</select>
<span>Seleccionado: {{ selected }}</span>
```
```js
new Vue({
  el: '...',
  data: {
    selected: 'A',
    options: [
      { text: 'Uno', value: 'A' },
      { text: 'Dos', value: 'B' },
      { text: 'Tres', value: 'C' }
    ]
  }
})
```

## 1.2. Enlazando valores

Como vemos, con `v-model` podemos enlazar valores que por lo general son estáticos. Veamos otras vez estos casos:

```html
<!-- `picked` es un string "a" cuando pulsamos -->
<input type="radio" v-model="picked" value="a">

<!-- `toggle` fluctua entre true o false -->
<input type="checkbox" v-model="toggle">

<!-- `selected` es un string "abc" cuando la primera opción es selccionada -->
<select v-model="selected">
  <option value="abc">ABC</option>
</select>
```

Pero a veces poríamos querer tener valores dinámicos. Para conseguirlo, combinaríamos `v-model` con `v-bind`. Veamos cómo:

### 1.2.1. Checkbox

```html
<input
  type="checkbox"
  v-model="toggle"
  true-value="yes"
  false-value="no"
>
```
```js
// cuando marcas:
vm.toggle === 'yes'
// cuando desmarcas:
vm.toggle === 'no'
```

### 1.2.2. Radio

```html
<input type="radio" v-model="pick" v-bind:value="a">
```
```js
// cuando marcas:
vm.pick === vm.a
```

### 1.2.3. Select

```html
<select v-model="selected">
  <!-- podemos indicar un objecto literal -->
  <option v-bind:value="{ number: 123 }">123</option>
</select>
```
```js
// cuando seleccionamos:
typeof vm.selected // => 'object'
vm.selected.number // => 123
```


## 1.3. Modificadores


* `.number`

Si necesitamos que un valor de un modelo sea de tipo `Number` en vez de string, podemos hacer una conversión instantanea:

```html
<input v-model.number="age" type="number">
```

* `.trim`

Lo mismo si necesitas quitar espacios de la cadena que indica el usuario. Tendríamos un `trim` automático:

```html
<input v-model.trim="msg">
```

# 2. Comunicación entre componentes

Hemos hablado mucho sobre cómo enlazar y obtener datos de la interfaz. Hemos tambien habla de cómo crear componentes simples y de su ciclo de vida, pero no hemos hablado de cómo podemos comunicarnos entre componentes.

La comuncación entre componentes es la siguiente:

![Comunicacion de componentes](imgs/comunicacion.png)

Hablemos del paso de propiedades y de la emisión de eventos:

## 2.1. Props

Las props de un componente son los parámetros de entrada que un componente permite para configurar su comportamiento por defecto. Un componente padre puede instanciar y configurar un componente visual por medio de props.

Vamos a ver cómo se usan y todas sus peculiaridades:

### 2.1.1. Nomenclatura de las props

Para indicar las propiedades de un componente simplemente tenemos que indicar un array con las propiedades en `props` de un componente. Podemos nombrar las propiedades como camelCase y kebab-case:

```js
Vue.component('blog-post', {
  // camelCase in JavaScript
  props: ['postTitle'],
  template: '<h3>{{ postTitle }}</h3>'
})
```

Cuando queramos usar un componente, simplemente tendremos que hacer uso de él e indicar las propiedades requeridas. En el HTML las props tienen que estar escritas en kebab-case siempre:

```js
<!-- kebab-case en HTML -->
<blog-post post-title="hello!"></blog-post>
```

### 2.1.2. Tipado de las props

Las props son tipadas. Esto quiere decir que nosotros tenemos que indicar al usuario de nuestro componente qué tipo de datos se puede incluir en una prop. 

Si indicamos las props como un array de props, automáticamente son de tipo `string`.

```js
props: ['title', 'likes', 'isPublished', 'commentIds', 'author']
```

Por tanto, la mejor forma de declarar props en un componente es por medio de un objeto donde indiquemos en tipo de cada prop:

```js
props: {
  title: String,
  likes: Number,
  isPublished: Boolean,
  commentIds: Array,
  author: Object
}
```

Esto es útil, porque en tiempo de desarrollo, las developer tools nos indicarán si estamos haciendo un mal uso de estas propiedades. Nos ayuda a crear mejores componentes.

### 2.1.3. Pasando props estáticas o dinámicas

Nosotros podemos pasar datos estáticos o dinamicos a nuestras propiedades.

Por ejemplo, si no indico un `v-bind:` o un `:`, directamente, el compilador entenderá que le estamos pasando un valor 'hardcodeado':

```html
<blog-post title="My journey with Vue"></blog-post>
```

Pero puedo indicar variables, para que los componentes reaccionen a cambios del padre:

```html
<!-- Asignamos dinámicamente el valor de la variable -->
<blog-post v-bind:title="post.title"></blog-post>

<!-- Asignamos dinámicamente el valor de una expresión compleja -->
<blog-post v-bind:title="post.title + ' by ' + post.author.name"></blog-post>
```

#### 2.1.3.1. Pasando un número

Cuidado cuando tengamos pasar un número a un componente y lo queramos hacer de manera estática ya que el compilador lo interpretará como un string, por eso, en estos casos, siempre lo indicaremos con `v-bind` o su shorthand (`:`):

```html
<!-- Aunque `42` es estático, necesitamos v-bind para indicarle el valor a Vuet -->
<blog-post v-bind:likes="42"></blog-post>

<!-- Asignamos dinámicamente el valor de la variable -->
<blog-post v-bind:likes="post.likes"></blog-post>
```

#### 2.1.3.2. Pasando un booleano

Cuando indicamos un valor booleano, siemplemente podemos marcar la propiedad. Esto siempr eindicará un `true`:

```html
<blog-post is-published></blog-post>
```
Si queremos pasar un `false`, lo recomendable es poner un valor por defecto a la prop, o si no, indicarlo dinámicamente:

```html
<blog-post v-bind:is-published="false"></blog-post>

<blog-post v-bind:is-published="post.isPublished"></blog-post>
```

#### 2.1.3.3. Pasando un array

Podemos pasar un array de manera dinámica tambien a un componente:

```html
<blog-post v-bind:comment-ids="[234, 266, 273]"></blog-post>

<blog-post v-bind:comment-ids="post.commentIds"></blog-post>
```

#### 2.1.3.4. Pasando un objeto

O los datos de un objeto:

```html
<blog-post v-bind:author="{ name: 'Veronica', company: 'Veridian Dynamics' }"></blog-post>

<blog-post v-bind:author="post.author"></blog-post>
```

#### 2.1.3.5. Pasando las propiedades de un objeto

En vez de ir pasando una a una las props a un componente, podemos pasarle todos los datos a la vez. Teniendo este objeto que lo queremos pasar a un componente:

```js
post: {
  id: 1,
  title: 'My Journey with Vue'
}
```

Esta forma de instanciarlo:

```html
<blog-post v-bind="post"></blog-post>
```

Y esta:

```html
<blog-post
  v-bind:id="post.id"
  v-bind:title="post.title"
></blog-post>
```

Hacen lo mismo

### 2.1.4. Flujos en una única dirección

Tenemos que recordar que las props solo pueden ser actualizadas en una única dirección, es decir, solo el padre puede actualizar las props de un componente. Un hijo no puede alterar el valor de las props para que su padre haga cosas.

Esto tambien nos está indicando que hay que tener cuidado si internamente de un componente intentamos mutar una prop. Si solo los padres tienen la prioridad en la mutación de una prop (es decir, que el ultimo valor indicado por un componente padre es el que predomina como valor en las props pasadas a los hijos), las mutaciones que los hijos hayan hecho, desaparecerán:

Además, habrá dos casos donde querremos poder mutar props dentro de un componente hijo:

1. **Cuando una prop es usada como valor inicial y queremos luego poder manipular ese dato**. En ese caso, es mejor usar la prop para iniciar el valor del data de la siguiente manera:

```js
props: ['initialCounter'],
data: function () {
  return {
    counter: this.initialCounter
  }
}
```

2. **Cuando internamente, necesitamos transformar el valor dentro del componente**. Lo haríamos con una computada (explicaremos en un rato):

```js
props: ['size'],
computed: {
  normalizedSize: function () {
    return this.size.trim().toLowerCase()
  }
}
```

### 2.1.5. Validación de props

Por otro lado, tenemos diferentes maneras de validar que los datos que nos pasan son correctos:

```js
Vue.component('my-component', {
  props: {
    // Comprobación de tipos básica (`null` relaciona con cualquier tipo)
    propA: Number,

    // Posibilidad de multiples tipos
    propB: [String, Number],

    // Prop obligatoria
    propC: {
      type: String,
      required: true
    },

    // Number con un valor por defecto
    propD: {
      type: Number,
      default: 100
    },

    // Objecto con valor por defecto
    propE: {
      type: Object,
      // Los objecto y array tiene que setear por defecto con una función factoría
      default: function () {
        return { message: 'hello' }
      }
    },

    // Validador personalizado
    propF: {
      validator: function (value) {
        // The value must match one of these strings
        return ['success', 'warning', 'danger'].indexOf(value) !== -1
      }
    }
  }
})
```

> TIP: recuerda que las props serán validades antes de instanciar el componente. Esto quiere decir que en las validaciones no tendrás acceso ni a `data` ni a `computed`.

**Comprobación de tipos**

Los tipos por defecto validos, corresponden con todos los tipos de JavaScript:

* String
* Number
* Boolean
* Array
* Object
* Date
* Function
* Symbol

Podemos crear tipos nuevos:

```js
function Person (firstName, lastName) {
  this.firstName = firstName
  this.lastName = lastName
}
```

Y lo podemos usar así:

```js
Vue.component('blog-post', {
  props: {
    author: Person
  }
})
```

### 2.1.6. Atributos que no son props

Puede que algunos componentes necesiten atribútos que no tienen un mapeo con una propiedad. ALgunas librerías de terceros así lo podrían pedir. Estos atributos se añaden a su nodo raíz.

Por ejemplo:

```html
<bootstrap-date-input data-date-picker="activated"></bootstrap-date-input>
```

## 2.2. Evento personalizados

Como hemos dicho, los componentes padres se comunican con sus componentes hijos por medio de props. También hemos dicho que el flujo de información es unidireccional. Esto quiere decir que los componentes padres pueden mutar las props a sus elementos hijos, pero la mutación de las props en los componentes hijos, no afecta para nada en la de los padres.

¿Cómo podemos enviar información desde los componentes hijos hacia los componentes padres? Por medio de eventos personalizados.

### 2.2.1. Nomenclatura de los eventos personalizados

Cuando queramos emitir acciones o datos a los componentes padres, tendremos que usar el método de vue llamado `$emit`. 

La nomenclatura tiene que ser sí o sí camlCase:

```js
this.$emit('myEvent')
```

Un componente padre puede estar o no interesado en escuchar estos eventos. Para escuchar, simplemente usaremos `v-on` o su shorthand (`@`) y el nombre de como hayamos llamado a nuestro evento:


```html
<my-component v-on:my-event="doSomething"></my-component>
```

### 2.2.2. Enlazando eventos nativos a un componente

Puede que tengamos ocasiones, donde tengamos choque entre eventos nativos y eventos personalizados. Contamos con un modificador que nos permite indicar si lo que queremos es escuchar un evento personalizado o un evento nativo:


```html
<base-input v-on:focus.native="onFocus"></base-input>
```

### 2.2.3. El modificador `.sync`

Puede darse el caso que lo que nos interese es tener un doble enlace de datos (es decir que una propiedad sea de lectura y escritura entre padre e hijo). Como hemos dicho, no es posible en vue y es mala práctica porque acoplamos los componentes.

Un buen patrón para conseguir esto es usar la siguiente nomenclatura para realizar esto con props y eventos prsonalizados:

```js
this.$emit('update:title', newTitle)
```
```html
<text-document
  v-bind:title="doc.title"
  v-on:update:title="doc.title = $event"
></text-document>
```

Pero vue ha visto que mucha gente lo usa y ha creado un poco de azúcar sintáctico para que sea más fácil hacer doble enlace de datos por medio del modificador `.sync`:

```html
<text-document v-bind.sync="doc"></text-document>
```

Como decimos, no es recomendado su uso, aunque puede haber casos en los que sea necesario.

# 3. Propiedades computadas y watchers

Dejando de un lado la comunicación entre componentes (volveremos a ello en el tema de vuex), vamos a centrarnos en las posibilidades que nos da la reactividad en vue.

Veamos el siguiente código:

```html
<div id="example">
  {{ message.split('').reverse().join('') }}
</div>
```

Esta template, se encarga de mostrar un texto en el orden contrario al que se encuentra. Como dijimos, las expresiones javascript y la ejecución de cierto código, está disponible dentro de un template.

Sin embargo, a la larga, este tipo de código no escala y es poco mantenible. Si nos fijamos, no estamos realizando una separación de conceptos correcto (ejecuto JS en HTML).

Pero el código lo necesitamos por negocio ¿cómo podemos tener este código en nuestro componente y a la vez no se encuentre en el HTML? Por medio de propiedades computadas.

Una propiedad computada es una propiedad de lectura y escritura que reacciona a cambios en el modelo. Es decir, cuando un `data` o una `prop` muta, las propiedades computadas serán calculadas de nuevo.

## 3.1. Ejemplo básico

El ejemplo de antes quedará de la siguiente manera con una propiedad computada:

```html
<div id="example">
  <p>Mensaje original: "{{ message }}"</p>
  <p>Mensaje inverso computado: "{{ reversedMessage }}"</p>
</div>
```
```js
var vm = new Vue({
  el: '#example',
  data: {
    message: 'Hello'
  },
  computed: {
    reversedMessage: function () {
      return this.message.split('').reverse().join('')
    }
  }
})
```

Para nosotros, son una propiedas más del modelo. Podemos hacer lo siguiente:

```js
console.log(vm.reversedMessage) // => 'olleH'
vm.message = 'Goodbye'
console.log(vm.reversedMessage) // => 'eybdooG'
```

## 3.2. Propiedades computadas vs Métodos

Si os dáis cuenta, el trabajo que hace una computada, podría realizarlo un método:

```html
<p>Reversed message: "{{ reverseMessage() }}"</p>
```
```js
// en el componente
methods: {
  reverseMessage: function () {
    return this.message.split('').reverse().join('')
  }
}
```

Lo malo de los métodos es que no cachean los resultados. 

Esto puede ser bueno o malo, dependiendo de lo que necesitamos, por ejemplo. Si usamos la siguiente computada, estaremos haciendo las cosas mal, porque al no mutar nada, se provocará un cacheo que no debería hacer:

```js
computed: {
  now: function () {
    return Date.now()
  }
}
```

## 3.3. Propiedades computadas vs propiedades observadas

Puede darse el caso en que necesitemos escuchar lo que ocurre con una propiedad del modelo y realizar una acción. Esto se hace con los `watchers`.

Son más imperativos y te hacen escribir más código, pero a veces son necesarios.

El siguiente ejemplo es un mal uso de los `watch`:

```html
<div id="demo">{{ fullName }}</div>
```
```js
var vm = new Vue({
  el: '#demo',

  data: {
    firstName: 'Foo',
    lastName: 'Bar',
    fullName: 'Foo Bar'
  },

  watch: {
    firstName: function (val) {
      this.fullName = val + ' ' + this.lastName
    },

    lastName: function (val) {
      this.fullName = this.firstName + ' ' + val
    }
  }
})
```

Porque si vemos si lo hiciesemos con una computada, el resultado sería más declarativo y limpio:

```js
var vm = new Vue({
  el: '#demo',

  data: {
    firstName: 'Foo',
    lastName: 'Bar'
  },

  computed: {
    fullName: function () {
      return this.firstName + ' ' + this.lastName
    }
  }
})
```

Mucho mejor, ¿no? :)

## 3.4. Asignando valores a propiedades computadas

Cuando creamos una propiedad computada como las anteriores, estamos indicando que son de tipo `getter` por defecto. Es decir, solo son ejecutadas cuando el template pide obtener su valor.

Pero ¿Qué ocurre si queremos que, al asignar un valor a una computada también pasen cosas?

Que tenemos que configurar su `setter` para conseguir un comportamiento idóneo:

```js
// ...
computed: {
  fullName: {
    // getter
    get: function () {
      return this.firstName + ' ' + this.lastName
    },
    // setter
    set: function (newValue) {
      var names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
  }
}
// ...
```

# 4. Ejercicio "Registro de usuarios"

* Hagmos un formulario de usuarios
* Tenemos que guardar:
    * el nombre (máx 30), 
    * seleccionar foto desde el ordenador
    * los apellidos (máx 50), 
    * edad,
    * páis (se tiene que cargar por API - restcountries.eu) 
    * redes sociales que tiene
    * tiene que aceptar las condiciones de uso
* Hay que mostrar los caracteres que me quedan disponibles en los que tengan máximo
* Tenemos que hacer validaciones
* Tenemos que mostrar los errores de validación
* Los input que sean incorrectos que se pinten de rojo
* Cuando el usuario pulse Aceptar, los datos nos tiene que salir convertidos en una carta mostrando todo

# 5. Conceptos avanzados de Vue

Con lo esudiado anteriormente ya tenemos mucho aprendido d ela librería y ya podríamos defendernos sin problemas en el mundo real. Vamos a explicar ahora una serie de conceptos que nos van a permitir comprender casi el 100% de la librería:

## 5.1. Slots

Hasta ahora, casi todos los componentes que hemos creado eran de tipo línea. Pero como sabemos en HTML hay dos tipos de componentes de tipo línea y de tipo bloque.

Los de tipo línea son aquellos componentes que tienen un comportamiento determinado y que siempre forman las hojas de nuestro arbol DOM. Los de tipo bloque, además de tener un comportamient determinado, nos permiten envolver internamente otros componentes. 

`slot` es un elemento de vue que nos va a permitir indicar en un componente `huecos` donde puedan incluirse otros componentes. Es una forma util de poder crear componentes de bloque en vue.

### 5.1.1. Slot Content

Un `slot` nos va a permitir crear componentes como este:

```html
<navigation-link url="/profile">
  Your Profile
</navigation-link>
```

`navigator-link` es un componente que nos permite navegar a otra zona de la aplicación, pinchando en cualquier parte del contenido interno

Internamente este componente está declarado así:

```html
<a
  v-bind:href="url"
  class="nav-link"
>
  <slot></slot>
</a>
```

Nosotros podemos incluir todo lo que queramos dentro del espacio que nos presta el componente `navigation-link`:

```html
<navigation-link url="/profile">
  <!-- Add a Font Awesome icon -->
  <span class="fa fa-user"></span>
  Your Profile
</navigation-link>
```

Incluso el de poder incluir otros componentes:

```html
<navigation-link url="/profile">
  <!-- Use a component to add an icon -->
  <font-awesome-icon name="user"></font-awesome-icon>
  Your Profile
</navigation-link>
```

### 5.1.2. Nombrado de slots

Un componente puede hacer uso de varios `slots` con nombre para que quien use el componente sepa dónde puede rellenar con esos huecos.

Por ejemplo, los `slots` son muy utiles cuando queremos crear pequeños layouts predefinidos. Queremos crear este layout típico:

```html
<div class="container">
  <header>
    <!-- Aquí queremos el contenido del header -->
  </header>
  <main>
     <!-- Aquí queremos el contenido del main -->
  </main>
  <footer>
    <!-- Aquí queremos el contenido del footer -->
  </footer>
</div>
```

Con el nombrado de `slot`s podemos hacerlo:

```html
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>
```

Ahora si queremos hacer uso de ello: 

```html
<base-layout>
  <template slot="header">
    <h1>Here might be a page title</h1>
  </template>

  <p>A paragraph for the main content.</p>
  <p>And another one.</p>

  <template slot="footer">
    <p>Here's some contact info</p>
  </template>
</base-layout>
```

No hace flta que usemos `template`. Tambien podemos indicar elementos de HTML si tenemos una raíz:

```html
<base-layout>
  <h1 slot="header">Here might be a page title</h1>

  <p>A paragraph for the main content.</p>
  <p>And another one.</p>

  <p slot="footer">Here's some contact info</p>
</base-layout>
```

El resultado final será el siguiente:

```html
<div class="container">
  <header>
    <h1>Here might be a page title</h1>
  </header>
  <main>
    <p>A paragraph for the main content.</p>
    <p>And another one.</p>
  </main>
  <footer>
    <p>Here's some contact info</p>
  </footer>
</div>
```

### 5.1.3. Slot por defecto

Hay ocasiones en el que podamos indicar un marcado por defecto, si el componente padre no hace uso del espacio que se le cede:

```html
<button type="submit">
  <slot>Submit</slot>
</button>
```

### 5.1.4. Scope de compilación

Cada componente es compilado en su contexto. Esto quiere decir que un slot no tiene acceso al modelo interno. Yo puedo usar el modelo del padre, pero no el del hijo. 

Por tanto, en el ejemplo anterior. Al usar `navigation-link`, se tendrá acceso a `user.name` (modelo del padre), pero no a `url` (modelo del hijo)

```html
<navigation-link url="/profile">
  Logged in as {{ user.name }}
</navigation-link>
```

## 5.2. Filtros

Los filtros son una forma de crear transformaciones sobre los datos del modelo para que sean mostrados al usuario.

Su uso es de la siguiente forma:

```html
<!-- in mustaches -->
{{ message | capitalize }}

<!-- in v-bind -->
<div v-bind:id="rawId | formatId"></div>
```

Y podemos declararlas así:

```js
filters: {
  capitalize: function (value) {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
  }
}
```

O de manera global:

```js
Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})

new Vue({
  // ...
})
```

Los filtros se comportan como tuberías y podemos componerlos de las maneras que queramos:

```html
{{ message | filterA | filterB }}
```

Los filtros nos permiten indicarles parámetros de configuración:

```html
{{ message | filterA('arg1', arg2) }}
```

> TIP: recuerda que los filtros tienen que ser funciones puras. Es decir no puede acceder a datos de instancia. Los únicos datos con los que cuenta son los dados como parámetros de entrada.

## 5.3. Directivas

Hemos visto cómo usar directivas pero no cómo crearlas. Si nosotros necesitáramos una directiva con un comportamiento determinado lo haríamos de la siguiente forma.

Imagina que necesitamos marcar dónde tiene que estar el foco de la aplicación en un formulario al empezar. Podríamos hacerlo así:

```js
// Registrando una directiva personalizada llamada `v-focus`
Vue.directive('focus', {
  // Cuando se inserte la directiva dentro de DOM se ejecutará esta función
  inserted: function (el) {
    // Focus del elemento
    el.focus()
  }
})
```

Podemos definir directivas a nivel de componente:

```js
directives: {
  focus: {
    inserted: function (el) {
      el.focus()
    }
  }
}
```

Su uso sería el siguiente:

```html
<input v-focus>
```

### 5.3.1. Ciclo de vida de una directiva y los hooks

* **bind**: solo se llama la primera vez que se instancia en un elemento.

* **inserted**: se llama cuando el elemento que tiene la directiva está insertado en el HTML.

* **update**: se llama cuando algun nodo interno del componente ha cambiado.

* **componentUpdated**: se llama después de que el nodo o los nojos hijos hayan sido cambiados.

* **unbind**: se llama solo una vez, cuando la directiva es quitada del elemento en el que se encuentra.

### 5.3.2. Parámetros de los hooks

* **el**: Es el elemento donde se encuentra nuestra directiva. Nos permite manipular directamente el DOM.

* **binding**: Es un objeto que contiene lo siguiente:
  * **name**: El nombre de la directiva con el v- prefijo..
  * **value**: EL valor pasado a la directiva. Por ejemplo en v-mi-directiva="1 + 1" el valor sería 2.
  * **oldValue**: El valor anterior. Solo disponible en el hook update y componentUpdated. Esta disponible haya cambiado o no el valor.
  * **expression**: La expresión del enlace. Por ejemeplo en v-mi-directiva="1 + 1", la expresión sería "1 + 1".
  * **arg**: EL argumento pasado a la directiva. Por ejemplo si mi directiva es v-my-directive:foo, el argumento sería "foo".
  * **modifiers**:Un objeto que contiene el estado de los modificadores. Por ejemplo. si mi directiva es v-my-directive.foo.bar, el objeto sería { foo: true, bar: true }.

* **vnode**: El nodo virtual que ha producido la compilación.
* **oldVnode**: El nodo anterior a a compilación. SOlo disponible en los hooks update y componentUpdated.

### 5.3.3. Shorthand

Hay todavía una forma más sencilla de definir una directiva si solo necesitamos saber cómo se inserta y actualiza la directiva:

```js
Vue.directive('color-swatch', function (el, binding) {
  el.style.backgroundColor = binding.value
})
```

### 5.3.4. Objeto como parámetro de la directiva

Podemos pasar un objeto a una directiva:

```html
<div v-demo="{ color: 'white', text: 'hello!' }"></div>
```

Y accederíamos a ellos así:

```js
Vue.directive('demo', function (el, binding) {
  console.log(binding.value.color) // => "white"
  console.log(binding.value.text)  // => "hello!"
})
```

## 5.4. Mixins

Los mixins son una forma cómoda y sencilla de reutilizar funcionalidad entre componentes. Una vez que mezclamos los atributos de un mixin con un componente, este tendrá todos los atributos como suyos.

Veamos cómo se hace con un ejemplo, lo veremos más claro:

```js
// definimos un objeto con funcionalidad reutilizable
var myMixin = {
  created: function () {
    this.hello()
  },
  methods: {
    hello: function () {
      console.log('hello from mixin!')
    }
  }
}

// definimos un componente con un mixin
var Component = Vue.extend({
  mixins: [myMixin]
})

var component = new Component() // => "hello from mixin!"
```

### 5.4.1. Cómo mezcla los objetos

Puede que al mezclar los atributos de un mixin y de un componente tengamos algún conflicto por existir el atributo en ambos.

Por ejemplo, cuando queremos mezclar el `data`, tendrán prioridad los modelos declarados en el componente:

```js
var mixin = {
  data: function () {
    return {
      message: 'hello',
      foo: 'abc'
    }
  }
}

new Vue({
  mixins: [mixin],
  data: function () {
    return {
      message: 'goodbye',
      bar: 'def'
    }
  },
  created: function () {
    console.log(this.$data)
    // => { message: "goodbye", foo: "abc", bar: "def" }
  }
})
```

Cuando queremos mezclar los hooks del ciclo de vida, se ejecutarán por orden. No se pisa uno por otro, el mixin se ejecutará primero y después el del componente:

```js
var mixin = {
  created: function () {
    console.log('mixin hook called')
  }
}

new Vue({
  mixins: [mixin],
  created: function () {
    console.log('component hook called')
  }
})

// => "mixin hook called"
// => "component hook called"
```

Con los métodos pasa lo mismo con que con `data`. Si coinciden, tiene prioridad la configuración del componente:

```js
var mixin = {
  methods: {
    foo: function () {
      console.log('foo')
    },
    conflicting: function () {
      console.log('from mixin')
    }
  }
}

var vm = new Vue({
  mixins: [mixin],
  methods: {
    bar: function () {
      console.log('bar')
    },
    conflicting: function () {
      console.log('from self')
    }
  }
})

vm.foo() // => "foo"
vm.bar() // => "bar"
vm.conflicting() // => "from self"
```

### 5.4.2. Mixins globales

Podemos incluir un mixin de manera global. Eso sí, todos los componentes que instanciemos, tendrán esta funcionalidad: 

```js
// inject a handler for `myOption` custom option
Vue.mixin({
  created: function () {
    var myOption = this.$options.myOption
    if (myOption) {
      console.log(myOption)
    }
  }
})

new Vue({
  myOption: 'hello!'
})
// => "hello!"
```

Tened muy claro cuando usar o podremos ensuciar el contexto global del árbol de componentes

# 6. Ejercicio "Carrito de la compra"

* Tenemos que mostrar un listado de productos
* Tenemos un buscador por nombre del producto
* Podremos indicar el número de unidades a comprar
* Cada producto tiene un botón comprar
* Cuando pulsemos, se añadirá a un carrito
* El carrito nos indicará el total a pagar
* Componentizar lo máximo que podáis (producto, listado productos, buscador, listado productos compra...)
* Hay que usar:
  * Computada (buscador y cálculo total)
  * Filtro (formatear los valores monetarios)
  * Slot (listado de productos)