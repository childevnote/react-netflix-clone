import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import requests from '../api/requests';

export default function Banner() {

  const [movie, setMovie] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    //현재 상영중인 영화 정보 가져오기
    const request = await axios.get(requests.fetchNowPlaying);

    //배열에서 랜덤으로 하나의 영화를 선택
    const movieId = request.data.results[Math.floor(Math.random() * request.data.results.length)].id;

    const { data: movieDetail } = await axios.get(`movie/${movieId}`, {
      params: {
        append_to_response: "videos",
      }
    });
    setMovie(movieDetail);

    console.log(movie);



  };
  return <header
    className='banner'
    style={{
      backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
      backgroundPosition: "top center",
      backgroundSize: "cover",

    }}
  >
    <div className='banner-contents'>
      <h1>
        {movie.title || movie.name || movie.original_name}
      </h1>
      <div className='banner-buttons'>
        <button className='banner-button play'>Play</button>
        <button className='banner-button info'>More Information</button>
        </div>
    </div>
  </header>
}