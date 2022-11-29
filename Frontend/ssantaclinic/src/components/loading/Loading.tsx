import React from 'react';
import { LoadingDiv } from './style';
// import './loading.css';
export default function Loading() {
  // return <LoadingDiv className="loading"></LoadingDiv>;
  return (
    <LoadingDiv className="loading">
      <div className="loader">
        <span>L</span>
        <span>O</span>
        <span>A</span>
        <span>D</span>
        <span>I</span>
        <span>N</span>
        <span>G</span>
      </div>
    </LoadingDiv>
  );
}
