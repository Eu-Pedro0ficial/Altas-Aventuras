import Screen from "./classes/Screen.js";
import Character from "./classes/Character.js";
import Background from "./classes/Background.js";
import Platforms from "./classes/Platforms.js";

function startPlatforms(){
    const platformList = [];
    const amountPlatforms = 87;
    const fixedValueForSum = 80;
    let position_y = 80;

    for (let index = 0; index < amountPlatforms; index++) {
        const height = 15;
        const speedOnXAxis = 1.5;
        const speedOnYAxis = 0;
        let width = Math.floor(Math.random() * (150 - 80) + 80);
        let position_x = Math.floor(Math.random() * (500 - width));

        platformList.push(
            new Platforms({
                size: {
                    width: width,
                    height: height
                },
                position: {
                    x: position_x,
                    y: position_y
                },
                velocity: {
                    x: speedOnXAxis,
                    y: speedOnYAxis
                },
                color: "blue",
                movement: true,
                direction: "left",
                index: index
            })
        )
        position_y += fixedValueForSum;
    }

    return platformList;
}
const platformList = startPlatforms();

const background = new Background({
    size: {
        width: 100,
        height: 1470
    },
    pathImage: './assets/img/background-img.jpg',
    velocity: 30,
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
    platformList: platformList,
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

// @TODO - Numeros magicos
// @TODO - Reduzir os if
// @TODO - Diminuir blocos de codigo denso
// @TODO - Fazer o personagem detectar as plataformas
// @TODO - Fazer a morte do personagem
// @TODO - O personagem não ta soltando som da forma certa

// Pensar na ideia de responsabilidade unica
// Se perguntar sempre qual a melhor maneira de fazer algo e pensar na responsabilidade que cada elemento vai ter