class Screen{
    
    constructor(options) {
        let options_default = {
            character: null, 
            background: null,
            platformList: null,
            gravity: false 
        }
        this.config = {
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

        this.insert(this.config.character);
        this.insert(this.config.background);

        this.config.background.setMovementForAllPlatformsAndInsertInElement(this.config.platformList);
        this.screenObjects.push(...this.config.platformList);

        this.drawScreenObjects();
    }
    
    insert(screenObject){
      this.screenObjects.push(screenObject);
      this.container.appendChild(screenObject.getElement());
    }

    setProperties(){
      this.containerSize = this.container.clientWidth;
      this.floor = this.containerSize - this.config.character.characterSize;
      this.rightHoritontalLimit = this.containerSize - this.config.character.characterSize;
    }

    getElement(){
      return this.container;
    }
    
    draw() {
      this.drawScreenObjects();
      
      if(this.config.gravity) {
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
      this.lastFallPositionCharacter = this.config.character.element.offsetTop;
    }

    detectCollision(){
      this.config.platformList.forEach(platform => {
          
      });
    }

    gravitySwitch(config){
      this.config.gravity = (config === 'on') ? true : false;
    }

    enableGravity () {
      if (!this.isJump) {
        if (this.config.character.position.y < this.floor) {
          this.controlGravity += this.acceleration;
          this.config.character.position.y += this.controlGravity;
          this.config.character.image = "fallingDown";
        } else {
          this.config.character.image = "person";
          this.controlGravity = this.strength;
        }
      }
    }

    jump() {
      if(!this.isJump) {
        // @TODO - Esta tendo pulo infinito, resolver!!
        this.isJump = true;
        let jumped = 0;
        let index = setInterval(()=> {
          if (jumped <= this.sizeJump) {
            this.config.character.position.y -= this.config.character.velocity.y;
            jumped += this.config.character.velocity.y;
            this.config.character.image = "jumping";
            this.config.character.song = "jumping";
          }else {
            this.isJump = false;
            clearInterval(index);
          }
        }, 10);
      }
    }

    moveCharacter() {
      if(this.keys.arrowLeft){
        this.config.character.position.x -= 
          this.leftHoritontalLimit <= this.config.character.position.x ? 
          this.config.character.velocity.x : 
          0;
      }
      
      if(this.keys.arrowRight){
        this.config.character.position.x += 
          this.rightHoritontalLimit >= this.config.character.position.x ? 
          this.config.character.velocity.x :
          0;
      }

      if(this.keys.space){
        this.jump();
      }
    }

    moveScenario() {
      if(this.keys.arrowUp){
        let offsetBottom = this.config.background.scenario.offsetTop + this.config.background.scenario.offsetHeight;
        this.config.background.position.bottom += 
          offsetBottom <= 480 ? 
          0 :  
          this.config.background.velocity;
      }
      
      if(this.keys.arrowDown){
        this.config.background.position.bottom -= 
          this.config.background.scenario.offsetTop >= 0 ? 
          0 : 
          this.config.background.velocity;
      }
    }

    movePlatforms(){
      const containerStartingPointSize = 0;
      const containerFullSize = 330;

      if(!this.config.platformList){
        return;
      }

      this.config.platformList.map((platform)=>{
        if(platform.movement){
          if(platform.direction === "left"){
            if(platform.position.x <= containerStartingPointSize){
                platform.direction = "right";
            }
            platform.position.x -= platform.velocity.x
          }
          
          if(platform.direction === "right"){
            if(platform.position.x >= containerFullSize){
                platform.direction = "left";
            }
            platform.position.x += platform.velocity.x
          }
        }
      })
    }

    pressKey(key, value){
      let pressed_key = this.keymap[key]; 
      this.keys[pressed_key] = value;
    }
}

export default Screen;
