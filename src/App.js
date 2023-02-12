import './App.css';
import './static/assets/img/favicon.png'
import './static/assets/img/apple-touch-icon.png'
import './static/assets/vendor/animate.css/animate.min.css'
import './static/assets/vendor/bootstrap/css/bootstrap.min.css'
import './static/assets/vendor/bootstrap-icons/bootstrap-icons.css'
import './static/assets/vendor/boxicons/css/boxicons.min.css'
import './static/assets/vendor/glightbox/css/glightbox.min.css'
import './static/assets/vendor/swiper/swiper-bundle.min.css'
import './static/assets/img/favicon.png'
import './static/assets/img/apple-touch-icon.png'
import './static/assets/css/style.css'
import Posts from './components/Posts';
import Profile from './components/Profile';
import Createpost from './components/Createpost';
import React, {useEffect} from 'react'
import Axios from 'axios'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SingleService from './components/SingleService';
import FirstPage from './pages/FirstPage';
import Login from './components/Login';
import Home from './components/Home';
import Footer from './components/Footer';
import SinglePortfolio from './components/SinglePortfolio';
import { Helmet } from 'react-helmet';
import Register from './components/Register';
import PostDetails from './components/PostDetails';
import {useStateValue} from './state/StateProvider'
import Updatepost from './components/Updatepost';
import { domain } from './env';
import SearchresultPage from './components/SearchresultPage';
function App() {
  const [{profile}, dispatch] = useStateValue()
  useEffect(()=>{
          try {
          const getprofile = async() =>{
              await Axios({
                  method: 'get',
                  url: `${domain}/api/profile/`,
                  headers:{
                      Authorization: `token ${window.localStorage.getItem("token")}`
                  }
              }).then(response=>{
                  console.log(response.data);
                  dispatch({
                      type: 'ADD_PROFILE',
                      value: response.data['userdata']
                  })
              })
          }
          getprofile()
          }
          catch{
              dispatch({
                  type: 'ADD_PROFILE',
                  value: null
              })
          }
      }, [])
  return (
    <>
    <Helmet>
  {/* Google Fonts */}
  <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Raleway:300,300i,400,400i,500,500i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i" rel="stylesheet" />

  {/* Vendor CSS Files */}
  {/* Template Main CSS File */}
  <script src="static/assets/vendor/bootstrap/js/bootstrap.bundle.min.js" type='text/javascript'></script>
  <script src="static/assets/vendor/glightbox/js/glightbox.min.js" type='text/javascript'></script>
  <script src="static/assets/vendor/isotopelayout/isotope.pkgd.min.js" type='text/javascript'></script>
  <script src="static/assets/vendor/swiper/swiper-bundle.min.js" type='text/javascript'></script>
  <script src="static/assets/vendor/php-email-form/validate.js" type='text/javascript'></script>
  <script src="static/assets/js/main.js" type='text/javascript'></script>
  </Helmet>
    <BrowserRouter>
      <Home />
    <Routes>
      <Route exact path="/" element={<FirstPage/>} />
      <Route exact path="/posts" element={<Posts/>} />
      <Route exact path="/service/:id" element={<SingleService/>} />
      <Route exact path="/portfolio/:id" element={<SinglePortfolio/>} />
      <Route exact path = "/details/:id/" element={<PostDetails/>}/>
      <Route exact path = "/q/:q" element={<SearchresultPage/>} />
      {
          profile !== null ? (
          <>
          <Route exact path = "/profile" element={<Profile/>}/>
          <Route exact path = "/update/:id/" element={<Updatepost/>}/>
          <Route exact path = "/create" element={<Createpost/>}/>
          </>
          ) : (
          <>
          <Route exact path = "/login" element={<Login/>}/>
          <Route exact path = "/register" element={<Register/>}/>
          </>
          )
      }
    </Routes> 
    <Footer />
    </BrowserRouter>
    </>    
  );
}

export default App;
