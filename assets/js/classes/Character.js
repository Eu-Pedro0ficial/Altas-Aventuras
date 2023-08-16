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
        this.imageTag = document.createElement("img");
        this.pathImage = "assets/img/";
        this.pathAudio = "assets/audio/";
        this.song = "";
        this.image = "";
        this.type = 'character';

        this.characterSize = 50;
        this.size = {
            width: size.width,
            height: size.height
        }
        this.position = {
            x: position.x,
            y: position.y
        }
        this.velocity = {
            x: velocity.x,
            y: velocity.y
        }
        this.buildScenery();
    }

    getElement(){
        return this.element;
    }

    buildScenery(){
        this.element.style.border = "3px solid red";
        this.element.style.height = `${this.size.height}px`;
        this.element.style.width = `${this.size.width}px`;
        this.element.style.position = "absolute";
        this.element.style.display = "flex";
        this.element.style.justifyContent = "center";
        this.element.style.alignItems = "center";
        this.imageTag.src = "assets/img/person.png";
        this.imageTag.style.height = "300%";
        this.imageTag.style.width = "300%";
        this.element.appendChild(this.imageTag)
    }

    draw(){
        this.characterVoice(this.song);
        this.characterImage(this.image);
        this.setPositionLeft(this.position.x);
        this.setPositionTop(this.position.y);
    }

    setPositionTop(value){
        this.element.style.top = `${value}px`;
    }
    
    setPositionLeft(value){
        this.element.style.left = `${value}px`;
    }

    characterImage(image){
        if(image === ""){
            return;
        }

        this.imageTag.src = `${this.pathImage}${image}.png`
    }

    characterVoice(song){
        if(song === ""){
            return;
        }

        const audio = new Audio();
        this.characterAudio = audio;
        this.characterAudio.src = `${this.pathAudio}${song}.mp3`;
        this.song = "";
        this.characterAudio.play();
        // @TODO - Ta soltando o audio varias vezes em um unico pulo
    }
}

export default Character;
