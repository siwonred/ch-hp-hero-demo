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

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  /**
   * t 값에 따른 회전 및 중앙 점으로 응축(중력효과) 시킴. t가 0 이면 초기 값 (생성시 x, y), 1 이면 (0, 0)에 수렴함
   * @param {*} t: 0~1 의 값
   * @returns 
   */
  transform(t) {
    if (t <= 0) {
      return this;
    }
    if (t >= 0.999) {
      return undefined;
    }
    
    const r = 1 - Math.pow(t, 2); // TODO
    const p = 0.5 * Math.PI * Math.log(1 - t) / Math.log(0.5);

    const cos = Math.cos(p);
    const sin = Math.sin(p);

    return new Point(
      (this.x * cos - this.y * sin) * r,
      (this.x * sin + this.y * cos) * r
    );
  }

  static distance(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;

    return Math.hypot(dx, dy);
  }
}

class World {
  constructor(ctx) {
    this.ctx = ctx;
    this.particles = [];
    this.progress = 0; // 0~1

    this.imgHero = new Image();
    const world = this;
    this.imgHero.onload = function() {
      world.render();
    }
    this.imgHero.src = 'hero-button.svg';
  }

  addNewParticle() {
    for (var i = 0; i < 100; ++i) {
      if (this.tryToAddNewParticle()) {
        return;
      }
    }
  }

  tryToAddNewParticle() {
    // const r = Math.random() * Math.random() * Math.max(window.innerWidth, window.innerHeight, 800) * 1.5 + 80;
    const r = jStat.beta.sample(2, 5) * Math.max(window.innerWidth, window.innerHeight, 800) * 0.8 + 60 // Beta Distribution

    const theta = Math.random() * 2 * Math.PI;

    const point = new Point(r * Math.sin(theta), r * Math.cos(theta));

    for (var i = 0; i < this.particles.length; ++i) {
      if (Point.distance(this.particles[i].point, point) < 80) {
        return false;
      }
    }
    const paricle = new Particle(this, point, getRandomInt(20, 40), randomEmoji(), randomColor());
    this.particles.push(paricle);
    return true;
  }

  addProgressDelta(delta) {
    const progress = this.progress + delta;
    this.progress = Math.min(Math.max(progress, 0), 1);
  }

  get factor() {
    return 1.0 + (1.0 - this.progress) * 2; // 1.0 / (1.0 + this.progress * 2);
  }

  get centerX() {
    return canvas.width * 0.5 * (1 - this.progress) + (canvas.width - 120) * this.progress;
  }

  get centerY() {
    return canvas.height * 0.5 * (1 - this.progress) + (canvas.height - 120) * this.progress;
  }

  render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // 픽셀 정리
    ctx.beginPath(); // 컨텍스트 리셋

    this.particles.forEach(particle => this.renderParticle(particle));

    const size = 80 * this.factor;
    const absX = - size * 0.5 + this.centerX;
    const absY = - size * 0.5 + this.centerY;
    this.ctx.drawImage(this.imgHero, absX, absY, size, size);
  }

  renderParticle(particle) {
    const point = particle.point.transform(this.progress);
    if (!point) {
      return;
    }
    const d = Point.distance(new Point(0, 0), particle.point);

    const shift = Math.max(window.innerWidth, window.innerHeight) / 2;
    const ex = Math.exp(- (d - shift) / 200.0); // sigmoid
    const alpha = ex / (ex + 1);

    if (alpha < 0.01) {
      return;
    }

    const size = particle.size * this.factor;
    const absX = point.x * this.factor - size * 0.5 + this.centerX;
    const absY = point.y * this.factor - size * 0.5 + this.centerY;

    this.ctx.save();
    if (alpha < 0.99) {
      this.ctx.globalAlpha = alpha;
    }
    roundedImage(this.ctx, absX, absY, size, size, size * 0.5);
    this.ctx.clip();
    this.ctx.drawImage(particle.img, absX, absY, size, size);
    this.ctx.restore();
  }
}

class Particle {
  constructor(world, point, size, emoji, color) {
    this.point = point;
    this.size = size;
    this.emoji = emoji;
    this.color = color;
    this.img = new Image();
    const particle = this;
    this.img.onload = function() {
      world.renderParticle(particle);
    }
    this.img.src = `https://cf.channel.io/avatar/emoji/${emoji}.${color}.png`;
  }
}

const world = new World(ctx);
for (var i = 0; i < 100; ++i) {
  world.addNewParticle();
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight; 
  world.render();
}
window.addEventListener('resize', resizeCanvas, false);
resizeCanvas();

function onWheel(event) {
  world.addProgressDelta(event.deltaY * 0.00012);
  world.render();
}
window.addEventListener('wheel', onWheel);
