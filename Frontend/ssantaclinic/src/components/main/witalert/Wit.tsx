import React, { useState, useEffect } from 'react';
import { WitAlertDiv, YesButton } from './styles';
import WitsModal from '../../game/wit/WitsModal';
import { IsCover } from '../../../store/store';
import { useRecoilValue } from 'recoil';
import { useSetRecoilState } from 'recoil';

export function WitAlert() {
  const setIsCover = useSetRecoilState(IsCover);
  const isCover = useRecoilValue(IsCover);
  const [isHelp, setisHelp] = useState<boolean>(false);
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
      <WitAlertDiv className="witAlert">
        도와 주세요
        <YesButton onClick={help}>ㅇㅋ</YesButton>
      </WitAlertDiv>
    );
  } else {
    return <WitsModal onClose={setisHelp}></WitsModal>;
  }
}
