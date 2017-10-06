import React from 'react';

export default (props) => <div className='console'>
  <strong>Colony log</strong>
  <div>
    {props.log.map((line, idx) => <div key={idx}>{line}</div>)}
  </div>
</div>
