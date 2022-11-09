import React from 'react';
// import { FriendModalContainer, FriendModalInnerBox } from './styles';
import './styles.scss';

export default function FriendModal() {
  return (
    <div id="open-modal" className="modal-window">
      <div>
        <a href="#" title="Close" className="modal-close">
          Close
        </a>
        <h1>Voilà!</h1>
        <div>
          A CSS-only modal based on the :target pseudo-class. Hope you find it
          helpful.
        </div>
        <div>
          <small>Check out 👇</small>
        </div>
      </div>
    </div>
  );
}
