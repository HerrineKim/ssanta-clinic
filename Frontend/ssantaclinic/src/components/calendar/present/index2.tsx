import React from 'react';
import './styles2.css';
import presentHeart from '../../../assets/image/presentHeart.png';

export function Present2() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 mt-5 d-flex justify-content-center">
          <div className="box">
            <div className="box-body">
              <img className="img" src={presentHeart} />
              <div className="box-lid">
                <div className="box-bowtie"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
