import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import { getRecipesId } from "../redux/actions/actions";

export default function Detail(props) {
    const dispatch = useDispatch();
    const recipeId = useSelector((state) => state.recipesDetail)

    useEffect(() => {
        dispatch(getRecipesId(props.match.params.id))
    }, [dispatch, props.match.params.id])
    console.log(recipeId)
    return (
        <div>
            {/* <div>
                <Link to="/home">
                    <button className={style.buttonLink}>Home</button>
                </Link>
                <Link to="/newBreed">
                    <button className={style.buttonLink}>Create Breed</button>
                </Link>
            </div>          */}
            <div>
                <NavBar
                    paginate={paginate} />
            </div>

            {breedId.length === 0 ? (
                <div className={style.loading}><p>CARGANDO</p></div>) :
                (
                    <div className={style.detail}>
                        {recipeId.map(recipeId => {
                            return (
                                <div key={recipeId.id}>
                                    <img src={recipeId.imagen} alt='img' className={style.img} />
                                    <h3>Nombre: {recipeId.nombre}</h3>
                                    <div><h4>Resumen:</h4> <p>{recipeId.resumen}</p></div>
                                    <div><h4>Health Score:</h4> <p>{recipeId.health_score}</p></div>
                                    <div><h4>Paso a paso:</h4><p>{recipeId.paso_a_paso}</p></div>
                                    <div><h4>Tipos de dieta:</h4><p>{recipeId.dietas}</p></div>
                                </div>
                            )
                        })}
                    </div>


                )}
        </div>
    )
}