import React, { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import Carousels from "react-grid-carousel";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import AddIcon from "@mui/icons-material/Add";
import HeaderBar from "../Components/HeaderBar";

function Home() {
  let navigate = useNavigate();
  let chackAuth = async () => {
    let token = sessionStorage.getItem("token");
    if (token) {
      let config = {
        headers: {
          token: token,
        },
      };
      // auth post method
      let res = await axios.post(
        "https://disney-hotstar-server.vercel.app/users/auth",
        { purpose: "validate access" },
        config
      );
      if (res.data.statusCode !== 200) {
        sessionStorage.clear();
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  };
  useEffect(() => {
    chackAuth();
  }, []);

  let [latestAndTrending, setLatestAndTrending] = useState();
  var [latestAndTrendingkey, setLatestAndTrendingkey] = useState();
  let latestData = async () => {
    let latest = await axios.get(
      "https://disney-hotstar-server.vercel.app/users/get-latest-and-Trending"
    );
    setLatestAndTrending(latest.data.result);
    for (let i = 0; i < latest.data.result.length; i++) {
      if (latest.data.result[i].categoryKey === "latestandtrending") {
        setLatestAndTrendingkey(latest?.data?.result[i]?.categoryKey);
      }
    }
  };

  let [showsRecommendedForYou, setshowsRecommendedForYou] = useState();
  let [showsRecommended, setShowsRecommended] = useState();
  let recommendedData = async () => {
    let movies = await axios.get(
      "https://disney-hotstar-server.vercel.app/users/get-shows-recommended-for-you"
    );
    setshowsRecommendedForYou(movies.data.result);
    setShowsRecommended(movies?.data?.result[0]?.categoryKey);
  };

  let [hotstarSpecials, setHotstarSpecials] = useState();
  let [hotstarSpecialskey, setHotstarSpecialsKey] = useState();
  let hotstarSpecialsData = async () => {
    let movies = await axios.get(
      "https://disney-hotstar-server.vercel.app/users/get-hotstar-specials"
    );
    setHotstarSpecials(movies.data.result);
    setHotstarSpecialsKey(movies?.data?.result[0]?.categoryKey);
  };

  // find the all movies in the
  let [allMovies, setAllMovies] = useState();
  let [allMovieskey, setAllMoviesKey] = useState();
  let moviesData = async () => {
    let movies = await axios.get(
      "https://disney-hotstar-server.vercel.app/users/get-all-movies"
    );
    setAllMovies(movies.data.result);
    setAllMoviesKey(movies?.data?.result[0]?.key);
  };

  let [allTvShows, setTvShows] = useState();
  let [allTvShowsKey, setTvShowsKey] = useState();
  let tvShowsData = async () => {
    let tvShows = await axios.get(
      "https://disney-hotstar-server.vercel.app/users/get-all-tv-shows"
    );
    setTvShows(tvShows.data.result);
    setTvShowsKey(tvShows?.data?.result[0]?.key);
  };
  let addWatchListData = async (id) => {
    await axios.post(
      "https://disney-hotstar-server.vercel.app/users/post-add-watch-list",
      id
    );
  };

  useEffect(() => {
    latestData();
    recommendedData();
    hotstarSpecialsData();
    moviesData();
    tvShowsData();
  }, []);

  return (
    <>
      <HeaderBar></HeaderBar>
      <div
        className="container-fluid text-white p-5"
        style={{ marginTop: "50px" }}
      >
        <div className="mt-2">
          <Carousel>
            <Carousel.Item interval={1000}>
              <img
                className="d-block carousels-img"
                width="100%"
                height="500px"
                src="https://img1.hotstarext.com/image/upload/f_auto,t_web_m_1x/sources/r1/cms/prod/58/1230058-h-7816f2698264"
                alt="Sories of the Next Page"
              />
            </Carousel.Item>
            <Carousel.Item interval={1000}>
              <img
                className="d-block carousels-img"
                width="100%"
                height="500px"
                src="https://img1.hotstarext.com/image/upload/f_auto,t_web_m_1x/sources/r1/cms/prod/63/1240063-h-7486fc528a81"
                alt="Civil Servant"
              />
            </Carousel.Item>
            <Carousel.Item interval={2000}>
              <img
                className="d-block carousels-img"
                width="100%"
                height="500px"
                src="https://img1.hotstarext.com/image/upload/f_auto,t_web_m_1x/sources/r1/cms/prod/3393/1233393-h-4730f4f9b800"
                alt="Home Shanti"
              />
            </Carousel.Item>
            <Carousel.Item interval={1000}>
              <img
                className="d-block carousels-img"
                width="100%"
                height="500px"
                src="https://img1.hotstarext.com/image/upload/f_auto,t_web_m_1x/sources/r1/cms/prod/5957/1245957-h-db48bb71d8d2"
                alt="Biscut"
              />
            </Carousel.Item>
          </Carousel>
        </div>
        <div className="mt-5">
          <div>
            <div>
              <Link
                to={`/movies-tvshows/` + latestAndTrendingkey}
                className="text-decoration-none text-white"
              >
                <span className="h3">Latest & Trending</span>
              </Link>
              <hr />
            </div>
            <div>
              <Carousels cols={4} rows={1} gap={10} loop>
                {latestAndTrending?.map((l, i) => {
                  return (
                    <Carousels.Item className="carousels-items" key={i}>
                      <div className="text-center hover-effect">
                        <Link to={`/video-details/` + l.keyName}>
                          <img
                            className="image"
                            style={{ borderRadius: "10px" }}
                            src={l.img}
                            width="100%"
                            height="100%"
                            alt={l.name}
                          />
                        </Link>
                        <div className="middle">
                          <span>{l.name}</span>
                          <br />
                          <Button
                            variant="white"
                            onClick={() => {
                              addWatchListData(l);
                            }}
                            className="shadow-none text-white"
                          >
                            <AddIcon />
                            <span className="text-white">Watch List</span>
                          </Button>
                        </div>
                      </div>
                    </Carousels.Item>
                  );
                })}
              </Carousels>
            </div>
          </div>
          <div className="mt-4">
            <div>
              <Link
                to={`/movies-tvshows/` + showsRecommended}
                className="text-decoration-none text-white"
              >
                <span className="h3">Shows Recommended For You</span>
              </Link>
              <hr />
            </div>
            <div>
              <Carousels cols={4} rows={1} gap={10} loop>
                {showsRecommendedForYou?.map((s, i) => {
                  return (
                    <Carousels.Item className="carousels-items" key={i}>
                      <div className="text-center hover-effect">
                        <Link to={`/video-details/` + s.keyName}>
                          <img
                            style={{ borderRadius: "10px" }}
                            className="image"
                            src={s.img}
                            width="100%"
                            height="100%"
                            alt={s.name}
                          />
                        </Link>
                        <div className="middle">
                          <span>{s.name}</span>
                          <br />
                          <Button
                            variant="white"
                            onClick={() => {
                              addWatchListData(s);
                            }}
                            className="shadow-none text-white"
                          >
                            <AddIcon />
                            <span className="text-white">Watch List</span>
                          </Button>
                        </div>
                      </div>
                    </Carousels.Item>
                  );
                })}
              </Carousels>
            </div>
          </div>
          <div className="mt-4">
            <div>
              <Link
                to={`/movies-tvshows/` + hotstarSpecialskey}
                className="text-decoration-none text-white"
              >
                <span className="h3">Hotstar Specials</span>
              </Link>
              <hr />
            </div>
            <div>
              <Carousels cols={4} rows={1} gap={15} loop>
                {hotstarSpecials?.map((s, i) => {
                  return (
                    <Carousels.Item className="carousels-items" key={i}>
                      <div className="text-center hover-effect">
                        <Link to={`/video-details/` + s.keyName}>
                          <img
                            className="image"
                            style={{ borderRadius: "10px" }}
                            src={s.img}
                            width="100%"
                            height="100%"
                            alt={s.name}
                          />
                        </Link>
                        <div className="middle">
                          <span>{s.name}</span>
                          <br />
                          <Button
                            variant="white"
                            onClick={() => {
                              addWatchListData(s);
                            }}
                            className="shadow-none text-white"
                          >
                            <AddIcon />
                            <span className="text-white">Watch List</span>
                          </Button>
                        </div>
                      </div>
                    </Carousels.Item>
                  );
                })}
              </Carousels>
            </div>
          </div>
          <div className="mt-4">
            <div>
              <Link
                to={`/movies-tvshows/` + allMovieskey}
                className="text-decoration-none text-white"
              >
                <span className="h3">Popular Movies</span>
              </Link>
              <hr />
            </div>
            <div>
              <Carousels cols={4} rows={1} gap={10} loop>
                {allMovies?.map((m, i) => {
                  return (
                    <Carousels.Item className="carousels-items" key={i}>
                      <div className="text-center hover-effect">
                        <Link to={`/video-details/` + m.keyName}>
                          <img
                            style={{ borderRadius: "10px" }}
                            className="image"
                            src={m.img}
                            width="100%"
                            height="100%"
                            alt={m.name}
                          />
                        </Link>
                        <div className="middle">
                          <span>{m.name}</span>
                          <br />
                          <Button
                            variant="white"
                            onClick={() => {
                              addWatchListData(m);
                            }}
                            className="shadow-none text-white"
                          >
                            <AddIcon />
                            <span className="text-white">Watch List</span>
                          </Button>
                        </div>
                      </div>
                    </Carousels.Item>
                  );
                })}
              </Carousels>
            </div>
          </div>
          <div className="mt-4">
            <div>
              <Link
                to={`/movies-tvshows/` + allTvShowsKey}
                className="text-decoration-none text-white"
              >
                <span className="h3">Popular Tv Shows</span>
              </Link>
              <hr />
            </div>
            <div>
              <Carousels cols={4} rows={1} gap={10} loop>
                {allTvShows?.map((t, i) => {
                  return (
                    <Carousels.Item className="carousels-items" key={i}>
                      <div className="text-center hover-effect">
                        <Link to={`/video-details/` + t.keyName}>
                          <img
                            style={{ borderRadius: "10px" }}
                            className="image"
                            src={t.img}
                            width="100%"
                            height="100%"
                            alt={t.name}
                          />
                        </Link>
                        <div className="middle">
                          <span>{t.name}</span>
                          <br />
                          <Button
                            variant="white"
                            onClick={() => {
                              addWatchListData(t);
                            }}
                            className="shadow-none text-white"
                          >
                            <AddIcon />
                            <span className="text-white">Watch List</span>
                          </Button>
                        </div>
                      </div>
                    </Carousels.Item>
                  );
                })}
              </Carousels>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
