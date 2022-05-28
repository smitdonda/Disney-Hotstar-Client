import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import AddIcon from "@mui/icons-material/Add";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import axios from "axios";
import HeaderBar from "../Components/HeaderBar";

function VideoPlayerDetails() {
  let { id } = useParams();
  let [seletetedData, setSeletetData] = useState();
  // seleteted-moviesandtvshow-details
  let getData = async () => {
    let data = await axios.get(
      "https://disneyhotstar0.herokuapp.com/users/seleteted-moviesandtvshow-details/" + id
    );
    setSeletetData(data.data.result);
  };

  let addWatchListData = async (e) => {
    await axios.post("https://disneyhotstar0.herokuapp.com/users/post-add-watch-list", e);
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <HeaderBar></HeaderBar>
      <div
        className="container-fluid text-white p-5"
        style={{ marginTop: "60px" }}
      >
        {seletetedData?.map((e, i) => {
          return (
            <div key={i}>
              <div
                className="trailer-details p-4"
                style={{ borderRadius: "10px" }}
              >
                <div className="col p-5">
                  <div>
                    <div>
                      <h3>{e.name}</h3>
                    </div>
                    <div>
                      <Link
                        to={`/watch-trailers/` + e._id}
                        className="text-decoration-none text-white"
                      >
                        <p>{e.description}</p>
                        <div className="">
                          <p>
                            {e.duration || e.seasons}&nbsp;&#8226;&nbsp;
                            {e.episodes ? e.episodes : null}&nbsp;&#8226;&nbsp;
                            {e.genre}
                            &nbsp;&#8226;&nbsp;{e.year}&nbsp;&#8226;&nbsp;
                            {e.language}
                          </p>
                        </div>
                      </Link>
                      <div>
                        <Link
                          to={`/watch-trailers/` + e._id}
                          className="text-decoration-none text-white"
                        >
                          <Button
                            size="lg"
                            className="text-white shadow-none  text-right"
                            variant="white"
                          >
                            <PlayArrowIcon style={{ fontSize: "40px" }} />
                            &nbsp;Watch Now
                          </Button>
                        </Link>
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
                <div className="text-center col">
                  <Link to={`/watch-trailers/` + e._id}>
                    <img
                      className="trailer-img"
                      src={e.img}
                      alt={e.name}
                      width="100%"
                      height="100%"
                      style={{ borderRadius: "10px" }}
                    />
                  </Link>
                </div>
              </div>
              <div className="mt-5 text-white mb-5">
                <div>
                  <h4>Trailers</h4>
                </div>
                <hr />
                <div className="findTheCategory">
                  <div className="hover-effect">
                    <Link to={`/watch-trailers/` + e._id}>
                      <img
                        style={{ borderRadius: "10px" }}
                        src={e.img}
                        alt={e.name}
                        width={300}
                        className="image"
                      />
                    </Link>
                    <div className="middle">
                      <Button
                        size="sm"
                        className="text-white shadow-none col text-right"
                        variant="white"
                      >
                        <PlayArrowIcon />
                        &nbsp;Watch Now
                      </Button>
                      <Button
                        variant="white"
                        onClick={() => {
                          addWatchListData(e);
                        }}
                        className="shadow-none text-white col"
                      >
                        <AddIcon />
                        <span className="text-white">Watch List</span>
                      </Button>
                    </div>
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
export default VideoPlayerDetails;
