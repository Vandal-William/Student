// Importer les modules Three.js nécessaires
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';
import { FBXLoader } from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/FBXLoader.js';
import { RGBELoader } from 'https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/loaders/RGBELoader.js';
import { global } from '../global.js';

let scene;
let camera;

export function createScene() {


    // Nettoyer la scène existante si elle est définie
    if (scene) {
        while (scene.children.length > 0) {
            scene.remove(scene.children[0]);
        }
    } else {
        // Si la scène n'est pas définie, créer une nouvelle scène
        scene = new THREE.Scene();
        global.scene = scene;
    }

    const loader = new FBXLoader();
    loader.load('./fbx/scene/room.fbx', (object) => {
        // Ajouter le modèle FBX de la pièce à la scène
        scene.add(object);
        console.log(object)
    });

    const renderer = new THREE.WebGLRenderer();
    global.renderer = renderer
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

   // env
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();

    const rgbeLoader = new RGBELoader();
    rgbeLoader.setDataType(THREE.UnsignedByteType);

    rgbeLoader.load('./fbx/scene/hdri/paul_lobe_haus_1k.hdr', function (texture) {
        const envMap = pmremGenerator.fromEquirectangular(texture).texture;
        scene.background = envMap; // Appliquer la texture comme arrière-plan de la scène
    
        texture.dispose();
        pmremGenerator.dispose();
    });
    
    // Ajouter une lumière ambiante à la scène
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Couleur blanche, intensité réduite
    scene.add(ambientLight);

    // Créer une caméra perspective
    camera = new THREE.PerspectiveCamera(
        75, // Champ de vision (FOV)
        window.innerWidth / window.innerHeight, // Ratio d'aspect
        0.1, // Distance de rendu la plus proche
        1000 // Distance de rendu la plus éloignée
    );
    global.camera = camera;
    // Positionner la caméra
    camera.position.set(0, 200, 300); // Position XYZ de la caméra
    camera.lookAt(0, 0, 0); // Point de vue de la caméra (où elle regarde)

    // Ajouter la caméra à la scène
    scene.add(camera);

    // Créer une géométrie de plan
    // const groundGeometry = new THREE.PlaneGeometry(1000, 1000); // Taille du plan
    // const groundMaterial = new THREE.MeshStandardMaterial({
    //     transparent: true,
    //     opacity: 0.3, // Ajustez l'opacité selon vos besoins
    //     roughness: 0.1, // Réglage de la rugosité
    //     metalness: 0.9, // Réglage de la métallisation
    // });
    // const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    
    // // Rotation du sol pour le mettre à plat
    // ground.rotation.x = -Math.PI / 2; // Rotation de 90 degrés sur l'axe X
    
    // // Positionner le sol en dessous du personnage
    // ground.position.setY(-110); // Placer le sol légèrement en dessous du personnage
    
    // // Ajouter le sol à la scène
    // scene.add(ground);

    // Charger l'objet Drawer
    // const loaderDrawer = new FBXLoader();
    // loaderDrawer.load('./fbx/furnitures/drawer/drawer.fbx', function (drawer) {
    //     global.drawer = drawer;
    //     const box = new THREE.Box3().setFromObject(drawer); // Obtenir la boîte englobante de l'objet FBX
    //     const size = new THREE.Vector3();
    //     box.getSize(size); // Obtenir les dimensions de l'objet FBX

    //     const objectHeight = size.y; // Hauteur de l'objet FBX

    //     // Ajuster la taille de l'objet FBX
    //     const scaleFactor = 2; // Facteur d'agrandissement, vous pouvez ajuster cette valeur selon vos besoins
    //     drawer.scale.set(scaleFactor, scaleFactor, scaleFactor); // Ajuster la taille selon les trois axes

    //     // Placer l'objet FBX sur le sol
    //     drawer.position.setY(-150 + objectHeight / 2); // Placer l'objet à la hauteur du sol plus la moitié de sa hauteur
    //     drawer.position.setX(400);
    //     drawer.position.setZ(-450);

    //     const textureLoader = new THREE.TextureLoader();

    //     // Chargement de la texture diffuse (albedo)
    //     const diffuseTexture = textureLoader.load('./fbx/furnitures/drawer/textures/drawerDiff.jpg');
    //     // Chargement des autres textures
    //     const metalnessTexture = textureLoader.load('./fbx/furnitures/drawer/textures/drawerMetal.exr');
    //     const roughnessTexture = textureLoader.load('./fbx/furnitures/drawer/textures/drawerRough.jpg');
    //     const normalTexture = textureLoader.load('./fbx/furnitures/drawer/textures/drawerNorGl.exr');
    
    //     // Création du matériau PBR
    //     const material = new THREE.MeshStandardMaterial({
    //         map: diffuseTexture,
    //         metalnessMap: metalnessTexture,
    //         roughnessMap: roughnessTexture,
    //         normalMap: normalTexture,
    //         // Ajoutez d'autres propriétés de matériau si nécessaire
    //     });
    
    //     drawer.traverse(child => {
    //         if (child.isMesh) {
    //             child.material = material; // Appliquer le matériau à chaque maillage de l'objet FBX
    //         }
    //     });

    //      // Charger le second objet FBX (à placer sur le tiroir)
    //     const encyclopedias = new FBXLoader();
    //     encyclopedias.load('./fbx/furnitures/encyclopedia/encyclopedia.fbx', function (encyclopedia) {
    //         // Positionner le second objet par rapport au premier (le tiroir)
    //         encyclopedia.position.set(-15, 55, 10);

    //         // Chargement des textures
    //         const textureLoader = new THREE.TextureLoader();
    //         const coverDiffTexture = textureLoader.load('./fbx/furnitures/encyclopedia/textures/coverDiff.png');
    //         const coverMetallicTexture = textureLoader.load('./fbx/furnitures/encyclopedia/textures/coverMetallic.exr');
    //         const coverNorGlTexture = textureLoader.load('./fbx/furnitures/encyclopedia/textures/coverNorGl.png');
    //         const coverRoughnessTexture = textureLoader.load('./fbx/furnitures/encyclopedia/textures/coverRoughness.exr');
    //         const paperDiffTexture = textureLoader.load('./fbx/furnitures/encyclopedia/textures/paperDiff.png');
    //         const paperNorGlTexture = textureLoader.load('./fbx/furnitures/encyclopedia/textures/paperNorGl.png');
    //         const paperRoughnessTexture = textureLoader.load('./fbx/furnitures/encyclopedia/textures/paperRoughness.exr');

    //         // Création du matériau avec textures
    //         const material = new THREE.MeshStandardMaterial({
    //             map: paperDiffTexture,
    //             normalMap: paperNorGlTexture,
    //             roughnessMap: paperRoughnessTexture,
    //             // Autres propriétés de matériau si nécessaire
    //         });
    //         // Appliquer le matériau et les textures aux parties spécifiques du modèle
    //         encyclopedia.traverse(child => {
    //             if (child.isMesh) {
    //                 const name = child.name.toLowerCase(); // Nom de la pièce en minuscules pour vérification
    //                 console.log(name)

    //                 // Vérifier le nom de la pièce pour appliquer les textures correspondantes
    //                 if (name.includes('book')) {
    //                     child.material = new THREE.MeshStandardMaterial({
    //                         map: coverDiffTexture,
    //                         normalMap: coverNorGlTexture,
    //                         roughnessMap: coverRoughnessTexture,
    //                         metalnessMap: coverMetallicTexture,
    //                         // Autres propriétés de matériau si nécessaire
    //                     });
    //                 } else if (name.includes('paper')) {
    //                     child.material = material;
    //                 }
    //             }
    //         });
    //         // Ajouter le second objet comme enfant du tiroir
    //         drawer.add(encyclopedia); // Cela place le second objet sur le tiroir

    //         // ... (autres opérations si nécessaire)
    //         scene.add(drawer); // Ajouter le tiroir (avec le second objet) à la scène
    //     });
        
    // });

    function animate() {
        requestAnimationFrame(animate);

        // Mettre à jour ici les animations ou les transformations des objets

        renderer.render(scene, camera);
    }

    animate();
    
   
   return scene 
}





