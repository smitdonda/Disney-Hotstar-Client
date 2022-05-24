import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "react-bootstrap";
import HeaderBar from "../Components/HeaderBar";
import AddIcon from "@mui/icons-material/Add";

function VideoPlayer() {
  let { id } = useParams();
  let [seletetedData, setSeletetData] = useState();
  // seleteted-moviesandtvshow-details
  let getData = async () => {
    let data = await axios.get(
      "https://disneyhotstar0.herokuapp.com/users/seleteted-moviesandtvshow-player/" + id
    );
    setSeletetData(data.data.result);
  };

  useEffect(() => {
    getData();
  }, []);
  let addWatchListData = async (e) => {
    await axios.post("https://disneyhotstar0.herokuapp.com/users/post-add-watch-list", e);
  };
  return (
    <>
      <HeaderBar></HeaderBar>
      <div
        className="container-fluid text-white p-5"
        style={{ marginTop: "60px" }}
      >
        {/* <ReactPlayer url="https://youtu.be/aWzlQ2N6qqg" controls="true" /> */}
        {seletetedData?.map((e, i) => {
          return (
            <div>
              <div className="player-wrapper">
                <ReactPlayer
                  url={e.trailer}
                  controls="true"
                  className="react-player"
                  playingcontainer-fluid
                  text-white
                  p-5
                  width="100%"
                  height="100%"
                />
              </div>
              <div className="container-fluid text-white p-5">
                <div>
                  <h3>{e.name}</h3>
                </div>
                <div>
                  <p>{e.description}</p>
                  <div className="">
                    <p>
                      {e.duration || e.seasons}&nbsp;&#8226;&nbsp;
                      {e.episodes ? e.episodes : null}&nbsp;&#8226;&nbsp;
                      {e.genre}
                      &nbsp;&#8226;&nbsp;{e.year}&nbsp;&#8226;&nbsp;
                      {e.language}
                    </p>
                    <Button
                      variant="white"
                      onClick={() => {
                        addWatchListData(e);
                      }}
                      className="shadow-none text-white "
                    >
                      <AddIcon style={{ fontSize: "40px" }} />
                      <br />
                      <span className="text-white">Watch List</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default VideoPlayer;
