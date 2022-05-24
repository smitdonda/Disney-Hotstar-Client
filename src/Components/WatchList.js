import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import RemoveIcon from "@mui/icons-material/Remove";
import { Link } from "react-router-dom";
import axios from "axios";
import HeaderBar from "../Components/HeaderBar";

function WatchList() {
  let [watchList, setWatchList] = useState();
  let getData = async () => {
    let data = await axios.get(
      "https://disneyhotstar0.herokuapp.com/users/get-add-watch-list"
    );
    setWatchList(data.data.result);
  };
  useEffect(() => {
    getData();
  }, []);

  let removingWatchListData = async (index) => {
    let data = await axios.delete(
      "https://disneyhotstar0.herokuapp.com/users/delete-add-watch-list/" + index
    );
    console.log(data.data);
    if (data.data.statusCode === 200) {
      getData();
    }
  };

  return (
    <>
      <HeaderBar></HeaderBar>
      <div
        className="container-fluid text-white p-5"
        style={{ marginTop: "60px" }}
      >
        <div>
          <h2>Watch List</h2>
        </div>
        <hr />
        <div className="findTheCategory">
          {watchList?.map((e, i) => {
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
                  <Button
                    variant="white"
                    onClick={() => removingWatchListData(e._id)}
                    className="shadow-none text-white"
                  >
                    <RemoveIcon style={{ fontSize: "15px" }} back />
                    &nbsp;Remove WatchList
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default WatchList;
