import React from "react";

export default function Pagination({ postPerPage, totalPost, paginate, currentPage }) {

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPost / postPerPage); i++) {
        pageNumbers.push(i);
    }




    return (
        <div>

            <ul>
                <li>
                    <button onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}>{"<<"}</button>
                </li>


                {pageNumbers.map(number => (
                    <li key={number}><button onClick={() => paginate(number)}>{number}</button></li>
                ))}

                <li><button onClick={() => paginate(currentPage < pageNumbers.length ? currentPage + 1 : pageNumbers.length)}>{">>"}</button></li>
            </ul>

        </div>
    )
}