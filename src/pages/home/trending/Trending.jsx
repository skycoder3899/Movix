import React, { useState } from 'react'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import SwitchTabs from '../../../components/switchTabs/SwitchTabs'
import Usefetch from '../../../hooks/UseFetch'
import Carousel from '../../../components/carousel/Carousel'



export default function Trending() {
  const [endPoint,setEndPoint]= useState('day')
  const {data,loading}=Usefetch(`/trending/movie/${endPoint}`);

  const onTabChange=(tab)=>{
    setEndPoint(tab === "Day" ? "day" : "week");
  }
  return (
    <div className="carouselSection">
      <ContentWrapper>
        <div className="carouselTitle">Trending</div>
        <SwitchTabs data={["Day","Week"]} onTabChange={onTabChange}/>
      </ContentWrapper>
      <Carousel data={data?.results} loading={loading}/>
    </div>
  )
}
