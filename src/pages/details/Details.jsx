import React from 'react'
import './style.scss'
import Usefetch from '../../hooks/UseFetch'
import { useParams } from 'react-router-dom'
import DetailsBanner from './detailsBanner/DetailsBanner'
import Cast from './cast/Cast'
import VideosSection from './videosSection/VideosSection'
import Recommendation from './carousels/Recommendation'
import Similar from './carousels/Similar'

export default function Details() {
  const {mediaType,id}=useParams()
  const {data,loading }=Usefetch(`/${mediaType}/${id}/videos`)
  const {data:credits,loading: creditsLoading}=Usefetch(`/${mediaType}/${id}/credits`)
  return (
    <div>
      <DetailsBanner video={data?.results[0]} crew={credits?.crew}/>
      <Cast data={credits?.cast} loading={creditsLoading}/>
      <VideosSection data={data} loading={loading}/>
      <Recommendation mediaType={mediaType} id={id}/>
      <Similar mediaType={mediaType} id={id}/>
    </div>
  )
}
