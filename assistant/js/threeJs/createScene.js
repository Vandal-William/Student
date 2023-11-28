// Importer les modules Three.js nécessaires
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js';
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
        const textureLoader = new THREE.TextureLoader();
        object.children.forEach(mesh => {

            switch (mesh.name) {

                case "Room":
                    mesh.material.forEach(MeshPhongMaterial => {
                        switch (MeshPhongMaterial.name) {
                            case "Material.013":
                                /* 
                                    WoodFloor007_1K_Color.jpg
                                    WoodFloor007_1K_Roughness.jpg
                                    WoodFloor007_1K_Displacement.jpg
                                */
                            
                                const colorTexture = textureLoader.load('./fbx/scene/textures/WoodFloor007_1K_Color.jpg');
                                const roughnessTexture = textureLoader.load('./fbx/scene/textures/WoodFloor007_1K_Roughness.jpg');
                                const displacementTexture = textureLoader.load('./fbx/scene/textures/WoodFloor007_1K_Displacement.jpg');
                
                                // Assigner les textures aux propriétés correspondantes du matériau
                                MeshPhongMaterial.map = colorTexture; // Texture de couleur
                                MeshPhongMaterial.roughnessMap = roughnessTexture; // Texture de rugosité
                                MeshPhongMaterial.displacementMap = displacementTexture; // Texture de déplacement
                                break;

                            case "floor":
                                /* sol 
                                    WoodFloor007_1K_Color.jpg
                                    WoodFloor007_1K_Roughness.jpg
                                    WoodFloor007_1K_Normal.jpg
                                */

                                const colorTextureFloor = textureLoader.load('./fbx/scene/textures/WoodFloor007_1K_Color.jpg');
                                const roughnessTextureFloor = textureLoader.load('./fbx/scene/textures/WoodFloor007_1K_Roughness.jpg');
                                const normalTextureFloor = textureLoader.load('./fbx/scene/textures/WoodFloor007_1K_Normal.jpg');
                
                                // Assigner les textures aux propriétés correspondantes du matériau
                                MeshPhongMaterial.map = colorTextureFloor; // Texture de couleur
                                MeshPhongMaterial.roughnessMap = roughnessTextureFloor; // Texture de rugosité
                                MeshPhongMaterial.normalMap = normalTextureFloor; // Texture normale
                            break;

                            case "wall1":
                                /* mur de droite 
                                    couleur Hex 61352C
                                
                                */
                                MeshPhongMaterial.color.set(0x61352C);
                            
                                break;

                            case "wall2":

                                /* mur du fond 
                                     couleur Hex BE5845
                                */
                                MeshPhongMaterial.color.set(0xBE5845);
                            break;
                        
                            default:
                                break;
                        }
                    })
                    break;

                case "Blanket":
                    // couverture du lit
                    mesh.material.forEach(MeshPhongMaterial => {

                        switch (MeshPhongMaterial.name) {
                            case "red":
                                    /* 
                                     couleur hex E7292B
                                    */
                                    MeshPhongMaterial.color.set(0xE7292B);
                                    console.log("red")
                                break;

                            case "Material.005":
                                console.log("mat")
                                /* 
                                    TexturesCom_Fabric_Blanket_1K_albedo.tif
                                    TexturesCom_Fabric_Blanket_1K_roughness.tif
                                    TexturesCom_Fabric_Blanket_1K_normal.tif
                                */
                                const albedoTexture = textureLoader.load('./fbx/scene/textures/TexturesCom_Fabric_Blanket_1K_albedo.tif');
                                const roughnessTexture = textureLoader.load('./fbx/scene/textures/TexturesCom_Fabric_Blanket_1K_roughness.tif');
                                const normalTexture = textureLoader.load('./fbx/scene/textures/TexturesCom_Fabric_Blanket_1K_normal.tif');
                    
                                // Assigner les textures aux propriétés correspondantes du matériau
                                MeshPhongMaterial.map = albedoTexture; // Texture albedo
                                MeshPhongMaterial.roughnessMap = roughnessTexture; // Texture de rugosité
                                MeshPhongMaterial.normalMap = normalTexture; // Texture normale

                            break;
                        
                            default:
                                break;
                        }
                    })
                    break;

                case "Plane":
                    // sommier du lit
                    //  WoodFloor011_1K_Color.jpg
                    const colorTexturePlane = textureLoader.load('./fbx/scene/textures/WoodFloor011_1K_Color.jpg');
                    mesh.material.map = colorTexturePlane;
                    break;

                case "head_bed":

                    mesh.material.forEach(MeshPhongMaterial => {

                        switch (MeshPhongMaterial.name) {
                            case "head bed":
                                const colorTextureBed = textureLoader.load('./fbx/scene/textures/WoodFloor011_1K_Color.jpg');
                                MeshPhongMaterial.map = colorTextureBed;
                                break;

                            case "Material.004":
                                const colorTextureMat = textureLoader.load('./fbx/scene/textures/WoodFloor011_1K_Color.jpg');
                                MeshPhongMaterial.map = colorTextureMat;
                            break;
                        
                            default:
                                break;
                        }
                    })
                    break;

                case "Plane001":
                    /* 
                        Matela :
                        Fabric019_1K_Color.jpg
                        Fabric019_1K_Roughness.jpg
                        Fabric019_1K_Normal.jpg
                        Fabric019_1K_Displacement.jpg
                    */
                    const colorTexturePlane001 = textureLoader.load('./fbx/scene/textures/Fabric019_1K_Color.jpg');
                    const roughnessTexturePlane001 = textureLoader.load('./fbx/scene/textures/fabric_pattern_07_rough_4k.jpg');
                    // const displacementTexturePlane001 = textureLoader.load('./fbx/scene/textures/Fabric019_1K_Displacement.jpg');
                    const normalTexturePlane001 = textureLoader.load('./fbx/scene/textures/fabric_pattern_07_nor_gl_4k.jpg');

                    mesh.material.map = colorTexturePlane001;
                    mesh.material.roughnessMap = roughnessTexturePlane001; // Texture de rugosité
                    mesh.material.normalMap = normalTexturePlane001; // Texture normale
                    // mesh.material.displacementMap = displacementTexturePlane001; // Texture de déplacement
                break;

                case "Window_blank":
                    mesh.material.visible = false;
                break;

                case "door_blank":
                    mesh.material.visible = false;
                break;

                case "Cube020":
                    mesh.material.visible = false;
                break;

                case "Cube016":
                    mesh.material.visible = false;
                break;

                case "Cube018":
                    mesh.material.visible = false;
                break;

                case "Door_Group":
                     mesh.visible = false;
                break;

                case "Cube007":
                    mesh.visible = false;
                break;

                case "Cube013":
                    mesh.visible = false;
                break;

                case "Cube012":
                    mesh.visible = false;
                break;

                case "Cube011":
                    mesh.visible = false;
                break;

                case "Cube010":
                    mesh.visible = false;
                break;

                case "Cube008":
                    mesh.visible = false;
                break;

                case "Cube009":
                    mesh.visible = false;
                break;
                
                case "table":
                   /* 
                    TexturesCom_Wood_Wenge_1K_albedo.tif
                    TexturesCom_Wood_Wenge_1K_roughness.tif
                    TexturesCom_Wood_Wenge_1K_normal.tif
                   */
                    const roughnessTextureTable = textureLoader.load('./fbx/scene/textures/Wood022_1K_Roughness.jpg');
                    const normalTextureTable = textureLoader.load('./fbx/scene/textures/Wood022_1K_Normal.jpg');
                    const albedoTextureTable = textureLoader.load('./fbx/scene/textures/Wood022_1K_Color.jpg');
                    mesh.material.map = albedoTextureTable;
                    mesh.material.roughnessMap = roughnessTextureTable;
                    mesh.material.normalMap = normalTextureTable;
                break;

                case "Cabinet":
                    mesh.visible = false
                 break;

                case "Book0":
                    mesh.visible = false
                break;

                case "Book1":
                    mesh.visible = false
                break;

                case "Book2":
                    mesh.visible = false
                break;

                case "Book1002":
                    mesh.visible = false
                break;

                case "Book0002":
                    mesh.visible = false
                break;

                case "Book0001":
                    mesh.visible = false
                break;

                case "Book1001":
                    mesh.visible = false
                break;

                case "Book2001":
                    mesh.visible = false
                break;
            
                default:
                    break;
            }
           
        });
    });

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setClearColor(0x000000, 0); // Assure-toi que le fond soit transparent
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
    const ambientLight = new THREE.AmbientLight(0xffffff, 1); // Couleur blanche, intensité réduite
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

    const controls = new OrbitControls(camera, renderer.domElement);

    // Configurations des contrôles
    controls.enableDamping = true; // Mouvement fluide
    controls.dampingFactor = 0.25; // Facteur de fluidité (plus il est élevé, plus le mouvement est amorti)
    controls.rotateSpeed = 0.3; // Vitesse de rotation
    controls.zoomSpeed = 1.0; // Vitesse de zoom
    controls.panSpeed = 0.8; // Vitesse du panoramique

    // Limite de zoom
    controls.minDistance = 50; // Distance minimale de zoom
    controls.maxDistance = 500; // Distance maximale de zoom

    // Limites d'angle de vue
    controls.minPolarAngle = Math.PI / 6; // Angle de vue vertical minimal (30 degrés)
    controls.maxPolarAngle = Math.PI / 2; // Angle de vue vertical maximal (90 degrés)


    function animate() {
        requestAnimationFrame(animate);

        // Mettre à jour ici les animations ou les transformations des objets

        renderer.render(scene, camera);
    }

    animate();
    
   
   return scene 
}





