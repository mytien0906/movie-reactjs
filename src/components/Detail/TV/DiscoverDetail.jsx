import React, { useState, useEffect } from "react";
import {
    fetchTVDetail,
    fetchTVVideos,
    fetchTVCredits,
    fetchSessionTV,
    fetchTVRecommendations,
    fetchSimilarTV,

} from "../../../server";
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
import { Modal } from "react-bootstrap";
import ReactPlayer from "react-player";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
import "../../home/Aminition/Home.css";
import dateFormat from 'dateformat';
import "../../Detail/Movie/MovieDetail.css"
export function DiscoverDetail({ match }) {
    let params = match.params;
    let genres = [];
    const [isOpen, setIsOpen] = useState(false);
    const [detail, setDetail] = useState([]);
    const [video, setVideo] = useState([]);
    const [credits, setCredits] = useState([]);
    const [sessionTV, setSession] = useState([]);
    const [Recommendations, setRecommendations] = useState([]);
    const [SimilarTV, setSimilar] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setDetail(await fetchTVDetail(params.id));
            setVideo(await fetchTVVideos(params.id));
            setCredits(await fetchTVCredits(params.id));
            setSession(await fetchSessionTV(params.id));
            setRecommendations(await fetchTVRecommendations(params.id));
            setSimilar(await fetchSimilarTV(params.id));
        };
        fetchAPI();
    }, [params.id]);


    genres = detail.genres;
    const MoviePalyerModal = (props) => {
        const youtubeUrl = "https://www.youtube.com/watch?v=";

        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title
                        id="contained-modal-title-vcenter"
                        style={{ color: "#000000", fontWeight: "bolder" }}
                    >
                        {detail.name} Trailer
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: "#000000" }}>
                    <ReactPlayer
                        className="container-fluid"
                        url={youtubeUrl + video.key}
                        playing
                        width="100%"
                    ></ReactPlayer>
                </Modal.Body>
            </Modal>
        );


    };

    let genresList;
    if (genres) {
        genresList = genres.map((g, i) => {
            return (
                <li className="list-inline-item" key={i}>
                    <button type="button" className="btn btn-outline-info">
                        {g.name}
                    </button>
                </li>
            );
        });
    }

    const listCredits = credits.slice(0, 20).map((c, i) => {
        return (
            <div className="col-md-2 text-center" key={i}>
                <Link to={`/person/${c.id}`}>
                    <img
                        className="img-person"
                        src={c.img}
                        alt={c.name}
                    />
                </Link>
                <p className="font-weight-bold text-center">{c.name}</p>
                <p
                    className="font-weight-light text-center"
                    style={{ color: "#5a606b" }}
                >
                    {c.character}
                </p>
            </div>
        );
    });

    // Phan hien tai
    const listSession = sessionTV.slice(0, 1).map((c, i) => {
        return (
            <div className="row">
                <div className="col-md-3">
                    <div className="text" key={i}>
                        <Link to={`/tv/${c.id}`}>
                            <img
                                className="img-session"
                                src={c.img}
                                alt={c.name}
                            />
                        </Link>

                    </div>
                </div>
                <div className="col-md-6">

                    <div className="title-session">
                        <h5>{c.name}</h5>
                        Năm {c.date} | Tập {c.episode_count}
                        <p>
                            {c.name} của {detail.name} được công chiếu ngày {dateFormat(c.date)}
                        </p>
                        <a href={`/session/${detail.id}/seasons`} className="animated-button">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            SHOW ALL
                        </a>
                    </div>

                </div>
                <div className="col-md-3">


                </div>
            </div>
        );
    });
    // Danh sách khuyến nghị
    const listRecommendations = Recommendations.slice(0, 24).map((c, index) => {
        return (
            <div className="col-md-2 pogss" key={index}>

                <Link to={`/tv/${c.id}`}>
                    <img
                        className="img-Recommendations"
                        src={c.backdrop}
                        alt={c.name}

                    />
                </Link>
                <div className="name">
                    <p>{c.name}</p>
                    <p>
                        {c.vote_average} %
                    </p>
                </div>
                <div className="overlay-Recommendations">
                    <div className="name2">
                        {c.first_air_date}
                    </div>
                    <div className="icon">
                        <span>
                            <i className="fa fa-star" aria-hidden="true"></i>
                        </span>
                        <span>
                            <i className="fa fa-heart" aria-hidden="true"></i>
                        </span>
                        <span>
                            <i className="fa fa-share-alt" aria-hidden="true"></i>
                        </span>
                    </div>
                </div>
            </div>
        );
    });

    const listSimilar = SimilarTV.slice(0, 40).map((value, i) => {
        return (
            <div className="col-md-2 text-center" key={i}>
                <Link to={`/tv/${value.id}`}>
                    <img
                        className="img-person"
                        src={value.poster}
                        alt={value.name}
                    />
                </Link>
                <p className="font-weight-bold text-center">{value.title}</p>
                <p
                    className="font-weight-light text-center"
                    style={{ color: "#5a606b" }}
                >

                </p>
            </div>
        );
    });
    return (
        <div className="main-container">

            <div className="hearder">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <nav>
                                <ul className="menu">
                                    <li className="nav-hover"><a href="/">Home</a></li>
                                    <li className="nav-hover"><a href="/discover/tv">TV Shows</a></li>
                                </ul>
                            </nav>
                        </div>

                    </div>
                </div>
            </div>

            {/* Chi tiết phim */}
            <div className="movie-trailer">
                <div className="container">
                    <div className="transformers-box">
                        <div className="row desc-film">
                            <div className="col-lg-5">
                                <div className="transformers-content">
                                    <MoviePalyerModal
                                        show={isOpen}
                                        onHide={() => {
                                            setIsOpen(false);
                                        }}
                                    ></MoviePalyerModal>

                                    <div className="text-center" style={{ width: "100%" }}>
                                        <img
                                            className="img-fluid"
                                            src={`http://image.tmdb.org/t/p/original/${detail.poster_path}`}
                                            alt={detail.name}
                                        ></img>
                                        <div className="carousel-center">
                                            <i
                                                onClick={() => setIsOpen(true)}
                                                className="far fa-play-circle"
                                                style={{ fontSize: 95, color: "#f4c10f", cursor: "pointer" }}
                                            ></i>
                                        </div>
                                        <div
                                            className="carousel-caption"
                                            style={{ textAlign: "center", fontSize: 40 }}
                                        >
                                            {detail.name}
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="col-lg-6">
                                <div className="transformers-content">
                                    <h2>{detail.original_title}</h2>
                                    <ul className="list-inline">{genresList}</ul>
                                    <ul>
                                        <li>
                                            <div className="transformers-left">
                                                Rating:
                                            </div>
                                            <div className="transformers-right">
                                                <ReactStars
                                                    count={detail.vote_average}
                                                    size={20}
                                                    color1={"#f4c10f"}
                                                ></ReactStars>
                                            </div>
                                        </li>

                                        <li>
                                            <div className="transformers-left">
                                                Thống kê đánh giá:
                                            </div>
                                            <div className="transformers-right">
                                                {detail.vote_count} đánh giá
                                            </div>
                                        </li>
                                        <li>
                                            <div className="transformers-left">
                                                Ngày phát hành:
                                            </div>
                                            <div className="transformers-right">
                                                {dateFormat(detail.release_date)}
                                            </div>
                                        </li>
                                        <li>
                                            <div className="transformers-left">
                                                Thời lượng:
                                            </div>
                                            <div className="transformers-right">
                                                {detail.runtime} phút
                                            </div>
                                        </li>
                                        <li>
                                            <div className="details-content">
                                                <div className="details-overview">
                                                    <h2>Chi tiết phim</h2>
                                                    <p>{detail.overview}</p>
                                                </div>

                                            </div>
                                        </li>
                                    </ul>

                                </div>
                            </div>
                        </div>
                        <div className="details-reply">
                            <h2>Bình luận</h2>
                            <form action="#">
                                <div className="row">
                                    <div className="col-lg-4">
                                        <div className="select-container">
                                            <input type="text" placeholder="Tên đăng nhập" />
                                            <i className="icofont icofont-ui-user" />
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="select-container">
                                            <input type="text" placeholder="Email" />
                                            <i className="icofont icofont-envelope" />
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="select-container">
                                            <input type="text" placeholder="Số điện thoại" />
                                            <i className="icofont icofont-phone" />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="textarea-container">
                                            <textarea placeholder="Nhập bình luận" defaultValue={""} />
                                            <button><i className="icofont icofont-send-mail" /></button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="details-comment">
                            <a className="theme-btn theme-btn2" href="#">Đăng bình luận</a>
                        </div>
                        <div className="details-thumb">
                            <div className="details-thumb-prev">
                                <div className="thumb-icon">
                                    <i className="icofont icofont-simple-left" />
                                </div>
                                <div className="thumb-text">
                                    <h4>Previous Post</h4>
                                    <p>Standard Post With Gallery</p>
                                </div>
                            </div>
                            <div className="details-thumb-next">
                                <div className="thumb-text">
                                    <h4>Next Post</h4>
                                    <p>Standard Post With Preview Image</p>
                                </div>
                                <div className="thumb-icon">
                                    <i className="icofont icofont-simple-right" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Danh sách tác giả */}

            <div className="person-list">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="person">
                                <p style={{ color: "white", fontWeight: "bolder", margin: "20px auto" }}>Diễn viên</p>
                                <div className="knowwn">
                                    <div className="row">
                                        <div className="list-person list-sroll">
                                            {listCredits}
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            {/* Danh sách khuyến nghị */}
            <div className="recommendations-list">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="recommendations">
                                <p style={{ color: "white", fontWeight: "bolder", margin: "20px auto" }}>Danh sách khuyến nghị</p>
                                <div className="knowwn">
                                    <div className="row">
                                        <div className="list-recommendations list-sroll hover-recommend">
                                            {listRecommendations}
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
           
            {/* Footer */}
            <div className="footer">
                <hr className="mt-5" style={{ borderTop: "5px solid #5a606b" }}></hr>
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 col-sm-6">
                            <h3>ABOUT ME</h3>
                            <p>
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Animi
                                error earum perspiciatis praesentium sint ipsum provident blanditiis
                                pariatur necessitatibus voluptas, cum, atque iste eligendi autem,
                                culpa cupiditate placeat facilis repellat.
                            </p>
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
                        <div className="col-md-4 col-sm-6">
                            <h3>KEEP IN TOUCH</h3>
                            <ul className="list-unstyled">
                                <li>
                                    <p>
                                        <strong>
                                            <i className="fas fa-map-marker-alt"></i> Address:
                                        </strong>{" "}
                                        HoChiMinh , city
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <strong>
                                            <i className="fas fa-map-marker-alt"></i> Phone:
                                        </strong>{" "}
                                        +8439461842
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <strong>
                                            <i className="fas fa-envelope"></i> Email:
                                        </strong>{" "}
                                        ngoctam2303001@gmail.com
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}