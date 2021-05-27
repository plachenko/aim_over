export default class Position {
  x: number;
  y: number;

  constructor(x = 0, y = 0){
    this.x = Math.round(x); 
    this.y = Math.round(y);
  }

  public setPosition(x: number, y: number){
    this.x = x;
    this.y = y;
  }

  public getDistance(pos: Position){
    const distX = this.x - pos.x;
    const distY = this.y - pos.y;

    return new Position(distX, distY);
  }
}