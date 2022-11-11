import React, { useState } from 'react';
import { Div } from './styles';
import MemoryModal from '../../game/memory/MemoryModal';

export function MemoryAlert() {
  const [isHelp, setisHelp] = useState<boolean>(false);
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
