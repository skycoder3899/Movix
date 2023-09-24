import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Home from './pages/home/Home'
import Details from './pages/details/Details'
import SearchResult from './pages/searchResult/SearchResult'
import Explore from './pages/explore/Explore'
import PageNotFound from './pages/404/PageNotFound'
import Layout from "./Layout";
import { useEffect } from "react";
import { fetchDataFromApi } from "./utils/api";
import { useDispatch } from "react-redux";
import { getApiConfiguration, getGenres } from './features/homeSlice'

function App() {
  const dispatch = useDispatch()


  useEffect(() => {
    fetchApiConfig();
    genresCall();
  }, [])

  const fetchApiConfig = () => {
    fetchDataFromApi("/configuration").then((res) => {
      const url = {
        backdrop: res.images.secure_base_url + "original",
        profiler: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original"
      }
      dispatch(getApiConfiguration(url));
    })
  }

  const genresCall = async ()=>{
    let promises=[]
    let endPoint=["tv","movie"];
    let allGenres={};
    endPoint.forEach((url)=>{ promises.push(fetchDataFromApi(`/genre/${url}/list`))})
    let data=await Promise.all(promises);
    data.map(({genres})=>{
      return genres.map((item)=>{allGenres[item.id]=item})
    })
    dispatch(getGenres(allGenres))
  }


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<Home />} />
          <Route path=":mediaType/:id" element={<Details />} />
          <Route path="search/:query" element={<SearchResult />} />
          <Route path="explore/:mediaType" element={<Explore />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
