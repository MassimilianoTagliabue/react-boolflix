import { useContext } from "react";
import GlobalContext  from "../contexts/GlobalContext";


function Header() {

    const { searchValue, setSearchValue, getMovies, getSeries } = useContext(GlobalContext)
    


    return (
        <header className="bg-black ">
            <section className="header-container ">
                <h1 className="logo">BOOLFLIX</h1>
                <div>
                    <input className="padd" type="search" value={searchValue} onChange={(event) => setSearchValue(event.target.value)} />
                    <button className="padd marg-left" onClick={() => { getMovies(); getSeries() }}>Cerca</button>
                </div>
            </section>
        </header>
    )
}

export default Header;