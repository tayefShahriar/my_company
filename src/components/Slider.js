import { Helmet } from 'react-helmet'
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { domain } from '../env'

function Slider() {
  const [slides, setslides] = useState(null)
  useEffect(() => {
    const getSlider = async() => {
      await axios({
        url: `${domain}/api/sliders/`,
        method: 'GET',
      }).then(response => {
        setslides(response.data)
        console.log('sliders=====================', response.data)
      })
    }
    getSlider()
  }, [])
  
  return (
    <div>
          <section id="hero">
    <div id="heroCarousel" data-bs-interval="5000" className="carousel slide carousel-fade" data-bs-ride="carousel">

      <ol className="carousel-indicators" id="hero-carousel-indicators"></ol>

      <div className="carousel-inner" role="listbox">

        {/* Slide 1 */}
        {
            slides?.map((item, i) =>
        <div className="carousel-item active" style={{backgroundImage: `url("${item.image}")`}}>
          <div className="carousel-container">
            <div className="container">
              <h2 className="animate__animated animate__fadeInDown">{item.name}</h2>
              <p className="animate__animated animate__fadeInUp">{item.details}</p>
              <a href="#about" className="btn-get-started animate__animated animate__fadeInUp scrollto">Read More</a>
            </div>
          </div>
        </div>
        )
      }
      </div>

      <a className="carousel-control-prev" href="#heroCarousel" role="button" data-bs-slide="prev">
        <span className="carousel-control-prev-icon bi bi-chevron-left" aria-hidden="true"></span>
      </a>

      <a className="carousel-control-next" href="#heroCarousel" role="button" data-bs-slide="next">
        <span className="carousel-control-next-icon bi bi-chevron-right" aria-hidden="true"></span>
      </a>

    </div>
  </section>{/* End Hero */}
    </div>
  )
}

export default Slider