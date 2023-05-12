import Screen from "./classes/Screen.js";
import Character from "./classes/Character.js";

window.character = new Character;
character.position.x = 230;
character.position.y = 0;
character.velocity.x = 2;
character.velocity.y = 10;

window.screen = new Screen({
    character,
    gravity: true        
});
const body = document.querySelector("body");

body.appendChild(screen.getElement());
screen.setProperties();
screen.paint();

document.addEventListener('keydown', ( event )=>{
    screen.pressKey(event.key, true);
});

document.addEventListener('keyup', ( event )=>{
    screen.pressKey(event.key, false);
});

// Pensar na ideia de responsabilidade unica
// Se perguntar sempre qual a melhor maneira de fazer algo e pensar na responsabilidade que cada elemento vai ter