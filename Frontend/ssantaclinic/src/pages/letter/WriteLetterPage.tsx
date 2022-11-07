import React from 'react';
import { WriteLetter } from '../../components/letter/WriteLetter';
import { Test1 } from '../../components/letter/test1';
import { Wrapper } from './styled';
export const WriteLetterPage = () => {
  return (
    <Wrapper>
      <WriteLetter />
      <Test1 />
    </Wrapper>
  );
};
