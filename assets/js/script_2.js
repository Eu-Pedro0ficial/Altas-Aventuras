import Screen from "./classes/Screen.js";
import Character from "./classes/Character.js";
import Background from "./classes/Background.js";

const background = new Background({
    size: {
        width: 100,
        height: 150
    },
    pathImage: './assets/img/background-img.jpg',
    velocity: 3
});

const character = new Character({
    size: {
        width: 50,
        height: 50
    },
    position: {
        x: 230,
        y: 0
    },
    velocity: {
        x: 4,
        y: 10
    }
});

window.screen = new Screen({
    gravity: true,
    background: background,
    character: character    
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