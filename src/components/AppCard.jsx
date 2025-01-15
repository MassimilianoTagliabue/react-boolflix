import { useContext } from "react"
import GlobalContext from "../contexts/GlobalContext"

function AppCard() {

    const { movie, series, imageUrl, getFlag, getStars } = useContext(GlobalContext)

    let opera = series;



    const printOpera = () => {

        ((opera === series) ? opera = movie : opera = series);

        return (
            opera.map((curOpera, index) => {
                return (
                    <div key={index} className="col-30">
                        <div className="relative">
                            <img src={`${imageUrl}${curOpera.poster_path}`} className="banner" />
                            <div className="bg-card card-position">
                                
                                <h3 className="card-title">{curOpera.title || curOpera.name}</h3>
                                
                                <div >Titolo Originale :</div>
                                <div className="card-original-title">{curOpera.original_title || curOpera.original_name}</div>
                                <div className="card-lang"><strong>lingua </strong>:
                                    <img src={getFlag(curOpera.original_language)} alt="en" width="20px" height="12px" className="padd-flag" />
                                </div>
                                <div className="vote"><strong>voto :</strong> {getStars(curOpera.vote_average)}</div>
                            </div>
                        </div>
                    </div>
                )
            })

        )


    }


    return (
        <>
            <section className="container-main">
                <div className="display-main">
                    {printOpera()}


                    {printOpera()}
                </div>
            </section>
        </>
    )
}

export default AppCard;