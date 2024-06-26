import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";

import "./style.scss";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/movix-logo.svg";

export default function Header() {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  },[location])

  
  const controlNavbar=()=>{

    if(window.scrollY>200){
      console.log( window.screenX)
      if(window.scrollY>lastScrollY && !mobileMenu)  setShow("hide")
      else setShow("show")
    }
    else{
      setShow("top")
    }
    setLastScrollY(window.scrollY)
  }
  useEffect(()=>{
    window.addEventListener("scroll",controlNavbar)
    return ()=>{
      window. removeEventListener("scroll", controlNavbar);
    }
  },[lastScrollY])

  const openSearch = () => {
    setMobileMenu(false)
    setShowSearch(true)
  }
  const openMobileMenu = () => {
    setShowSearch(false)
    setMobileMenu(true)
  }

  const navigationHandler=(type)=>{
    if(type==='Movie') navigate("/explore/movie");
    else if(type==='tv') navigate("/explore/tv");
    else navigate("/")
    setShowSearch(false)
    setMobileMenu(false)
  }

  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
    setTimeout(()=>{
      setShowSearch(false )
    },1000)
  };

  return (
    <header className={` header ${mobileMenu ? "mobileView" : ""} ${show}`}>
      <ContentWrapper>
        <div className="logo">
          <img src={logo} alt="" onClick={()=>navigationHandler()}/>
        </div>
        <ul className="menuItems">
          <li className="menuItem" onClick={()=>navigationHandler("Movie")}>Movies</li>
          <li className="menuItem" onClick={()=>navigationHandler("tv")}>TV Shows</li>
          <li className="menuItem"><HiOutlineSearch onClick={openSearch} /></li>
        </ul>
        <div className="mobileMenuItems">
          <HiOutlineSearch onClick={openSearch} />
          {mobileMenu ? (<VscChromeClose onClick={() => setMobileMenu(false)} />) : (<SlMenu onClick={openMobileMenu} />)}
        </div>
      </ContentWrapper>
      {showSearch && <div className="searchBar">
        <ContentWrapper>
          <div className="searchInput">
            <input
              type="text"
              placeholder="Search for a movie or tv show...."
              onChange={(e) => setQuery(e.target.value)}
              value={query}
              onKeyUp={searchQueryHandler}
            />
            <VscChromeClose onClick={()=>setShowSearch(false)}/>
          </div>
        </ContentWrapper>
      </div>}
    </header>
  );
};