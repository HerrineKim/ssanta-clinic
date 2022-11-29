import React from 'react';
import {
  PictureModalContainer,
  PictureModalTop,
  PictureModalBottom,
  CloseButton,
} from './styles';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

type PictureModalProps = {
  pictureModalOpen: boolean;
  setPictureModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  images: [];
};

export function PictureModal(props: PictureModalProps) {
  // 모달 상태
  if (!props.pictureModalOpen) {
    return null;
  } else {
    return (
      <PictureModalContainer>
        <PictureModalTop>
          <CloseButton onClick={() => props.setPictureModalOpen(false)}>
            x
          </CloseButton>
        </PictureModalTop>
        <PictureModalBottom>
          <Carousel autoPlay>
            {/* images의 사진 출력 */}
            {props.images.map((image: any) => {
              return (
                // 사이즈: 100px
                <div
                  style={{
                    width: '200px',
                  }}
                  key={image}
                >
                  <img src={image} />
                </div>
              );
            })}
          </Carousel>
        </PictureModalBottom>
      </PictureModalContainer>
    );
  }
}
