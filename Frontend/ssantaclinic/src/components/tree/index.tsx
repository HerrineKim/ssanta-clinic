import React from 'react';
import { TreeModalDiv } from './style';

interface TreeInfo {
  data: number[];
}

export function TreeModal({ data }: TreeInfo) {
  console.log('TreeModal : ', data);
  return <TreeModalDiv className="treemodal"></TreeModalDiv>;
}
