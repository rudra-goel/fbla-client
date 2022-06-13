import React, {useEffect} from 'react'




const Paginate = ({ postsPerPage, totalPosts, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
      pageNumbers.push(i);
    }
  
    return (
      <div>

        {pageNumbers.map(number => (
          <button key = {number} onClick={() => paginate(number)} >
            {number}
          </button>
        ))}
      </div>
    );
}
export default Paginate