import React, { useState, useEffect } from 'react';
import { ShopCanvas } from '../../three/shop';
import { Div, ModalDiv } from './styles';
import ShopAlert from '../../components/shop';

export default function ShopPage() {
  console.log('shop');
  useEffect(() => {
    const shopCanvas = new ShopCanvas();
    // const canvas = document.querySelector('canvas');
    // console.log(canvas);
    console.log('useeffect');
    const requestId = requestAnimationFrame(shopCanvas.render.bind(shopCanvas));

    return () => cancelAnimationFrame(requestId);
  }, []);
  return (
    <Div>
      <Div id="shop-canvas"></Div>;<Div id="shop"></Div>
    </Div>
  );
}
