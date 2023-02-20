import { Link } from "react-router-dom";



export default function RecipeCard({ id, imagen, nombre, dietas }) {

    return (
        <div>
            <img src={imagen} alt="img" />
            <Link to={`/home/${id}`}>
                <h5>{nombre}</h5>
            </Link>
            <h6>Dietas:</h6><p> {dietas}</p>
        </div>
        
    )
}