class Character{

    constructor(){
        this.element = document.createElement("div");
        this.element.style.border = "3px solid red";
        this.element.style.height = "50px";
        this.element.style.width = "50px";
        this.element.style.position = "absolute";

        this.characterSize = 50;
        this.position = {
            x: 0,
            y: 0
        }
        this.velocity = {
            x: 0,
            y: 0
        }
    }

    getElement(){
        return this.element;
    }

    draw(){
        this.setPositionLeft(this.position.x);
        this.setPositionTop(this.position.y);
    }

    setPositionTop(value){
        this.element.style.top = `${value}px`;
    }
    
    setPositionLeft(value){
        this.element.style.left = `${value}px`;
    }

}

export default Character;