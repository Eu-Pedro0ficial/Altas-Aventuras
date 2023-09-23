export default class Platforms {
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
      },
      color: null,
      movement: null,
      direction: null,
      index: null
    }
    this.CONFIG = Object.assign(this.optionsDefault, options)

    this.platform = document.createElement("div");
    this.position = {
      x: this.CONFIG.position.x,
      y: this.CONFIG.position.y
    }
    this.velocity = {
      x: this.CONFIG.velocity.x,
      y: this.CONFIG.velocity.y
    }
    this.movement = this.CONFIG.movement;
    this.direction = this.CONFIG.direction;
    this.index = this.CONFIG.index;
    this.buildScenery();
    this.draw();
  }

  getElement(){
    return this.platform;
  }

  buildScenery(){
    this.platform.style.position = "absolute";
    this.platform.style.width = `${this.CONFIG.size.width}px`;
    this.platform.style.height = `${this.CONFIG.size.height}px`;
    this.platform.style.background = this.CONFIG.color;
    this.platform.setAttribute("id", `${this.CONFIG.index}`)
  }

  draw(){
    this.setPositionLeft(this.position.x);
    this.setPositionTop(this.position.y);
  }

  setPositionLeft(value){
    this.platform.style.left = `${value}px`;
  }

  setPositionTop(value){
    this.platform.style.top = `${value}px`;
  }

  startingMovementTo(direction, limitMovement){
    if(direction === "left"){
      this.direction = (this.position.x <= limitMovement) ? "right" : "left";
      this.position.x -= this.velocity.x
    }
    
    if(direction === "right"){
      this.direction = (this.position.x >= limitMovement) ? "left" : "right";
      this.position.x += this.velocity.x
    }
  }

  getElementPosition(){

    return {
      x: this.getElement().getBoundingClientRect().x,
      y: this.getElement().getBoundingClientRect().y
    }
  }

}
