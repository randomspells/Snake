const SIZE = 20;
const SCALE = 30;

class Game {
  constructor(size, scale) {
    this.size = size;
    this.score = 0;
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.draw(scale);
  }

  clear() {
    this.ctx.fillStyle = "#343434";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.width);
  }

  draw(scale) {
    this.canvas.width = this.size * scale;
    this.canvas.height = this.size * scale;
  }

  drawScore() {
    let score = document.getElementById("score");
    score.innerHTML = snake.counter;
  }

  gameover() {
    if (snake.dead == true) {
      this.ctx.fillStyle = "black";
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.width);
    }
  }
}

class Segment {
  constructor(x, y, i) {
    this.x = x;
    this.y = y;
    this.i = i;
  }
}

class Snake {
  constructor(color) {
    this.head = new Segment(SIZE / 2, SIZE / 2, 0);
    this.segments = [this.head];
    this.color = color;
    this.direction = "KeyA";
    this.counter = 0;
    this.sleep = true;
    this.dead = false;
    this.head = this.segments[0];
  }

  listenInput(key) {
    if (this.direction == "KeyW" && key != "KeyS") {
      this.direction = key;
    }
    if (this.direction == "KeyS" && key != "KeyW") {
      this.direction = key;
    }
    if (this.direction == "KeyA" && key != "KeyD") {
      this.direction = key;
    }
    if (this.direction == "KeyD" && key != "KeyA") {
      this.direction = key;
    }
    if (this.direction == null) {
      this.direction = key;
    }
  }

  draw() {
    let scale = SCALE;
    game.ctx.fillStyle = this.color;
    for (let seg of this.segments) {
      game.ctx.fillRect(seg.x * scale, seg.y * scale, scale, scale);
    }
  }

  move() {
    if (this.sleep) return;
    if (this.dead) return;

    for (let i = this.segments.length - 1; i > 0; i--) {
      this.segments[i].x = this.segments[i - 1].x;
      this.segments[i].y = this.segments[i - 1].y;
    }

    switch (this.direction) {
      case "KeyW":
        this.head.y -= 1;
        break;
      case "KeyS":
        this.head.y += 1;
        break;
      case "KeyA":
        this.head.x -= 1;
        break;
      case "KeyD":
        this.head.x += 1;
        break;
    }
  }

  teleport() {
    if (this.head.x < 0) {
      this.head.x = SIZE - 1;
    }
    if (this.head.x > SIZE - 1) {
      this.head.x = 0;
    }
    if (this.head.y < 0) {
      this.head.y = SIZE - 1;
    }
    if (this.head.y > SIZE - 1) {
      this.head.y = 0;
    }
  }

  grow() {
    if (this.head.x == food.x && this.head.y == food.y) {
      //snake grow and food re-render
      console.log("true");
      food.replace();
      if (this.direction == "KeyW") {
        this.segments.push(
          new Segment(this.head.x, this.head.y + 1, ++this.counter)
        );
      }
      if (this.direction == "KeyS") {
        this.segments.push(
          new Segment(this.head.x, this.head.y - 1, ++this.counter)
        );
      }
      if (this.direction == "KeyA") {
        this.segments.push(
          new Segment(this.head.x + 1, this.head.y, ++this.counter)
        );
      }
      if (this.direction == "KeyD") {
        this.segments.push(
          new Segment(this.head.x - 1, this.head.y, ++this.counter)
        );
      }
      console.log(this.segments);
    }
  }

  die() {
    for (let i = 1; i <= this.segments.length - 1; i++) {
      if (
        this.head.x == this.segments[i].x &&
        this.head.y == this.segments[i].y
      ) {
        let gameover = document.getElementById("gameover");
        gameover.style.visibility = "visible";
        this.dead = true;
      }
    }
  }
}

class Food {
  constructor(color) {
    this.x = Math.round(Math.random() * (SIZE - 1));
    this.y = Math.round(Math.random() * (SIZE - 1));
    this.color = color;
    this.scale = SCALE;
    console.log(this.x + " " + this.y);
  }

  draw() {
    game.ctx.fillStyle = this.color;
    game.ctx.fillRect(this.x * SCALE, this.y * SCALE, SCALE, SCALE);
  }

  replace() {
    this.x = Math.round(Math.random() * (SIZE - 1));
    this.y = Math.round(Math.random() * (SIZE - 1));
  }
}

let game = new Game(SIZE, SCALE);
let snake = new Snake("tomato");
let food = new Food("wheat");

function render() {
  game.clear();
  snake.draw();
  food.draw();
  snake.move();
  snake.teleport();
  snake.grow();
  snake.die();
  game.gameover();
  game.drawScore();
}

setInterval(render, 200);

document.onkeypress = function (e) {
  console.log(e.code);
  if (
    e.code == "KeyW" ||
    e.code == "KeyS" ||
    e.code == "KeyA" ||
    e.code == "KeyD"
  ) {
    snake.listenInput(e.code);
    snake.sleep = false;
  } else if (e.code == "Space") {
    snake.sleep = true;
  }
};

// let redSquare = drawSquare(redX, redY, "red");

// document.onmousemove = function (e) {
//   x = e.pageX;
//   y = e.pageY;
// };

// let ok = document.getElementById("ok");
// ok.onmouseover = function (e) {
//   ok.style.background = getColor();
// };
// ok.onclick = function () {
//   ctx.fillRect(randomCoord(), randomCoord(), 50, 50);
//   ctx.fillStyle = getColor();
// };

// function randomCoord() {
//   return Math.round(Math.random() * 600);
// }

// function randomColor() {
//   return Math.round(Math.random() * 255);
// }

// function getColor() {
//   return `rgb(${randomColor()},${randomColor()},${randomColor()})`;
// }
