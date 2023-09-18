import React, {useEffect, useState} from 'react';
import axios from 'axios';
import requests from '../api/requests';

export default function banner() {

  const [movie, setMovie] = useState([]);
  useEffect(() => {
  }, []);

  const fetchData = async () => {
    //현재 상영중인 영화 정보 가져오기
    const request = await axios.get(requests);
  }


  return
    <div>

    </div>
}
