# Portfolio de Joaquin Alvarez - Game & Level Designer

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Hosting](https://img.shields.io/badge/Hosting-GitHub%20Pages-222222?style=flat-square)
![Demo](https://img.shields.io/badge/Demo-Sitio%20en%20Vivo-2EA44F?style=flat-square)

¡Bienvenido al repositorio del portfolio personal de Joaquin Alvarez, un Game & Level Designer!

Este sitio web está diseñado con un enfoque minimalista para poner el foco en los proyectos. Está construido con HTML, CSS y JavaScript vainilla, y alojado estáticamente en GitHub Pages.

**Sitio en vivo:** <https://dashletgit.github.io/joaquinalvarez/>

## Tecnologías Utilizadas

- **HTML5:** Para la estructura semántica.
- **CSS3:** Para todos los estilos, usando Flexbox y Grid para un layout responsive.
- **JavaScript (ES6+):** Para toda la interactividad, incluyendo:
  - Carrusel de proyectos dinámico.
  - Carga de contenido de proyectos desde "snippets".
  - Actualización automática del año en el footer.
- **JSON:** Para alimentar el carrusel de la página principal.
- **Formspree:** Para gestionar el formulario de contacto sin necesidad de un backend.
- **GitHub Pages:** Para el hosting gratuito del sitio estático.

## Características Principales

- **100% Estático:** Rápido, seguro y fácil de hostear.
- **Diseño Minimalista:** Paleta de colores limpia (blanco y coral) para un portfolio profesional.
- **Carga de Proyectos "Sin Base de Datos":** El sitio utiliza una arquitectura de "página plantilla". Hay un único `proyecto.html` que funciona como un "marco".
- **Contenido Flexible por "Snippets":** La información de cada proyecto se carga desde archivos HTML individuales (`/content/proyecto-1.html`, `/content/proyecto-2.html`). Esto le da al dueño total libertad creativa para la estructura de cada página de proyecto (videos, galerías, texto) sin tocar el código principal.
- **Componentes Dinámicos:** El carrusel de la home se genera dinámicamente leyendo un archivo `proyectos.json`.

## Cómo Actualizar el Contenido

Este sitio está diseñado para que sea fácil de actualizar por el dueño.

### 1. Añadir un Proyecto al Carrusel (Home)

1. Abre el archivo `proyectos.json` en la raíz del repositorio.
2. Añade un nuevo objeto al array, siguiendo la estructura existente. Asegúrate de que el `id` sea único.

```json
[
  {
    "id": "1",
    "imageUrl": "img/proyecto-1.jpg",
    "altText": "Imagen del Proyecto 1",
    "title": "PROYECTO: \"CYBER RUNNER\""
  },
  {
    "id": "2",
    "imageUrl": "img/proyecto-2.jpg",
    "altText": "Imagen del Proyecto 2",
    "title": "PROYECTO: \"ASTRA\""
  },
  {
    "id": "nuevo-id-aqui",
    "imageUrl": "img/nuevo-proyecto.jpg",
    "altText": "Texto alternativo",
    "title": "NUEVO PROYECTO"
  }
]
```

### 2. Crear una Nueva Página de Detalle de Proyecto

1. **Crea el "Snippet":** En la carpeta `/content/`, crea un nuevo archivo HTML. El nombre debe ser un "slug" (ej. `mi-nuevo-proyecto.html`).
2. **Escribe el Contenido:** Dentro de ese archivo, escribe **solo el contenido** (sin `<html>` o `<body>`). Puedes usar HTML libremente y aplicar las clases CSS ya definidas en `style.css` (ej. `.video-responsive`, `.gallery-2-col`).

```html
<h1>Mi Nuevo Proyecto</h1>
<img src="img/mi-proyecto-header.jpg" alt="Header">
<p>Esta es la descripción...</p>

<h2>Gameplay</h2>
<div class="video-responsive">
  <iframe src="..."></iframe>
</div>
```

3. **Enlaza el Proyecto:** En `index.html`, en la tarjeta del proyecto correspondiente, asegúrate de que el botón apunte a la página `proyecto.html` usando el "slug" como parámetro:

```html
<a href="proyecto.html?page=mi-nuevo-proyecto" class="btn btn-primary">
    View case study
</a>
```

## Autor y Diseñador

Diseñado y desarrollado por **Victor H. Bertolini Agaras** para **Joaquin Alvarez**.

- **GitHub:** [Victor Bertolini](https://github.com/Bertolini-Victor)
- **LinkedIn:** [Victor Bertolini](https://www.linkedin.com/in/victor-bertolini/)
