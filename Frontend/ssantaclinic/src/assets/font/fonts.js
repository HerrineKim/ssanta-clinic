import { createGlobalStyle } from 'styled-components';
import Cafe24Ssurround from './Cafe24Ssurround.ttf';

export default createGlobalStyle`
  @font-face {
    font-family: 'Cafe24Ssurround';
    src: url(${Cafe24Ssurround}) format('truetype');
    font-weight: normal;
    font-style: normal;
  }
`;
