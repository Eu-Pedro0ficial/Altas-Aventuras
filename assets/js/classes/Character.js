class Character{

    constructor(options){
        this.optionsDefault = {
          size: {
              width: 0,
              height: 0
          },
          position: {
              x: 0,
              y: 0
          },
          velocity: {
              x: 0,
              y: 0
          }
        }
        this.CONFIG = Object.assign(this.optionsDefault, options);
        this.element = document.createElement("div");
        this.imageTag = document.createElement("img");
        this.pathImage = "assets/img/";
        this.pathAudio = "assets/audio/";
        this.song = "";
        this.image = "";
        this.type = 'character';
        this.characterSize = 50;
        this.position = {
            x: this.CONFIG.position.x,
            y: this.CONFIG.position.y
        }
        this.velocity = {
            x: this.CONFIG.velocity.x,
            y: this.CONFIG.velocity.y
        }
        this.buildScenery();
    }

    getElement(){
        return this.element;
    }

    buildScenery(){
        this.element.style.border = "3px solid red";
        this.element.style.height = `${this.CONFIG.size.height}px`;
        this.element.style.width = `${this.CONFIG.size.width}px`;
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
        // this.characterVoice(this.song);
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

    startingMovementTo(direction, limitMovement){
      const neutralValue = 0;

      if(direction === "right"){
        this.position.x += limitMovement >= this.position.x ? this.velocity.x : neutralValue;
      }

      if(direction === "left"){
        this.position.x -= limitMovement <= this.position.x ? this.velocity.x : neutralValue;
      }
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

    getElementPosition(){
        return {
            x: this.getElement().getBoundingClientRect().x,
            y: this.getElement().getBoundingClientRect().y
        }
    }
}

export default Character;
