import Cell, { Position } from './Cell';
export default class Grid {

    private constructor(private cells: Cell[][]) {
        console.log(cells[0])
    }

    init(aliveCellPositions: Array<Position>) {
        aliveCellPositions.forEach(p => {
            this.cells[p.x][p.y].makeAlive();
        });
    }

    evoluate() {
        const nextGenerationCells: any = [];
        const size = this.cells.length;
        for (let i = 0; i < size; i++) {
            nextGenerationCells[i] = [];
            for (let j = 0; j < size; j++) {
                nextGenerationCells[i][j] = this.nextGenerationCell(this.cells[i][j]);
            }
        }
        this.cells = nextGenerationCells;
    }

    allCells() {
        let all: Cell[] = []
        this.cells.forEach(row => all = all.concat(...row));
        return all;
    }

    private nextGenerationCell(cell: Cell) {
        const aliveNeighbours = this.cellNeighbours(cell).filter(cell => cell.isAlive()).length;
        if (cell.isAlive()) {
            if (aliveNeighbours < 2 || aliveNeighbours > 3) {
                return new Cell(cell.position, false);
            }
            return new Cell(cell.position, true);
        } else if (aliveNeighbours === 3) {
            return new Cell(cell.position, true);
        } else {
            return new Cell(cell.position, false);
        }
    }

    private cellNeighbours(cell: Cell) {
        const neighbours = [];
        neighbours.push(this.getNeighbour(cell.position.x - 1, cell.position.y));
        neighbours.push(this.getNeighbour(cell.position.x - 1, cell.position.y - 1));
        neighbours.push(this.getNeighbour(cell.position.x - 1, cell.position.y + 1));
        neighbours.push(this.getNeighbour(cell.position.x, cell.position.y - 1));
        neighbours.push(this.getNeighbour(cell.position.x + 1, cell.position.y - 1));
        neighbours.push(this.getNeighbour(cell.position.x + 1, cell.position.y));
        neighbours.push(this.getNeighbour(cell.position.x, cell.position.y + 1));
        neighbours.push(this.getNeighbour(cell.position.x + 1, cell.position.y + 1));
        return neighbours.filter(n => n !== undefined);
    }


    private getNeighbour(x: number, y: number) {
        try { return this.cells[x][y] } catch (error) { return undefined }
    }

    static build(size: number) {
        const cells: Cell[][] = [[]];
        for (let i = 0; i < size; i++) {
            cells[i] = [];
            for (let j = 0; j < size; j++) {
                cells[i][j] = new Cell(new Position(i, j), false);
            }
        }
        return new Grid(cells);
    }

}