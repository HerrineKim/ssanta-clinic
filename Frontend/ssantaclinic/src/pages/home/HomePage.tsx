import React, { useState, useEffect } from 'react';
// import { useCanvas } from '../../hooks/useCanvas';
import { Div, ModalDiv } from './styles';
import { MainCanvas } from '../../three/main';
import { Alert } from '../../components/main/alert/index';
import { HomeAlert } from '../../components/main/homealert';
import { TreeModal } from '../../components/tree/index';

export default function Home() {
  // const firstCanvas = document.getElementById('main-canvas');
  // const canvasRef = useRef<HTMLCanvasElement>(null);
  // const canvasCon = document.getElementById('main-canvas');
  // console.log(canvasCon);

  // useCanvas(canvasRef.current);
  // console.log(canvasRef.current);

  //myroom 에서 axios 로 받아오는 트리에 대한 정보
  //트리 위치에 따라 장식품 리스트로 받아옴 => tree는 백에서 glb로 받아오는걸로
  // const data = [1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 1, 2, 3, 1, 1, 2, 2];

  // 로그인한 유저가 갖고있는 아이템 정보를 받아와야함
  // 개수 정해봐야함 (개수 limit 거는게 맞는 것 같음)
  const items = [1, 2, 3, 1, 1, 2, 3, 1, 2, 3];

  console.log('home');
  useEffect(() => {
    const homeCanvas = new MainCanvas(items);
    // const canvas = document.querySelector('canvas');
    // console.log(canvas);
    console.log('useeffect');
    const requestId = requestAnimationFrame(homeCanvas.render.bind(homeCanvas));

    return () => cancelAnimationFrame(requestId);
  }, []);
  return (
    <Div>
      <Alert>들어갈래?</Alert>
      <HomeAlert>집으로 들어갈래?</HomeAlert>
      {/* <TreeModal data={data}></TreeModal> */}
      <ModalDiv className="modal"></ModalDiv>
      <Div id="main-canvas"></Div>
    </Div>
  );
}
