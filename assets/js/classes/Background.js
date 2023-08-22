class Background{

    constructor({
        size = {
            width: 0,
            height: 0
        },
        pathImage: pathImage,
        velocity: velocity,
        platforms: platforms
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
        this.velocity = velocity;
        this.platforms = platforms;
        this.buildScenery();
        this.buildPlatforms(platforms)
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
        this.drawPlatforms();

        this.setPositionBottom(this.position.bottom);
        this.movePlatforms()
    }

    setPositionBottom(value){
        this.scenario.style.bottom = `${value}px`;
    }

    buildPlatforms(){
        this.platforms.map((platform)=>{
            if(platform.index % 3 ==! 0){
                platform.movement = false;
            }
            this.insert(platform);
        })
    }

    drawPlatforms(){
        this.platforms.map((platform) => {
            platform.draw();
        })
    }

    movePlatforms(){
        this.platforms.map((platform)=>{
            if(platform.movement){
                if(platform.direction === "left"){
                    if(platform.position.x <= 0){
                        platform.direction = "right";
                    }
                    platform.position.x -= platform.velocity.x
                }
                
                if(platform.direction === "right"){
                    if(platform.position.x >= 330){
                        platform.direction = "left";
                    }
                    platform.position.x += platform.velocity.x
                }
            }
        })
    }

    insert(screenObject){
        this.scenario.appendChild(screenObject.getElement());
    }
}

export default Background;
