import styled from 'styled-components';

interface StyledStageProps {
  width: number;
  height: number;
}

// repeat(반복 횟수, 반복 값)
// fr: fraction, 숫자 비율대로 트랙의 크기를 나눈다.
export const StyledStage = styled.div<StyledStageProps>`
  display: grid;
  grid-template-rows: repeat(
    ${(props: any) => props.height},
    calc(25vw / ${(props: any) => props.width})
  );
  grid-template-columns: repeat(${(props: any) => props.width}, 1fr);
  grid-gap: 1px;
  border: 2px solid #333;
  width: 100%;
  max-width: 25vw;
  background: #111;
`;
