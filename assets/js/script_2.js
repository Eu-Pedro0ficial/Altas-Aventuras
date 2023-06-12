import Screen from "./classes/Screen.js";
import Character from "./classes/Character.js";
import Background from "./classes/Background.js";
import Platforms from "./classes/Platforms.js";

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

const platform = new Platforms({
    size: {
        width: 150,
        height: 15
    },
    position: {
        x: 230,
        y: 400
    },
    velocity: {
        x: 1.5,
        y: 0
    },
    color: "blue",
    movement: true,
    direction: "left"
})

window.screen = new Screen({
    gravity: true,
    background: background,
    platform: platform,
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