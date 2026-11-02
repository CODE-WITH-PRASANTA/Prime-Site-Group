import React from 'react'
import ManagedServicesMain from '../../Components/ManagedServicesMain/ManagedServicesMain'
import ManagedServicesTwo from '../../Components/ManagedServicesTwo/ManagedServicesTwo'
import ManagedServicesThree from '../../Components/ManagedServicesThree/ManagedServicesThree'
import ManagedServicesFour from '../../Components/ManagedServicesFour/ManagedServicesFour'
import ManagedServicesFive from '../../Components/ManagedServicesFive/ManagedServicesFive'
import ManagedServicesSix from '../../Components/ManagedServicesSix/ManagedServicesSix'

const ManagedServices = () => {
  return (
    <div>
        <ManagedServicesMain/>
        <ManagedServicesTwo/>
        <ManagedServicesThree/>
        <ManagedServicesFour/>
        <ManagedServicesFive/>
        <ManagedServicesSix/>
    </div>
  )
}

export default ManagedServices