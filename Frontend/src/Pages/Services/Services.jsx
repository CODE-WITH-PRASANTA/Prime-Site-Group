import React from 'react'
import ServiceCash from '../../Components/ServiceCash/ServiceCash'
import ServicesCashManagement from '../../Components/ServicesCashManagement/ServicesCashManagement'
import ServiceOurApproach from '../../Components/ServiceOurApproach/ServiceOurApproach'
import ServiceCashFacility from '../../Components/ServiceCashFacility/ServiceCashFacility'
import ServiceDeliver from '../../Components/ServiceDeliver/ServiceDeliver'
import ServicesAwards from '../../Components/ServicesAwards/ServicesAwards'


const Services = () => {
  return (
    <div>
        <ServiceCash/>
        <ServicesCashManagement/>
        <ServiceOurApproach/>
        <ServiceCashFacility/>
        <ServiceDeliver/>
        <ServicesAwards/>
    </div>
  )
}

export default Services