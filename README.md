Este proyecto es un **dashboard administrativo de demostración**, desarrollado en PHP, HTML, CSS y JavaScript. No utiliza base de datos real; toda la persistencia de datos se maneja mediante **LocalStorage**, lo que permite simular un panel administrativo completamente funcional sin backend.

El objetivo principal es mostrar una arquitectura realista de un panel administrativo moderno:
✔ CRUDs (usuarios, productos, pedidos)
✔ configuración del sistema
✔ soporte para modo claro/oscuro

# 🚀 **Arquitectura general**

El dashboard utiliza PHP únicamente para estructurar páginas y componentes compartidos:

* `header.php`
* `sidebar.php`
* `dashboard.php`
* `usuarios.php`
* `productos.php`
* `pedidos.php`
* `config.php`

No hay lógica de servidor ni consultas SQL.

Toda la funcionalidad está en JavaScript, distribuida así:

### ✔ `config.js` – Manejo de configuración del sistema

Incluye nombre del panel, tema (light/dark), color primario y logo, todo guardado en LocalStorage.


### ✔ `app.js` – Lógica general del dashboard

Sidebar colapsable, conteo de datos demo y notificaciones.


### ✔ `users.js`, `products.js`, `orders.js` – CRUDs 100% en LocalStorage

Cada módulo implementa:

* lectura de datos desde LocalStorage
* render dinámico de tablas
* modales para crear/editar
* persistencia sin backend

Ejemplo de CRUD de usuarios:


---

# 📦 **Persistencia con LocalStorage**

El panel simula una base de datos usando LocalStorage.

Ejemplo: carga inicial de usuarios ficticios:

```js
localStorage.setItem("users", JSON.stringify(users));
```

Esto permite que los datos persistan entre recargas sin servidor real, haciendo el proyecto ideal como:

* Demo profesional
* Prototipo de UI
* Base para un panel real más adelante

---

# 🌗 **Sistema de Temas (Dark / Light)**

El cambio de tema se guarda en LocalStorage:

```js
localStorage.setItem("themeMode", mode);
```

Y se aplica mediante un atributo:

```js
applyTheme(mode);
```
