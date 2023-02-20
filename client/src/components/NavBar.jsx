import { Link } from "react-router-dom";
import SearchName from "./SearchName";

export default function Nav({ paginate }) {
    return (
        <div>

            <button onClick={() => window.location.reload()}>Home</button>

            <Link to="/newRecipe">
                <button>Add New Recipe</button>
            </Link>

            <SearchName
                paginate={paginate} />


        </div>
    )
}