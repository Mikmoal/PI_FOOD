import axios from 'axios';
export const GET_RECIPES = 'GET_RECIPES';
export const GET_SEARCH = 'GET_SEARCH';
export const DETAIL_RECIPES = 'DETAIL_RECIPES';
export const GET_DIETS = 'GET_DIETS';
export const FILTER_RECIPE = 'FILTER_RECIPE';
export const FILTER_DIET = 'FILTER_DIET';
export const ORDER_BY = 'ORDER_BY';
export const ADD_RECIPE = 'ADD_RECIPE';
export const FAIL = 'FAIL';
export const LOADING = 'LOADING';
export const CLEAN = 'CLEAN';

export const getRecipe = () => async dispatch =>{
    await axios.get('http://localhost:3001/recipes')
      .then((response) =>{
        dispatch({
            type: GET_RECIPES,
            payload: response.data
        })
    })
    .catch((error) => { console.log(error)})
}

export const getRecipesName = (name) => async dispatch =>{
    try{
    await axios.get(`http://localhost:3001/recipes?name=${name}`)
    .then((response) => {
        dispatch({
            type: GET_SEARCH,
            payload: response.data
        })
    })
 } catch (error) { 
    return alert("Receta no encontrada")
 }
}

export const getRecipesId = (id) => async dispatch =>{
    try {
    await axios.get(`http://localhost:3001/recipes/${id}`)
    .then((response) => {
        dispatch({
            type: DETAIL_RECIPES,
            payload: response.data
        })
    })    
    } catch (error) { console.log(error)}
}

export const createRecipe = (payload) => async dispatch =>{

    try{
    await axios.post('http://localhost:3001/recipes', payload)
    .then(response =>{
        dispatch({
            type: ADD_RECIPE,
            payload: response.data
        })
    })
} catch (error) {
          return (error)}
}

export const getDiets = () => async dispatch =>{
    try{
        await axios.get('http://localhost:3001/diets')
        .then((response) => {
            dispatch({
                type: GET_DIETS,
                payload: response.data
            })            
        })
    } catch (error){
        return (error)
    }
}

export function filterRecipes(payload){
    return{
        type: FILTER_RECIPE,
        payload
    }
}

export function filterDiets(payload){
    return{
        type: FILTER_DIET,
        payload
    }
}

export function orderBy(payload) {
    return{
        type: ORDER_BY,
        payload
    }
}

export function clean() {
    return{
        type: CLEAN,
        
    }
}