# MercadoLibros

- Este proyecto simula el frontend de un e-commerce de libros.

## Objetivo del proyecto

El objetivo principal de este proyecto es mostrar mis habilidades en:

- Desarrollo de interfaces con React.
- Uso de React Bootstrap para un diseño responsivo.
- Consumo de API y manejo de datos.

## Sobre los libros

Los libros mostrados en esta aplicación fueron seleccionados manualmente para garantizar que:

- Tengan **imágenes de alta calidad**.
- Incluyan un **precio**.
- Sean **variados** en temática y estilo.

Esto se debe a que la API de Google Books no permite filtrar directamente por estos criterios.

Dicho de otro modo, la biblioteca de libros es ficticia y fue curada con el fin de demostrar mis habilidades en las tecnologías mencionadas.

## Sobre las APIs utilizadas

- Se utiliza la API de [Google Books](https://developers.google.com/books?hl=es-419) para obtener los detalles completos de los libros.

- Se utiliza [My JSON Server](https://my-json-server.typicode.com/) para generar una API REST simulada que permite realizar operaciones CRUD. Como no provee persistencia real, se combina con localStorage para mantener los datos entre sesiones.

## Tecnologías utilizadas

- **Vite**: Para un entorno de desarrollo rápido.
- **React**: Para la construcción de la interfaz de usuario.
- **React Bootstrap**: Para el diseño responsivo y estilizado.
- **React Router**: Para la navegación entre páginas.
- **Font Awesome**: Para la implementación de íconos.
- **React-Toastify**: Para notificaciones y alertas visuales.

## Características principales

### Cliente

- **Catálogo completo**: Visualización de todos los libros disponibles.
- **Sección Best Sellers**: Algoritmo determinista basado en semillas semanales para simular los más vendidos.
- **Sección Ofertas**: Ordenamiento automático por precio para simular las ofertas.
- **Carrito de compras**: Agregar/eliminar productos, vaciar carrito, cálculo del precio a pagar.
- **Detalles de producto**: Vista ampliada con información detallada del libro.

### Administrador

- **Panel de administración**: Protegido por una autenticación ficticia (no tiene una validación real hecha en un backend).
- **CRUD completo**: Crear, leer, actualizar y eliminar libros (combinando las posibilidades que brindan las APIs utilizadas con localStorage).

## Instalación y ejecución

1. Clona este repositorio
2. Instala las dependencias: `npm install`
3. Inicia el servidor de desarrollo: `npm run dev`

### Credenciales de prueba

- Usuario: admin
- Contraseña: 1234

> [!IMPORTANT]
> Este proyecto está en su primera versión y no representa un e-commerce funcional.
