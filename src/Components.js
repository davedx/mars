import React from 'react';
import ComponentRow from './ComponentRow'

export default (props) => {
  return <table>
    <thead>
      <tr><td></td><td>Operational (total)</td><td>Capacity (used)</td><td>Repair</td><td>Build</td></tr>
    </thead>
    <tbody>
      {props.components.map(component => <ComponentRow key={component.id} {...component} />)}
    </tbody>
  </table>
}