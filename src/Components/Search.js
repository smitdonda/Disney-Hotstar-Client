import React, { useEffect, useContext } from "react";
import { Button } from "react-bootstrap";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { Link } from "react-router-dom";
import { HotstarContext } from "../App";
import HeaderBar from "../Components/HeaderBar";

function Search() {
  let context = useContext(HotstarContext);

  let getData = async () => {
    let data = await axios.get("https://disneyhotstar0.herokuapp.com/users/getmoviesortv/");
    context.setallMoviesOrTvShows(data.data.result);
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
        <div>
          <h3>Search For&nbsp;{context.searchName}</h3>
        </div>
        <hr />
        <div className="findTheCategory">
          {context?.allMoviesOrTvShows?.length > 0 ? (
            <>
              {context.allMoviesOrTvShows?.map((e, i) => {
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
            </>
          ) : (
            <h2>Result Not Found</h2>
          )}
        </div>
      </div>
    </>
  );
}

export default Search;
