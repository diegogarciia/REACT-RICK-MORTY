# Buscador Rick & Morty

Una aplicación moderna y robusta desarrollada con **React** y **TypeScript** que permite explorar el multiverso de Rick and Morty de forma eficiente, consumiendo la [Rick and Morty API](https://rickandmortyapi.com/).

Este proyecto ha sido desarrollado como práctica avanzada para demostrar el dominio de Hooks, lógica asíncrona y pruebas automáticas en el ecosistema de React.

## Características Principales

* **Exploración Infinita:** Listado de personajes con sistema de paginación acumulativa ("Cargar más").
* **Búsqueda con Debounce:** Buscador optimizado que espera 700ms tras la escritura para evitar peticiones innecesarias.
* **Filtros de Estado:** Clasificación instantánea por estado (*Alive*, *Dead*, *Unknown*).
* **Historial de Búsqueda:** Persistencia de los últimos 5 términos buscados para acceso rápido.
* **Vista de Detalle:** Información técnica extendida al seleccionar cualquier personaje.
* **Enfoque Automático:** El campo de búsqueda recibe el foco al cargar la app sin provocar re-renders adicionales.
* **Diseño Responsivo:** Interfaz adaptada mediante CSS Grid y Flexbox para móviles y escritorio.

## Stack Tecnológico

| Tecnología | Propósito |
| :--- | :--- |
| **React 18** | Biblioteca principal para la interfaz de usuario. |
| **TypeScript** | Tipado estático para mayor seguridad y mantenibilidad. |
| **Vite** | Herramienta de construcción y servidor de desarrollo ultra rápido. |
| **CSS3** | Estilos personalizados con variables y diseño responsivo. |
| **Vitest** | Framework de pruebas unitarias y de integración. |
| **Testing Library** | Pruebas de componentes enfocadas en el comportamiento del usuario. |

## Pruebas Automáticas 

La aplicación incluye una suite de pruebas completa que garantiza la integridad de los componentes y la lógica:

* **Pruebas de Componentes:** Verificación de renderizado e interacción en `SearchBar` y `PreviousSearches`.
* **Pruebas de Integración:** Testeo del flujo principal en `RickMortyApp`, simulando estados de carga, error y clics del usuario.
* **Snapshots:** Control de cambios accidentales en la estructura del DOM.

## Instalación y Configuración

Sigue estos pasos para poner en marcha el proyecto en tu entorno local:

1. **Clonar el repositorio**
   ```bash
   git clone (https://github.com/diegogarciia/REACT-RICK-MORTY.git)
   cd rick-and-morty-app

2. **Instalar las dependencias**
   ```bash
   npm install

3. **Ejecutar en modo desarrollo**
   ```bash
   npm run dev

4. **Ejecutar pruebas unitarias**
   ```bash
   npm run test