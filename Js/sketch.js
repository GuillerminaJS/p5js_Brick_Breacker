var barra;
var pelota;
var ladrillo;
var ladrillos = [];
var playingGame = false;
var youWin = false;
var winText;

function setup() {
  // put setup code here
  createCanvas(windowWidth, windowHeight);
  barra = new Barra();
  pelota = new Pelota();

  for (let i = 0; i < 10; i++) {
    ladrillos.push(new Ladrillo());
  }
  createText();
}

function draw() {
  // put drawing code here
  background(255);

  barra.display();
  if (playingGame) barra.update();
  if (playingGame) barra.checkEdges();

  pelota.display();
  if (playingGame) pelota.update();
  if (playingGame) pelota.checkEdges();

  if (pelota.meets(barra) && pelota.direction.y > 0)
    pelota.direction.y *= -1;

  for (var j = 0; j < ladrillos.length; j++) {
    if (pelota.hits(ladrillos[j])) {
        if(ladrillos[j].r > 40){
          ladrillos[j].r = ladrillos[j].r / 2;
        } else {
          ladrillos.splice(j, 1);
        }
        pelota.direction.y *= -1;
    }
  }
  for(var k = 0; k < ladrillos.length; k++) {
    ladrillos[k].display();
  }
  if (pelota.pos.y > height){
    playingGame = false;
    pelota.pos = createVector(width / 2, height / 2);
  }
  if (ladrillos.length === 0) {
    youWin = true;
    playingGame = false;
  }

  if (youWin){
    winText.style('display', 'block');
  } else {
    winText.style('display', 'none');
  }
}

function keyPressed() {
  if (key === 'a' || key === 'A') {
    barra.isMovingLeft = true;
  } else if (key === 'd' || key === 'D') {
    barra.isMovingRight = true;
  } else if (key === 's' || key === 'S'){
    playingGame = true;
    youWin = false;
    if (ladrillos.length === 0) {
      for (var i = 0; i < 10; i++){
        ladrillos.push(new Ladrillo());
      }
    }
  }
}

function keyReleased() {
  barra.isMovingLeft = false;
  barra.isMovingRight = false;
}


function createText() {
  winText = createP('YOU WIN');
  winText.position(width / 2 -50, 80);
}
