import React, { Component } from 'react';
import './App.css';

import Components from './Components'
import Console from './Console'
import initialComponentsData from './initialComponentsData'
import {tick} from './Game'

let state
let render

const setState = (obj) => {
  state = {...state, ...obj}
  render && render({tick: false})
}

const build = (id) => {
  let component = state.components.find(i => i.id === id)
  component.building = 100
  state.log.push(`Building ${component.name}`)

  setState(state)
}

const repair = (id) => {
  let component = state.components.find(i => i.id === id)
  component.repairing = 100
  state.log.push(`Repairing ${component.name}`)

  setState(state)
}

state = {
  components: initialComponentsData.map(c => ({
    ...c,
    build: build,
    building: 0,
    repair: repair,
    repairing: 0,
    assembling: 0
  })),
  log: [
    'Welcome to Mars. Year: 2023',
    'BFR inbound, manifest 10 people, 1 SMR. ETA 6 hours'
  ]
}

setInterval(() => tick(state, render), 1000)

class App extends Component {
  constructor(props) {
    super(props)
    this.state = state
    
    render = (opts) => {
      if (!opts.tick) {
        console.log('render. state: ', state)
      }
      this.setState(state)
    }
  }

  render() {
    return (
      <div className='App'>
        <div className='main'>
          <h1 className='App-title'>Welcome to Mars</h1>

          <Components components={this.state.components} build={build} />

          <Console log={this.state.log} />
        </div>
      </div>
    );
  }
}

export default App;
