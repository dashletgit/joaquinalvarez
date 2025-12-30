[![es](https://img.shields.io/badge/lang-es-red.svg)](README.es.md)

# Joaquin Alvarez Portfolio - Game & Level Designer

Welcome to Joaquin Alvarez's personal portfolio repository!

This website has been redesigned as a static **Single Page Application (SPA)**. It prioritizes user experience through fluid navigation, dynamic content loading via modals, and a modular JSON-based data architecture.

## [View Live Site 🚀](https://dashletgit.github.io/joaquinalvarez/)

## 🛠️ Technologies Used

* **HTML5:** Semantic structure.
* **CSS3:** CSS Variables, Flexbox, and Grid. **Fully Responsive** design (Mobile, Tablet, Desktop).
* **JavaScript (Vanilla ES6+):**
  * **Fetch API:** For asynchronous data loading (JSON) and partial content fetching (HTML snippets).
  * **Dynamic Modals:** Popup system to view project details without page reloads.
  * **Reusable Carousels:** Custom logic for carousels with touch event support and smart auto-scroll.
* **JSON:** Lightweight database to manage Projects, Skills, Documents, and Carousels.
* **Formspree:** Backend-less solution for the contact form.

## ✨ Key Features

* **No Page Reloads:** "Case Studies" open in immersive modals over the current page.
* **Modular Data Architecture:** All content (text, images, links) is managed from the `/data/` folder. No need to touch the main HTML to add a new job.
* **Specialized Sections:**
  * **Main Projects:** Automatic grid with external link detection (Steam, Itch.io).
  * **Other Projects:** Mini-carousel for prototypes or Game Jams.
  * **Documents:** Static "file-cabinet" style grid for GDDs and Thesis papers.
  * **Skills & Tools:** Dual carousel separated logically and visually.
* **Responsive & Touch Friendly:** Animated hamburger menu and carousels with gesture support on mobile devices.

## 🚀 Maintenance & Update Guide

The site is designed to be maintained by editing simple text files.

### 1. Content Management (JSONs)

All information resides in the `/data/` folder. Edit these files to add or remove content:

| File | Description |
| :--- | :--- |
| `mainCarousel.json` | Images for the giant slider at the top of the page. |
| `projects.json` | Main projects (Big Cards). Defines title, tags, image, and **slug**. |
| `otherProjects.json` | Secondary projects (Mini carousel). |
| `documents.json` | Design documents (GDDs, Papers) shown in a grid. |
| `skills.json` | List of skills and tools. Use the `"type": "skill"` or `"type": "tool"` field to separate them automatically. |

### 2. How to Add a New Main Project

1. **Create HTML Content:**
   Create a new file in the `/content/` folder with the project name (e.g., `new-game.html`).
   *Note: Only write the internal content (h1, p, img), do not use `<html>` or `<body>` tags.*

2. **Register in `projects.json`:**
    Add an object to the array. The most important part is that the link points to the file you created using the `page` parameter:

    ```json
      {
          "title": "My New Game",
          "description": "Short description for the card...",
          "tags": ["Unity", "Level Design"],
          "imageSrc": "imgs/my-game-thumb.jpg",
          "imageAlt": "Cover",
          "link": "./pages/proyects.html?page=new-game", 
          "externalLink": "[https://store.steampowered.com/](https://store.steampowered.com/)..." 
      }
    ```

3. **How to Add Skills or Tools:**
  Edit `data/skills.json.` The system will automatically separate the lists based on the type attribute.

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

## 📂 Folder Structure

  ``` Plaintext
    /
    ├── content/       # HTML fragments for each project (displayed inside the modal)
    ├── css/           # Styles (index.css)
    ├── data/          # JSON databases (projects, skills, docs, etc.)
    ├── imgs/          # Optimized images
    ├── js/            # Logic (index.js handles everything: modals, carousels, fetch)
    └── index.html     # Single entry point
  ```

## ✍️ Credits

* Portfolio Owner: [Joaquin Alvarez](https://github.com/dashletgit) - Game & Level Designer

* Development & Design: [Victor H. Bertolini Agaras](https://github.com/Bertolini-Victor/)
