// Magic for p5 importing properly in TypeScript AND Webpack
import 'p5';
import Grid from './Grid';
import { Position } from './Cell';
const p5 = require("p5");


const sketch: p5 = new p5(() => { });

const sketchSize = 800;
const cellSize = 20;
const grid = Grid.build(Math.floor(sketchSize / cellSize));

let template: string[];

sketch.preload = () => {
  template = sketch.loadStrings("./init.txt")
}

sketch.setup = () => {
  sketch.createCanvas(sketchSize, sketchSize);
  sketch.frameRate(10);
  const init = [];
  for (let y = 0; y < template.length; y++) {
    for (let x = 0; x < template[y].length; x++) {
      if (template[y][x] === "X") { init.push(new Position(x, y)) }
    }
  }
  grid.init(init);
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