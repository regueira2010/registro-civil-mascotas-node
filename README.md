 # 🐾 Registro Civil de Mascotas - Chile

Este es un proyecto de gestión de mascotas desarrollado con **Node.js**, **Express** y **Handlebars**, diseñado para simular un sistema oficial del Ministerio de las Mascotas. Permite el registro, búsqueda, filtrado y eliminación de mascotas con persistencia de datos en archivos JSON.

## 🚀 Características

- **Arquitectura REST**: Endpoints estructurados para operaciones CRUD.
- **Persistencia de Datos**: Los registros se almacenan y leen de `src/data/mascotas.json`.
- **Interfaz Dinámica**: Consumo de API mediante **Axios** para actualizaciones en tiempo real sin recargar la página.
- **Búsqueda Avanzada**: Filtrado por Nombre o RUT directamente desde la interfaz con actualización de URL (History API).
- **Manejo de Errores**: Implementación de página personalizada para errores 404 y gestión de errores 500 en el servidor.

## 🛠️ Tecnologías Utilizadas

- **Node.js** (Entorno de ejecución)
- **Express** (Framework web)
- **Express-Handlebars** (Motor de plantillas)
- **Axios** (Cliente HTTP para el frontend)
- **Bootstrap 5** (Estilos e iconos)
- **FileSystem (fs/promises)** (Manejo de archivos JSON)

## 🛠️ Instalación y Uso

1. **Clonar el repositorio:**
   ```bash
   git clone [https://github.com/regueira2010/registro-civil-mascotas-node.git](https://github.com/regueira2010/registro-civil-mascotas-node.git)
   cd registro-civil-mascotas-node