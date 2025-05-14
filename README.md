<p align="center">
  <a href="https://react.dev/" target="blank"><img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" width="120" alt="React Logo" /></a>
</p>

## 🧭 Weather App Frontend

Este proyecto es un frontend desarrollado con **React**, **TypeScript** y **Vite** que permite consultar el clima de distintas ciudades, gestionar favoritos y visualizar datos meteorológicos de manera interactiva. Se eligió **React** por su flexibilidad, ecosistema robusto y capacidad para construir interfaces de usuario dinámicas.

---

## ⚙️ Arquitectura del Proyecto

### Estructura del Proyecto

El proyecto sigue una estructura modular y organizada, donde cada funcionalidad principal (como `weather`, `auth`, etc.) está encapsulada en su propio módulo. Esto facilita la escalabilidad y el mantenimiento del código.

```
└── 📁weather-app
    └── 📁src
        └── 📁assets
        └── 📁components
            └── 📁ui
        └── 📁features
            └── 📁auth
            └── 📁core
            └── 📁weather
        └── 📁hooks
        └── 📁lib
        └── 📁config
        └── main.tsx
        └── router.tsx
        └── index.css
    └── 📁public
    └── .env
    └── .env-example
    └── .gitignore
    └── package.json
    └── tsconfig.json
    └── vite.config.ts
    └── README.md
```

### Decisiones de Diseño

- **Componentización**: Uso extensivo de componentes reutilizables para la interfaz de usuario.
- **Estado Global**: Manejo del estado global con **Zustand** para una gestión eficiente y escalable.
- **React Query**: Uso de **React Query** para la gestión de datos asincrónicos y el almacenamiento en caché.
- **TailwindCSS**: Estilización rápida y consistente con clases utilitarias.

---

## 📦 Paquetes y Herramientas Utilizadas

### Paquetes Principales

- **React**: Biblioteca principal para construir la interfaz de usuario.
- **React Router**: Navegación entre páginas de la aplicación.
- **Zustand**: Manejo del estado global de manera sencilla y eficiente.
- **React Query**: Gestión de datos asincrónicos y almacenamiento en caché.
- **Axios**: Cliente HTTP para consumir la API externa.
- **TailwindCSS**: Framework CSS para estilización rápida y consistente.

### Justificación de Paquetes

- **React**: Ideal para construir interfaces dinámicas y escalables.
- **React Query**: Simplifica la gestión de datos asincrónicos y mejora el rendimiento.
- **Zustand**: Alternativa ligera y flexible para manejar el estado global.
- **TailwindCSS**: Permite un diseño rápido y consistente con clases utilitarias.

---

## 🛠️ Funcionalidades

### Funcionalidades Principales

- **Autenticación**: Inicio de sesión y registro de usuarios.
- **Consulta del Clima**: Visualización del clima actual y pronósticos por hora y día.
- **Favoritos**: Gestión de ciudades favoritas.
- **Búsqueda**: Autocompletado de ciudades para facilitar la búsqueda.

### Componentes Clave

- **`CardWeatherHeader`**: Muestra el clima actual de una ciudad.
- **`CardHourlyForecast`**: Visualiza el pronóstico por horas.
- **`CardDailyTemperature`**: Muestra la temperatura diaria con gráficos interactivos.
- **`AddToFavoriteButton`**: Permite agregar o eliminar ciudades de favoritos.

---

## 🚀 Entorno de desarrollo

### Requisitos Previos

- **Node.js**: Versión 18 o superior.
- **Vite**: Herramienta de desarrollo rápido para aplicaciones web.

### Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/adiazt01/weather-app.git

   cd weather-app

   npm install
   ```

2. Crea un archivo `.env` a partir del archivo `.env-example` y configura las variables de entorno necesarias.

   ```bash
   cp .env-example .env
   ```

   Edita el archivo `.env` y configura las variables de entorno necesarias, como la URL de la API backend.

3. Ejecuta la aplicación en modo desarrollo:

   ```bash
   npm run dev
   ```

4. Accede a la aplicación en `http://localhost:5173`.

5. Para ejecutar las pruebas unitarias, puedes usar el siguiente comando:

   ```bash
   npm run test
   ```