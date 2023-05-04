import Screen from "./classes/Screen.js";
import Character from "./classes/Character.js";

const screen = new Screen;
const character = new Character;
const body = document.querySelector("body");

body.appendChild(screen.getElement());
screen.insert(character);

character.position.x = 230;
character.position.y = 430;
character.velocity.x = 10;
character.velocity.y = 10;

screen.getInitialPositions();
screen.paint();

document.addEventListener('keydown', ( event )=>{
    switch (event.key) {
        case 'ArrowRight':
            screen.pressKey('ArrowRight', true);
            break;
        case 'ArrowLeft':
            screen.pressKey('ArrowLeft', true);
            break;
        case ' ':
            screen.pressKey('Space', true);
            break;
    }
})

document.addEventListener('keyup', ( event )=>{
    switch (event.key) {
        case 'ArrowRight':
            screen.pressKey('ArrowRight', false);
            break;
        case 'ArrowLeft':
            screen.pressKey('ArrowLeft', false);
            break;
    }
})

// Pensar na ideia de responsabilidade unica
// Se perguntar sempre qual a melhor maneira de fazer algo e pensar na responsabilidade que cada elemento vai ter