import React, { useState, useEffect } from 'react';
import { WitAlertDiv, YesButton, ButtonDiv } from './styles';
import WitsModal from '../../game/wit/WitsModal';
import { IsCover, selectUserNickname } from '../../../store/store';
import { useRecoilValue } from 'recoil';
import { useSetRecoilState } from 'recoil';

export function WitAlert(props: any) {
  const { wit } = props;
  const setIsCover = useSetRecoilState(IsCover);
  const nickName = useRecoilValue(selectUserNickname);
  const [isHelp, setisHelp] = useState<boolean>(false);
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
        <WitAlertDiv className="tetrisAlert">
          끼룩끼룩!
          <YesButton onClick={() => setFirst(false)}>안녕</YesButton>
        </WitAlertDiv>
      );
    } else {
      if (end) {
        return <WitAlertDiv className="tetrisAlert">끼루룩</WitAlertDiv>;
      } else {
        return (
          <WitAlertDiv className="tetrisAlert">
            <p>{nickName}님 </p>
            <p>선물 전달은 순발력이 중요해요</p>
            <p>테스트 받아 보실래요?</p>
            <ButtonDiv>
              <YesButton onClick={help}>좋아</YesButton>
              <YesButton onClick={() => setEnd(true)}>싫어</YesButton>
            </ButtonDiv>
          </WitAlertDiv>
        );
      }
    }
  } else {
    return <WitsModal onClose={setisHelp} wit={wit}></WitsModal>;
  }
}
