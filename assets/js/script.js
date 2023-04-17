'use strict';
import CharacterFeatures from "./classes/CharacterFeatures.js";
import InteractiveBackground from "./classes/InteractiveBackground.js";
import Platform from "./classes/Platform.js";

let key = {
    spaceKey: false,
    arrowRightKey: false,
    arrowLeftKey: false
    
}

const character = new CharacterFeatures;
const background = new InteractiveBackground;
const platformInstance = new Platform;

function loaderHorizontalMovementPlatform(){

    setTimeout( loaderHorizontalMovementPlatform, 40);
    platformInstance.addHorizontalMovement();
}
loaderHorizontalMovementPlatform()

function detectMovement(){
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
//  limitar a quantidade de plataformas que serão lidas pelo forEach utilizando o tamanho do pulo
const platforms = document.querySelectorAll('.platform');
function update(){
    window.requestAnimationFrame(update);
    const characterPositionTop = character.character.offsetTop
    const characterPositionLeft = character.character.offsetLeft;
    const characterHeight = character.character.clientHeight
    // console.log(platforms[0].offsetTop, characterPositionTop);

    platforms.forEach((plaftom) => {
        let platformOffsetTop = plaftom.offsetTop;
        let platformOffsetLeft = plaftom.offsetLeft;
        let platformWidth = plaftom.clientWidth;
        let platformHeight = plaftom.clientHeight;

        if(
            character.isFall &&
            platformOffsetTop > characterPositionTop && //**
            platformOffsetTop < (characterPositionTop + 200) && //**
            (characterPositionTop + characterHeight) > (platformOffsetTop - platformHeight) && 
            (characterPositionTop + characterHeight) < (platformOffsetTop - platformHeight + 10) && 
            characterPositionLeft > platformOffsetLeft && 
            characterPositionLeft < platformOffsetLeft + platformWidth
            ){
            character.checkJump = false;
            character.stopAction(character.setIntervalIndex);
        }
    })

    detectMovement();
}
update();

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

// Algumas vezes ele passa direto pela plataforma sem parar em cima
// Fazer ele cair se ele não estiver em cima da plataforma
// Fazer o background se mexer sempre que o personagem pular