import React, { useRef } from 'react';
import { useCanvas } from '../hooks/useCanvas';

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useCanvas(canvasRef.current);
  return (
    <div className="webgl-container">
      <canvas ref={canvasRef} />;
    </div>
  );
}
