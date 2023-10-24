import { createMenuNoConnect } from "./createMenuNoConnect.js";
import { activeMarked } from "./marked.js";


createMenuNoConnect();
activeMarked('./cours/bienvenu.md');

const home = document.querySelector('#site-title');

home.style.cursor = "pointer";
home.addEventListener('click', () => {
    activeMarked('./cours/bienvenu.md');
})

