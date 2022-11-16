import styled from 'styled-components';

export const SavingContainer = styled.div`
  position: absolute;
  border: 5px solid red;
  top: 35%;
  left: 30%;
  height: 30%;
  width: 40%;
  background: #8a2be2;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;

  .saver {
    -webkit-perspective: 700px;
    perspective: 700px;
  }

  .saver > span {
    font-size: 25px;
    font-family: 'franklin gothic medium', sans-serif;
    display: inline-block;
    animation: flip 2.6s infinite linear;
    transform-origin: 0 70%;
    transform-style: preserve-3d;
    -webkit-transform-style: preserve-3d;
  }

  @keyframes flip {
    35% {
      transform: rotateX(360deg);
    }
    100% {
      transform: rotatex(360deg);
    }
  }

  .saver > span:nth-child(even) {
    color: white;
  }

  .saver > span:nth-child(2) {
    animation-delay: 0.3s;
  }

  .saver > span:nth-child(3) {
    animation-delay: 0.6s;
  }

  .saver > span:nth-child(4) {
    animation-delay: 0.9s;
  }

  .saver > span:nth-child(5) {
    animation-delay: 1.2s;
  }

  .saver > span:nth-child(6) {
    animation-delay: 1.5s;
  }

  .saver > span:nth-child(7) {
    animation-delay: 1.8s;
  }
`;

export const LoadingDiv = styled.div`
  background-color: #b51541;
  text-align: center;
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 999;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  .saver {
    -webkit-perspective: 700px;
    perspective: 700px;
  }

  .saver > span {
    font-size: 130px;
    font-family: 'franklin gothic medium', sans-serif;
    display: inline-block;
    animation: flip 2.6s infinite linear;
    transform-origin: 0 70%;
    transform-style: preserve-3d;
    -webkit-transform-style: preserve-3d;
  }

  @keyframes flip {
    35% {
      transform: rotateX(360deg);
    }
    100% {
      transform: rotatex(360deg);
    }
  }

  .saver > span:nth-child(even) {
    color: white;
  }

  .saver > span:nth-child(2) {
    animation-delay: 0.3s;
  }

  .saver > span:nth-child(3) {
    animation-delay: 0.6s;
  }

  .saver > span:nth-child(4) {
    animation-delay: 0.9s;
  }

  .saver > span:nth-child(5) {
    animation-delay: 1.2s;
  }

  .saver > span:nth-child(6) {
    animation-delay: 1.5s;
  }

  .saver > span:nth-child(7) {
    animation-delay: 1.8s;
  }
`;
