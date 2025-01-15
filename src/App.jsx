import { BrowserRouter, Route, Routes } from "react-router-dom"
import GlobalContext from "./contexts/GlobalContext"
import { useEffect, useState } from "react"
import axios from "axios"
import AppLayout from "./components/AppLayout"
import HomePage from "./components/HomePage"

const apiUrl = "https://api.themoviedb.org/3"
const imageUrl = "https://image.tmdb.org/t/p/w300"
const apiKey = "febf50335e1f2492dcf7e91bd2f58719"

function App() {

  const [searchValue, setSearchValue] = useState("");
  const [movie, setMovie] = useState([]);
  const [series, setSeries] = useState([]);


  //prende i film
  const getMovies = () => {
    axios.get(`${apiUrl}/search/movie`, {
      params: {
        api_key: apiKey,
        query: searchValue,
        language: "it-IT"
      }
    }).then((resp) => {
      setMovie(resp.data.results);
      console.log("film");
      console.log(resp.data.results);

    });
  }

  const getSeries = () => {

    axios.get(`${apiUrl}/search/tv`, {
      params: {
        api_key: apiKey,
        query: searchValue,
        language: "it-IT"
      }
    }).then((resp) => {
      setSeries(resp.data.results);
      console.log("serie");
      console.log(resp.data.results);

    })
  }


  //prende la bandiera in base alla lingua
  const getFlag = (lang) => {
    let flag = "";

    if (lang === "en") {
      flag = "../images/en.png";
    } else if (lang === "it") {
      flag = "../images/it.png";
    } else {
      flag = "../images/placeholder.png";
    }
    return flag;
  }

  //conta le stelle
  const getStars = (vote) => {

    const star = Math.ceil(vote / 2);
    const starIcon = [];


    for (let i = 0; i < 5; i++) {
      if (i < star) {
        starIcon.push(<i className="fa-solid fa-star star-color" key={i}></i>);
      } else {
        starIcon.push(<i className="fa-regular fa-star star-color" key={i}></i>);
      }
    }

    return (starIcon);

  }


  const globalProviderValue = {
    movie,
    setMovie,
    series,
    setSeries,
    searchValue,
    setSearchValue,
    getMovies,
    getSeries,
    getFlag,
    getStars,
    imageUrl,
  }


  return (
    <>
      <GlobalContext.Provider value={globalProviderValue} >
      <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
            <Route index element={<HomePage/>}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </GlobalContext.Provider>
    </>
  )
}

export default App
