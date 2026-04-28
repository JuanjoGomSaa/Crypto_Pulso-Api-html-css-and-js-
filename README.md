# CryptoPulse Dashboard

Live Demo: [https://crypto-pulso-api-html-css-and-js.vercel.app/](https://crypto-pulso-api-html-css-and-js.vercel.app/)

## Descripción

CryptoPulse es un dashboard web desarrollado con **HTML, CSS y JavaScript puro (Vanilla JS)** que consume una API de criptomonedas para mostrar información en tiempo real.

El proyecto permite visualizar monedas, buscar, filtrar, marcar favoritos y ver datos dinámicos actualizados desde una API externa.

Este proyecto fue creado con enfoque en **práctica real de frontend moderno sin frameworks**, manejo de estado y consumo de APIs.

---

## Funcionalidades

- 🔎 Buscador en tiempo real de criptomonedas
- 📊 Listado dinámico de coins desde API
- ⭐ Sistema de favoritos (guardado en localStorage)
- 📉 Visualización de datos como precio, cambio y ranking
- 🔄 Render dinámico sin recargar la página
- 🧠 Manejo de estado global simple (state pattern)
- ⚡ Interfaz responsive

---

## Tecnologías utilizadas

- HTML5
- CSS3 (Flexbox / Grid)
- JavaScript (ES6+)
- Fetch API
- LocalStorage
- Vercel (deploy)

---

## Arquitectura del proyecto

El proyecto está organizado en módulos:
 - /js
 - /api → llamadas a la API
 - /ui → renderizado de componentes
 - /state → estado global
 - /utils → helpers
 - main.js → entry point


---

##  Aprendizajes clave

- Consumo de APIs REST con `fetch`
- Separación de responsabilidades en frontend
- Manejo de estado sin frameworks
- Render dinámico del DOM
- Persistencia de datos con localStorage
- Debugging de errores de módulos y rutas

---

##  Cómo ejecutar el proyecto

1. Clona el repositorio
2. Abre el proyecto en VS Code
3. Usa Live Server o similar
4. Abre `index.html` en el navegador

---

##  Mejoras futuras

- Gráficas de evolución de precios
- Paginación o infinite scroll
- Filtros avanzados (market cap, volumen)
- Integración con más APIs
- Modo oscuro

---

##  Autor

Proyecto desarrollado como parte de práctica de desarrollo frontend con enfoque en proyectos reales de portafolio.
