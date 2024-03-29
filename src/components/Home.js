import React, { useState } from "react";
import { useStateValue } from '../state/StateProvider'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
function Home() {
  const [text, setText] = useState('');
  const [{profile}, {}] = useStateValue()
  const history = useNavigate();
  const search = () => {
    history(`/q/${text}`);
  }
    const logoutnow = () => {
        window.localStorage.clear()
        window.location.href = "/"
    }
  return (
    <div>
          <header id="header" className="d-flex align-items-center">
    <div className="container d-flex align-items-center">

      <h1 className="logo me-auto"><a href="index.html">Green</a></h1>
      {/* Uncomment below if you prefer to use an image logo */}
      {/* <a href="index.html" className="logo me-auto"><img src="assets/img/logo.png" alt="" className="img-fluid"></a>*/}

      <nav id="navbar" className="navbar">
        <ul>
          <li><a className="nav-link scrollto active" href="#hero">Home</a></li>
          <li><a className="nav-link scrollto" href="#about">About</a></li>
          <li><a className="nav-link scrollto" href="#services">Services</a></li>
          <li><a className="nav-link scrollto " href="#portfolio">Portfolio</a></li>
          <li><a className="nav-link scrollto" href="#team">Team</a></li>
          <Link className="nav-item nav-link" to="/posts">Posts</Link>
          {/* <li className="dropdown"><a href="#"><span>Drop Down</span> <i className="bi bi-chevron-down"></i></a>
            <ul>
              <li><a href="#">Drop Down 1</a></li>
              <li className="dropdown"><a href="#"><span>Deep Drop Down</span> <i className="bi bi-chevron-right"></i></a>
                <ul>
                  <li><a href="#">Deep Drop Down 1</a></li>
                  <li><a href="#">Deep Drop Down 2</a></li>
                  <li><a href="#">Deep Drop Down 3</a></li>
                  <li><a href="#">Deep Drop Down 4</a></li>
                  <li><a href="#">Deep Drop Down 5</a></li>
                </ul>
              </li>
              <li><a href="#">Drop Down 2</a></li>
              <li><a href="#">Drop Down 3</a></li>
              <li><a href="#">Drop Down 4</a></li>
            </ul>
          </li> */}
          <li><a className="nav-link scrollto" href="#contact">Contact</a></li>
          {
              profile!==null ? (
              <>
                  <Link onClick = {logoutnow} className="nav-item nav-link" >Logout</Link>
                  <Link className="nav-item nav-link" to="/profile">Profile</Link>
                  <Link className="nav-item nav-link" to="/create">Create Post</Link>
                </>
              ):(
              <>
                  <Link className="nav-item nav-link" to="/login/">Login</Link>
                  <Link className="nav-item nav-link" to="/register/">Register</Link>
                  </>
              )
          }
          {/* <Link onClick = {logoutnow} className="nav-item nav-link" >Logout</Link> */}
          {/* <li><a className="getstarted scrollto" href="#about">Get Started</a></li> */}
          &nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;
          <input onChange={(e) => setText(e.target.value)} value={text} type="search" class="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
          <button type="submit" className="btn btn-outline-primary" disabled={text.length <= 0 ? true : false}
              onClick={search}>Search</button>

        </ul>
        <i className="bi bi-list mobile-nav-toggle"></i>
      </nav>{/* .navbar */}

    </div>
  </header>{/* End Header */}
    </div>
  )
}

export default Home