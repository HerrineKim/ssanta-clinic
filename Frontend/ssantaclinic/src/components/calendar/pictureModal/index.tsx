import React from 'react';
import {
  PictureModalContainer,
  PictureModalTop,
  PictureModalBottom,
  CloseButton,
} from './styles';
import { Carousel } from 'react-responsive-carousel';

type PictureModalProps = {
  pictureModalOpen: boolean;
  setPictureModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  images: [];
};

export function PictureModal(props: PictureModalProps) {
  return (
    <PictureModalContainer>
      <PictureModalTop>
        <CloseButton onClick={() => props.setPictureModalOpen(false)}>
          x
        </CloseButton>
      </PictureModalTop>
      <PictureModalBottom>
        <Carousel>
          {/* images의 사진 출력 */}
          {props.images.map((image: any) => {
            return (
              <div key={image}>
                <img src={image} />
              </div>
            );
          })}
        </Carousel>
      </PictureModalBottom>
    </PictureModalContainer>
  );
}
