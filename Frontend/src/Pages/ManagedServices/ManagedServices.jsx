import React from 'react'
import ManagedServicesMain from '../../Components/ManagedServicesMain/ManagedServicesMain'
import ManagedServicesTwo from '../../Components/ManagedServicesTwo/ManagedServicesTwo'
import ManagedServicesThree from '../../Components/ManagedServicesThree/ManagedServicesThree'
import ManagedServicesFour from '../../Components/ManagedServicesFour/ManagedServicesFour'
import ManagedServicesFive from '../../Components/ManagedServicesFive/ManagedServicesFive'

const ManagedServices = () => {
  return (
    <div>
        <ManagedServicesMain/>
        <ManagedServicesTwo/>
        <ManagedServicesThree/>
        <ManagedServicesFour/>
        <ManagedServicesFive/>
    </div>
  )
}

export default ManagedServices