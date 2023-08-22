export default class Platforms {
  constructor({
    size = {
        width: 0,
        height: 0
    },
    position = {
        x: 0,
        y: 0
    },
    velocity = {
        x: 0,
        y: 0
    },
    color: color,
    movement: movement,
    direction: direction,
    index: index
}){
    this.platform = document.createElement("div");
    this.size = {
      width: size.width,
      height: size.height
    }
    this.position = {
      x: position.x,
      y: position.y
    }
    this.velocity = {
      x: velocity.x,
      y: velocity.y
    }
    this.color = color;
    this.movement = movement;
    this.direction = direction;
    this.index = index;
    this.buildScenery();
    this.draw();
  }

  getElement(){
    return this.platform;
  }

  buildScenery(){
    this.platform.style.position = "absolute";
    this.platform.style.width = `${this.size.width}px`;
    this.platform.style.height = `${this.size.height}px`;
    this.platform.style.background = this.color;
    this.platform.setAttribute("id", `${this.index}`)
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

}
