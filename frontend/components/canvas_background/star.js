class Star {
  constructor(canvas) {
    this.randStar(canvas);
    this.dr = (Math.random()*0.015) + 0.03;
    this.color = this.randColor();
  }

  render(ctx) {
    ctx.beginPath();
    ctx.arc(this.x,this.y, this.r, 2*Math.PI, false);
    ctx.shadowBlur = 0;
    ctx.shadowColor = this.color;
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update() {
    if (this.r > 2 || this.r < 0.8) this.dr = -this.dr;
    this.r += this.dr;
  }

  randColor() {
    const red = 255;
    const blue = Math.floor(Math.random()*230);
    const green = Math.round(203 + (blue * 0.2666667));
    return `rgb(${red}, ${green}, ${blue})`;
  }

  randStar(canvas) {
    this.x = Math.floor((Math.random() * (canvas.width - 2)) + 1);
    this.y = Math.floor((Math.random() * (canvas.height - 2)) + 1);
    this.r = Math.random() * 1.7 + 0.5;
  }

}

export default Star;