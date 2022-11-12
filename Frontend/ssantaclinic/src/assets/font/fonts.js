import { createGlobalStyle } from 'styled-components';
import IMBold from './IMBold.ttf';
import IMRegular from './IMRegular.ttf';
import Cafe24Ssurround from './Cafe24Ssurround.ttf';

export default createGlobalStyle`
  @font-face {
    font-family: 'Cafe24Ssurround';
    src: url(${Cafe24Ssurround}) format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'IMBold';
    src: url(${IMBold}) format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'IMRegular';
    src: url(${IMRegular}) format('truetype');
    font-weight: normal;
    font-style: normal;
  }
`;
