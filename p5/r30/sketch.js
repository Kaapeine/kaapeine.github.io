var row;

var activeCell;
var bgColor

function setup() {
  createCanvas(windowWidth, 10*windowHeight);
  
  activeCell = color('#FDDA0D');
  bgColor = 50;
  
  background(bgColor);
  row = new Row(100);
}

function draw() {
  frameRate(5);
  // noLoop();
  // for (let i = 0; i < height/row.cellHeight; i++)
  //   row.update();
  
  row.update();
}

class Row {
  
  constructor(numCells) {    
    this.cellWidth = width/numCells;
    this.cellHeight = this.cellWidth;
    
    this.totalCells = 5 * numCells;
    this.offset = -(this.totalCells * this.cellWidth)/2 + width/2;
    // this.offset = ;
    
    console.log(this.totalCells);
    
    this.t = 0;
    this.state = [];
    
    // init state = 0
    for (let i = 0; i < this.totalCells; i++) {
      this.state[i] = 0;
    }
    
    // set middle cell state
    this.state[floor(this.totalCells/2)] = 1;
    
    
    // draw cells
    for (let i = 0; i < this.totalCells; i++) {
      this.drawCell(i, this.t);
    }
    
    this.t++;

  }

  drawCell(i) {
    // strokeWeight(1);
    noStroke();
    if (this.state[i] == 0)
      fill(bgColor);
    else
      fill(activeCell);
    
    push();
    translate(this.offset, 0);
    rect(i*this.cellWidth, this.t*this.cellHeight, this.cellWidth, this.cellHeight);
    stroke(255, 0, 0);
    pop();
  }
  
  update() {
    let newState = [];
    for (let i = 0; i < this.totalCells; i++) {
      let lState = 0;
      let rState = 0;
      let cState = this.state[i];
      
      if (i > 0)
        lState = this.state[i-1];
      
      if (i < this.totalCells - 2) {
        rState = this.state[i+1];
      }
      
      newState[i] = this.updateState(lState, cState, rState);
    }
    
    this.state = newState;
    
    for (let i = 0; i < this.totalCells; i++) {
        this.drawCell(i);
    }
    
    this.t++;
  }
  
  updateState(l, c, r) {
    let curr = createVector(l, c, r);
    var newState;
    
    let s0 = createVector(0, 0, 0);
    let s1 = createVector(0, 0, 1);
    let s2 = createVector(0, 1, 0);
    let s3 = createVector(0, 1, 1);
    let s4 = createVector(1, 0, 0);
    let s5 = createVector(1, 0, 1);
    let s6 = createVector(1, 1, 0);
    let s7 = createVector(1, 1, 1);

    
    if (curr.equals(s0))
      newState = 0;
    if (curr.equals(s1))  {
      newState = 1;
    }
    if (curr.equals(s2))
      newState = 1;
    if (curr.equals(s3))
      newState = 1;
    if (curr.equals(s4))
      newState = 1;
    if (curr.equals(s5))
      newState = 0;
    if (curr.equals(s6))
      newState = 0;
    if (curr.equals(s7))
      newState = 0;
    
    return newState;
  }
  
    

}
