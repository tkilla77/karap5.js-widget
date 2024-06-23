/// <reference path="../typings/mocha.d.ts" />

//mocha.setup();

import "./test-loop-inserter";
import "./test-implicit-sketch";

window.addEventListener('load', () => {
  mocha.run();
});
