// Importer les modules Three.js nécessaires
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';
import { FBXLoader } from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/FBXLoader.js';

window.globalData = {};
let scene;
let camera
let mixer;
let character;
let followCharacter = false;

export function createSceneAndAssistant() {

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Control') {
            followCharacter = true;
            window.globalData.followCharacter = true;
        }
    });
    
    document.addEventListener('keydown', function(event) {
        if (event.key === 'AltGraph') {
            followCharacter = false;
            window.globalData.followCharacter = false;
            updateCameraPositionFront()
        }
    });

    // Nettoyer la scène existante si elle est définie
    if (scene) {
        while (scene.children.length > 0) {
            scene.remove(scene.children[0]);
        }
    } else {
        // Si la scène n'est pas définie, créer une nouvelle scène
        scene = new THREE.Scene();
    }

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
    
    // Charger le modèle FBX du personnage
    const loader = new FBXLoader();
    loader.setPath('./fbx/');
    loader.load('amanda.fbx', function (fbx) {
        character = fbx;
        window.globalData.character = fbx;
        scene.add(character)

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
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const fov = camera.fov * (Math.PI / 180);
        const distance = Math.abs(maxDim / Math.sin(fov / 2));

        // Positionner la caméra devant le personnage dès le départ
        const distanceFront = 300; // Distance devant le personnage
        const offsetYb = 150; // Ajustez cette valeur selon votre besoin
        const cameraOffset = new THREE.Vector3(0, offsetYb, distanceFront);
        const rotatedOffset = cameraOffset.applyQuaternion(character.quaternion);
        const cameraPosition = character.position.clone().add(rotatedOffset); // Position de la caméra par rapport au personnage

         // Créer la caméra
       
        camera.position.copy(cameraPosition);
        camera.lookAt(character.position); // Regarder le personnage dès le départ


        function animate() {

            requestAnimationFrame(animate);
            updateCameraPositionBehind()
            if (mixer) {
                mixer.update(0.02); // Mettre à jour le mixer à chaque frame
            }
            renderer.render(scene, camera);
        }
        
        animate();

        renderer.domElement.addEventListener('click', onCharacterClick);
        renderer.domElement.addEventListener('mousemove', onMouseMove);

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
                menu.style.left = `${ event.pageX + 60}px`;
                menu.style.top = `${ event.pageY }px`;
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

        changeCharacterAnimation("Bashful", character)
    }, undefined, function (error) {
        console.error(error);
    });

    
}

export function changeCharacterAnimation(animationName, fbx) {
    const animLoader = new FBXLoader();
    animLoader.setPath('./fbx/animations/');
    animLoader.load(`${animationName}.fbx`, function (anim) {
        if (mixer) {
            mixer.stopAllAction();
        }

        if (!mixer) {
            mixer = new THREE.AnimationMixer(fbx);
        }

        const anima = mixer.clipAction(anim.animations[0]);
        anima.play();
    }, undefined, function (error) {
        console.error(error);
    });
}

export function updateCameraPositionFront() {
    if (character) {
        const distanceFront = 300; // Distance devant le personnage

        const forwardVector = new THREE.Vector3(0, 0, -1); // Vecteur regardant vers l'avant
        forwardVector.applyQuaternion(character.quaternion);

        const offset = new THREE.Vector3(0, 150, distanceFront);
        const rotatedOffset = offset.applyQuaternion(character.quaternion);
        const newPosition = character.position.clone().add(rotatedOffset);

        const lookAtPosition = character.position.clone().add(forwardVector); // Utiliser le vecteur regardant vers l'avant

        camera.position.copy(newPosition);
        camera.lookAt(lookAtPosition);
    }
}


function updateCameraPositionBehind() {

    if (followCharacter && character) {
        const distanceBehind = -300; // Distance derrière le personnage
        const characterPosition = character.position.clone(); // Position du personnage

        // Calculer la nouvelle position de la caméra derrière le personnage
        const offset = new THREE.Vector3(0, 150, distanceBehind);
        const rotatedOffset = offset.applyQuaternion(character.quaternion);
        const newPosition = characterPosition.clone().add(rotatedOffset);

        // Faire en sorte que la caméra regarde vers le personnage depuis l'arrière
        const backwardVector = new THREE.Vector3(0, 0, -1); // Vecteur regardant vers l'arrière
        const direction = backwardVector.applyQuaternion(character.quaternion);
        const lookAtPosition = characterPosition.clone().add(direction);

        // Mettre à jour la position et la direction de la caméra
        camera.position.copy(newPosition);
        camera.lookAt(lookAtPosition);
    }
}

