class Background{

    constructor(options){
        this.optionsDefault = {
            size: {
                width: 0,
                height: 0
            },
            pathImage: null,
            velocity: null,
        }

        this.CONFIG = Object.assign(this.optionsDefault, options);
        this.scenario = document.createElement('div');
        this.type = 'background';
        this.position = {
            bottom: 0,
            left: 0
        }
        this.velocity = this.CONFIG.velocity;
        this.buildScenery();
    }

    buildScenery(){
        this.scenario.style.width = `${this.CONFIG.size.width}%`;
        this.scenario.style.height = `${this.CONFIG.size.height}%`;
        this.scenario.style.backgroundImage = `url(${this.CONFIG.pathImage})`;
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

    startingMovementTo(direction, limitMovement){
      const offsetTopValue = this.scenario.offsetTop;
      const offsetBottomValue = offsetTopValue + this.scenario.offsetHeight;
      const neutralValue = 0

      if(direction === "up"){
        this.position.bottom += (offsetBottomValue <= limitMovement) ? neutralValue : this.velocity;
      }
      
      if(direction === "down"){
        this.position.bottom -= (offsetTopValue >= limitMovement) ? neutralValue : this.velocity;
      }
      
    }
 
    setMovementForAllPlatformsAndInsertInElement(platforms){
      // @TODO - Responsabilidade unica
      platforms.map((platform)=>{
        if(this.calculationToKnowWhichPlatformWillReceiveTheMovement(platform)){
          platform.movement = false;
        }
        this.insert(platform);
      })
    }

    calculationToKnowWhichPlatformWillReceiveTheMovement({ index }){
      const dividerParameter = 3;
      const equalityParameter = 0;
      return index % dividerParameter ==! equalityParameter;
    }

    insert(screenObject){
        this.scenario.appendChild(screenObject.getElement());
    }
}

export default Background;
