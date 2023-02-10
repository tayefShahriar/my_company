import React, {useState, useEffect} from 'react'
import Axios from 'axios'
import SinglePost from './SinglePost'
import { domain } from '../env'
const Posts = () => {
    const [posts, setPosts] = useState(null)
    useEffect(()=>{
        const getposts = async() =>{
            await Axios({
                method: 'get',
                url: `${domain}/api/posts/`,
                headers: {
                    // Authorization: `token ${window.localStorage.getItem("token")}`
                }
            }).then(response=>{
                console.log("myresponse==========", response.data);
                setPosts(response.data)
            }).catch(_=>{
                console.log("errror-------------")
            })
        }
        getposts()
    }, [])
    return(
        <div>
         {
            posts!== null ? (
            <div>
                {
                    posts.map((data, i)=>(
                        <SinglePost post={data} key={i}/>
                    ))
                }
            </div>
            ) : (<h1>No post found</h1>)
        }
        </div>
    )
}

export default Posts