export function moveCharacterForward() {

    if (followCharacter && character) {
        const speed = 3; // Vitesse de déplacement du personnage

        // Vecteur de direction inverse vers laquelle le personnage regarde pour avancer
        const forwardVector = new THREE.Vector3(0, 0, 1); // Utilisation de l'axe Z positif pour avancer
        forwardVector.applyQuaternion(character.quaternion);

        // Mettre à jour la position du personnage en fonction de sa direction inverse pour avancer
        const newPosition = character.position.clone().add(forwardVector.multiplyScalar(speed));
        character.position.copy(newPosition);

        // Mettre à jour la position de la caméra pour la maintenir derrière le personnage
        const distanceBehind = -100; // Distance derrière le personnage
        const offset = new THREE.Vector3(0, 150, distanceBehind);
        const rotatedOffset = offset.applyQuaternion(character.quaternion);
        const cameraPosition = character.position.clone().add(rotatedOffset);

        // Mettre à jour la position de la caméra et la diriger vers le personnage depuis l'arrière
        const backwardVector = new THREE.Vector3(0, 0, -1); // Vecteur regardant vers l'arrière
        const cameraDirection = backwardVector.applyQuaternion(character.quaternion);
        const lookAtPosition = character.position.clone().add(cameraDirection);
        
        camera.position.copy(cameraPosition);
        camera.lookAt(lookAtPosition);
    }
}

let turning = false;
let targetAngle = 0;
const turnSpeed = Math.PI / 80;

export function turnCharacterRight() {

    if (followCharacter && character && !turning) {
        targetAngle -= Math.PI / 80; // Réduire l'angle pour tourner de 90 degrés vers la droite
        turning = true;

        function animateRotation() {
            const currentAngle = character.rotation.y;
            const delta = targetAngle - currentAngle;
            const rotationAmount = Math.min(turnSpeed, Math.abs(delta)) * Math.sign(delta);

            character.rotation.y += rotationAmount;

            const forwardVector = new THREE.Vector3(0, 0, 1);
            forwardVector.applyQuaternion(character.quaternion);

            const speed = 1; // Vitesse de déplacement du personnage
            const newPosition = character.position.clone().add(forwardVector.multiplyScalar(speed));
            character.position.copy(newPosition);

            const backwardVector = new THREE.Vector3(0, 0, -1);
            backwardVector.applyQuaternion(character.quaternion);

            const distanceBehind = -300;
            const offset = new THREE.Vector3(0, 150, distanceBehind);
            const rotatedOffset = offset.applyQuaternion(character.quaternion);
            const cameraPosition = character.position.clone().add(rotatedOffset);
            const lookAtPosition = character.position.clone().add(backwardVector);

            camera.position.copy(cameraPosition);
            camera.lookAt(lookAtPosition);

            if (delta !== 0) {
                requestAnimationFrame(animateRotation);
            } else {
                turning = false;
            }
        }

        animateRotation();
    }
}

export function turnCharacterLeft() {

    if (followCharacter && character && !turning) {
        targetAngle += Math.PI / 80; // Augmenter l'angle pour tourner de 90 degrés vers la gauche
        turning = true;

        function animateRotation() {
            const currentAngle = character.rotation.y;
            const delta = targetAngle - currentAngle;
            const rotationAmount = Math.min(turnSpeed, Math.abs(delta)) * Math.sign(delta);

            character.rotation.y += rotationAmount;

            const forwardVector = new THREE.Vector3(0, 0, 1);
            forwardVector.applyQuaternion(character.quaternion);

            const speed = 1; // Vitesse de déplacement du personnage
            const newPosition = character.position.clone().add(forwardVector.multiplyScalar(speed));
            character.position.copy(newPosition);

            const backwardVector = new THREE.Vector3(0, 0, -1);
            backwardVector.applyQuaternion(character.quaternion);

            const distanceBehind = -300;
            const offset = new THREE.Vector3(0, 150, distanceBehind);
            const rotatedOffset = offset.applyQuaternion(character.quaternion);
            const cameraPosition = character.position.clone().add(rotatedOffset);
            const lookAtPosition = character.position.clone().add(backwardVector);

            camera.position.copy(cameraPosition);
            camera.lookAt(lookAtPosition);

            if (delta !== 0) {
                requestAnimationFrame(animateRotation);
            } else {
                turning = false;
            }
        }

        animateRotation();
    }
}

