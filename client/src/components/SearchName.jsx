import { useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipesName } from "../redux/actions/actions";

export default function SearchBreed({ paginate }) {
    const [search, setSearch] = useState('')
    let dispatch = useDispatch()

    function onSubmit(e) {
        e.preventDefault();
        if (!search) return alert('Recipe is require')
        dispatch(getRecipesName(search))
        setSearch('')
    }

    function onInputChange(e) {
        e.preventDefault()
        setSearch(e.target.value)
        paginate(1)
    }


    return (
        <div>

            <form onSubmit={onSubmit} action="">
                <input type="search" name="search" onChange={onInputChange} pattern=".*\S.*" required />
                    <button type="submit">
                        <span>Search</span>
                    </button>
            </form>
        </div>
    )
}