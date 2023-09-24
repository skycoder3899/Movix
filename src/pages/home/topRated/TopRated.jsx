import React, { useState } from 'react'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import SwitchTabs from '../../../components/switchTabs/SwitchTabs'
import Usefetch from '../../../hooks/UseFetch'
import Carousel from '../../../components/carousel/Carousel'



export default function TopRated() {
  const [endPoint,setEndPoint]= useState('movie')
  const {data,loading}=Usefetch(`/${endPoint}/top_rated`);

  const onTabChange=(tab)=>{
    setEndPoint(tab === "Movies" ? "movie" : "tv");
  }
  return (
    <div className="carouselSection">
      <ContentWrapper>
        <div className="carouselTitle">Top Rated</div>
        <SwitchTabs data={["Movies","TV Shows"]} onTabChange={onTabChange}/>
      </ContentWrapper>
      <Carousel data={data?.results} loading={loading} endPoint={endPoint}/>
    </div>
  )
}
