import axios from 'axios'
import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { domain } from '../env'

function SinglePortfolio() {
  const {id} = useParams()
  const [portfolio, setportfolio] = useState(null)
  useEffect(() => {
    const getPortfolio = async() =>{
      await axios({
        url: `${domain}/api/singleportfolio/${id}/`,
        method: 'GET',
      }).then(response => {
          setportfolio(response.data[0])
          console.log("single_portfolio==============", response.data[0])
      })
    }
    getPortfolio()
  }, [])
  
  return (
    <div>
        <main id="main">

        {/* ======= Breadcrumbs ======= */}
        <section id="breadcrumbs" className="breadcrumbs">
        <div className="container">

            <div className="d-flex justify-content-between align-items-center">
            <h2>{portfolio?.title}</h2>
            <ol>
                <li><a href="index.html">Home</a></li>
                <li>Portfolio Details</li>
            </ol>
            </div>

        </div>
        </section>{/* End Breadcrumbs */}

        {/* ======= Portfolio Details Section ======= */}
        <section id="portfolio-details" className="portfolio-details">
        <div className="container">

            <div className="row gy-4">

            <div className="col-lg-8">
                <div className="portfolio-details-slider swiper">
                <div className="swiper-wrapper align-items-center">

                    <div className="swiper-slide">
                    <img src={portfolio?.image} alt="" />
                    </div>

                </div>
                <div className="swiper-pagination"></div>
                </div>
            </div>

            <div className="col-lg-4">
                <div className="portfolio-description">
                <h2>{portfolio?.title}</h2>
                <p>
                    {portfolio?.details}
                </p>
                </div>
            </div>

            </div>

        </div>
</section>{/* End Portfolio Details Section */}

</main>
    </div>
  )
}

export default SinglePortfolio