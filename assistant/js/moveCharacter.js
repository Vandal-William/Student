import {changeCharacterAnimation} from "./createSceneAndAssistant.js";
import { moveCharacterForward, moveCharacterBackward ,turnCharacterRight, turnCharacterLeft } from "./createSceneAndAssistant.js";

export function moveCharacter(){

    let ArrowUp = false;
    let ArrowDown = false; 
    let ArrowRight = false;
    let ArrowLeft = false;

    let animationPlaying = false; // Variable pour suivre l'état de l'animation

    document.addEventListener('keydown', function(event) {
        if (window.globalData.followCharacter === true) {
            if (event.key === 'ArrowUp' ) {
                ArrowUp = true;
                if(!animationPlaying){
                    animationPlaying = true;
                    changeCharacterAnimation("WalkInPlace", window.globalData.character);
                }
                if(ArrowUp){
                    moveCharacterForward();
                }
            } else if (event.key === 'ArrowRight') {
                ArrowRight = true;
                if(!animationPlaying){
                    animationPlaying = true;
                    changeCharacterAnimation("WalkInPlace", window.globalData.character);
                }
                if(ArrowRight){
                    turnCharacterRight();
                }
            } else if (event.key === 'ArrowLeft') {
                ArrowLeft = true;
                if(!animationPlaying){
                    animationPlaying = true;
                    changeCharacterAnimation("WalkInPlace", window.globalData.character);
                }
                if(ArrowLeft){
                    turnCharacterLeft();
                }
            }else if (event.key === 'ArrowDown') {
                ArrowDown = true;
                if(!animationPlaying){
                    animationPlaying = true;
                    changeCharacterAnimation("WalkInPlace", window.globalData.character);
                }
                if(ArrowDown){
                    moveCharacterBackward();
                }
            }
        }
    });

    document.addEventListener('keyup', function(event) {
        if (event.key === 'ArrowUp' || event.key === 'ArrowRight' || event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
            animationPlaying = false;
            changeCharacterAnimation("Idle", window.globalData.character);
        }
    });


}