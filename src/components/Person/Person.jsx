import React, { useState, useEffect } from "react";
import {
    fetchPersonDetail,
    fetchTV,
} from "../../server";
import Carousel from "react-bootstrap/Carousel";
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
import { Link } from "react-router-dom";
import "../home/Aminition/Home.css";

export function Person({ match }) {
    let params = match.params;
    const [detail, setDetail] = useState([]);
    const [KnonwnPerson, setKnonwnPerson] = useState([]);
    useEffect(() => {
        const fetchAPI = async () => {
            setDetail(await fetchPersonDetail(params.id));
            setKnonwnPerson(await fetchTV(params.id));
        };
        fetchAPI();
    }, [params.id]);
    // Bộ xử lý
    const KwonList1 = KnonwnPerson.slice(0, 12).map((c, i) => {
        return (
            <div className="col-md-3 col-sm-6" key={i}>
                <div className="card">
                    <Link to={`/movie/${c.id}`}>
                        <img className="img-fluid" src={c.poster} alt={c.title}></img>
                    </Link>
                </div>
                <div className="mt-3">
                    <p style={{ fontWeight: "bolder" }}>{c.title}</p>
                </div>

            </div >

        );
    });

    return (

        <div className="top-header">
            <div className="container">
                <div className="row">
                    <div className="col-md-8">
                        <nav>
                            <ul className="menu">
                                <li className="nav-hover"><a href="/">Home</a></li>
                                <li className="nav-hover"><a href="/trending/all/day">Trending</a></li>
                                <li className="nav-hover"><a href="/discover/tv">TV Shows</a></li>
                                <li className="nav-hover"><a href="/people/popular">People</a></li>
                            </ul>
                        </nav>
                    </div>
                    <div className="col-md-4">
                        <form action="" className="search-bar">
                            <input type="search" name="search" pattern=".*\S.*" required />
                            <button type="submit" className="search-btn">
                                <span>Search</span>
                            </button>
                        </form>
                    </div>

                </div>



                <div className="detail-pofile">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="cards">
                                <div className="images-person">
                                    <img className="face img-detail" src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${detail.profile_path}`} alt={detail.tit} />
                                </div>
                                <div className="face back"></div>
                            </div>

                        </div>
                        <div className="col-md-8">
                            <div className="profile-name">
                                <h4>
                                    {detail.name}
                                </h4>
                            </div>
                            <p className='person-text-color'>Tiểu sử : </p>
                            <div className="biography">
                                <div className="panel">
                                    {detail.biography}
                                </div>
                            </div>
                            <div className="Birthday">
                                <div className='person-text-color'>
                                    Sinh năm :
                                </div>
                                <p>{detail.birthday}</p>
                                <div className="place">
                                    <h6 className='person-text-color'>Nơi sinh : </h6>
                                    <p>{detail.place_of_birth}</p>
                                </div>
                            </div>
                            <p className='person-text-color'>
                                Được biết đến với
                            </p>
                            <div className="list">
                                {KwonList1}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div className="footer">
                <div className="container">
                    <div className="bg"></div>
                    <div className="bg bg2"></div>
                    <div className="bg bg3"></div>
                    <hr className="mt-5" style={{ borderTop: "1px solid #5a606b" }}></hr>

                    <div className="row mt-3 mb-5">
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
                                        city, state, country
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <strong>
                                            <i className="fas fa-map-marker-alt"></i> Phone:
                                        </strong>{" "}
                                        +01 00 00 00
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <strong>
                                            <i className="fas fa-envelope"></i> Email:
                                        </strong>{" "}
                                        info@infomail.com
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
