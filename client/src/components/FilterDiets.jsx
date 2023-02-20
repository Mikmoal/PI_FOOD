import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { filterDiets, getDiets } from "../redux/actions/actions";


export default function FilterDiet({paginate}){
    const diet = useSelector((state)=> state.diets)
    const dispatch = useDispatch();
    
    const dietsOrder = diet.sort((a, b) => { //se ordena alfabeticamente para que salga bien en el select
        if (a.name > b.name) { return 1; }
        if (a.name < b.name) { return -1;}
        return 0;
      })
   
    
    useEffect(()=>{
        dispatch(getDiets());
        }, [dispatch])
    
    function onFilterDiet(e){
        e.preventDefault()
        dispatch(filterDiets(e.target.value))
        paginate(1)
    }

    return(
        <div>
            <select onChange={onFilterDiet}>
                <option value='All Diets' key='All Diets'>All Diets</option>
                {dietsOrder.map((el, index)=> (
                    <option value={el.nombre} key={index}>{el.nombre}</option>
                ))}
            </select>
        </div>
    )
}