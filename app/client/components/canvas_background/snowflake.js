class Snowflake {
  constructor(canvas, order) {
    this.canvas = canvas;
    this.order = order;
    this.randSnowflake(canvas);
    this.color = this.randColor(25);
    this.angle = 0;
    this.offset = (Math.random() * 2) * Math.floor((Math.random() * 3 - 1));
  }

  render(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 2*Math.PI, false);
    ctx.shadowBlur = 0;
    ctx.shadowColor = this.color;
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  moveFlake(dx) {
    this.angle += Math.random() * 0.03;
    const maxY = (Math.random() * 167) + 800;
    this.y += Math.pow(this.speed, 2) + 1;
    this.x += dx + Math.sin(this.angle) * this.offset;
    if (this.y > maxY) {
      this.x = Math.floor((Math.random() * (this.canvas.width - 2)) + 1);
      this.y = -5;
    }
    if (this.x > 1922) this.x = -2;
    if (this.x < -2) this.x = 1922;
  }

  randColor(num) {
    let n, back;
    n = Math.floor((Math.random() * num) + (256 - num));
    switch(this.order) {
    case 'back':
      back = (Math.random() * 0.8) + 0.2;
      return `rgba(${n},${n},${n},${back})`;
    case 'front':
      return `rgba(${n},${n},${n},1)`;
    }
  }

  randSnowflake(canvas) {
    this.x = Math.floor((Math.random() * (canvas.width - 2)) + 1);
    this.y = Math.floor((Math.random() * (canvas.height - 100)) + 1);
    this.r = (Math.random() * 1.7) + 0.5;
    this.speed = Math.random() + 1;
  }
}

export default Snowflake;