import React from 'react';
import {
  DisContainer,
  CalendarContainer,
  TreeContainer,
  ArrowImg,
  TextContainer,
  Arrow,
  CalandarTextContainer,
} from './styles';

export default function Descript() {
  return (
    <DisContainer>
      <CalendarContainer>
        <TextContainer>
          캘린더를 누르면 본인에게 온 선물을 확인 할 수 있습니다.
        </TextContainer>
        <ArrowImg src="img/arrow.png"></ArrowImg>
      </CalendarContainer>
      <TreeContainer>
        <Arrow src="img/arrow.png"></Arrow>
        <CalandarTextContainer>
          나무를 누르면 나무를 장식 할 수 있습니다.
        </CalandarTextContainer>
      </TreeContainer>
    </DisContainer>
  );
}
