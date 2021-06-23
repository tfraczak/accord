import React from 'react';
import Snowflake from './snowflake';

class Snowflakes extends React.Component {
  constructor(props){
    super(props);
    this.update = this.update.bind(this);
    this.animate = this.animate.bind(this);
    this.setBackCanvasRef = this.setBackCanvasRef.bind(this);
    this.setFrontCanvasRef = this.setFrontCanvasRef.bind(this);
    this.setBGRef = this.setBGRef.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.backSnowflakes = [];
    this.frontSnowflakes = [];
    this.dx = 0;
    this.fpsInterval = 1000/60;
  }

  handleMouseMove(e) {
    this.dx = (e.x - 960) * 0.0025;
  }

  componentDidMount() {
    document.onmousemove = this.handleMouseMove;
    if (this.backCanvas && this.frontCanvas && this.bgRef) {
      const styleBack = this.backCanvas.style;
      const styleFront = this.frontCanvas.style;
      const styleBG = this.bgRef.style;

      this.width = window.innerWidth;
      this.height = window.innerHeight;

      this.backCanvas.width = this.width;
      this.frontCanvas.width = this.width;
      this.backCanvas.height = this.height;
      this.frontCanvas.height = this.height;

      this.backCTX = this.backCanvas.getContext('2d');
      this.frontCTX = this.frontCanvas.getContext('2d');

      styleBack.width = this.width;
      styleBack.height = this.height;
      styleBack.position = "absolute";
      styleBack.top = 0;
      styleBack.left = 0;
      styleBack.backgroundColor = "transparent";
      styleBack.zIndex = 2;
      styleFront.width = this.width;
      styleFront.height = this.height;
      styleFront.position = "absolute";
      styleFront.top = 0;
      styleFront.left = 0;
      styleFront.backgroundColor = "transparent";
      styleFront.zIndex = 4;
      styleBG.width = `${this.width}px`;
      styleBG.height = `${this.height}px`;
      

      for (let i = 0; i < this.props.numBackFlakes; i++) {
        this.backSnowflakes.push(new Snowflake(this.backCanvas, "back"));
      }
      for (let i = 0; i < this.props.numFrontFlakes; i++) {
        this.frontSnowflakes.push(new Snowflake(this.frontCanvas, "front"));
      }
      this.then = Date.now();
      this.startTime = this.then;
      this.animate();
    }
  }

  setBackCanvasRef(node) {
    this.backCanvas = node;
  }

  setFrontCanvasRef(node) {
    this.frontCanvas = node;
  }

  setBGRef(node) {
    this.bgRef = node;
  }

  update() {
    for (let snowflake of this.backSnowflakes) { snowflake.moveFlake(this.dx); }
    for (let snowflake of this.frontSnowflakes) { snowflake.moveFlake(this.dx); }
  }

  animate() {
    const {
      backCTX,
      frontCTX,
      backSnowflakes,
      frontSnowflakes,
    } = this;

    let step = () => {
      requestAnimationFrame(step);
      let now = Date.now();
      let elapsed = now - this.then;
      
      if (elapsed > this.fpsInterval) {
        this.then = now - (elapsed % this.fpsInterval);
        this.update();
        backCTX.clearRect(0,0,this.width, this.height);
        frontCTX.clearRect(0,0,this.width, this.height);
        for (let snowflake of backSnowflakes) { snowflake.render(backCTX); }
        for (let snowflake of frontSnowflakes) { snowflake.render(frontCTX); }
      }
    }

    step();
  }

  render() {
    const inlineBgImg = {backgroundImage: `url(${this.props.bgUrl})`};
    return (
      <>
        <canvas ref={ this.setBackCanvasRef }></canvas>
        <div id="bg" ref={ this.setBGRef } style={ inlineBgImg }></div>
        <canvas ref={ this.setFrontCanvasRef }></canvas>
      </>
    )
  }

}

export default Snowflakes;