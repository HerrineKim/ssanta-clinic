import React from 'react';
import './wits.css';

interface Iprops {
  num: number;
  // key: keyof Array<number>;
  handleClick: (num: number) => void;
}

export default function Cell({ num, handleClick }: Iprops) {
  return (
    <div className="cell-container" onClick={() => handleClick(num)}>
      {num !== 0 ? num : null}
    </div>
  );
}
