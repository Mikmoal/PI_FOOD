import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getRecipe, clean } from "../redux/actions/actions";
import HomeCard from "./HomeCard.jsx";
import NavBar from "./NavBar.jsx";
import Paginado from "./Paginado.jsx";
import FilterDiets from "./FilterDiets";
import FilterRecipes from "./FilterRecipes";
import Orders from "./Orders";


export default function Recipes(){
    let recipes = useSelector((state)=> state.recipes);
    let dispatch = useDispatch();
    console.log(recipes)

    useEffect(() => {
        dispatch(getRecipe());
        dispatch(clean())
        }, [dispatch])

  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(9);
  

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = recipes.slice(indexOfFirstPost, indexOfLastPost);
  

  const paginate = (pageNumber) => setCurrentPage(pageNumber);


    return(
        <div>
            
            
            <div>
                <NavBar 
                paginate={paginate}/>
            </div>
            
            <div>
            <Paginado
            postPerPage={postPerPage}
            totalPost={recipes.length}
            paginate={paginate}
            currentPage={currentPage}
          />  
            </div>
            <div>
                <FilterDiets 
                paginate={paginate}/>
            </div>
            <div>
                <FilterRecipes 
                paginate={paginate}/>
            </div>
            <div>
                <Orders 
                paginate={paginate}/>
            </div>
          
            
            {recipes.length === 0 ? (
                <div ><p>CARGANDO</p></div>) : 
                ( 

           <div>
             {
                currentPosts.map(e=> (
                    <HomeCard
                    key={e.id}
                    id={e.id}
                    imagen={e.imagen}
                    nombre={e.nombre}                    
                    dietas={e.dietas}
                    />
                ))
            
            }
            </div> 
    )}
          </div>
        
    )
}