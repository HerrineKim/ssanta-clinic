import React, { useState, useEffect } from 'react';
import { TetrisAlertDiv, YesButton } from './styles';
import WitsModal from '../../game/wit/WitsModal';
import { TetrisModal } from '../../game/tetris/TetrisModal';
import { IsCover } from '../../../store/store';
import { useRecoilValue } from 'recoil';
import { useSetRecoilState } from 'recoil';

export function TetrisAlert() {
  const [isHelp, setisHelp] = useState<boolean>(false);
  const setIsCover = useSetRecoilState(IsCover);
  const isCover = useRecoilValue(IsCover);
  console.log(isHelp);
  function help() {
    setisHelp(true);
  }
  useEffect(() => {
    if (isHelp) {
      setIsCover(false);
    } else {
      setIsCover(true);
    }
  }, [isHelp]);
  if (!isHelp) {
    return (
      <TetrisAlertDiv className="tetrisAlert">
        테트리스 도와 주세요
        <YesButton onClick={help}>ㅇㅋ</YesButton>
      </TetrisAlertDiv>
    );
  } else {
    return <TetrisModal onClose={setisHelp}></TetrisModal>;
  }
}
