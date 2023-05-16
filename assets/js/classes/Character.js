class Character{

    constructor({
        size = {
            width: 0,
            height: 0
        },
        position = {
            x: 0,
            y: 0
        },
        velocity = {
            x: 0,
            y: 0
        }

    }){
        this.element = document.createElement("div");
        this.element.style.border = "3px solid red";
        this.element.style.height = `${size.height}px`;
        this.element.style.width = `${size.width}px`;
        this.element.style.position = "absolute";

        this.type = 'character';

        this.characterSize = 50;
        this.position = {
            x: position.x,
            y: position.y
        }
        this.velocity = {
            x: velocity.x,
            y: velocity.y
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
