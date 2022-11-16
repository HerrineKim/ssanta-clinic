import React from 'react';
import { CanvasContainer, Wrapper, CloseButton } from './styles';

export default function ItemModal(props: any) {
  const { onClose } = props;
  return (
    <Wrapper className="roommodal">
      <CloseButton
        className="outbtn"
        onClick={() => {
          onClose(false);
        }}
      >
        x
      </CloseButton>

      <CanvasContainer id="item-canvas">모달</CanvasContainer>
    </Wrapper>
  );
}
