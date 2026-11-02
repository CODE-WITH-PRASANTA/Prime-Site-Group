import React from 'react'
import SecurityServicesMain from '../../Components/SecurityServicesMain/SecurityServicesMain'
import SecurityServicesTwo from '../../Components/SecurityServicesTwo/SecurityServicesTwo'
import SecurityServicesFour from '../../Components/SecurityServicesFour/SecurityServicesFour'
import SecurityServicesThree from '../../Components/SecurityServicesThree/SecurityServicesThree'
import SecurityServicesFive from '../../Components/SecurityServicesFive/SecurityServicesFive'

const SecurityServices = () => {
  return (
    <div>
        <SecurityServicesMain/>
        <SecurityServicesTwo/>
        <SecurityServicesFour/>
        <SecurityServicesThree/>
        <SecurityServicesFive/>
    </div>
  )
}

export default SecurityServices