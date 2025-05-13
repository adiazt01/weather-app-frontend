<p align="center">
  <a href="https://react.dev/" target="blank"><img src="https://react.dev/favicon.ico" width="120" alt="React Logo" /></a>
</p>

## 🧭 Weather App Frontend

Este proyecto es un frontend desarrollado con **React**, **TypeScript** y **Vite** que permite consultar el clima de distintas ciudades, gestionar favoritos y consumir datos desde una API REST. Se eligió **React** por su flexibilidad, ecosistema maduro y su capacidad para construir interfaces de usuario dinámicas y reactivas.

---

## ⚙️ Arquitectura del Proyecto

### Estructura del Proyecto

El proyecto sigue una estructura modular basada en características, donde cada funcionalidad principal (como `auth`, `weather`, etc.) está encapsulada en su propio módulo. Esto facilita la escalabilidad, el mantenimiento y la reutilización del código.

```
└── 📁weather-app-frontend
    └── 📁src
        └── index.css
        └── main.tsx
        └── router.tsx
        └── 📁assets
        └── 📁components
            └── 📁ui
        └── 📁config
        └── 📁features
            └── 📁auth
            └── 📁core
            └── 📁shared
            └── 📁weather
        └── 📁hooks
        └── 📁lib
    └── 📁public
    └── .env
    └── .env.example
    └── .gitignore
    └── package.json
    └── README.md
    └── tsconfig.json
    └── vite.config.ts
```

### Decisiones de Diseño

- **Modularidad por Características**: Cada módulo agrupa componentes, servicios, hooks y otros recursos relacionados con una funcionalidad específica.
- **Componentes Reutilizables**: Los componentes genéricos y reutilizables están centralizados en `components/ui`.
- **Separación de Preocupaciones**: La lógica de negocio, los servicios y las interfaces están claramente separados de los componentes de presentación.
- **Uso de Hooks Personalizados**: Para encapsular lógica reutilizable y mejorar la legibilidad del código.

---

## 📦 Paquetes y Herramientas Utilizadas

### Paquetes Principales

- **React**: Biblioteca principal para construir la interfaz de usuario.
- **Vite**: Herramienta de construcción rápida y moderna para proyectos de frontend.
- **React Router**: Manejo de rutas y navegación en la aplicación.
- **Zustand**: Gestión de estado ligera y escalable.
- **Axios**: Cliente HTTP para consumir la API REST.
- **React Query**: Manejo eficiente de datos asíncronos y caché.

### Justificación de Paquetes

- **React**: Su enfoque declarativo y su ecosistema lo hacen ideal para construir interfaces dinámicas.
- **Vite**: Proporciona un entorno de desarrollo rápido y eficiente.
- **Zustand**: Es una solución simple y flexible para la gestión de estado global.
- **React Query**: Simplifica el manejo de datos remotos y mejora el rendimiento mediante caché.
- **Axios**: Cliente HTTP robusto y ampliamente utilizado.

---

## 🛠️ Funcionalidades

La aplicación permite a los usuarios:

- **Autenticarse**: Iniciar sesión y registrarse.
- **Consultar el Clima**: Buscar el clima actual y el pronóstico de distintas ciudades.
- **Gestionar Favoritos**: Agregar y eliminar ciudades favoritas.
- **Navegar**: Explorar las diferentes secciones de la aplicación mediante un sistema de rutas.

---

## 🧪 Pruebas

### Pruebas Unitarias

El rango abarcado de las pruebas unitarias incluye:

- **Componentes**: Verificación de la renderización y comportamiento de los componentes.
- **Hooks**: Validación de la lógica encapsulada en hooks personalizados.
- **Servicios**: Pruebas de las funciones que interactúan con la API REST.

---

## 🚀 Entorno de desarrollo

### Requisitos Previos

- **Node.js**: Versión 18 o superior.
- **Yarn o npm**: Gestor de paquetes.

### Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/tu-usuario/weather-app-frontend.git

   cd weather-app-frontend

   yarn install
   ```

2. Crea un archivo `.env` a partir del archivo `.env.example` y configura las variables de entorno necesarias.

   ```bash
   cp .env.example .env
   ```

3. Ejecuta la aplicación en modo desarrollo:

   ```bash
   yarn dev
   ```

4. Accede a la aplicación en `http://localhost:3000`.

5. Para ejecutar las pruebas unitarias, puedes usar el siguiente comando:

   ```bash
   yarn test
   ```