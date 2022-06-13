import React, {useEffect} from 'react'
import "./Pagination.css"




const Paginate = ({ postsPerPage, totalPosts, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
      pageNumbers.push(i);
    }
  
    return (
      <div class="paginate-container">

        {pageNumbers.map(number => (
          <button key = {number} onClick={() => paginate(number)} class="pagination-button">
            {number}
          </button>
        ))}
      </div>
    );
}
export default Paginate