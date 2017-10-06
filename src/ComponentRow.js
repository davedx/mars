import React from 'react';

const ProgressButton = (props) => {
  const styles = props.progress === 0 ? {cursor: 'pointer', color: '#333'} : {color: '#BBB'}
  const label = props.progress
  return <div className='br-btn' style={styles} onClick={() => { props.progress === 0 && props.cb() }}>
    <div className='br-btn-txt'>{props.label}</div>
    <div className='br-btn-i' style={{width: props.progress}}>
    </div>
  </div>
}

export default (props) => {
  let buildLabel
  if (props.building > 0) {
    buildLabel = 'Building'
  } else if (props.assembling > 0) {
    buildLabel = 'Assembling'
  } else {
    buildLabel = 'Build'
  }
  return <tr>
    <td>{props.name}:</td>
    <td>{props.built} ({props.operational})</td>
    <td>{props.capacity_per_unit * props.operational} {props.unit}</td>
    <td><ProgressButton cb={() => props.repair(props.id)} label='Repair' progress={props.repairing} /></td>
    <td><ProgressButton cb={() => props.build(props.id)} label={buildLabel} progress={props.building || props.assembling} /></td>
  </tr>
}