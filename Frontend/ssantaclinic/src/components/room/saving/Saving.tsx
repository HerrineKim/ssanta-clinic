import React, { Fragment, useEffect } from 'react';
import { SavingContainer } from './styles';

export default function Saving(props: any) {
  console.log(props);
  const save = props.result[0];
  const success = props.result[1];

  return (
    <Fragment>
      {save ? (
        <SavingContainer className="saving">
          <div className="saver">
            <span>S</span>
            <span>A</span>
            <span>V</span>
            <span>I</span>
            <span>N</span>
            <span>G</span>
          </div>
        </SavingContainer>
      ) : null}
      {success ? <SavingContainer>저장완료</SavingContainer> : null}
    </Fragment>
  );
}
