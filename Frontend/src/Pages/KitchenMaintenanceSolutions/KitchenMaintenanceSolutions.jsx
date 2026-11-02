import React from 'react'
import KitchenMaintenanceSolutionsMain from '../../Components/KitchenMaintenanceSolutionsMain/KitchenMaintenanceSolutionsMain'
import KitchenMaintenanceSolutionsTwo from '../../Components/KitchenMaintenanceSolutionsTwo/KitchenMaintenanceSolutionsTwo'
import KitchenMaintenanceSolutionsThree from '../../Components/KitchenMaintenanceSolutionsThree/KitchenMaintenanceSolutionsThree'
import KitchenMaintenanceSolutionsFour from '../../Components/KitchenMaintenanceSolutionsFour/KitchenMaintenanceSolutionsFour'
import KitchenMaintenanceSolutionsFive from '../../Components/KitchenMaintenanceSolutionsFive/KitchenMaintenanceSolutionsFive'

const KitchenMaintenanceSolutions = () => {
  return (
    <div>
        <KitchenMaintenanceSolutionsMain/>
        <KitchenMaintenanceSolutionsTwo/>
        <KitchenMaintenanceSolutionsThree/>
        <KitchenMaintenanceSolutionsFour/>
        <KitchenMaintenanceSolutionsFive/>
        <KitchenMaintenanceSolutionsSix/>
    </div>
  )
}

export default KitchenMaintenanceSolutions