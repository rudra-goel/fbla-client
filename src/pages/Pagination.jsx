import React, {useEffect} from 'react'
import { Pagination, PaginationItem } from '@material-ui/lab'
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {getLocationsAdvancedSearch} from '../actions/actions'



const Paginate = ({ pageNum, query }) => {
    //console.log("query")
    //console.log(query)
    

    const dispatch = useDispatch()
    const { numPages } = useSelector((state) => state.posts)
    
    //dispatch(getLocationsAdvancedSearch(postDataOnAdvancedSearch, page))
    useEffect(()=> {
        if (pageNum){
            dispatch(getLocationsAdvancedSearch(query, pageNum))
        }
    }, [pageNum])

    return (
        <Pagination 
            count = {numPages}
            page={Number(pageNum) || 1}

            color="primary"
            renderItem={(item) => (
                <PaginationItem { ...item} component={Link} to={`/?page=${item.page}`}/>
            )}
        />
    )
}
export default Paginate