import React from 'react'
import TasteOfHomeMain from '../../Components/TasteOfHomeMain/TasteOfHomeMain'
import TasteOfHomeTwo from '../../Components/TasteOfHomeTwo/TasteOfHomeTwo'
import TasteOfHomeThree from '../../Components/TasteOfHomeThree/TasteOfHomeThree'
import TasteOfHomeFour from '../../Components/TasteOfHomeFour/TasteOfHomeFour'
import TasteOfHomeFive from '../../Components/TasteOfHomeFive/TasteOfHomeFive'
import TasteOfHomeSix from '../../Components/TasteOfHomeSix/TasteOfHomeSix'

const TasteOfHome = () => {
  return (
    <div>
        <TasteOfHomeMain/>
        <TasteOfHomeTwo/>
        <TasteOfHomeThree/>
        <TasteOfHomeFour/>
        <TasteOfHomeFive/>
        <TasteOfHomeSix/>
    </div>
  )
}

export default TasteOfHome