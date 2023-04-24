import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import AddIcon from "@mui/icons-material/Add";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import HeaderBar from "../Components/HeaderBar";

function MoviesTvShows() {
  let { id } = useParams();
  let [isLoading, setIsLoading] = useState(true);

  // find the seleted category all data
  let [findTheCategory, setFindTheCategory] = useState();

  let [categoryName, setCategoryName] = useState();
  let latestData = async () => {
    let data = await axios.get(
      "https://disney-hotstar-server.vercel.app/users/get-find-the-category/" +
        id
    );
    setFindTheCategory(data.data.result);
    if (id === "latestandtrending") {
      setCategoryName(data?.data?.result[1]?.categoryOfShow);
    } else if (id === "movies" || id === "tvshowes") {
      setCategoryName(data?.data?.result[0]?.moviesOrTv);
    } else {
      setCategoryName(data?.data?.result[0]?.categoryOfShow);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    latestData();
  }, []);

  let addWatchListData = async (e) => {
    await axios.post(
      "https://disney-hotstar-server.vercel.app/users/post-add-watch-list",
      e
    );
  };
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
              <h3>{categoryName}</h3>
            </div>
            <hr />
            <div className="findTheCategory">
              {findTheCategory?.map((e, i) => {
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

export default MoviesTvShows;
