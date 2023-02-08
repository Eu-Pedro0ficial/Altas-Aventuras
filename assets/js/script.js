'use strict';
import CharacterFeatures from "./classes/CharacterFeatures.js";

const character = new CharacterFeatures;
document.addEventListener('keydown', (event)=>{

    character.checkAction(event);
        
})
