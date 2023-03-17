class InteractiveBackground{
    
    constructor(){
        this.imageBackground = document.getElementById('image-background');
        this.eventForInteraction = null;
        this.backgroundImage = document.getElementById('image-background');
        this.position = 0;
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
