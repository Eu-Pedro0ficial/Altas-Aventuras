class Screen{

    constructor(){

        this.container = document.createElement('div');
        this.container.style.position = 'relative';
        this.lastFallPositionCharacter = null;
        this.screenObjects = [];
        this.keys = {
            arrowRight: false,
            arrowLeft: false,
            space: false,
        }
        this.strength = 2.8;
        this.position = {
            y: 0,
            x: 0
        }
        this.velocity = {
            y: 0,
            x: 0
        }
        this.draw();
    }

    insert(screenObject){
        this.screenObjects.push(screenObject);
        this.container.appendChild(screenObject.getElement());
    }

    getElement(){
        return this.container;
    }

    draw(){
        this.container.style.border = "10px solid black";
        this.container.style.height = "500px";
        this.container.style.width = "500px";

        if(!this.screenObjects[0]){
            return;
        }

        this.gravity();
        this.setPositions();

        if (!this.keys.space) {
            this.setLastFallPositionCharacter();
        }
    }

    paint(){
        setInterval(()=>{
            this.draw()

        }, 50)
    }

    getInitialPositions(){
        for (const key in this.screenObjects) {
            this.position.y = this.screenObjects[key].position.y;
            this.position.x = this.screenObjects[key].position.x;
            this.velocity.y = this.screenObjects[key].velocity.y;
            this.velocity.x = this.screenObjects[key].velocity.x;
        }
    }

    setNewPositions(){
        for (const key in this.screenObjects) {
            this.screenObjects[key].setPositionTop(this.position.y);
            this.screenObjects[key].setPositionLeft(this.position.x);
        }
    }

    setPositions(){
        if(this.keys.arrowRight){
            this.position.x += this.velocity.x;
        }

        if(this.keys.arrowLeft){
            this.position.x -= this.velocity.x;
        }

        if (this.keys.space) {
            this.position.y -= this.velocity.y;
            this.checkJump();
        }

        this.setNewPositions();
    }

    checkJump(){
        let currentPosition = this.container.children[0].offsetTop;

        if(currentPosition <= (this.lastFallPositionCharacter - 150)){
            this.keys.space = false;
        }
    }
    
    setLastFallPositionCharacter(){
        this.lastFallPositionCharacter = this.container.children[0].offsetTop;
    }

    gravity(){
        let containerSize = this.container.clientHeight;
        let characterOffsetTop = this.screenObjects[0].element.offsetTop;
        let characterSize = this.screenObjects[0].element.clientHeight

        if(this.keys.space){
            this.strength = 2.8;
        }

        if(characterOffsetTop < containerSize - characterSize && !this.keys.space){
            this.strength += 0.8;
            this.position.y += this.strength;
        }
    }

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
                break;
        }
    }
}

export default Screen;