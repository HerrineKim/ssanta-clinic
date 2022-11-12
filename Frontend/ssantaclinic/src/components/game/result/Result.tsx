import React, { useState, useCallback, useEffect } from 'react';
import { ResultDiv } from './resultstyle';

interface ResultProp {
  isSucces: boolean;
  time: number | null;
  round: number | null;
  onClose: (value: React.SetStateAction<boolean>) => void;
}

export default function Result(props: ResultProp) {
  const { isSucces, onClose } = props;
  console.log(isSucces);
  return (
    <ResultDiv>
      {isSucces ? '감사합니다' : '실망스럽습니다'}
      <button onClick={() => onClose(false)}>돌아가기</button>
    </ResultDiv>
  );
}
