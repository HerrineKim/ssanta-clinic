import React, { useEffect, useState } from 'react';
import { MemoryAlertDiv, YesButton, ButtonDiv } from './styles';
import MemoryModal from '../../game/memory/MemoryModal';
import { IsCover, selectUserNickname } from '../../../store/store';
import { useRecoilValue } from 'recoil';
import { useSetRecoilState } from 'recoil';

export function MemoryAlert(props: any) {
  const { memory } = props;
  const setIsCover = useSetRecoilState(IsCover);
  const nickName = useRecoilValue(selectUserNickname);
  const [isHelp, setisHelp] = useState<boolean>(false);
  const [first, setFirst] = useState<boolean>(true);
  const [end, setEnd] = useState<boolean>(false);

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
    if (first) {
      return (
        <MemoryAlertDiv className="tetrisAlert">
          음머어어어!
          <YesButton onClick={() => setFirst(false)}>안녕</YesButton>
        </MemoryAlertDiv>
      );
    } else {
      if (end) {
        return <MemoryAlertDiv className="tetrisAlert">퉤</MemoryAlertDiv>;
      } else {
        return (
          <MemoryAlertDiv className="tetrisAlert">
            <p>{nickName}님 반가워요</p>
            <p>선물 줄 집들을 찾아야 해요</p>
            <p>저 좀 도와줘유</p>
            <ButtonDiv>
              <YesButton onClick={help}>좋아</YesButton>
              <YesButton onClick={() => setEnd(true)}>싫어</YesButton>
            </ButtonDiv>
          </MemoryAlertDiv>
        );
      }
    }
  } else {
    return <MemoryModal onClose={setisHelp} memory={memory}></MemoryModal>;
  }
}
