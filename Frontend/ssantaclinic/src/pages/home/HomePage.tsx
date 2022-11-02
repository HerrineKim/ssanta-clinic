import React, { useState, useEffect } from 'react';
// import { useCanvas } from '../../hooks/useCanvas';
import { Div, ModalDiv } from './styles';
import { MainCanvas } from '../../three/main';
import { Alert } from '../../components/main/alert/index';

export default function Home() {
  // const firstCanvas = document.getElementById('main-canvas');
  // const canvasRef = useRef<HTMLCanvasElement>(null);
  // const canvasCon = document.getElementById('main-canvas');
  // console.log(canvasCon);

  // useCanvas(canvasRef.current);
  // console.log(canvasRef.current);

  console.log('home');
  useEffect(() => {
    const homeCanvas = new MainCanvas();
    // const canvas = document.querySelector('canvas');
    // console.log(canvas);
    console.log('useeffect');
    const requestId = requestAnimationFrame(homeCanvas.render.bind(homeCanvas));

    return () => cancelAnimationFrame(requestId);
  }, []);
  return (
    <Div>
      <Alert>들어갈래?</Alert>
      <ModalDiv className="modal"></ModalDiv>
      <Div id="main-canvas"></Div>
    </Div>
  );
}
