import {changeCharacterAnimation} from "./addCharacterToScene.js";
import { moveCharacterForward, moveCharacterBackward ,turnCharacterRight, turnCharacterLeft } from "./addCharacterToScene.js";
import { global } from "./global.js";

export function moveCharacter(){

    let ArrowUp = false;
    let ArrowDown = false; 
    let ArrowRight = false;
    let ArrowLeft = false;

    let animationPlaying = false; // Variable pour suivre l'état de l'animation

    document.addEventListener('keydown', function(event) {
        if (global.followCharacter === true) {
            if (event.key === 'ArrowUp' ) {
                ArrowUp = true;
                if(!animationPlaying){
                    animationPlaying = true;
                    changeCharacterAnimation("WalkInPlace", global.characterObject);
                    
                }
                if(ArrowUp){
                    moveCharacterForward(global.camera, global.drawer);
                }
            } else if (event.key === 'ArrowRight') {
                ArrowRight = true;
                if(!animationPlaying){
                    animationPlaying = true;
                    changeCharacterAnimation("WalkInPlace", global.characterObject);
                    
                }
                if(ArrowRight){
                    turnCharacterRight(global.camera);
                }
            } else if (event.key === 'ArrowLeft') {
                ArrowLeft = true;
                if(!animationPlaying){
                    animationPlaying = true;
                    changeCharacterAnimation("WalkInPlace", global.characterObject);
                }
                if(ArrowLeft){
                    turnCharacterLeft(global.camera); 
                }
            }else if (event.key === 'ArrowDown') {
                ArrowDown = true;
                if(!animationPlaying){
                    animationPlaying = true;
                    changeCharacterAnimation("WalkInPlace", global.characterObject);
                   
                }
                if(ArrowDown){
                    moveCharacterBackward(global.camera, global.drawer);
                }
            }
        }
    });

    document.addEventListener('keyup', function(event) {
        if (event.key === 'ArrowUp' || event.key === 'ArrowRight' || event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
            animationPlaying = false;
            changeCharacterAnimation("Idle", global.characterObject);
        }
    });


}