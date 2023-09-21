import React from 'react'
import { useEffect, useState } from 'react'
import axios from '../api/axios'
import '../styles/Row.css'
import MovieModal from './MovieModal/index';
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function Row({ title, fetchUrl, isLargeRow, id }) {
  const [movies, setMovies] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [movieSelected, setMovieSelected] = useState({});


  useEffect(() => {
    fetchMovieData();
  }, [])

  const fetchMovieData = async () => {
    try {
      const request = await axios.get(fetchUrl);
      if (request.data && request.data.results) {
        setMovies(request.data.results);
      } else {
        console.error('Results are undefined', request.data);
        setMovies([]); // Optionally set movies to an empty array if results are undefined
      }
    } catch (error) {
      console.error('Error fetching movie data:', error);
      setMovies([]); // Set movies to an empty array in case of an error
    }
  };


  const handleClick = (movie) => {
    setModalOpen(true);
    setMovieSelected(movie);
  }

  return (
    <section className='row'>
      <h2>{title}</h2>
      <Swiper
        // install Swiper modules
        modules={[Navigation,Pagination,Scrollbar, A11y]}
        spaceBetween={5}
        slidesPerView={6}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        breakpoints={{
          1378 : {
            slidesPerView: 6,
            slidesPerGroup: 6,
          },
          1024: {
            slidesPerView: 5,
            slidesPerGroup: 5,
          },
          768: {
            slidesPerView: 4,
            slidesPerGroup: 4,
          },
          640: {
            slidesPerView: 3,
            slidesPerGroup: 3,
          },
          320: {
            slidesPerView: 2,
            slidesPerGroup: 2,
          },
          0: {
            slidesPerView: 1,
            slidesPerGroup: 1,
          }
        }}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
      >


        <div id={id} className='row__posters'>

          {movies.map((movie) => <SwiperSlide><img key={movie.id} className={`row__poster ${isLargeRow && 'row__posterLarge'}`} src={`https://image.tmdb.org/t/p/original/${isLargeRow ? movie.poster_path : movie.backdrop_path}`} alt={movie.name} onClick={() => { handleClick(movie) }} /></SwiperSlide>)}

        </div>

      </Swiper>
      {modalOpen && <MovieModal {...movieSelected} setModalOpen={setModalOpen} />}
    </section>
  )
}
