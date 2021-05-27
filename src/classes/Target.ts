import Position from './Position';

export default class Target {
    public id: number;
    public position: Position;
    public time: number

    public hit = false;

    constructor(id: number, x: number, y: number, time = 0){
        this.id = id;
        this.time = time;
        this.position = new Position(x, y);
    }
}