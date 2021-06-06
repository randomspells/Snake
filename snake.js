let field = document.getElementById("field");
let ctx = field.getContext("2d");

function drawField() {
  field.width = innerWidth;
  field.height = innerHeight;
}

drawField();

// структура данных (что это?)
// у змеи есть голова и хвостик
// змея обитает на определенных координатах (ХУ)
// у головы есть направление куда смотреть
// хвост едет за головой (он глупый)
// тело = очередь за колбасой
// хвост упорядочен в вакууме

class Point {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.size = 50;
  }
}


// let snake = [blueSquare,{x:50,y:0},{x:100,y:0}];

let snake = {
  x: 200,
  y: 200,
  size: 50,
  color: "blue",
  tail: []
};

snake.growSnake = function() {
  this.tail = {
    x: this.x-this.size,
    y: this.y,
    size: this.size
  }
  console.log(this.tail);
}

snake.growSnake();

snake.setDirection = function(key) {
  this.direction = key;
  console.log(this.direction);
}

snake.moveSquare = function() {
  let headX = this.x;
  let headY = this.y;
  switch (this.direction) {
    case "w":
      this.y -= this.size;
      this.tail.y = headY;
      this.tail.x = this.x;
      break;
    case "s":
      this.y += this.size;
      this.tail.y = headY;
      this.tail.x = this.x;
      break;
    case "a":
      this.x -= this.size;
      this.tail.y = this.y;
      this.tail.x = headX;
      break;
    case "d":
      this.x += this.size;
      this.tail.y = this.y;
      this.tail.x = headX;
      break;
  }
}

let food = {
  x: 300,
  y: 300,
  size: 50,
  color: "red",
  direction: null,
};

function draw(s) {
  ctx.fillStyle = s.color;
  // for (let i = 0; i < s.length; i++) {
  ctx.fillRect(s.x, s.y, s.size, s.size);
}

function clearField() {
  ctx.clearRect(0,0,field.width,field.height);
}

function collision(s1,s2) {
  if (s1.x == s2.x && s1.y == s2.y) {
    s1.color = "violet";
  } else {
    s1.color = "blue";
  }
}

function render() {
  clearField();
  draw(snake);
  draw(snake.tail);
  draw(food);
  snake.moveSquare();
}

setInterval(render, 400);

document.onkeypress = function (e) {
  snake.setDirection((e.key).toLowerCase());
  // collision(blueSquare,redSquare);
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
