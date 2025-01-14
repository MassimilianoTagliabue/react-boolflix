import { BrowserRouter, Route, Routes } from "react-router-dom"
import GlobalContext from "./contexts/GlobalContext"
import { useEffect, useState } from "react"
import axios from "axios"

const apiUrl = "https://api.themoviedb.org/3/search/movie"
const key = "febf50335e1f2492dcf7e91bd2f58719"

function App() {

  const [search, setSearch] = useState([]);

  useEffect(() => {

    getMovies();

  }, [])

  const getMovies = () => {

    axios.get(`${apiUrl}`, {
      params: {
        api_key: key,
        query: "batman"
      }
    }).then((resp) => {
      setSearch(resp.data.results)
      
    });
  }

  
  


  const globalProviderValue = {
    search,
    setSearch,
  }

  return (
    <>
      <GlobalContext.Provider value={globalProviderValue}>
        <div>
          {search.map((curMovie,index) => {

            return (
              <div key={index}>
                {curMovie.title}
              </div>
            )
          })}
        </div>
        
      </GlobalContext.Provider>
    </>
  )
}

export default App
