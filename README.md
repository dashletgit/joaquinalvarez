# Portfolio de Joaquin Alvarez - Game & Level Designer

¡Bienvenido al repositorio del portfolio personal de Joaquin Alvarez!

Este sitio web ha sido rediseñado como una **Single Page Application (SPA)** estática. Prioriza la experiencia de usuario mediante una navegación fluida, carga de contenido dinámica a través de modales y una arquitectura de datos modular basada en JSON.

## [Ver el sitio en vivo 🚀](https://dashletgit.github.io/joaquinalvarez/)

## 🛠️ Tecnologías Utilizadas

* **HTML5:** Estructura semántica.
* **CSS3:** Variables CSS, Flexbox y Grid. Diseño **Fully Responsive** (Móvil, Tablet, Desktop).
* **JavaScript (Vanilla ES6+):**
  * **Fetch API:** Para la carga asíncrona de datos (JSON) y contenido parcial (HTML snippets).
  * **Modales Dinámicos:** Sistema de ventanas emergentes para ver detalles de proyectos sin recargar la página.
  * **Carruseles Reutilizables:** Lógica personalizada para carruseles con soporte táctil (touch events) y auto-scroll inteligente.
* **JSON:** Base de datos ligera para gestionar Proyectos, Skills, Documentos y Carruseles.
* **Formspree:** Backend-less para el formulario de contacto.

## ✨ Características Principales

* **Navegación sin recargas:** Los "Casos de Estudio" se abren en modales inmersivos sobre la misma página.
* **Arquitectura Modular de Datos:** Todo el contenido (textos, imágenes, enlaces) se administra desde la carpeta `/data/`. No hace falta tocar el HTML principal para añadir un nuevo trabajo.
* **Secciones Especializadas:**
  * **Proyectos Principales:** Grid automático con detección de enlaces externos (Steam, Itch.io).
  * **Other Projects:** Mini-carrusel para prototipos o Game Jams.
  * **Documents:** Grilla estática estilo "fichero" para GDDs y Tesis.
  * **Skills & Tools:** Doble carrusel separado lógica y visualmente.
* **Responsive & Touch Friendly:** Menú hamburguesa animado y carruseles con soporte para gestos en móviles.

## 🚀 Guía de Mantenimiento y Actualización

El sitio está diseñado para ser mantenido editando archivos de texto simple.

### 1. Gestión de Contenido (JSONs)

Toda la información reside en la carpeta `/data/`. Edita estos archivos para agregar o quitar contenido:

| Archivo | Descripción |
| :--- | :--- |
| `mainCarousel.json` | Imágenes del slider gigante al inicio de la página. |
| `projects.json` | Los proyectos principales (Cards grandes). Define título, tags, imagen y **slug**. |
| `otherProjects.json` | Proyectos secundarios (Mini carrusel). |
| `documents.json` | Documentos de diseño (GDDs, Papers) mostrados en grilla. |
| `skills.json` | Lista de habilidades y herramientas. Usa el campo `"type": "skill"` o `"type": "tool"` para separarlos automáticamente. |

### 2. Cómo agregar un Nuevo Proyecto Principal

1. **Crear el contenido HTML:**
   Crea un archivo nuevo en la carpeta `/content/` con el nombre del proyecto (ej: `nuevo-juego.html`).
   *Nota: Solo escribe el contenido interno (h1, p, img), no uses etiquetas `<html>` o `<body>`.*

2. **Registrar en `projects.json`:**
   Agrega un objeto al array. Lo más importante es que el enlace apunte al archivo que creaste usando el parámetro `page`:

    ```json
      {  
         "title": "Mi Nuevo Juego",
         "description": "Descripción corta para la card...",
         "tags": ["Unity", "Level Design"],
         "imageSrc": "imgs/mi-juego-thumb.jpg",
         "imageAlt": "Cover",
         "link": "./pages/proyects.html?page=nuevo-juego", 
         "externalLink": "[https://store.steampowered.com/](https://store.steampowered.com/)..." 
      }
    ```

    El sistema leerá page=nuevo-juego y cargará automáticamente /content/nuevo-juego.html en el modal.

3. **Cómo agregar Skills o Tools:**
  Edita data/skills.json. El sistema separará automáticamente las listas basándose en el atributo type.

    ``` JSON
      {
          "name": "Unreal Engine 5",
          "logoSrc": "imgs/ue5_logo.png",
          "type": "tool" 
      },
      {
          "name": "Team Leadership",
          "logoSrc": "imgs/icon_lead.png",
          "type": "skill"
      }
    ```

## 📂 Estructura de Carpetas

  ``` Plaintext
        /
        ├── content/       # Fragmentos HTML de cada proyecto (Lo que se ve en el modal)
        ├── css/           # Estilos (index.css)
        ├── data/          # Bases de datos JSON (projects, skills, docs, etc.)
        ├── imgs/          # Imágenes optimizadas
        ├── js/            # Lógica (index.js maneja todo: modales, carruseles, fetch)
        └── index.html     # Punto de entrada único
  ```

## ✍️ Créditos

Portfolio Owner: [Joaquin Alvarez](https://github.com/dashletgit) - Game & Level Designer

Development & Design: [Victor H. Bertolini Agaras](https://github.com/Bertolini-Victor/)
