import React, {useEffect, useState} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import Axios from 'axios'
import { domain } from '../env'
const Createpost = () => {
    // const {id} = useParams()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [image1, setImage1] = useState(null)
    const [image, setImage] = useState('')
    const history = useNavigate()
    const createpost = async () => {
        let formfield = new FormData()
        formfield.append('title', title)
        formfield.append('text', description)
        if(image1 !== null){
            formfield.append('image', image1)
        }
        await Axios({
            method: 'post',
            url: `${domain}/api/posts/`,
            data: formfield,
            headers: {
                Authorization: `token ${window.localStorage.getItem("token")}`
            }
        }).then(response=>{
//             console.log(response.data)
               history("/posts")
        }).catch(_=>{
            alert("Something is wrong!!!")
        })
    }
    return (
        <div className="container">
    <h1>Create Post</h1>
    <div className="p-3">
        <div class="form-group">
            <label>Title</label>
            <input onChange={e=>setTitle(e.target.value)} type="text" class="form-control" />
        </div>
        <div class="form-group">
            <label>Description</label>
            <textarea onChange={e=>setDescription(e.target.value)} class="form-control" rows="3"></textarea>
        </div>
        <div class="form-group">
            {/* <img className="update__image" src={image} alt="" srcset="" /> */}
            <label>Ulpode Image</label>
            <input
                onChange={e=>setImage1(e.target.files[0])}
                className="form-control"
                type="file" />
        </div>
    </div>
    <div>
        <p className="btn btn-info" onClick={createpost}>Submit</p>
    </div>
</div>
    )
}
export default Createpost