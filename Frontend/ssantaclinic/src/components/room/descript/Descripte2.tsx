import React from 'react';
import {
  DisContainer,
  CalendarContainer,
  TreeContainer,
  ArrowImg,
  TextContainer,
  ItemTextContainer,
  Mouse,
  Arr,
} from './styles';

export default function Descript2() {
  return (
    <DisContainer>
      <CalendarContainer>
        <TextContainer>
          <Mouse src="img/mouse.png"></Mouse>
          마우스 스크롤을 통해 나무를 회전시킬 수 있습니다.
        </TextContainer>
        <ArrowImg src="img/arrow.png"></ArrowImg>
      </CalendarContainer>
      <TreeContainer>
        <Arr src="img/arrow.png"></Arr>
        <ItemTextContainer>
          <p>드래그를 통해 아이템을 옮길 수 있습니다.</p>
          <p>체크 버튼으로 저장이 가능합니다.</p>
        </ItemTextContainer>
      </TreeContainer>
    </DisContainer>
  );
}
