import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import axios from '../../api/axios';
import '../../styles/SearchPage.css'
import useDebounce from '../../components/hooks/useDebounce';
import { useNavigate } from 'react-router-dom';

export default function SearchPage() {
  const navigate = useNavigate();
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  }

  let query = useQuery();
  const searchTerm = query.get('q');
  const debouncedSeachTerm = useDebounce(searchTerm, 1000);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (debouncedSeachTerm) {
      fetchSearchMovie(debouncedSeachTerm)
    }
  }, [debouncedSeachTerm]);

  const fetchSearchMovie = async (searchTerm) => {
    try {
      const request = await axios.get(`/search/multi?include_adult=false&query=${debouncedSeachTerm}`);
      setSearchResults(request.data.results);
    } catch (error) {
      console.log("Error", error.message);
    }
  }


  const renderSearchResults = () => {
    return searchResults.length > 0 ?
      <section className='seach-container'>
        {searchResults.map((movie) => {
          if (movie.backdrop_path !== null && movie.media_type !== 'person') {

            const movieImageUrl = "https://image.tmdb.org/t/p/w500" + movie.backdrop_path;
            return (
              <div className='movie' key={movie}>
                <div className='movie__column-poster' onClick={()=>navigate(`/${movie.id}`)}>
                  <img src={movieImageUrl} alt={movie.title} className='movie__poster' />
                  {/* <h3>{movie.title}</h3>
                  <p>{movie.overview}</p> */}
                </div>
              </div>
            )
          }
        }
        )
        }
      </section> :
      <section className='no-results'>
        <div className='no-results__text'>
          <h1>검색 결과가 없습니다.</h1>
          <p>찾고자 하는 검색어 "{debouncedSeachTerm}"에 맞는 영화가 없습니다.</p>
          </div>
      </section>
  }
  console.log(debouncedSeachTerm);
  return renderSearchResults();
}
