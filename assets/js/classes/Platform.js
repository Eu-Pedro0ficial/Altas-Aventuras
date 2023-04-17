import formatStringToNumber from "../helpers/formatStringToNumber.js";

class Platform{

    constructor(){
        this.platform_container = document.querySelector('#platforms');
        this.image_background = document.querySelector('#container');
        this.position = 0;
        this.stringPattern = /[a-z]+/;
        this.right = false;
        this.left = true;
        this.movement = 'left';
        this.maxSizePlatform = 150;
        this.minSizePlatform = 80;
        this.amountOfPlatforms = 87;

        this.platformGenerator();
    }

    platformGenerator(){
        let num = 1;
        let content = '';
        while(num < this.amountOfPlatforms){
            content += `
                <div class="platform" data-movement="left" data-num="${num}"></div>
            `;
            num++
        }
        this.platform_container.innerHTML = content;
        this.platform = document.querySelectorAll('.platform');

        this.AddRandomPosition();
        this.addRandomSize();
    }

    AddRandomPosition(){
        let position_y = 80;

        this.platform.forEach(element =>{
            let position_x = Math.floor(Math.random() * (this.image_background.clientWidth - this.maxSizePlatform));

            element.style.bottom = `${position_y}px`;
            element.style.left = `${position_x}px`;
            position_y += 80
        })
    }

    addRandomSize(){
        this.platform.forEach(element =>{
            let width = Math.floor(Math.random() * (this.maxSizePlatform - this.minSizePlatform) + this.minSizePlatform);

            element.style.width = `${width}px`;
        })
    }
    
    addHorizontalMovement(){
        const multiplesOfNine = [9, 18, 27, 36, 45, 54, 63, 72, 81];
        this.platform.forEach( element =>{
            let movement = element.getAttribute('data-movement');
            let numberAttribute = element.getAttribute('data-num');

            multiplesOfNine.find( number =>{
                if(numberAttribute == number){
                    
                    if(movement === 'left'){
                        this.moveToLeft(element)
                    }
                    
                    if(movement === 'right'){
                        this.moveToRight(element)
                    }
                    return;
                }
            })
        })
    }

    moveToRight(element){

        this.position = Number(formatStringToNumber(element.style.left, this.stringPattern));
        let validationToTheRight = this.position >= (this.image_background.clientWidth - element.clientWidth);
        
        if(validationToTheRight){
            element.dataset.movement = 'left'
        }
        
        this.position = validationToTheRight ? this.position : this.position + 10;
        element.style.left = `${this.position}px`;
    }
    
    moveToLeft(element){

        this.position = Number(formatStringToNumber(element.style.left, this.stringPattern));
        let validationToTheLeft = this.position <= 0;
        
        if(validationToTheLeft){
            element.dataset.movement = 'right'
        }
        
        this.position = validationToTheLeft ? this.position : this.position - 10;
        element.style.left = `${this.position}px`;
    }
}

export default Platform
