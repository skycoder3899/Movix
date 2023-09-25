import React from 'react'
import './style.scss'
import Usefetch from '../../hooks/UseFetch'
import { useParams } from 'react-router-dom'
import DetailsBanner from './detailsBanner/DetailsBanner'

export default function Details() {
  const {mediaType,id}=useParams()
  const {data,loading }=Usefetch(`/${mediaType}/${id}/videos`)
  const {data:credits,loading: creditsLoading}=Usefetch(`/${mediaType}/${id}/credits`)
  return (
    <div>
      <DetailsBanner video={data?.results[0]} crew={credits?.crew}/>
    </div>
  )
}
