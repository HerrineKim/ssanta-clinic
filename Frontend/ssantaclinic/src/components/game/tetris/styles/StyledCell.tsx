import styled from 'styled-components';

interface StyledCellProps {
  type: string;
  color: any;
}

export const StyledCell = styled.div<StyledCellProps>`
  width: auto;
  background: rgba(${(props: any) => props.color}, 0.8);
  border: ${(props: any) => (props.type === 0 ? '0px solid' : '4px solid')};
  border-bottom-color: rgba(${(props: any) => props.color}, 0.1);
  border-right-color: rgba(${(props: any) => props.color}, 1);
  border-top-color: rgba(${(props: any) => props.color}, 1);
  border-left-color: rgba(${(props: any) => props.color}, 0.3);
`;
