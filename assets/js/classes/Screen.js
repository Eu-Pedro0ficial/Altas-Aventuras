class Screen{
    
    constructor(options) {
        let options_default = {
            character: null, 
            background: null,
            platformList: null,
            gravity: false 
        }
        this.CONFIG = {
            ...options_default,
            ...options
        };

        this.lastFallPositionCharacter = null;
        
        this.container = document.createElement('div');
        this.container.style.position = 'relative';
        this.container.style.border = "10px solid black";
        this.container.style.height = "500px";
        this.container.style.width = "500px";

        this.containerSize = 0;
        this.floor = 0;
        this.sizeJump = 200;

        this.leftHoritontalLimit = 0;
        this.rightHoritontalLimit = 0;
        
        this.screenObjects = [];
        this.keymap = {
            "ArrowRight": "arrowRight",
            "ArrowLeft": "arrowLeft",
            " ": "space",
            "ArrowUp": "arrowUp",
            "ArrowDown": "arrowDown"
        }
        this.keys = {
            arrowRight: false,
            arrowLeft: false,
            space: false,
            arrowUp: false,
            arrowDown: false
        }
        this.strength = 1.8;
        this.acceleration = 0.8;
        this.controlGravity = this.strength;
        this.position = {
            y: 0,
            x: 0
        }
        this.isJump = false;

        this.insert(this.CONFIG.character);
        this.insert(this.CONFIG.background);

        this.CONFIG.background.setMovementForAllPlatformsAndInsertInElement(this.CONFIG.platformList);
        this.screenObjects.push(...this.CONFIG.platformList);

        this.drawScreenObjects();
    }
    
    insert(screenObject){
      this.screenObjects.push(screenObject);
      this.container.appendChild(screenObject.getElement());
    }

    setProperties(){
      this.containerSize = this.container.clientWidth;
      this.floor = this.containerSize - this.CONFIG.character.characterSize;
      this.rightHoritontalLimit = this.containerSize - this.CONFIG.character.characterSize;
    }

    getElement(){
      return this.container;
    }
    
    draw() {
      this.drawScreenObjects();
      
      if(this.CONFIG.gravity) {
          this.enableGravity();
      }

      // Pulando | Gravidade desligada
      // Caindo | Gravidade ligada
      //@TODO - Detectou proximidade com plataforma | Gravidade desligada
          // posição do character
          // posição das plataforma
          // ter a função que desliga e liga a gravidade
          // criar um detect collision

      this.moveCharacter();
      this.moveScenario();
      this.movePlatforms();
    }

    paint(){
      window.requestAnimationFrame(this.paint.bind(this));
      this.draw();
    }

    drawScreenObjects(){
      for (const key in this.screenObjects) {
          this.screenObjects[key].draw();
      }
    }
    
    setLastFallPositionCharacter(){
      this.lastFallPositionCharacter = this.CONFIG.character.element.offsetTop;
    }

    detectCollision(){
      this.CONFIG.platformList.forEach(platform => {
          // Implemenar o detectCollision
      });
    }

    gravitySwitch(config){
      this.CONFIG.gravity = (config === 'on') ? true : false;
    }

    enableGravity () {
      if(this.isJump){
        return
      }

      if (this.CONFIG.character.position.y < this.floor) {
        this.controlGravity += this.acceleration;
        this.CONFIG.character.position.y += this.controlGravity;
        this.setImageFromCharacter("fallingDown")
      } else {
        this.setImageFromCharacter("person")
        this.controlGravity = this.strength;
      }
    }

    jump() {
      if(!this.isJump) {
        // @TODO - Esta tendo pulo infinito, resolver!!
        this.isJump = true;
        let jumped = 0;
        let index = setInterval(()=> {
          if (jumped <= this.sizeJump) {
            this.CONFIG.character.position.y -= this.CONFIG.character.velocity.y;
            jumped += this.CONFIG.character.velocity.y;
            this.setImageFromCharacter("jumping")
            this.CONFIG.character.song = "jumping";
          }else {
            this.isJump = false;
            clearInterval(index);
          }
        }, 10);
      }
    }
    
    setImageFromCharacter(imageName){
      this.CONFIG.character.image = imageName;
    }

    moveCharacter() {
      if(this.keys.arrowLeft){
        this.CONFIG.character.startingMovementTo("left", this.leftHoritontalLimit);
      }
      
      if(this.keys.arrowRight){
        this.CONFIG.character.startingMovementTo("right", this.rightHoritontalLimit);
      }

      if(this.keys.space){
        this.jump();
      }
    }

    moveScenario() {
      const lowestLimit = 0;
      const highestLimit = 480;

      if(this.keys.arrowUp){
        this.CONFIG.background.startingMovementTo("up", highestLimit);
      }
      
      if(this.keys.arrowDown){
        this.CONFIG.background.startingMovementTo("down", lowestLimit);
      }
    }

    movePlatforms(){
      const containerStartingPoint = 0;
      const containerEndpoint = 330;

      if(!this.CONFIG.platformList){
        return;
      }

      this.CONFIG.platformList.map((platform)=>{
        if(!platform.movement){
          return
        }

        if(platform.direction === "left"){
          platform.startingMovementTo("left", containerStartingPoint);
        }
        
        if(platform.direction === "right"){
          platform.startingMovementTo("right", containerEndpoint);
        }
      })
    }

    pressKey(key, value){
      let pressed_key = this.keymap[key]; 
      this.keys[pressed_key] = value;
    }
}

export default Screen;
