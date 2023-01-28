'use strict';
import CharacterFeatures from './classes/CharacterFeatures.js';
const character = new CharacterFeatures();

document.addEventListener('keyup', (event)=>{
    
    if(event.key == ' '){
        character.actionJump();
    }
        
})
