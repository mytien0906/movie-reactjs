import React, { useState, useEffect } from "react";
import {
  fetchMovies,
  fetchGenre,
  fetchMovieByGenre,
  fetchPersons,
  fetchTopratedMovie,

} from "../../server";
import RBCarousel from "react-bootstrap-carousel";
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
import './Aminition/Home.css';
import { Link } from "react-router-dom";
export function Home() {
  const [nowPlaying, setNowPlaying] = useState([]);
  const [genres, setGenres] = useState([]);
  const [movieByGenre, setMovieByGenre] = useState([]);
  const [persons, setPersons] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [video] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setNowPlaying(await fetchMovies());
      setGenres(await fetchGenre());
      setMovieByGenre(await fetchMovieByGenre(28));
      setPersons(await fetchPersons());
      setTopRated(await fetchTopratedMovie());
    };
    fetchAPI();
  }, []);

  const handleGenreClick = async (genre_ids) => {
    setMovieByGenre(await fetchMovieByGenre(genre_ids));
  };


  const movies = nowPlaying.slice(0, 20).map((item, index) => {
    const youtubeUrl = "https://www.youtube.com/watch?v=";
    return (
      <div style={{ height: 500, width: "100%" }} key={index}>
        <div className="carousel-center">
          <img style={{ height: 600 }} src={item.backPoster} alt={item.title} />
        </div>
        <div className="carousel-center">
          <a href={youtubeUrl + video.key}>
            <i
              className="far fa-play-circle"
              style={{ fontSize: 95, color: "#f4c10f" }}
            ></i>
          </a>

        </div>
        <div
          className="carousel-caption"
          style={{ textAlign: "center", fontSize: 35 }}
        >
          <h1> {item.title} </h1>
        </div>
      </div>
    );
  });

  const genreList = genres.map((item, index) => {
    return (
      <nav className="link-effect-1">
        <div className="Link-hover" key={index} onClick={() => {
          handleGenreClick(item.id);
        }}><span data-hover={item.name}> {item.name}</span></div>
      </nav>
    );
  });


  const movieList = movieByGenre.slice(0, 30).map((value, i) => {
    return (
      <div className="col-md-2 col-sm-6" key={i}>
        <div className="card-img">
          <Link to={`/movie/${value.id}`}>
            <img className="img-fluids" src={value.poster} alt={value.title}></img>
          </Link>
          <a class="info" href={`/movie/${value.id}`}>Xem</a>
        </div>
        <div className="title-movie">
          {value.title}

        </div>

      </div>
    );
  });
  const trendingPersons = persons.slice(0, 50).map((p, i) => {
    return (
      <div className="col-md-2 text-center" key={i}>
        <Link to={`/person/${p.id}`}>
          <img
            className="img-person"
            src={p.profileImg}
            alt={p.name}

          />
        </Link>

        <p className="font-weight-bold text-center">{p.name}</p>
        <p
          className="font-weight-light text-center"
          style={{ color: "#5a606b" }}
        >
          Trending for {p.known}
        </p>
      </div>
    );
  });
  // Các phim được đánh giá cao nhất 
  const topRatedList = topRated.slice(0, 30).map((item, index) => {
    return (
      <div className="col-md-2" key={index}>
        <div className="card-img">
          <Link to={`/movie/${item.id}`}>
            <img className="img-fluids" src={item.poster} alt={item.title}></img>
          </Link>
        </div>
        <div className="mt-3">
          <p style={{ fontWeight: "bolder" , textAlign: "center" }}>{item.title}</p>
          <p style={{textAlign: "center" }}>Rated: {item.rating}</p>
          {/* <ReactStars
            count={item.rating}
            size={20}
            color1={"#f4c10f"}
          ></ReactStars> */}
        </div>
      </div>
    );
  });
  // Lấy các tấm hình:
  const images = movieByGenre.slice(0, 12).map((i) => {
    return (
      <img src={i.poster} alt={i.title} className="pic" />
    );
  });

  return (

    <div className="main-container">
      <div className="header">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <nav>
                <ul className="menu">
                  <li className="nav-hover"><a href="/">Home</a></li>

                </ul>
              </nav>
            </div>
          </div>
        </div>

        <div className="baner-header">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="text-effect">
                  <h1 className="neon" data-text="THE MOVIE">THE MOVIE</h1>
                  <div className="gradient"></div>
                  <div className="spotlight"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="baner-movie">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <RBCarousel
                autoplay={true}
                pauseOnVisibility={true}
                slidesshowSpeed={5000}
                version={4}
                indicators={false}
              >
                {movies}
              </RBCarousel>
            </div>
          </div>
        </div>
      </div>
      {/* Thể loại phim */}
      <div className="genre-list">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div id="content">
                <section className="links">
                  {genreList}
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Danh sách phim */}
      <div className="list-movie">
        <div className="container">
          <div className="row">

            <div className="col-md-12">
              <div className="list-movie">
                <div className="row mt-3">{movieList}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Xu hướng phim */}

      <div className="person-list">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="person">
                <p className="font-weight-bold-1  line-1" style={{ color: "white", paddingTop: 30 }}>
                  <a href="#" className="hover-trending">NHỮNG DIỄN VIÊN</a> XU HƯỚNG TRONG TUẦN
                </p>
                <div className="knowwn">
                  <div className="row">
                    <div className="list-person list-sroll">
                      {trendingPersons}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Phim có đánh giá cao nhất */}

      <div className="top-rate">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <p className="font-weight-bold-1  line-1" style={{ color: "white" }}>
                <a href="#" className="hover-trending"> TOP PHIM ĐƯỢC ĐÁNH GIÁ CAO</a>
              </p>
              <div className="knowwn">
                <div className="row">
                  <div className="list-person list-sroll">
                    {topRatedList}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr className="mt-5" style={{ border: "1px solid #5a606b" }}></hr>
      <div className="footer-container">

        <div className="container">


          <div className="row">
            <div className="bg"></div>
            <div className="bg bg2"></div>
            <div className="bg bg3"></div>
            <div className="col-md-5 col-sm-6" style={{ color: "#5a606b" }}>
              <h3>THÔNG TIN</h3>
              
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus,
                perspiciatis? Numquam, enim illo voluptatum neque facere aut sed ut
                dolore nihil? Nulla sit, recusandae ea tenetur rerum deserunt sequi
                earum?
              </p>
              <div className="button">
                <div className="icon">
                  <i className="fab fa-facebook"></i>
                </div>
                <span>Facebook</span>
              </div>
              <div className="button">
                <div className="icon">
                  <i className="fab fa-instagram"></i>
                </div>
                <span>Instagram</span>
              </div>
              <div className="button">
                <div className="icon">

                  <i className="fab fa-twitter"></i>
                </div>
                <span>Twitter</span>
              </div>

              <div className="button">
                <div className="icon">
                  <i className="fab fa-youtube"></i>
                </div>
                <span>Youtube</span>
              </div>
            </div>
            <div className="col-md-7 col-sm-6" style={{ color: "#5a606b" }}>
              <div className="main-top">
                <div className="container">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="bg-blog">
                        <div className="pic-ctn bore">
                          {images}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>



    </div>
  );
}
