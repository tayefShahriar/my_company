import React, {useState} from 'react'
import Axios from 'axios'
import {Link} from 'react-router-dom'
import { domain } from '../env'
const Login = () => {
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    var csrftoken = getCookie('csrftoken');
    const loginnow = async()=>{
        Axios({
            method: 'post',
            url: `${domain}/api/login/`,
            headers: {
                'X-CSRFToken': csrftoken
            },
            data: {
                'username': username,
                'password': password,
            }
        }).then(response => {
//             console.log(response.data, "Login Page");
            window.localStorage.setItem("token", response.data['token'])
            window.location.href = "/"
        }).catch(_=> {
            alert("Your password or username is invalid")
        })
    }
    return (
        <div>
            <div className="container">
            <div class="content-section">
                <fieldset class="form-group">
                    <legend class="border-bottom mb-4">Log In</legend>
                    <div>
                        <div class="form-group">
                            <label >Username</label>
                            <input onChange={(e)=>setUsername(e.target.value)} type="text" class="form-control" placeholder="Username" />
                        </div>
                        <div class="form-group">
                            <label >Password</label>
                            <input onChange={(e)=>setPassword(e.target.value)} type="password" class="form-control" placeholder="Password" />
                        </div>
                    </div>
                </fieldset>
                <div class="form-group">
                    <p onClick={loginnow} class="btn btn-outline-info">Login</p>
                </div>
                <div class="border-top pt-3">
                    <small class="text-muted">
                        Need An Account?
                                    <Link class="ml-2" to="/register/">SignIn Up Now</Link>
                    </small>
                </div>
            </div>
        </div >
        </div>
    )
}
export default Login