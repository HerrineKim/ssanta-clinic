import React, { Fragment, useEffect } from 'react';
import { BoxDetailContainer } from './styles';

type BoxDetailProps = {
  setBoxDetailOpen: React.Dispatch<React.SetStateAction<boolean>>;
  boxDetailOpen: boolean;
  boxDetail: any;
};

export function BoxDetail(props: BoxDetailProps) {
  useEffect(() => {
    console.log(props.boxDetail);
  }, [props.boxDetail]);
  const closeBoxDetailModal = () => {
    props.setBoxDetailOpen(false);
  };
  if (!props.boxDetailOpen) {
    return null;
  } else {
    return (
      <Fragment>
        <button onClick={closeBoxDetailModal}>x</button>
        <div>{props.boxDetail.content}</div>
      </Fragment>
    );
  }
}
