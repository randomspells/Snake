let field = document.getElementById("field");
let ctx = field.getContext("2d");

function drawField() {
  field.width = innerWidth;
  field.height = innerHeight;
}

drawField();

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
  }

  listenInput(key) {
    this.direction = key;
    console.log(this.direction);
  }

  drawing() {
    let size = 20;
    ctx.fillStyle = this.color;
    for (let seg of this.segments) {
      ctx.fillRect(seg.x * size, seg.y * size, size, size);
    }
  }

  moving() {
    if (!this.sleep) {
      for (let i = this.length; i > 0; i--) {
        this.segments[i].x = this.segments[i - 1].x;
        this.segments[i].y = this.segments[i - 1].y;
      }
      switch (this.direction) {
        case "w":
          this.segments[0].y -= 1;
          break;
        case "s":
          this.segments[0].y += 1;
          break;
        case "a":
          this.segments[0].x -= 1;
          break;
        case "d":
          this.segments[0].x += 1;
          break;
      }
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

function clearField() {
  ctx.clearRect(0, 0, field.width, field.height);
}

// function collision(s1, s2) {
//   if (s1.x == s2.x && s1.y == s2.y) {
//     s1.color = "violet";
//   } else {
//     s1.color = "blue";
//   }
// }

let snake = new Snake(allSegments, "tomato");

function render() {
  clearField();
  snake.drawing();
  snake.moving();
}

setInterval(render, 400);

document.onkeypress = function (e) {
  if (e.key == 'w' || e.key == 's' || e.key == 'a' || e.key == 'd') {
    snake.listenInput(e.key.toLowerCase());
    snake.sleep = false;
  } else if (e.key == " ") {
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
