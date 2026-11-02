import React from 'react'
import ManPowerServiceMain from '../../Components/ManPowerServiceMain/ManPowerServiceMain'
import ManPowerServiceTwo from '../../Components/ManPowerServiceTwo/ManPowerServiceTwo'
import ManPowerServiceFour from '../../Components/ManPowerServiceFour/ManPowerServiceFour'
import ManPowerServiceThree from '../../Components/ManPowerServiceThree/ManPowerServiceThree'
import ManPowerServiceFive from '../../Components/ManPowerServiceFive/ManPowerServiceFive'

const ManPowerService = () => {
  return (
    <div>
        <ManPowerServiceMain/>
        <ManPowerServiceTwo/>
        <ManPowerServiceThree/>
        <ManPowerServiceFour/>
        <ManPowerServiceFive/>
    </div>
  )
}

export default ManPowerService