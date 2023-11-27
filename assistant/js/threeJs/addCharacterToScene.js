// Importer les modules Three.js nécessaires
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';
import { FBXLoader } from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/FBXLoader.js';
import { global } from '../global.js';
import { getCollectionInFirestore } from '../fireBase/firestore.js';


let character;
let mixer;
let followCharacter = false;

document.addEventListener('keydown', function(event) {
    if (event.key === 'Control') {
        followCharacter = true;
        global.followCharacter = true;
    }
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'AltGraph') {
        followCharacter = false;
        global.followCharacter = false;
        updateCameraPositionFront(global.camera);
    }
});


export async function addCharacterToscene(pseudo, characterName, scene, camera, renderer) {

    const userData = await getCollectionInFirestore(global.userId);
    const data = userData[0].data
    const docId = userData[0].id
    global.docId = docId
    const showPseudo = document.getElementById('userName');
    showPseudo.textContent = pseudo;

     // Charger le modèle FBX du personnage
     const loader = new FBXLoader();
     loader.setPath('./fbx/');
     loader.load(`${characterName}.fbx`, async function (fbx) {
        
        character = fbx;
        global.characterObject = fbx;
   
 
        // Calculer la boîte englobante du personnage pour obtenir ses dimensions
        const box = new THREE.Box3().setFromObject(character);
        const center = new THREE.Vector3();
        box.getCenter(center);
     
        // Positionner le personnage au centre et en bas de l'écran
        const offsetY = -100; // Calculer l'offset en Y du personnage pour le placer en bas de l'écran

        character.position.set(0, -100, 0);
        scene.add(character);
        // Calculer la distance pour placer la caméra
        const size = new THREE.Vector3();
        box.getSize(size);
        const maxDim = Math.max(size.x, size.y, size.z);
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
             updateCameraPositionBehind(global.camera);
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
            global.mixer = mixer;
        }

        const anima = mixer.clipAction(anim.animations[0]);
        anima.play();
    }, undefined, function (error) {
        console.error(error);
    });
}

export function updateCameraPositionFront(camera) {
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


export function updateCameraPositionBehind(camera) {
    if (followCharacter && character) {
        const distanceBehind = -200; // Distance derrière le personnage
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

        // Ajuster la distance de vue et l'angle de vue pour voir plus loin
        camera.far = 5000; // Augmenter la distance de vue
        camera.updateProjectionMatrix(); // Mettre à jour la matrice de projection

        // Augmenter l'angle de vue pour voir une plus grande partie de la scène
        camera.fov = 90; // Augmenter l'angle de vue (FOV)
        camera.updateProjectionMatrix(); // Mettre à jour la matrice de projection
    }
}

export function moveCharacterForward(camera, drawerP) {

    if (followCharacter && character) {
        const speed = 3; // Vitesse de déplacement du personnage

        // Vecteur de direction inverse vers laquelle le personnage regarde pour avancer
        const forwardVector = new THREE.Vector3(0, 0, 1); // Utilisation de l'axe Z positif pour avancer
        forwardVector.applyQuaternion(character.quaternion);

        // Mettre à jour la position du personnage en fonction de sa direction inverse pour avancer
        const newPosition = character.position.clone().add(forwardVector.multiplyScalar(speed));
        const distanceToDrawer = character.position.distanceTo(drawerP.position);

        if (parseInt(distanceToDrawer) > 100 && parseInt(distanceToDrawer) < 150) {
            
            const menu_drawer = document.getElementById('menu-drawer');
            menu_drawer.style.right = `${drawerP.position.x}px`;
            menu_drawer.style.top = `${drawerP.position.y + 300}px`;
            menu_drawer.style.display = "block";
        }else{
            const menu_drawer = document.getElementById('menu-drawer');
            menu_drawer.style.display = "none";
        }

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


export function moveCharacterBackward(camera, drawerP) {
    
    if (followCharacter && character) {
        const speed = 3; // Vitesse de déplacement du personnage

        // Vecteur de direction vers l'arrière (inverse de la direction avant)
        const backwardVector = new THREE.Vector3(0, 0, -1); // Utilisation de l'axe Z négatif pour reculer
        backwardVector.applyQuaternion(character.quaternion);

        // Mettre à jour la position du personnage en fonction de sa direction vers l'arrière pour reculer
        const newPosition = character.position.clone().add(backwardVector.multiplyScalar(speed));
        
        const distanceToDrawer = character.position.distanceTo(drawerP.position);

        if (parseInt(distanceToDrawer) > 100 && parseInt(distanceToDrawer) < 150) {
            
            const menu_drawer = document.getElementById('menu-drawer');
            menu_drawer.style.right = `${drawerP.position.x}px`;
            menu_drawer.style.top = `${drawerP.position.y + 300}px`;
            menu_drawer.style.display = "block";
        }else{
            const menu_drawer = document.getElementById('menu-drawer');
            menu_drawer.style.display = "none";
        }

        character.position.copy(newPosition);

        // Mettre à jour la position de la caméra pour la maintenir devant le personnage
        const distanceInFront = 100; // Distance devant le personnage
        const offset = new THREE.Vector3(0, 150, -distanceInFront); // Direction inverse (devant)
        const rotatedOffset = offset.applyQuaternion(character.quaternion);
        const cameraPosition = character.position.clone().add(rotatedOffset);

        // Mettre à jour la position de la caméra et la diriger vers le personnage depuis l'avant
        const forwardVector = new THREE.Vector3(0, 0, 1); // Vecteur regardant vers l'avant
        const cameraDirection = forwardVector.applyQuaternion(character.quaternion);
        const lookAtPosition = character.position.clone().add(cameraDirection);
        
        camera.position.copy(cameraPosition);
        camera.lookAt(lookAtPosition);
    }
}

let turning = false;
let targetAngle = 0;
const turnSpeed = Math.PI / 80;

export function turnCharacterRight(camera) {

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

export function turnCharacterLeft(camera) {

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