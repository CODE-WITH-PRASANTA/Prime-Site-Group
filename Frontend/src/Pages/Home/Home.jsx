import React from 'react'
import HomeMain from '../../Components/HomeMain/HomeMain'
import HomeService from '../../Components/HomeService/HomeService'
import HomeResponsbility from '../../Components/HomeResponsbility/HomeResponsbility'
import HomeNews from '../../Components/HomeNews/HomeNews'

const Home = () => {
  return (
    <div>
        <HomeMain/>
        <HomeService/>
        <HomeResponsbility/>
        <HomeNews/>
    </div>
  )
}

export default Home