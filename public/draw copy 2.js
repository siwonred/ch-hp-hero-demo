var Vector = Matter.Vector
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

function roundedImage(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

window.addEventListener('resize', resizeCanvas, false);
        
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
              
  /**
   * Your drawings need to be inside this function otherwise they will be reset when 
   * you resize the browser window and the canvas goes will be cleared.
   */
  
}

resizeCanvas();

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}

function drawAvatar(x, y, size, emoji, color) {
  const img = new Image();
  img.onload = function() {
    // draw image with round corner
    ctx.save();
    roundedImage(ctx, x, y, size, size, size * 0.5);
    ctx.clip();
    ctx.drawImage(img, x, y, size, size);
    ctx.restore();
  }
  img.src = `https://cf.channel.io/avatar/emoji/${emoji}.${color}.png`;
}

class Paricle {
  constructor(x, y, size, emoji, color) {
    this.pos = new Vector(x, y);
    this.size = size;
    this.emoji = emoji;
    this.color = color;
  }
}

function drawStuff2() {
  for (var i = 0 ; i < 50; ++i) {
    const x = getRandomInt(0, window.innerWidth)
    const y = getRandomInt(0, window.innerHeight)
    const size = getRandomInt(40, 80)
    drawAvatar(x, y, size, randomEmoji(), randomColor())
  }
}

//

const img = new Image();
imgLoaded = false;
img.onload = function() {
  imgLoaded = true;
  drawStuff(); 
}
img.src = `https://cf.channel.io/avatar/emoji/${randomEmoji()}.${randomColor()}.png`;

function drawCircle(x, y) {
  // ctx.beginPath();
  // ctx.arc(x, y, 10, 0, 2 * Math.PI);
  // ctx.stroke();

  // 픽셀 정리
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // 컨텍스트 리셋
  ctx.beginPath();

  size = 50;

  // draw image with round corner
  ctx.save();
  roundedImage(ctx, x, y, size, size, size * 0.5);
  ctx.clip();
  ctx.drawImage(img, x, y, size, size);
  ctx.restore();
}

var timer;

function drawStuff() {
  // for (var i = 0 ; i < 100; ++i) {
  //   var t = Math.pow(i / 100.0, 2);
  //   var x = Math.cos(2 * Math.PI * 2.7 * t) * -300 * (1 - t) * (1 - t);
  //   var y = Math.sin(2 * Math.PI * 2.7 * t) * -300 * (1 - t) * (1 - t);
  //   drawCircle(x+500, y+500);
  // }

  i = 0;
  drawStuffReal();
}


class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  // t: 0~1
  transform(t) {
    if (t <= 0) {
      return this;
    }
    if (t >= 0.99999) {
      return starting;
    }
    
    const r = 1 - Math.pow(t, 2);
    const p = 0.5 * Math.PI * Math.log(1 - t) / Math.log(0.5);

    const cos = Math.cos(p);
    const sin = Math.sin(p);

    const x = Math.cos( p ) * -300 * r;
    const y = Math.sin( p ) * -300 * r;

    return new Point((x * cos - y * sin) * r, (y * sin + y * cos) * r);
  }
}
const starting = new Point(0, 0);

var scale = 0;

function drawStuffReal() {

  // var t = Math.pow(i / ticks, 1);
  // var t = scale;
  // // console.log(t);
  // // var x = Math.cos(2 * Math.PI * 3 * (1 - Math.pow(1- Math.pow(t, 4), 1))) * -300 * Math.pow(1 - t, 1);
  // // var y = Math.sin(2 * Math.PI * 3 * (1 - Math.pow(1- Math.pow(t, 4), 1))) * -300 * Math.pow(1 - t, 1);
  // // var x = Math.cos(  Math.PI * (Math.exp( t * 3 ) - 1) ) * -300 * Math.pow(1 - t, 2);
  // // var y = Math.sin( Math.PI * (Math.exp( t * 3 ) - 1) ) * -300 * Math.pow(1 - t, 2);

  // // var p = 2 * Math.PI * t / (r + 0.01);

  // var x = 0;
  // var y = 0;

  // if (t < 0.99999) {
  //   var r = 1 - Math.pow(t, 2);
  //   var p = 0.5 * Math.PI * Math.log(1 - t) / Math.log(0.5);
  //   x = Math.cos( p ) * -300 * r;
  //   y = Math.sin( p ) * -300 * r;
  // }

  // // drawCircle(0 + i * 10, y + 500);
  // drawCircle(x + 500, y + 500);

  // i++;
  // if (i < ticks) {
  //   window.requestAnimationFrame(drawStuffReal)
  // }
}

function onWheel(event) {
  // event.preventDefault();

  scale += event.deltaY * 0.0001;

  // Restrict scale
  scale = Math.min(Math.max(scale, 0), 1);

  drawStuffReal()
}


window.addEventListener('wheel', onWheel);
