import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router'
import axios from 'axios'
import { domain } from '../env'
import SinglePost from './SinglePost'
import SingleService from './SingleService'
import { Link } from 'react-router-dom'
function SearchresultPage() {
    const {q} = useParams()
    const [result, setResult] = useState(null)
    useEffect(()=>{
        const getSearch = async() => {
            await axios({
                method: 'GET',
                url: `${domain}/api/search/${q}/`,
            }).then(response=>{
                console.log("testttttttttttt=====", response.data)
                setResult(response.data)
            })
        }
        getSearch()
    },[q])
  return (
    <div className='container'>
        <h2>Search Result For: "{q}"</h2>
        {
            result?.post?.map((item,i)=>
                <SinglePost post={item} />
            )
        }
        {
            result?.service?.map((item, i) => 
            <div className="col-lg-4 col-md-6 d-flex align-items-stretch" data-aos="zoom-in" data-aos-delay="100">
              <div className="icon-box iconbox-blue">
                <div className="icon">
                  <img width="70" height="70" src={item?.logo} alt={`${item?.title}`} />
                </div>
                <h4><Link to={`/service/${item?.id}`}>{item?.title}</Link></h4>
                {/* <h4><a href="">{item?.title}</a></h4> */}
                <p>{item?.description}</p>
              </div>
            </div>
            )
        }
    </div>
  )
}
export default SearchresultPage