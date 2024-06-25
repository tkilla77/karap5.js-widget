function assert(t,e="Error"){if(!t)throw new Error(e)}class InvalidMoveException extends Error{constructor(t){super(t),this.name=this.constructor.name}}class TooManyMovesException extends Error{constructor(t){super(t),this.name=this.constructor.name}}const GRID_SIZE=[8,8];class Coordinates{static fromXy(t,e){return new Coordinates(t,e)}static fromCopy(t){return new Coordinates(t.x,t.y)}constructor(t,e){this.x=t,this.y=e}add(t){return Coordinates.fromXy(this.x+t.x,this.y+t.y)}move(t){return t.apply(this)}toString(){return`[${this.x}, ${this.y}]`}}class Direction{constructor(t,e,r,i){this.name=t,this.coords=Coordinates.fromXy(e,r),this.angle=i}apply(t){return t.add(this.coords)}toString(){return this.name}}function createDirections(){let t=new Direction("↑",0,-1,0),e=new Direction("↓",0,1,Math.PI),r=new Direction("→",1,0,Math.PI/2),i=new Direction("←",-1,0,-Math.PI/2);return t.left=i,t.right=r,i.left=e,i.right=t,e.left=r,e.right=i,r.left=t,r.right=e,Object.freeze({UP:t,DOWN:e,RIGHT:r,LEFT:i})}const Directions=createDirections();class Cell{static fromString(t){switch(t){case" ":case"_":return Cells.EMPTY;case"T":case"🌳":return Cells.TREE;case"B":case"🐞":return Cells.BUG;case"M":case"🍄":return Cells.MUSHROOM;case"C":case"🍀":return Cells.CLOVER;default:return new Cell(t,t)}}constructor(t="?",e=EMPTY){this.display=t,this.type=e}draw(t,e){text(this.display,t,e)}toString(){return this.type}}const Cells=Object.freeze({EMPTY:new Cell(" ","_"),TREE:new Cell("🌳","T"),BUG:new Cell("🐞","B"),MUSHROOM:new Cell("🍄","M"),CLOVER:new Cell("🍀","C")}),EMPTY_GRID_SPEC="TTTTTTTTT\n   T       T\n   T       T\n   T       T\n   T       T\n   T       T\n   T       T\n   T       T\n   TTTTTTTTT";class Grid{static copy(t){return Grid.fromStringSpec(t.toString())}static fromStringSpec(t){let e=t.split(/\r?\n/g);for(let t=0;t<e.length;t++)e[t]=e[t].trim();return Grid.fromStringArray(e)}static fromStringArray(t){let e=[...t[0]].length,r=t.length,i=new Grid([e,r]),s=0;for(let r of t){assert([...r].length==e,`Unexpected grid spec, line ${s} has length ${[...r].length}, expected ${e} `);let t=0;for(let e of r){let r=Cell.fromString(e),a=Coordinates.fromXy(t,s);i.set(a,r),t++}s++}return i}constructor(t=GRID_SIZE){assert(t[0]>=1&&t[1]>=1,`unexpected grid size: ${t}`),this.size=[...t];let e=Array(this.size[0]).fill(Cells.EMPTY);this.grid=Array(this.size[1]);for(let t=0;t<this.grid.length;t++)this.grid[t]=Array.from(e)}findKara(){let t,e;for(let r=0;r<this.grid.length;r++){let i=this.grid[r];for(let s=0;s<i.length;s++){let i=Coordinates.fromXy(s,r),a=this.at(i);if(a!=Cells.EMPTY||e||(e=i),!t)switch(a.type){case"<":t=new Kara(this,i,Directions.LEFT);break;case"^":t=new Kara(this,i,Directions.UP);break;case">":t=new Kara(this,i,Directions.RIGHT);break;case"V":case"v":t=new Kara(this,i,Directions.DOWN)}switch(a.type){case"<":case"^":case">":case"V":case"v":this.clear(i)}}}return!t&&e&&(t=new Kara(this,e,Direction.RIGHT)),t}at(t){return this.grid[t.y][t.x]}set(t,e){this.grid[t.y][t.x]=e}clear(t){this.grid[t.y][t.x]=Cells.EMPTY}draw(t=25){push(),stroke("rgba(115,115,115,0.5)"),textAlign(CENTER,CENTER);for(let e=0;e<this.grid.length;e++){let r=this.grid[e];for(let i=0;i<r.length;i++){let r=this.at(Coordinates.fromXy(i,e));push(),translate(i*t,e*t),square(0,0,t),translate(.5*t,.5*t),r.draw(0,0),pop()}}pop()}gridSize(){return Coordinates.fromXy(this.grid[0].length,this.grid.length)}toString(){return this.grid.map((t=>t.map((t=>t.toString())).join(""))).join("\n")}}class Kara{constructor(t,e=Coordinates.fromXy(1,1),r=Directions.RIGHT){this.grid=t,this.direction=r,this.coords=Coordinates.fromCopy(e)}draw(t){push(),translate((this.coords.x+.5)*t,(this.coords.y+.5)*t),rotate(this.direction.angle),textAlign(CENTER,CENTER),text(Cells.BUG.display,0,0),pop()}_cell(t){try{return this.grid.at(t)}catch(t){return}}treeFront(){return this._cell(this.direction.apply(this.coords))==Cells.TREE}treeLeft(){return this._cell(this.direction.left.apply(this.coords))==Cells.TREE}treeRight(){return this._cell(this.direction.right.apply(this.coords))==Cells.TREE}mushroomFront(){return this._cell(this.direction.apply(this.coords))==Cells.MUSHROOM}onLeaf(){return this._cell(this.coords)==Cells.CLOVER}_isMoveableDestination(t){let e=this._cell(t);return null!=e&&e!=Cells.TREE}_canMove(t=void 0){return t||(t=this.direction),this._isMoveableDestination(this.coords.move(t))}move(){if(!this._canMove())throw new InvalidMoveException(`Unable to move from ${this.coords} in direction ${this.direction}!`);this.coords=this.coords.move(this.direction)}turnLeft(){this.direction=this.direction.left}turnRight(){this.direction=this.direction.right}putLeaf(){this.grid.set(this.coords,Cells.CLOVER)}removeLeaf(){this.grid.at(this.coords)==Cells.CLOVER&&this.grid.clear(this.coords)}}class KaraStepper{constructor(t,e=500){this.kara=t,this.delay=e}sleeper(){return new Promise((t=>setTimeout((()=>t()),this.delay)))}treeFront(){return this.kara.treeFront()}treeLeft(){return this.kara.treeLeft()}treeRight(){return this.kara.treeRight()}mushroomFront(){return this.kara.mushroomFront()}onLeaf(){return this.kara.onLeaf()}async move(){await this.sleeper(),this.kara.move()}async turnLeft(){await this.sleeper(),this.kara.turnLeft()}async turnRight(){await this.sleeper(),this.kara.turnRight()}async putLeaf(){await this.sleeper(),this.kara.putLeaf()}async removeLeaf(){await this.sleeper(),this.kara.removeLeaf()}}class KaraRecorder{constructor(t,e=50){this.kara=t,this.commands=Array(),this.maxCommands=e}async replay(t){for(let e of this.commands)await t[e]()}record(t){if(this.commands.length>this.maxCommands)throw new TooManyMovesException(`Stopped recording after ${this.maxCommands} commands.`);this.commands.push(t)}treeFront(){return this.kara.treeFront()}treeLeft(){return this.kara.treeLeft()}treeRight(){return this.kara.treeRight()}mushroomFront(){return this.kara.mushroomFront()}onLeaf(){return this.kara.onLeaf()}move(){this.record(this.move.name),this.kara.move()}turnLeft(){this.record(this.turnLeft.name),this.kara.turnLeft()}turnRight(){this.record(this.turnRight.name),this.kara.turnRight()}putLeaf(){this.record(this.putLeaf.name),this.kara.putLeaf()}removeLeaf(){this.record(this.removeLeaf.name),this.kara.removeLeaf()}}class KaraWorld{static create(t=EMPTY_GRID_SPEC,e=25,r=!0,i=!0){let s=KaraWorld.fromStringSpec(t);if(r){let t=s.grid.gridSize();window.setup=()=>{createCanvas(t.x*e,t.y*e),s.executeKara()},window.draw=()=>{s.draw(e)},window.kara=s.getRecorder()}return i&&(window.keyPressed=()=>s.keyPressed()),s}static fromStringSpec(t=EMPTY_GRID_SPEC){let e=Grid.fromStringSpec(t);return new KaraWorld(e,e.findKara())}constructor(t,e){this.grid=t,this.kara=e;let r=Grid.copy(this.grid),i=Object.create(this.kara);i.grid=r,this.recorder=new KaraRecorder(i)}draw(t){push(),textSize(.8*t),this.grid.draw(t),this.kara.draw(t),pop()}getRecorder(){return this.recorder}async executeKara(t=500,e="my_kara",r=50){this.recorder.maxCommands=r;try{"string"==typeof e&&(e=window[e]),"function"==typeof e?e(this.recorder):console.log(`Not a valid client function: ${e}`)}catch(t){console.log(t)}let i=new KaraStepper(this.kara,t);return this.recorder.replay(i)}keyPressed(){return keyCode==UP_ARROW?(this.kara.move(),!1):keyCode==LEFT_ARROW?(this.kara.turnLeft(),!1):keyCode==RIGHT_ARROW?(this.kara.turnRight(),!1):keyCode==DOWN_ARROW?(this.kara.onLeaf()?this.kara.removeLeaf():this.kara.putLeaf(),!1):void 0}}