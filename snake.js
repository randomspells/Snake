let field = document.getElementById("field");
let ctx = field.getContext("2d");

function draw() {
  field.width = innerWidth;
  field.height = innerHeight;
}

draw();

let blueSquare = {
  x: 0,
  y: 0,
  size: 50,
  color: "blue",
};

let redSquare = {
  x: 300,
  y: 300,
  size: 50,
  color: "red",
};


function drawSquare(s) {
  ctx.fillStyle = s.color;
  ctx.fillRect(s.x, s.y, s.size, s.size);
}

function clearField() {
  ctx.clearRect(0,0,field.width,field.height);
}

function moveSquare(s, dir) {
  switch (dir) {
    case "w":
      s.y -= s.size;
      break;
    case "s":
      s.y += s.size;
      break;
    case "a":
      s.x -= s.size;
      break;
    case "d":
      s.x += s.size;
      break;
  }
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
  drawSquare(redSquare);
  drawSquare(blueSquare);
}

setInterval(render, 100);

document.onkeypress = function (e) {
  moveSquare(blueSquare, e.key);
  collision(blueSquare,redSquare);
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
