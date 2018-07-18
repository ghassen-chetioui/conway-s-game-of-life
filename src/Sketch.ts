// Magic for p5 importing properly in TypeScript AND Webpack
import 'p5';
const p5 = require("p5");


const sketch: p5 = new p5(() => { });

const sketchSize = 900;

sketch.setup = () => {
  sketch.createCanvas(sketchSize, sketchSize);
  sketch.frameRate(10)
}

sketch.draw = () => {
  sketch.background(50);
}