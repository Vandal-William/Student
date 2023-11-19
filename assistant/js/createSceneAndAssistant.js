// Importer les modules Three.js nécessaires
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';
import { FBXLoader } from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/FBXLoader.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js';

let scene;
let mixer;
let character;

export function createSceneAndAssistant({animation, time}) {

    // Nettoyer la scène existante si elle est définie
    if (scene) {
        while (scene.children.length > 0) {
            scene.remove(scene.children[0]);
        }
    } else {
        // Si la scène n'est pas définie, créer une nouvelle scène
        scene = new THREE.Scene();
    }

    // Créer la scène, la caméra et le renderer
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    
    // Ajouter une lumière ambiante à la scène
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9); // Couleur blanche, intensité augmentée à 1
    scene.add(ambientLight);

    // Créer une géométrie de plan
    const groundGeometry = new THREE.PlaneGeometry(1000, 1000); // Taille du plan

    // Charger la texture PNG pour le sol
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load('./fbx/textures/ground2.png', (texture) => {
        const groundMaterial = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide }); // Utiliser la texture comme map dans le matériau du sol
        const ground = new THREE.Mesh(groundGeometry, groundMaterial); // Créer le maillage du sol

        // Rotation du sol pour le mettre à plat
        ground.rotation.x = -Math.PI / 2; // Rotation de 90 degrés sur l'axe X

        // Positionner le sol en dessous du personnage
        ground.position.setY(-110); // Placer le sol légèrement en dessous du personnage

        // Ajouter le sol à la scène
        scene.add(ground);
    });

    // Créer les murs
    // Charger la texture pour les murs depuis une image JPG
    const textureWall = new THREE.TextureLoader();
    const wallTexture = textureWall.load('./fbx/textures/wall1.png');

    // Créer le matériau avec la texture chargée
    const wallMaterial = new THREE.MeshBasicMaterial({ map: wallTexture });

    // Créer les murs avec le matériau contenant la texture
    const wallGeometry = new THREE.BoxGeometry(1000, 430, 10); 

    // Mur opposé à la caméra
    const wall1 = new THREE.Mesh(wallGeometry, wallMaterial);
    wall1.position.set(0, 100, -500); // Placer le mur opposé à la caméra
    scene.add(wall1);

    // Murs de chaque côté du sol
    const wall2 = new THREE.Mesh(wallGeometry, wallMaterial);
    wall2.position.set(500, 100, 0); // Placer le mur à droite
    wall2.rotation.y = Math.PI / 2; // Faire une rotation de 90 degrés pour le placer à droite
    scene.add(wall2);

    const wall3 = new THREE.Mesh(wallGeometry, wallMaterial);
    wall3.position.set(-500, 100, 0); // Placer le mur à gauche
    wall3.rotation.y = -Math.PI / 2; // Faire une rotation de -90 degrés pour le placer à gauche
    scene.add(wall3);
    
    // Charger le modèle FBX du personnage
    const loader = new FBXLoader();
    loader.setPath('./fbx/');
    loader.load('amanda.fbx', function (fbx) {

        character = fbx

        // Calculer la boîte englobante du personnage pour obtenir ses dimensions
        const box = new THREE.Box3().setFromObject(character);
        const center = new THREE.Vector3();
        box.getCenter(center);
    
        // Positionner le personnage au centre et en bas de l'écran
        const offsetY = -100; // Calculer l'offset en Y du personnage pour le placer en bas de l'écran
        fbx.position.copy(new THREE.Vector3(0, offsetY, 0)); // Placer le personnage au centre et en bas de l'écran
    
        // Calculer la distance pour placer la caméra
        const size = new THREE.Vector3();
        box.getSize(size);
        const maxDim = Math.max(size.x, size.y, size.z);
        const fov = camera.fov * (Math.PI / 180);
        const distance = Math.abs(maxDim / Math.sin(fov / 2));
    
        // Positionner la caméra pour regarder le personnage de face
        const frontVector = new THREE.Vector3(0, 0, 1); // Le personnage fait face dans la direction Z (ou autre, selon son orientation)
        const direction = frontVector.applyQuaternion(character.quaternion);
        const cameraPosition = direction.multiplyScalar(distance * 1.2).add(center); // Ajouter un petit décalage pour éviter que la caméra ne soit trop proche
        camera.position.copy(cameraPosition);
        camera.lookAt(center);

        // Créer une instance de OrbitControls
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableZoom = false; // Désactiver le zoom
        controls.update(); // Mettre à jour les contrôles
        
        // Charger une animation dans la fonction de chargement du modèle FBX
        const animLoader = new FBXLoader();
        animLoader.setPath('./fbx/animations/');
        animLoader.load(`${animation}.fbx`, function (anim) {

            if (mixer) {
                mixer.stopAllAction(); // Arrêter l'animation actuelle si elle est en cours
            }

            mixer = new THREE.AnimationMixer(character);
            const anima = mixer.clipAction(anim.animations[0])
            if(time){
                anima.setLoop(THREE.LoopOnce); // Indiquer que l'animation doit se jouer une seule fois
            }
            anima.play();

            function animate() {
                requestAnimationFrame(animate);
                mixer.update(0.03); // Mettre à jour le mixer à chaque frame
                renderer.render(scene, camera);
            }
            
            animate();
        }, undefined, function (error) {
            console.error(error);
        });

        scene.add(character); // Ajouter le personnage à la scène une fois le chargement terminé
        // Détecter les clics sur le personnage
        renderer.domElement.addEventListener('click', onCharacterClick);
        renderer.domElement.addEventListener('mousemove', onMouseMove);

    }, undefined, function (error) {
        console.error(error);
    });

    function onCharacterClick(event) {
        // Récupérer les coordonnées normalisées du clic de la souris
        const mouse = new THREE.Vector2();
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
        // Créer un rayon depuis la caméra à travers la position du clic
        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, camera);
    
        // Vérifier les intersections entre le rayon et le personnage
        const intersects = raycaster.intersectObject(character, true);
    
        if (intersects.length > 0) {
             // Si le personnage est cliqué, afficher le menu contextuel
            const menu = document.getElementById('menu')
            console.log(menu)
            menu.style.left = "0px";
            menu.style.top = "0px";
            menu.style.display = "";
        }
    }
    function onMouseMove(event) {
        // Récupérer les coordonnées normalisées du clic de la souris
        const mouse = new THREE.Vector2();
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
        // Créer un rayon depuis la caméra à travers la position du clic
        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, camera);
    
        // Vérifier les intersections entre le rayon et le personnage
        const intersects = raycaster.intersectObject(character, true);
    
        if (intersects.length > 0) {
            onCharacterMouseEnter();
        } else {
            onCharacterMouseLeave();
        }
    }

    function onCharacterMouseEnter(event) {
        document.body.style.cursor = 'pointer';
    }
    
    function onCharacterMouseLeave() {
        document.body.style.cursor = 'default';
    }
    
}
