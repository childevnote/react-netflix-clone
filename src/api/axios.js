import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "c3c74c272f96accd6f20d834da0afd2f",
    language: "ko-KR",
  },
});

export default instance;
