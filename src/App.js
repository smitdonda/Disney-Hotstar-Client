import "./App.css";
import React, { useState, use } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
// import HeaderBar from "./Components/HeaderBar";
import MoviesTvShows from "./Components/MoviesTvShows";
import VideoDetails from "./Components/VideoDetails";
import VideoPlayer from "./Components/VideoPlayer";
import WatchList from "./Components/WatchList";
import Subscribe from "./Components/Subscribe";
import Search from "./Components/Search";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import "bootstrap/dist/css/bootstrap.min.css";

export const HotstarContext = React.createContext();
function App() {
  let [searchName, setSearchName] = useState();
  let [allMoviesOrTvShows, setallMoviesOrTvShows] = useState();

  return (
    <>
      <BrowserRouter>
        <HotstarContext.Provider
          value={{
            searchName,
            setSearchName,
            allMoviesOrTvShows,
            setallMoviesOrTvShows,
          }}
        >
          {/* <HeaderBar></HeaderBar> */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies-tvshows/:id" element={<MoviesTvShows />} />
            <Route path="/video-details/:id" element={<VideoDetails />} />
            <Route path="/watch-trailers/:id" element={<VideoPlayer />} />
            <Route path="/subscribe" element={<Subscribe />} />
            <Route path="/watch-list" element={<WatchList />} />
            <Route path="/search" element={<Search />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
          </Routes>
        </HotstarContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
