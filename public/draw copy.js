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
  drawStuff(); 
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


function drawCircle(x, y) {
  ctx.beginPath();
  ctx.arc(x, y, 10, 0, 2 * Math.PI);
  ctx.stroke();
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

var i;

function drawStuffReal() {

  // 픽셀 정리
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // 컨텍스트 리셋
  ctx.beginPath();

  var t = Math.pow(i / 100.0, 1);
  // var x = Math.cos(2 * Math.PI * 3 * (1 - Math.pow(1- Math.pow(t, 4), 1))) * -300 * Math.pow(1 - t, 1);
  // var y = Math.sin(2 * Math.PI * 3 * (1 - Math.pow(1- Math.pow(t, 4), 1))) * -300 * Math.pow(1 - t, 1);
  // var x = Math.cos(  Math.PI * (Math.exp( t * 3 ) - 1) ) * -300 * Math.pow(1 - t, 2);
  // var y = Math.sin( Math.PI * (Math.exp( t * 3 ) - 1) ) * -300 * Math.pow(1 - t, 2);

  var x = Math.cos( (Math.exp( t * Math.PI ) - 1) ) * -300 * Math.pow(1 - t, 2);
  var y = Math.sin( (Math.exp( t * Math.PI ) - 1) ) * -300 * Math.pow(1 - t, 2);

  // drawCircle(0 + i * 10, y + 500);
  drawCircle(x + 500, y + 500);
  i++;

  if (i < 100) {
    window.requestAnimationFrame(drawStuffReal)
  }
}