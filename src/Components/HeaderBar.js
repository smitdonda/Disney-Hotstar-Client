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
      "https://disneyhotstar0.herokuapp.com/users/get-all-movies"
    );
    setAllMoviesKey(movies?.data?.result[0]?.key);
  };

  let [allTvShowsKey, setTvShowsKey] = useState();
  let tvShowsData = async () => {
    let tvShows = await axios.get(
      "https://disneyhotstar0.herokuapp.com/users/get-all-tv-shows"
    );
    setTvShowsKey(tvShows?.data?.result[0]?.key);
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
    navigate("/search");
    let search = await axios.post(
      "https://disneyhotstar0.herokuapp.com/users/post-search-name/",
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
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" navbarScroll>
              <Nav.Item>
                <Nav.Link onClick={() => navigate("/")}>Home</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href={"/movies-tvshows/" + allMovieskey}>
                  Movies
                </Nav.Link>
              </Nav.Item>
              <Nav.Link href={"/movies-tvshows/" + allTvShowsKey}>Tv</Nav.Link>
              <Nav.Link
                onClick={() => {
                  navigate("/watch-list");
                }}
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
              />
            </Form>
            <Nav.Link href="/subscribe" className="text-uppercase">
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
                    to="/login"
                    className="text-white mr-2 description "
                    size="sm"
                  >
                    <LoginIcon />
                    &nbsp;Login
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
