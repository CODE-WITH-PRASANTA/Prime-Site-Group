import React from 'react'
import FacilityManagementMain from '../../Components/FacilityManagementMain/FacilityManagementMain'
import FacilityManagementTwo from '../../Components/FacilityManagementTwo/FacilityManagementTwo'
import FacilityManagementThree from '../../Components/FacilityManagementThree/FacilityManagementThree'
import FacilityManagementFour from '../../Components/FacilityManagementFour/FacilityManagementFour'
import FacilityManagementSix from '../../Components/FacilityManagementSix/FacilityManagementSix'

const FacilityManagement = () => {
  return (
    <div>
        <FacilityManagementMain/>
        <FacilityManagementTwo/>
        <FacilityManagementThree/>
        <FacilityManagementFour/>
        <FacilityManagementSix/>
    </div>
  )
}

export default FacilityManagement