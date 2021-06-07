const SIZE = 20;
const SCALE = 30;

class Game {
  constructor(size, scale) {
    this.size = size;
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
}

let game = new Game(SIZE, SCALE);

class Segment {
  constructor(x, y, i) {
    this.x = x;
    this.y = y;
    this.i = i;
  }
}

class Snake {
  constructor(segments, color) {
    this.segments = segments;
    this.color = color;
    this.direction = null;
    this.length = this.segments.length - 1;
    this.sleep = true;
    this.head = this.segments[0];
  }

  listenInput(key) {
    this.direction = key;
  }

  draw() {
    let size = SCALE;
    game.ctx.fillStyle = this.color;
    for (let seg of this.segments) {
      game.ctx.fillRect(seg.x * size, seg.y * size, size, size);
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

  move() {
    if (this.sleep) return;

    for (let i = this.length; i > 0; i--) {
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
}

let allSegments = [];

for (let i = 0; i < 3; i++) {
  allSegments.push(new Segment(0 + i, 0, i));
}

console.log(allSegments);

let food = {
  x: 300,
  y: 300,
  size: 50,
  color: "red",
  direction: null,
};

// function collision(s1, s2) {
//   if (s1.x == s2.x && s1.y == s2.y) {
//     s1.color = "violet";
//   } else {
//     s1.color = "blue";
//   }
// }

let snake = new Snake(allSegments, "tomato");

function render() {
  game.clear();
  snake.draw();
  snake.move();
  snake.teleport();
}

setInterval(render, 100);

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
