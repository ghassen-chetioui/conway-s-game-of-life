export default class Cell {

    constructor(readonly position: Position, private alive: boolean) { }
    isAlive() { return this.alive }
    makeAlive() { this.alive = true }
}

export class Position {
    constructor(readonly x: number, readonly y: number) { }

    eqauls(other: Position) {
        return this.x === other.x && this.y === other.y
    }
}