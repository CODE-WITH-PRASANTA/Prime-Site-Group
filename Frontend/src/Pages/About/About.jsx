import React from 'react'
import AboutMain from '../../Components/AboutMain/AboutMain'
import AboutVideo from '../../Components/AboutVideo/AboutVideo'
import AboutOurVision from '../../Components/AboutOurVision/AboutOurVision'
import AboutOurMission from '../../Components/AboutOurMission/AboutOurMission'
import AboutOurValues from '../../Components/AboutOurValues/AboutOurValues'
import AboutLeadership from '../../Components/AboutLeadership/AboutLeadership'
import AboutTeam from '../../Components/AboutTeam/AboutTeam'
import AboutReports from '../../Components/AboutReports/AboutReports'
import AboutStandards from '../../Components/AboutStandards/AboutStandards'
import AboutAwarness from '../../Components/AboutAwarness/AboutAwarness'

const About = () => {
  return (
    <div>
        <AboutMain/>
        <AboutVideo/>
        <AboutOurVision/>
        <AboutOurMission/>
        <AboutOurValues/>
        <AboutLeadership/>
        <AboutTeam/>
        <AboutReports/>
        <AboutStandards/>
        <AboutAwarness/>
    </div>
  )
}

export default About