'use strict';
import CharacterFeatures from "./classes/CharacterFeatures.js";
import InteractiveBackground from "./classes/InteractiveBackground.js";
import Platform from "./classes/Platform.js";

const character = new CharacterFeatures;
const background = new InteractiveBackground;
const platformInstance = new Platform;

platformInstance.AddRandomPosition();
platformInstance.addRandomSize();

function loader(){

    setTimeout( loader, 40);
    platformInstance.addHorizontalMovement();
}
loader()

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
