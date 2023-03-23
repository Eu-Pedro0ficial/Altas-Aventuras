import formatStringToNumber from "../helpers/formatStringToNumber.js";

class Platform{

    constructor(){
        this.container = document.querySelector("#container");
        this.platform = document.querySelector('#platform');
        this.element = document.createElement('div');
        this.platform.setAttribute('id', 'platform')
        this.platform.appendChild(this.element);

        this.position = 0;
        this.stringPattern = /[a-z]+/;
        this.plataforma = document.getElementById('platform');
        this.image_background = document.querySelector('#container');

        this.right = false;
        this.left = true;

        this.movement = 'left';

        this.validationToTheRight = +this.position >= (this.container.clientWidth - this.plataforma.clientWidth);
        this.validationToTheLeft = +this.position <= 0;
    }

    AddRandomPosition(){
        let position_x = Math.floor(Math.random() * ((this.image_background.clientWidth - this.plataforma.clientWidth) - 1) + 1);
        let position_y = Math.floor(Math.random() * ((this.image_background.clientHeight - this.plataforma.clientHeight)- 1) + 1);

        this.plataforma.style.bottom = `${position_y}px`;
        this.plataforma.style.left = `${position_x}px`;
    }

    addRandomSize(){
        let width = Math.floor(Math.random() * (150 - 40) + 40);
        this.plataforma.style.width = `${width}px`;
    }
    
    addHorizontalMovement(){
        if(this.movement === 'left'){
            this.moveToLeft()
        }

        if(this.movement === 'right'){
            this.moveToRight()
        }
    }

    moveToRight(){
        this.position = Number(formatStringToNumber(this.plataforma.style.left, this.stringPattern));
        let validationToTheRight = +this.position >= (this.container.clientWidth - this.plataforma.clientWidth);
        
        if(validationToTheRight){
            this.movement = 'left'
        }

        this.position = validationToTheRight ? this.position : this.position + 10;
        this.plataforma.style.left = `${this.position}px`;
    }
    
    moveToLeft(){
        this.position = Number(formatStringToNumber(this.plataforma.style.left, this.stringPattern));
        let validationToTheLeft = +this.position <= 0;

        if(validationToTheLeft){
            this.movement = 'right'
        }

        this.position = validationToTheLeft ? this.position : this.position - 10;
        this.plataforma.style.left = `${this.position}px`;
    }
}

export default Platform
