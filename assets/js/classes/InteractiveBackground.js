import createImage from "../helpers/createImage.js";

class InteractiveBackground{
    imageBackground = document.getElementById('image-background');
    eventForInteraction = null;
    backgroundImage = null;
    position = 0;

    constructor(){
        this.backgroundImage = createImage(this.imageBackground, 'background-img.png')
        this.backgroundImage.setAttribute('id', 'background-image')
    }

    startBackgroundEvent(){
        if(this.checkKey("ArrowUp")){
            this.moveImageUp();
        }else if(this.checkKey("ArrowDown")){
            this.moveImageDown();
        }
    }
    
    moveImageUp(){
        this.position += 10;
        this.backgroundImage.style.bottom = `${this.position}px`;
    }
    
    moveImageDown(){
        this.position -= 10;
        this.backgroundImage.style.bottom = `${this.position}px`;
    }
    
    checkKey(key){
        return this.eventForInteraction.key === key;
    }

}

export default InteractiveBackground;
