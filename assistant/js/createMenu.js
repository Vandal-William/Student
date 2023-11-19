import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';

export function createMenu() {
    // Création du conteneur
    const container = document.createElement('div');
    container.classList.add('radmenu');

    // Création du lien
    const link = document.createElement('a');
    link.classList.add('show');
    link.textContent = 'Outils';
    container.appendChild(link);

    // Création de la liste
    const ul = document.createElement('ul');

    // Création des éléments de la liste
    const items = [
    { id: 'tchat', imgSrc: './logo/chat-round-line-svgrepo-com.svg', alt: 'Tchat' },
    { id: 'review', imgSrc: './logo/review-file-svgrepo-com.svg', alt: '' },
    { id: 'stack-overflow', imgSrc: './logo/stackoverflow-color-svgrepo-com.svg', alt: '' },
    { id: 'task', imgSrc: './logo/task-svgrepo-com.svg', alt: '' },
    { id: 'Indisponible1', text: 'Indisponible' },
    { id: 'Indisponible2', text: 'Indisponible' },
    ];

    items.forEach(item => {
    const li = document.createElement('li');
    li.id = item.id;
    
    const a = document.createElement('a');
    if (item.imgSrc) {
        const img = document.createElement('img');
        img.src = item.imgSrc;
        img.alt = item.alt;
        a.appendChild(img);
    } else {
        a.textContent = item.text;
    }
    
    li.appendChild(a);
    ul.appendChild(li);
    });

    container.appendChild(ul);

    // Ajout du conteneur à la scène
    const DObject = new THREE.CSS3DObject(container);

}