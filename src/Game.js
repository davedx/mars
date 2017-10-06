const capacity = component => Math.max(0, component.operational - component.used)

const getCapacity = (state, componentId) =>
  state.components.reduce((acc, i) => {
    return i.id === componentId ? (acc + capacity(i)) : acc
  }, 0)

const tick = (state, render) => {
  let buildCapacity = getCapacity(state, '3d_fab')
  let repairAndAssembleCapacity = getCapacity(state, 'robots')

  state.components = state.components.map(component => {
    if (component.building > 0 && buildCapacity > 0) {
      const delta = Math.min(component.building, buildCapacity)
      component.building -= delta
      buildCapacity -= delta

      if (component.building === 0) {
        component.assembling = 100
      }
    }
    if (component.repairing > 0 && repairAndAssembleCapacity > 0) {
      const delta = Math.min(component.repairing, repairAndAssembleCapacity)
      component.repairing -= delta
      repairAndAssembleCapacity -= delta
    }
    if (component.assembling > 0 && repairAndAssembleCapacity > 0) {
      const delta = Math.min(component.assembling, repairAndAssembleCapacity)
      component.assembling -= delta
      repairAndAssembleCapacity -= delta

      if (component.assembling === 0) {
        component.built += 1
        component.operational += 1
      }
    }
    return component
  })

  render && render({tick: true})
}

export {tick}
