import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDiets, createRecipe, getRecipe } from "../redux/actions/actions";
import { useHistory } from "react-router-dom";


export const useForm = (initialForm, validateForm) => {  // por parámetros llega el estado inicial y la funcion validateForm(son todas las validaciones)
    const [form, setForm] = useState(initialForm);  // el estado inicial se reciben por parámetros 
    const [errors, setErrors] = useState({});       // se usa para los errores, se inicia como un objeto vacío, el cual se llenara de errores. Si el el objeto está vacío entonces no hay errores
    
    var nameRecipe = useSelector((state => state.recipesClean)) 
console.log(nameRecipe)
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(()=>{
        dispatch(getDiets());       
    }, [dispatch])

    useEffect(() => {
        dispatch(getRecipe())
    }, [dispatch])

    const diet = useSelector((state) => state.diets).sort((a, b) => {
        if (a.name > b.name) { return 1; }
        if (a.name < b.name) { return -1;}
        return 0;
    })
    console.log(diet)

    const handleChange = (e) => {              //esta función se liga al value de los inputs
        setForm({
            ...form,                           //se pasa una copia del formulario
            [e.target.name]: e.target.value    //se hace el cambio por el evento que entra por parametro
        })
    }; 

    const handleBlur = (e) => {  // esta función lanza las validaciones al perder el foco las propiedades del formulario.
        handleChange(e)          //
        setErrors(validateForm(form)) //validateForm se ejecuta dentro del estado de error, y llenara el objeto vacío con los errores 
    }; 
    
    const handleDiets = (e) =>{
        if(form.diet.includes(e.target.value)){
            return;
        } else {
        setForm({
            ...form,
            diet: [...form.diet, e.target.value]

        })
      }
    }

    const removeDiets = (e) =>{
        setForm({
            ...form,
            diet: form.diet.filter(el => el !== e.target.value )
        })
    }
    
    const handleSubmit = (e) => { // hace el submit(envía) del formulario
        e.preventDefault();
        setErrors(validateForm(form));
        
        if (form.name){
            var aux = nameRecipe.find(e => e.name === form.name)
            console.log(aux)
            if(aux !== undefined){
           return alert('Nombre repetido')
            } 
        }
        if(Object.keys(errors).length > 0 ){    //preguntamos si el objeto errores esta vacío, si se cumple se procesa
            alert("Falta completar campos por completar o hay un error")             
        } 
              
        else if(
            form.nombre === "" &&
            form.resumen === "" &&                //si hay campos vacíos no prosigue
            form.health_score === "" &&
            form.paso_a_paso === "" &&
            form.imagen === "" &&
            !form.dietas.length
        ){
            return alert("Hay campos sin completar")
        }        
            else {
            dispatch(createRecipe(form));
            alert ("Recipe created")              //crea la raza y devuelve al home
            setForm({
                nombre:"",
                resumen:"",
                health_score:"",
                paso_a_paso:"",
                imagen:"",
                dietas:[]
        })
        history.push('/home') 
    }
        


    }; 

    return{
        form,
        errors,        
        diet,
        nameRecipe,
        handleChange,
        handleBlur, 
        handleDiets,
        removeDiets,
        handleSubmit
    }
    
}