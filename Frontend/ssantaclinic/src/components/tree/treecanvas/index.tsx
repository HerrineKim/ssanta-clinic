import React, { useEffect } from 'react';
import { TreeCanvasDiv } from './style';
import { TreeCan } from '../../../three/tree';

export function TreeCanvas() {
  useEffect(() => {
    const treeCanvas = new TreeCan();
    const requestId = requestAnimationFrame(treeCanvas.render.bind(treeCanvas));

    return () => cancelAnimationFrame(requestId);
  }, []);
  console.log('TreeCanvas : ');
  return <TreeCanvasDiv className="treecanvas">asdf</TreeCanvasDiv>;
}
