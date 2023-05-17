class Screen{
    

    constructor({
            character,
            gravity = false        
        }){
        this.character = null;
        this.background = null;

        this.lastFallPositionCharacter = null;
        this.gravity = gravity;
        
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
        
        this.drawScreenObjects();
    }

    setScreenObjectsInProperties(){
        for (const key in this.screenObjects) {
            switch (this.screenObjects[key].type) {
                case 'character':
                    this.character = this.screenObjects[key];
                    break;
                case 'background':
                    this.background = this.screenObjects[key];
                    break;
            }
        }
    }
    
    insert(screenObject){
        this.screenObjects.push(screenObject);
        this.container.appendChild(screenObject.getElement());
    }

    setProperties(){
        this.containerSize = this.container.clientWidth;
        this.floor = this.containerSize - this.character.characterSize;
        this.rightHoritontalLimit = this.containerSize - this.character.characterSize;
    }

    getElement(){
        return this.container;
    }
    
    draw() {
        this.drawScreenObjects();
        
        if(this.gravity) {
            this.enableGravity();
        }

        this.moveCharacter();
        this.moveScenario();
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
        this.lastFallPositionCharacter = this.character.element.offsetTop;
    }

    enableGravity () {
        if (!this.isJump) {
            if (this.character.position.y < this.floor) {
                this.controlGravity += this.acceleration;
                this.character.position.y += this.controlGravity;
            } else {
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
                    this.character.position.y -= this.character.velocity.y;
                    jumped += this.character.velocity.y;
                }else {
                    this.isJump = false;
                    clearInterval(index);
                }
            }, 10);
        }
    }

    moveCharacter() {
        if(this.keys.arrowLeft){
            this.character.position.x -= 
                this.leftHoritontalLimit <= this.character.position.x ? 
                this.character.velocity.x : 
                0;
        }
        
        if(this.keys.arrowRight){
            this.character.position.x += 
                this.rightHoritontalLimit >= this.character.position.x ? 
                this.character.velocity.x :
                0;
        }

        if(this.keys.space){
            this.jump();
        }
    }

    moveScenario() {
        if(this.keys.arrowUp){
            let offsetBottom = this.background.scenario.offsetTop + this.background.scenario.offsetHeight;
            this.background.position.bottom += 
                offsetBottom <= 480 ? 
                0 :  
                this.background.velocity;
        }
        
        if(this.keys.arrowDown){
            this.background.position.bottom -= 
                this.background.scenario.offsetTop >= 0 ? 
                0 : 
                this.background.velocity;
        }
    }

    pressKey(key, value){
        let pressed_key = this.keymap[key]; 
        this.keys[pressed_key] = value;
    }
}

export default Screen;