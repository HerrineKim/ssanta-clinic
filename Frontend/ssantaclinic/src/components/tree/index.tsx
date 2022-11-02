import React from 'react';
import { TreeModalDiv } from './style';
import { TreeInven } from './treeinven/index';
import { TreeCanvas } from './treecanvas/index';

interface TreeInfo {
  data: number[];
}

export function TreeModal({ data }: TreeInfo) {
  console.log('TreeModal : ', data);
  return (
    <TreeModalDiv className="treemodal">
      <TreeCanvas></TreeCanvas>
      <TreeInven></TreeInven>
    </TreeModalDiv>
  );
}
