import { useDispatch } from "react-redux";
import { filterRecipes } from "../redux/actions/actions";

export default function FilterRecipes(){
    const dispatch = useDispatch();

    function onFilterRecipes(e){
        e.preventDefault();
        dispatch(filterRecipes(e.target.value))
    }
    
    return(
        <div>
            <select onChange={onFilterRecipes}>
                <option value='All Recipes' key='All Recipes'>All Recipes</option>
                <option value='Recipes' key='Recipes of API'>Recipes</option>
                <option value='New Recipes' key='New Recipes'>New Recipes</option>
            </select>
        </div>
    )
}