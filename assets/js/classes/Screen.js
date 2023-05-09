class Screen{
    

    constructor({
            character,
            gravity = false        
        }){
        this.character = character;
        this.lastFallPositionCharacter = null;
        this.gravity = gravity;
        
        this.container = document.createElement('div');
        this.container.style.position = 'relative';
        this.container.style.border = "10px solid black";
        this.container.style.height = "500px";
        this.container.style.width = "500px";

        this.containerSize = 0;
        this.floor = 0;

        this.leftHoritontalLimit = 0;
        this.rightHoritontalLimit = 0;
        
        this.screenObjects = [];
        this.keys = {
            arrowRight: false,
            arrowLeft: false,
            space: false,
        }
        this.strength = 1.8;
        this.acceleration = 0.8;
        this.controlGravity = this.strength;
        this.position = {
            y: 0,
            x: 0
        }
        this.isJump = false;
        
        this.insert(this.character);
        this.drawScreenObjects();
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

        this.detectKey()
    }

    paint(){
        setInterval(()=>{
            this.draw();

        }, 50)
    }

    drawScreenObjects(){
        for (const key in this.screenObjects) {
            this.screenObjects[key].draw();
        }
    }

    // setPositions(){
    //     if(this.keys.arrowRight){
    //         this.position.x += this.velocity.x;
    //     }

    //     if(this.keys.arrowLeft){
    //         this.position.x -= this.velocity.x;
    //     }

    //     if (this.keys.space) {
    //         this.position.y -= this.velocity.y;
    //         this.checkJump();
    //     }
    // }

    checkJump(){
        let currentPosition = this.character.element.offsetTop;

        if(currentPosition <= (this.lastFallPositionCharacter - 150)){
            this.keys.space = false;
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
    }// @TODO - Não reseta a queda

    jump() {
        if(!this.isJump){
            let sizeJump = 200;
            let jumped = 0;
            let index = setInterval(()=> {
                if (jumped <= sizeJump) {
                    this.isJump = true;
                    this.character.position.y -= 10;
                    jumped += 10;
                }else {
                    this.isJump = false;
                    clearInterval(index);
                }
            }, 50);
        }
    }// @TODO - Esse setInterval ta rodando direto e ta dando problema

    // gravity(){
    //     let containerSize = this.container.clientHeight;
    //     let characterOffsetTop = this.character.element.offsetTop;
    //     let characterSize = this.character.element.clientHeight

    //     if(this.keys.space){
    //         this.strength = 2.8;
    //     }

    //     if(characterOffsetTop < containerSize - characterSize && !this.keys.space){
    //         this.strength += 0.8;
    //         this.position.y += this.strength;
    //     }
    // }

    detectKey(){
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
    }// @TODO - Mudar o nome!

    pressKey(key, value){
        switch (key) {
            case 'ArrowRight':
                this.keys.arrowRight = value;
                break;
            case 'ArrowLeft':
                this.keys.arrowLeft = value;
                break;
            case 'Space':
                this.keys.space = value;
                this.jump();
                break;
        }
    }
}

export default Screen;