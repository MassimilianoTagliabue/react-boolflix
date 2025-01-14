import { BrowserRouter, Route, Routes } from "react-router-dom"
import GlobalContext from "./contexts/GlobalContext"
import { useEffect, useState } from "react"
import axios from "axios"

const apiUrl = "https://api.themoviedb.org/3/search"
const apiKey = "febf50335e1f2492dcf7e91bd2f58719"

function App() {

  const [searchValue,setSearchValue] =useState("");
  const [Movie, setMovie] = useState([]);
  

  //prende i film
  const getMovies = () => {
    axios.get(`${apiUrl}/movie`, {
      params: {
        api_key: apiKey,
        query: searchValue,
        language: "it-IT"
      }
    }).then((resp) => {
      setMovie(resp.data.results)
      console.log(resp.data.results);
      
    });
  }



  const globalProviderValue = {
    Movie,
    setMovie,
    
  }


  return (
    <>
      <GlobalContext.Provider value={globalProviderValue}>
        <div>
          <input type="search" value={searchValue} onChange={(event) => setSearchValue(event.target.value)}/>
          <button onClick={() => {getMovies()}}>Cerca</button>
          <br />

          <h2>Film</h2>
          {globalProviderValue.Movie.map((curMovie, index) => {
            return (
              <div key={index}>
                <h3>Titolo</h3> 
                <div>{curMovie.title}</div>
                <h3>Titolo Originale </h3>
                <div>{curMovie.original_title}</div> 
                <div><strong>lingua </strong>: {curMovie.original_language}</div>
                <div><strong>voto :</strong> {curMovie.vote_average}</div>
                <br />
              </div>
            )
          })}

          
        </div>

      </GlobalContext.Provider>
    </>
  )
}

export default App
