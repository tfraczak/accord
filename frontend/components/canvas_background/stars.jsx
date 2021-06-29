import React from 'react';
import Star from './star';

class Stars extends React.Component {
  constructor(props){
    super(props);
    this.setCanvasRef = this.setCanvasRef.bind(this);
    this.update = this.update.bind(this);
    this.animate = this.animate.bind(this);
    this.stars = [];
    this.fpsInterval = 1000/60;
  }

  componentDidMount() {
    if (this.canvas) {
      const style = this.canvas.style;

      this.width = 1920;
      this.height = 967;
      this.canvas.width = this.width;
      this.canvas.height = this.height;

      const ctx = this.canvas.getContext('2d');
      style.width = `100vw`;
      style.height = `100vh`;
      style.position = "absolute";
      style.top = 0;
      style.left = 0;
      style.backgroundColor = "#2f3234";
      style.zIndex = 1;

      for (let i = 0; i < this.props.numStars; i++) { this.stars.push(new Star(this.canvas)); }
      
      this.then = Date.now();
      this.startTime = this.then;
      this.animate(ctx);
    }
  }

  setCanvasRef(node) {
    this.canvas = node;
  }

  update() {
    for (let star of this.stars) { star.update(); }
  }

  animate(ctx) {
    const step = () => {
      requestAnimationFrame(step);
      let now = Date.now();
      let elapsed = now - this.then;

      if (elapsed > this.fpsInterval) {
        this.then = now - (elapsed % this.fpsInterval);
        this.update();
        ctx.clearRect(0,0,this.width, this.height);
        for (let star of this.stars) { star.render(ctx); }
      }
    }
    step();
  }

  render() {
    return <canvas ref={ this.setCanvasRef } id="stars"></canvas>
  }

}

export default Stars;