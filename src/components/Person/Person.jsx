import React, { useState, useEffect } from "react";
import {
    fetchPersonDetail,
    fetchTV,
    fetchPeople,
} from "../../server";

import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
import { Link } from "react-router-dom";
import "../home/Aminition/Home.css";
import { Footer } from "../Footer/Footer";
import InfiniteCarousel from "react-leaf-carousel";

export function Person({ match }) {
    let params = match.params;
    const [detail, setDetail] = useState([]);
    const [KnonwnPerson, setKnonwnPerson] = useState([]);
    const [popularPersonTMDB, setpopularPersonTMDB] = useState([]);
    useEffect(() => {
        const fetchAPI = async () => {
            setDetail(await fetchPersonDetail(params.id));
            setKnonwnPerson(await fetchTV(params.id));
            setpopularPersonTMDB(await fetchPeople());
        };
        fetchAPI();
    }, [params.id]);
    //Những người nỗi tiếng trong TMDB
    const popularPerson = popularPersonTMDB.slice(0, 12).map((item, index) => {
        return (
            <div className="col-md-3 col-sm-6" key={index}>
                <div className="card">
                    <Link to={`/person/${item.id}`}>
                        <img className="img-fluid" src={item.img} alt={item.title}></img>
                    </Link>
                </div>
                <div className="mt-3">
                    <p style={{ fontWeight: "bolder" }}>{item.title}</p>
                    <p style={{ fontWeight: "bolder" }}>{item.popularity}</p>
                </div>

            </div >

        );
    });
    // Bộ xử lý
    const KwonList1 = KnonwnPerson.slice(0, 24).map((c, i) => {
        return (
            <div key={i}>
                <div className="card">
                    <Link to={`/movie/${c.id}`}>
                        <img className="img-fluid" src={c.poster} alt={c.title}></img>
                    </Link>
                </div>
                <div className="mt-3">
                    <p style={{ fontWeight: "bolder" }}>{c.title}</p>
                </div>

            </div >
            // <Link to={`/movie/${c.id}`}>
            //     <img className="img-fluid" src={c.poster} alt={c.title}></img>
            //     <p style={{ fontWeight: "bolder" }}>{c.title}</p>
            // </Link>

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
                            <RLCarousel />

                        </div>
                        <div className="title-popularPersonTMDB">
                            <h2>Người nổi tiếng trong tuần TMDB</h2>
                        </div>
                        <div className="listPopularTMDB">
                            {popularPerson}
                        </div>
                    </div>
                </div>

            </div>
            <div className="footer1">
                <Footer></Footer>
            </div>

        </div>

    );
    function RLCarousel() {
        return (
            <InfiniteCarousel
                breakpoints={[
                    {
                        breakpoint: 200,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    },
                    {
                        breakpoint: 640,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2
                        }
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3
                        }
                    }
                ]}
                lazyLoad={false}
                autoCycle={true}
                cycleInterval={3000}
                showSides={true}
                sidesOpacity={0.5}
                sideSize={0.1}
                slidesToScroll={1}
                slidesToShow={5}
                scrollOnDevice={true}
            >
                {KwonList1}
            </InfiniteCarousel>
        );
    }
}
