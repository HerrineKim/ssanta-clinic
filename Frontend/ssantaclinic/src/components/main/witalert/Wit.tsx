import React, { useState, useEffect } from 'react';
import { Div } from './styles';
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
      <Div className="witAlert">
        도와 주세요
        <button onClick={help}>ㅇㅋ</button>
      </Div>
    );
  } else {
    return <WitsModal onClose={setisHelp}></WitsModal>;
  }
}
