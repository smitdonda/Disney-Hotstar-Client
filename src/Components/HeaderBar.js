import React, { useState, useEffect, useContext } from "react";
import { Container, Navbar, Nav, Form, FormControl } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { HotstarContext } from "../App";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";

function HeaderBar() {
  let context = useContext(HotstarContext);

  let navigate = useNavigate();

  let [allMovieskey, setAllMoviesKey] = useState();
  let moviesData = async () => {
    let movies = await axios.get(
      "https://disney-hotstar-server.vercel.app/users/get-all-movies"
    );
    if (movies?.data?.result) {
      setAllMoviesKey(movies?.data?.result[0]?.key);
    }
  };

  let [allTvShowsKey, setTvShowsKey] = useState();
  let tvShowsData = async () => {
    let tvShows = await axios.get(
      "https://disney-hotstar-server.vercel.app/users/get-all-tv-shows"
    );
    if (tvShows.data.result) {
      setTvShowsKey(tvShows?.data?.result[0]?.key);
    }
  };
  useEffect(() => {
    moviesData();
    tvShowsData();
  }, []);

  var token = sessionStorage.getItem("token");
  let logOut = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  let searchData = async (e) => {
    context.setSearchName(e.target.value);

    let search = await axios.post(
      "https://disney-hotstar-server.vercel.app/users/post-search-name/",
      { name: context.searchName }
    );
    if (search.data.statusCode === 200) {
      context.setallMoviesOrTvShows(search.data.result);
    }
  };

  return (
    <div>
      <Navbar
        expand="lg"
        fixed="top"
        variant="dark"
        style={{ backgroundColor: "#131a27" }}
      >
        <Container fluid>
          <Navbar.Brand onClick={() => navigate("/")}>
            <img
              src="https://secure-media.hotstarext.com/web-assets/prod/images/brand-logos/disney-hotstar-logo-dark.svg"
              alt="Disnep +hotstar"
            />
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="navbarScroll"
            style={{ fontSize: "18px" }}
          />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0 " navbarScroll>
              <Nav.Link onClick={() => navigate("/")} className="text-white">
                Home
              </Nav.Link>
              <Nav.Link
                onClick={() => navigate("/all-movies/movies")}
                className="text-white"
              >
                Movies
              </Nav.Link>
              <Nav.Link
                onClick={() => navigate("/all-tvshows/tvshowes")}
                className="text-white"
              >
                Tv
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  navigate("/watch-list");
                }}
                className="text-white"
              >
                My Watch List
              </Nav.Link>
            </Nav>
            <Form className="d-flex ">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={(e) => {
                  searchData(e);
                }}
                onClick={() => navigate("/search")}
              />
            </Form>
            <Nav.Link
              onClick={() => navigate("/subscribe")}
              className="btn btn-primary btn-sm text-white text-uppercase"
            >
              Subscribe
            </Nav.Link>
            <Nav.Item>
              {token ? (
                <>
                  <Nav.Link
                    className="description text-white"
                    variant="success"
                    size="sm"
                    onClick={() => {
                      logOut();
                    }}
                  >
                    Logout&nbsp;
                    <LogoutIcon />
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link
                    onClick={() => {
                      navigate("/login");
                    }}
                    className="text-white mr-2 description "
                    size="sm"
                  >
                    <LoginIcon />
                    &nbsp;Login
                  </Nav.Link>
                  <Nav.Link
                    onClick={() => {
                      navigate("/sign-up");
                    }}
                    className="text-white mr-2 description "
                    size="sm"
                  >
                    Sign Up
                  </Nav.Link>
                </>
              )}
            </Nav.Item>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default HeaderBar;
