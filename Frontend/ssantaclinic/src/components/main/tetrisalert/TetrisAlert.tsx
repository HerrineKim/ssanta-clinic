import React, { useState, useEffect } from 'react';
import { TetrisAlertDiv, YesButton, ButtonDiv } from './styles';

import { TetrisModal } from '../../game/tetris/TetrisModal';
import { IsCover } from '../../../store/store';
import { selectUserNickname } from '../../../store/store';
import { useSetRecoilState, useRecoilValue } from 'recoil';

export function TetrisAlert(props: any) {
  const { tetris } = props;

  const [isHelp, setisHelp] = useState<boolean>(false);
  const setIsCover = useSetRecoilState(IsCover);
  const nickName = useRecoilValue(selectUserNickname);
  const [first, setFirst] = useState<boolean>(true);
  const [end, setEnd] = useState<boolean>(false);

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
    if (first) {
      return (
        <TetrisAlertDiv className="tetrisAlert">
          엇! {nickName}님 반가워요
          <YesButton onClick={() => setFirst(false)}>안녕</YesButton>
        </TetrisAlertDiv>
      );
    } else {
      if (end) {
        return <TetrisAlertDiv className="tetrisAlert">흥</TetrisAlertDiv>;
      } else {
        return (
          <TetrisAlertDiv className="tetrisAlert">
            <p>곧 크리스마스라서 선물이 너무 많아요</p>
            <p>선물 쌓는 것좀 도와주실래요?</p>
            <ButtonDiv>
              <YesButton onClick={help}>좋아</YesButton>
              <YesButton onClick={() => setEnd(true)}>싫어</YesButton>
            </ButtonDiv>
          </TetrisAlertDiv>
        );
      }
    }
  } else {
    return <TetrisModal onClose={setisHelp} tetris={tetris}></TetrisModal>;
  }
}
