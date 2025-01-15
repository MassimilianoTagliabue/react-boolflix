import { useContext } from "react";
import GlobalContext  from "../contexts/GlobalContext";


function Header() {

    const { searchValue, setSearchValue, getMovies, getSeries } = useContext(GlobalContext)
    console.log(searchValue);


    return (
        <header>
            <section className="header-container    ">
                <h1>BOOLFLIX</h1>
                <div>
                    <input type="search" value={searchValue} onChange={(event) => setSearchValue(event.target.value)} />
                    <button onClick={() => { getMovies(); getSeries() }}>Cerca</button>
                </div>
            </section>
        </header>
    )
}

export default Header;