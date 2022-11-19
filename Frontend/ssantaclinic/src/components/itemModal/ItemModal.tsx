import React, { useEffect, useState } from 'react';
import { CanvasContainer, Wrapper, CloseButton } from './styles';
import { ItemThree } from '../../three/item';
import { MyItems } from '../../store/store';
import { useRecoilValue } from 'recoil';
import Loading from '../loading/Loading';

export default function ItemModal(props: any) {
  const { onClose } = props;
  let itemCanvas: any;
  let id: any;
  const items = useRecoilValue(MyItems);
  const [changeItems, setChangeItems] = useState<number[]>([]);

  useEffect(() => {
    itemCanvas = new ItemThree(items);

    itemCanvas.setupOnce();

    const requestId1 = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(requestId1);
      cancelAnimationFrame(id);
    };
  }, []);

  const render = () => {
    itemCanvas._renderer.render(itemCanvas._scene, itemCanvas._camera);
    setChangeItems(itemCanvas._item2);

    // console.log('!');

    id = requestAnimationFrame(render);
  };
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

      <CanvasContainer id="item-canvas">
        <Loading></Loading>
      </CanvasContainer>
    </Wrapper>
  );
}
