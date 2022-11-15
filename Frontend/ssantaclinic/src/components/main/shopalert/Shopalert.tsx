import React, { useEffect, useState } from 'react';
import { Div } from './styles';
import MemoryModal from '../../game/memory/MemoryModal';
import { IsCover } from '../../../store/store';
import { useRecoilValue } from 'recoil';
import { useSetRecoilState } from 'recoil';
interface Props {
  ref: React.Ref<HTMLDivElement>;
}

export function MemoryAlert() {
  const setIsCover = useSetRecoilState(IsCover);
  const isCover = useRecoilValue(IsCover);
  const [isHelp, setisHelp] = useState<boolean>(false);

  useEffect(() => {
    if (isHelp) {
      setIsCover(false);
    } else {
      setIsCover(true);
    }
  }, [isHelp]);

  function help() {
    setisHelp(true);
  }
  if (!isHelp) {
    return (
      <Div className="memoryAlert">
        도와 주세요
        <button onClick={help}>ㅇㅋ</button>
      </Div>
    );
  } else {
    return <MemoryModal onClose={setisHelp}></MemoryModal>;
  }
}
