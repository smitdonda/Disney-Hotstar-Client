import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { Link } from "react-router-dom";
import HeaderBar from "../Components/HeaderBar";

function TvShows() {
  let [allTvShows, setAllTvShows] = useState();
  let [allTvShowsKey, setTvShowsKey] = useState();
  let tvShowsData = async () => {
    let tvShows = await axios.get(
      "https://disneyhotstar0.herokuapp.com/users/get-all-tv-shows"
    );
    if (tvShows.data.result) {
        setIsLoading(false)
      setAllTvShows(tvShows?.data?.result);
      setTvShowsKey(tvShows?.data?.result[0]?.moviesOrTv);
    }
  };
  useEffect(() => {
    tvShowsData();
  }, []);

  let addWatchListData = async (e) => {
    await axios.post(
      "https://disneyhotstar0.herokuapp.com/users/post-add-watch-list",
      e
    );
  };
  let [isLoading, setIsLoading] = useState(true);
  return (
    <>
      <HeaderBar></HeaderBar>
      {isLoading ? (
        <>
          <div
            style={{ height: "100vh" }}
            className="d-flex flex-row justify-content-center align-items-center"
          >
            <div className="loader"></div>
          </div>
        </>
      ) : (
        <>
          <div
            className="container-fluid text-white p-5"
            style={{ marginTop: "50px" }}
          >
            <div>
              <h3>{allTvShowsKey}</h3>
            </div>
            <hr />
            <div className="findTheCategory">
              {allTvShows?.map((e, i) => {
                return (
                  <div className="mt-4 hover-effect" key={i}>
                    <Link to={`/video-details/` + e.keyName}>
                      <img
                        style={{ borderRadius: "10px" }}
                        className="carousels-items image"
                        src={e.img}
                        width="100%"
                        height="100%"
                        alt={e.name}
                      />
                    </Link>
                    <div className="middle">
                      <span>{e.name}</span>
                      <br />
                      <Button
                        variant="white"
                        onClick={() => {
                          addWatchListData(e);
                        }}
                        className="shadow-none text-white"
                      >
                        <AddIcon />
                        <span className="text-white">Watch List</span>
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default TvShows;
