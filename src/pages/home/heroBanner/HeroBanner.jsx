import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import './style.scss'
import Usefetch from '../../../hooks/UseFetch';
import Img from '../../../components/lazyLoadImage/Img'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import { useSelector } from 'react-redux'

export default function HeroBanner() {

  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { url } = useSelector((state) => state.home)

  const { data, loading } = Usefetch("/movie/upcoming");

  useEffect(() => {
    setBackground(url.backdrop + data?.results[Math.floor(Math.random() * 20)]?.backdrop_path)
  }, [data])


  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };

  return (
    <div className="heroBanner">
      {!loading && <div className="backdrop-img">
        <Img src={background} />
      </div>}
      <dir className="opacity-layer"></dir>
      <ContentWrapper>
        <div className="heroBannerContent">
          <span className="title">Welcome.</span>
          <span className="subTitle">
            Millions of movies, TV shows and people to discover.
            Explore now.
          </span>
          <div className="searchInput">
            <input
              type="text"
              placeholder="Search for a movie or tv show...."
              onChange={(e) => setQuery(e.target.value)}
              value={query}
              onKeyUp={searchQueryHandler}
            />
            <button>Search</button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  )
}
