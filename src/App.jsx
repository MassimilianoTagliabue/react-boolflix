import { BrowserRouter, Route, Routes } from "react-router-dom"
import GlobalContext from "./contexts/GlobalContext"
import { useEffect, useState } from "react"
import axios from "axios"

const apiUrl = "https://api.themoviedb.org/3/search"
const apiKey = "febf50335e1f2492dcf7e91bd2f58719"

function App() {

  const [searchValue, setSearchValue] = useState("");
  const [movie, setMovie] = useState([]);
  const [series, setSeries] = useState([]);


  //prende i film
  const getMovies = () => {
    axios.get(`${apiUrl}/movie`, {
      params: {
        api_key: apiKey,
        query: searchValue,
        language: "it-IT"
      }
    }).then((resp) => {
      setMovie(resp.data.results);
      console.log(resp.data.results);

    });
  }

  const getSeries = () => {

    axios.get(`${apiUrl}/tv`, {
      params: {
        api_key: apiKey,
        query: searchValue,
        language: "it-IT"
      }
    }).then((resp) => {
      setSeries(resp.data.results);
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



  const globalProviderValue = {
    movie,
    setMovie,
    series,
    setSeries,

  }


  return (
    <>
      <GlobalContext.Provider value={globalProviderValue}>
        <div>
          <input type="search" value={searchValue} onChange={(event) => setSearchValue(event.target.value)} />
          <button onClick={() => { getMovies(), getSeries() }}>Cerca</button>
          <br />

          {/* stampa dei film */}
          <section>
            <h2>Film</h2>
            {globalProviderValue.movie.map((curMovie, index) => {
              return (
                <div key={index}>
                  <h3>Titolo</h3>
                  <div>{curMovie.title}</div>
                  <h3>Titolo Originale </h3>
                  <div>{curMovie.original_title}</div>
                  <div><strong>lingua </strong>:
                    <img src={getFlag(curMovie.original_language)} alt="en" width="20px" height="12px" />
                  </div>
                  <div><strong>voto :</strong> {curMovie.vote_average}</div>
                  <br />
                </div>
              )
            })}
          </section>

          {/* stampa delle serie */}
          <section>
            <h2>Serie TV</h2>
            {globalProviderValue.series.map((curSeries, index) => {
              return (
                <div key={index}>
                  <h3>Titolo</h3>
                  <div>{curSeries.name}</div>
                  <h3>Titolo Originale </h3>
                  <div>{curSeries.original_name}</div>
                  <div><strong>lingua </strong>:
                  <img src={getFlag(curSeries.original_language)} alt="en" width="20px" height="12px" />
                  </div>
                  <div><strong>voto :</strong> {curSeries.vote_average}</div>
                  <br />
                </div>
              )
            })}
          </section>


        </div>

      </GlobalContext.Provider>
    </>
  )
}

export default App
