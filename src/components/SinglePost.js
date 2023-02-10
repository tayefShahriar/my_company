
import React from 'react'
import {Link} from 'react-router-dom'
import { domain } from '../env'

const SinglePost = ({post}) =>{
    return (
        <div class="container">
        <div class="media content-section">
            {console.log("hellooooooooo", post)}
            <img class="rounded-circle article-img" height="200px" widith="200px" src={post.image}/>
            <div class="media-body">
                <div class="article-metadata">
                    <Link class="mr-2" to="/profile">{post.user.user.first_name} {post.user.user.last_name}</Link><br/>
                    <small class="text-muted">{post.date}</small>
                </div>
                <h2><Link class="article-title" to={`/details/${post.id}/`} >{post.title}</Link></h2>
                <p class="article-content">{post.text}</p>
            </div>
        </div>
        </div>
    )
}
export default SinglePost