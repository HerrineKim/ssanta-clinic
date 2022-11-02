import React, { useState, useEffect } from 'react';
// import { useCanvas } from '../../hooks/useCanvas';
import { Div, ModalDiv } from './styles';
import { MainCanvas } from '../../three/main';
import { Alert } from '../../components/main/alert/index';
import { TreeModal } from '../../components/tree/index';

export default function Home() {
  // const firstCanvas = document.getElementById('main-canvas');
  // const canvasRef = useRef<HTMLCanvasElement>(null);
  // const canvasCon = document.getElementById('main-canvas');
  // console.log(canvasCon);

  // useCanvas(canvasRef.current);
  // console.log(canvasRef.current);

  //myroom 에서 axios 로 받아오는 트리에 대한 정보
  //트리 위치에 따라 장식품 리스트로 받아옴
  const data = [1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 1, 2, 3, 1, 1, 2, 2];

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
      <TreeModal data={data}></TreeModal>
      <ModalDiv className="modal"></ModalDiv>
      <Div id="main-canvas"></Div>
    </Div>
  );
}
