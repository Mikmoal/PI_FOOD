import { useForm } from "../hook/useForm";
import { Link } from "react-router-dom";
import style from '../css/newBreed.module.scss';

const initialForm = { //son los valores inciales del formulario
    nombre: "",
    resumen: "",
    health_score: "",
    paso_a_paso: "",
    imagen: "",
    dietas: [],
};

const validationsForm = (form) => { //una funcion que recibe los datos del formulario

    let errors = {};    //esta variable guarda los errores                   
    let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;  //expresion regular valida que solo se acepten mayúsculas y minúsculas            
    let regexNumbers = /^[0-9]\d*(\.\d+)?$/; //  /[0-9]/ es otra expresión regular para numeros


    if (!form.nombre.trim()) {  //el trim() evalua que tenga información, que no haya espacios en blanco
        errors.nombre = "El campo Nombre es requerido";
    } else if (!regexName.test(form.nombre.trim())) {
        errors.nombre = "El campo 'Nombre' solo acepta letras y espacios en blanco"
    }

    if (!form.resumen.trim()) {  //el trim() evalua que tenga información, que no haya espacios en blanco
        errors.resumen = "El campo resumen es requerido";
    } else if (!regexName.test(form.resumen.trim())) {
        errors.resumen = "El campo 'resumen' solo acepta letras y espacios en blanco"
    }

    if (!form.health_score) {
        errors.health_score = "El campo health_score es requerido";
    } else if (!regexNumbers.test(form.health_score.trim())) {    //validación weightMin
        errors.health_score = "Solo números"
    } else if (form.health_score < 1) {
        errors.health_score = "El health_score mínimo no debe ser menor a 1"
    } else if (form.health_score > 100) {
        errors.health_score = "El health_score no puede superar 100 "
    }


    if (!form.paso_a_paso.trim()) {  //el trim() evalua que tenga información, que no haya espacios en blanco
        errors.paso_a_paso = "El campo paso_a_paso es requerido";
    } else if (!regexName.test(form.paso_a_paso.trim())) {
        errors.paso_a_paso = "El campo 'paso_a_paso' solo acepta letras y espacios en blanco"
    }

    if (!form.image) {
        errors.image = "El campo es requerido";
    }

    if (form.dietas.length === 0) {
        errors.dietas = "Se requiere mínimo una dieta"
    }



    return errors
};





const AddRecipe = () => {
    const {                        // se hace destructuracion de useForm       
        form,
        errors,
        diet,
        handleChange,
        handleBlur,
        handleDiets,
        removeDiets,
        handleSubmit,
    } = useForm(initialForm, validationsForm); // useForm tiene los valores iniciales del formulario y la validaciones

    return (


        <div className={style.cont}>
            <form onSubmit={handleSubmit}>
                <div className={style.form}>
                    <div className={style.nav}>
                        <Link to="/home">
                            <button className={style.buttonHome}>Home</button>
                        </Link>
                    </div>

                    <h4 className={style.title}>Crear nueva receta</h4>
                    <div>
                        <label className={style.labelName}>Nombre</label>
                        <input
                            className={style.input}                                             //input name
                            type="text"
                            name="nombre"
                            placeholder="Name Recipe"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={form.name}
                            require='true'
                        />
                        {errors.name && <p className={style.error}>{errors.name}</p>}
                    </div>
                    <div>
                        <label className={style.labelHeightMin}>Height Min</label>
                        <input
                            className={style.input}                                             //input heightMin en cm
                            type="text"
                            name="heightMin"
                            placeholder="heightMin"
                            maxLength={3}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={form.heightMin}
                            require='true'
                        />
                        {errors.heightMin && <p className={style.error}>{errors.heightMin}</p>}
                    </div>
                    <div>
                        <label className={style.labelHeightMax}>Height Max</label>
                        <input
                            className={style.input}                                            // input heightMax en cm
                            type="text"
                            name="heightMax"
                            placeholder="heightMax"
                            maxLength={3}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={form.heightMax}
                            require='true'
                        />
                        {errors.heightMax && <p className={style.error}>{errors.heightMax}</p>}
                    </div>
                    <div>
                        <label className={style.labelWeightMin}>Weight Min</label>
                        <input
                            className={style.input}                                            //input weightMin en kg
                            type="text"
                            name="weightMin"
                            placeholder="weightMin"
                            maxLength={2}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={form.weightMin}
                            require='true'
                        />
                        {errors.weightMin && <p className={style.error}>{errors.weightMin}</p>}
                    </div>
                    <div>
                        <label className={style.labelWeightMax}>Weight Max</label>
                        <input
                            className={style.input}                                           //input weightMax en kg
                            type="text"
                            name="weightMax"
                            placeholder="weightMax"
                            maxLength={3}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={form.weightMax}
                            require='true'
                        />
                        {errors.weightMax && <p className={style.error}>{errors.weightMax}</p>}
                    </div>
                    <div>
                        <label className={style.labelLife_span_min}>Life Span Min</label>
                        <input
                            className={style.input}                                         //input life_span_min
                            type="text"
                            name="life_span_min"
                            placeholder="min"
                            maxLength={2}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={form.life_span_min}
                            require='true'
                        />
                        {errors.life_span_min && <p className={style.error}>{errors.life_span_min}</p>}
                    </div>
                    <div>
                        <label className={style.labelLife_span_max}>Life Span Max</label>
                        <input
                            className={style.input}                                            //input life_span_max
                            type="text"
                            name="life_span_max"
                            placeholder="max"
                            maxLength={2}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={form.life_span_max}
                            require='true'
                        />
                        {errors.life_span_max && <p className={style.error}>{errors.life_span_max}</p>}
                    </div>
                    <div>
                        <label className={style.labelImage}>Image</label>
                        <input
                            className={style.input}                                            //input image
                            type="text"
                            name="image"
                            placeholder="image or url-image"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={form.image}
                            require='true'
                        />
                        {errors.image && <p className={style.error}>{errors.image}</p>}
                    </div>
                    <div>
                        <label className={style.labelTemperaments}>Temperaments</label>
                        <div>
                            <select onChange={handleTemperaments} require="true" className={style.select} defaultValue={'Chose an option'}>
                                <option >Temperaments</option>
                                {temperament.map((e, index) => (
                                    <option value={e.name} name='temperaments' key={index}>{e.name}</option>
                                ))}
                            </select>
                        </div>
                        {errors.temperament && <p className={style.error}>{errors.temperament}</p>}
                    </div>
                    <div>
                        {form.temperament.map((c, index) => (
                            <button value={c} onClick={removeTemperaments} onBlur={handleBlur} key={index} className={style.buttonX}>{c} x</button>
                        ))}
                    </div>

                    <div>
                        <input type="submit" value="Create" className={style.buttonCreate} />
                    </div>
                </div>
            </form>
        </div>

    );
};

export default AddBreed;
