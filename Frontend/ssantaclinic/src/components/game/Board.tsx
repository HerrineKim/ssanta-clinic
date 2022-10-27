import React from 'react';
import Cell from './Cell';
import './wits.css';

interface Iprops {
  numbers: Array<number>;
  handleClick: (num: number) => void;
}

export default function Board({ numbers, handleClick }: Iprops) {
  // console.log(typeof handleClick);
  return (
    <div className="board-container">
      {numbers.map((num: number, index: number) => (
        <Cell num={num} key={index} handleClick={handleClick}></Cell>
      ))}
    </div>
  );
}
