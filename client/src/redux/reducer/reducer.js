import {
  GET_RECIPES,
  GET_SEARCH,
  DETAIL_RECIPES,
  LOADING,
  CLEAN,
  FILTER_DIET,
  FILTER_RECIPE,
  GET_DIETS,
  ORDER_BY,
  ADD_RECIPE,
} from "../actions/actions";
import { A_Z, Z_A, WEIGHT_MAX, WEIGHT_MIN } from "../../constantes/order";

const initialState = {
  recipes: [],
  recipesClean: [],
  recipesDetail: [],
  diets: [],
  empty: [],
  newRecipe: {},
  error: "",
  loading: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        recipesClean: action.payload,
        error: "",
      };
    case GET_SEARCH:
      return {
        ...state,
        recipes: action.payload,
        //error:""
      };
    case GET_DIETS:
      return {
        ...state,
        diets: action.payload,
      };
    case ORDER_BY:
      let orderAz = [...state.recipes];
      orderAz = orderAz.sort((a, b) => {
        switch (action.payload) {
          case A_Z:
            if (a.name < b.name) {
              return -1;
            } else return 1;
          case Z_A:
            if (a.name > b.name) {
              return -1;
            } else return 1;
          // case WEIGHT_MAX:
          //     if(a.weightMax > b.weightMax) {
          //         return -1
          //     } else return 1
          // case WEIGHT_MIN:
          //     if(a.weightMin < b.weightMin) {
          //         return -1
          //     } else return 1
          default:
            return 0;
        }
      });
      return {
        ...state,
        recipes: orderAz,
      };
    case FILTER_DIET:
      let allDiets = [...state.recipesClean];
      //if(action.payload === 'All Temperaments') return {...state, breeds: state.breeds}
      let aux2 =
        action.payload === "All Diets"
          ? allDiets
          : allDiets.filter((el) =>
              el.diets.includes(action.payload)
            );
      console.log(aux2);
      return {
        ...state,
        recipes: aux2,
      };
    case FILTER_RECIPE:
      let allRecipes = [...state.recipesClean];
      let aux;
      console.log(allRecipes);
      if (action.payload === "All Recipes")
        return { ...state, recipes: allRecipes };
      if (action.payload === "Recipes") {
        aux = allRecipes.filter((e) => Number(e.id));
      }
      if (action.payload === "New Recipes") {
        aux = allRecipes.filter((e) => !Number(e.id));
      }
    //   if (action.payload === "Weight -10") {
    //     aux = allRecipes.filter((e) => e.weightMin > 10);
    //   }

      console.log(aux);
      return {
        ...state,
        recipes: aux,
      };
    case DETAIL_RECIPES:
      return {
        ...state,
        recipesDetail: action.payload,
      };
    case ADD_RECIPE:
      return {
        ...state,
        newRecipe: action.payload,
      };
    // case FAIL:
    //     return{
    //         ...state,
    //         error: action.payload
    //     }
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case CLEAN:
      return {
        ...state,
        recipesDetail: [],
      };
    default:
      return { ...state };
  }
}
