import {changeCharacterAnimation} from "./createSceneAndAssistant.js";
import { moveCharacterForward, turnCharacterRight, turnCharacterLeft } from "./createSceneAndAssistant.js";

export function moveCharacter(){

    let ArrowUp = false; // Variable pour suivre l'état de la touche Z
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
            }
        }
    });

    document.addEventListener('keyup', function(event) {
        if (event.key === 'ArrowUp' || event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
            animationPlaying = false;
            changeCharacterAnimation("Idle", window.globalData.character);
        }
    });


}