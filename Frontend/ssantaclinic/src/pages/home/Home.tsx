import React, { useEffect } from 'react';
// import { useCanvas } from '../../hooks/useCanvas';
import { Div } from './styles';
import { HomeCanvas } from '../../hooks/useCanvas';

export default function Home() {
  // const firstCanvas = document.getElementById('main-canvas');
  // const canvasRef = useRef<HTMLCanvasElement>(null);
  // const canvasCon = document.getElementById('main-canvas');
  // console.log(canvasCon);

  // useCanvas(canvasRef.current);
  // console.log(canvasRef.current);
  console.log('home');
  useEffect(() => {
    // const canvas = document.querySelector('canvas');
    // console.log(canvas);
    console.log('useeffect');
    const homeCanvas = new HomeCanvas();
    const requestId = homeCanvas.requestId();

    return () => cancelAnimationFrame(requestId);
  });
  return <Div id="main-canvas"></Div>;
}
