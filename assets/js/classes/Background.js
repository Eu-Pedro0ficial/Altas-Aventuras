class Background{

    constructor({
        size = {
            width: 0,
            height: 0
        },
        pathImage: pathImage,
        velocity: velocity
    }){
        this.scenario = document.createElement('div');
        this.type = 'background';
        this.size = {
            width: size.width,
            height: size.height
        }
        this.pathImage = pathImage;
        this.position = {
            bottom: 0,
            left: 0
        }
        this.velocity = velocity
        this.buildScenery();
    }

    buildScenery(){
        this.scenario.style.width = `${this.size.width}%`;
        this.scenario.style.height = `${this.size.height}%`;
        this.scenario.style.backgroundImage = `url(${this.pathImage})`;
        this.scenario.style.backgroundSize = '100%';
        this.scenario.style.backgroundRepeat = 'repeat-y';
        this.scenario.style.position = 'absolute';
        this.scenario.style.bottom = `${this.position.bottom}%`;
        this.scenario.style.left = `${this.position.left}%`;
        this.scenario.style.zIndex = '-1';
    }
    
    getElement(){
        return this.scenario;
    }
    
    draw(){
        this.setPositionBottom(this.position.bottom);
    }

    setPositionBottom(value){
        this.scenario.style.bottom = `${value}px`;
    }

}

export default Background;
