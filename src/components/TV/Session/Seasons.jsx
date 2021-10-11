import React, { useState, useEffect } from "react";
import {
    fetchTVDetail,
    fetchSessionTV,
} from "../../../service";
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
import { Link } from "react-router-dom";
import "../../TV/Style.css";
import dateFormat from 'dateformat';
import "../Session/Seasons.css";
export function Seasons({ match }) {

    let params = match.params;
    const [Seasions, setSession] = useState([]);
    const [detail, setDetail] = useState([]);
    useEffect(() => {
        const fetchAPI = async () => {
            setDetail(await fetchTVDetail(params.id));
            setSession(await fetchSessionTV(params.id));
        };
        fetchAPI();
    }, []);


    // Danh sách phát sóng mới nhất
    const listSession = Seasions.slice(0, 20).map((c, i) => {
        return (
            <div className="Session">
                <div className="row">
                    <div className="col-md-3">
                        <div className="text" key={i}>
                            <div className="left"></div>
                            <div className="right"></div>
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

                        <div className="title-session-2">
                            <h5>{c.name}</h5>
                            Năm {c.date} | Tập {c.episode_count}
                            <p>
                                {c.name} của {detail.name} được công chiếu ngày {dateFormat(c.date)}
                            </p>
                        </div>

                    </div>
                    <div className="col-md-3">

                    </div>
                </div>
            </div>

        );
    });



    return (

        <div className="main-container">
            {/* Hearder */}
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <nav>
                            <ul className="menu">
                                <li className="nav-hover"><a href="/">Home</a></li>
                                <li className="nav-hover"><a href="/trending/all/day">Trending</a></li>
                                <li className="nav-hover"><a href="/discover/tv">TV Shows</a></li>
                                <li className="nav-hover"><a href="/people/popular">People</a></li>
                                <li className="nav-hover"><a href="/search">Search</a></li>
                            </ul>
                        </nav>
                    </div>

                </div>
            </div>

            <div className="baner-seasons">
                <div className="container">
                    <div className="row">
                        <div className="col-md-2">
                            <div className="baner-center-images">
                                <img src={`https://image.tmdb.org/t/p/w200/${detail.poster_path}`} className="img-seasons" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="title-name-tv">
                                <h3 style={{ color: "black", margin: "30px auto", fontFamily: "-webkit-pictograph", fontWeight: "bold" }}>{detail.name}</h3>
                            </div>
                            <div className="back-icon">
                                <a href={`/tv/${detail.id}/`} style={{ color: "black", fontSize: 15 }}>
                                    <i class="fa fa-backward" aria-hidden="true" style={{ fontSize: 10 }}></i>
                                    <span style={{ margin: 10 }}>Quay lại</span>
                                </a>

                            </div>
                        </div>
                        <div className="col-md-4">

                        </div>
                    </div>
                </div>
            </div>


            <div className="seasons-list">
                <div className="container">


                    {listSession}


                </div>


            </div>




            <div className="footer-main">
                <hr className="mt-5" style={{ borderTop: "10px solid #5a606b" }}></hr>
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 col-sm-6" style={{ color: "#5a606b" }}>
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


                        <div className="col-md-4 col-sm-6" style={{ color: "#5a606b" }}>
                            <h3>KEEP IN TOUCH</h3>
                            <ul className="list-unstyled">
                                <li>
                                    <p>
                                        <strong>
                                            <i className="fas fa-map-marker-alt"></i> Address:
                                        </strong>{" "}
                                        HoChiMinh city
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <strong>
                                            <i className="fas fa-map-marker-alt"></i> Phone:
                                        </strong>{" "}
                                        +84939461842
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
