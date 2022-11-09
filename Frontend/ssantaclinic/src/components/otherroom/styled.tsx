import styled from 'styled-components';

export const OtherRoomContainer = styled.div`
  .box {
    width: 200px;
    height: 200px;
    border-radius: 20px;
    border: solid #5b6dcd 10px;
    pointer-events: none;
  }

  .example {
    display: flex;
    align-items: center;
  }

  input {
    accent-color: var(--accent);
  }

  .inputs {
    display: flex;
    flex-direction: column;
    padding-left: 50px;
  }
`;
