'use strict';
import CharacterFeatures from "./classes/CharacterFeatures.js";
import InteractiveBackground from "./classes/InteractiveBackground.js";

const character = new CharacterFeatures;
const background = new InteractiveBackground;

function detectMovement(){
    window.requestAnimationFrame(detectMovement);
    if(key.spaceKey){
        character.actionJump();
    }

    if(key.arrowRightKey){
        character.moveCharacterForRight();
    }

    if(key.arrowLeftKey){
        character.moveCharacterForLeft();
    }
}

let key = {
    spaceKey: false,
    arrowRightKey: false,
    arrowLeftKey: false
    
}

detectMovement();

document.addEventListener('keydown', (event)=>{
    background.eventForInteraction = event;
    background.startBackgroundEvent()
    switch (event.key) {
        case ' ':
            key.spaceKey = true;
        break;
        case 'ArrowRight':
            key.arrowRightKey = true;
            break;
        case 'ArrowLeft':
            key.arrowLeftKey = true;
            break;
        default:
            break;
    }
        
})

document.addEventListener('keyup', (event)=>{
    switch (event.key) {
        case ' ':
            key.spaceKey = false;
            break;
        case 'ArrowRight':
            key.arrowRightKey = false;
            break;
        case 'ArrowLeft':
            key.arrowLeftKey = false;
            break;
        default:
            break;
    }
    
})
