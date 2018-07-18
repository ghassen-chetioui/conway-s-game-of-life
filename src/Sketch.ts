// Magic for p5 importing properly in TypeScript AND Webpack
import 'p5';
import Grid from './Grid';
import { Position } from './Cell';
const p5 = require("p5");


const sketch: p5 = new p5(() => { });

const sketchSize = 800;
const cellSize = 20;
const grid = Grid.build(Math.floor(sketchSize / cellSize));

sketch.setup = () => {
  sketch.createCanvas(sketchSize, sketchSize);
  sketch.frameRate(10);
  grid.init([
    new Position(1, 5),
    new Position(1, 6),
    new Position(2, 5),
    new Position(2, 6),
    new Position(12, 4),
    new Position(13, 3),
    new Position(14, 3),
    new Position(15, 6),
    new Position(16, 4),
    new Position(16, 8),
    new Position(17, 5),
    new Position(17, 6),
    new Position(17, 7),
    new Position(18, 6),
    new Position(23, 2),
    new Position(25, 1),
    new Position(25, 2),
    new Position(35, 3),
    new Position(35, 4),
    new Position(36, 3),
    new Position(36, 4),
    new Position(21, 5),
    new Position(22, 5),
    new Position(21, 4),
    new Position(22, 4),
    new Position(21, 3),
    new Position(22, 3),
    new Position(23, 6),
    new Position(25, 6),
    new Position(25, 7),
    new Position(11, 5),
    new Position(11, 6),
    new Position(11, 7),
    new Position(12, 8),
    new Position(13, 9),
    new Position(14, 9),
  ]);
}

sketch.draw = () => {
  sketch.background(50);
  sketch.noStroke();
  grid.evoluate();
  grid.allCells().forEach(cell => {
    const x = cell.position.x * cellSize;
    const y = cell.position.y * cellSize;
    if (cell.isAlive()) {
      sketch.fill(0, 0, 0, 255);
    }
    else {
      sketch.fill(255, 255, 255, 200);
    }
    sketch.rect(x, y, cellSize, cellSize);
  });
}