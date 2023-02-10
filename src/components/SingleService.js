import axios from 'axios'
import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { domain } from '../env'

function SingleService() {
  const {id} = useParams()
  const [service, setservice] = useState(null)
  useEffect(() => {
    const getService = async() =>{
      await axios({
        url: `${domain}/api/singleservices/${id}/`,
        method: 'GET',
      }).then(response => {
          setservice(response.data[0])
          console.log("single_service==============", response.data[0])
      })
    }
    getService()
  }, [])
  
  return (
    <div>
        <main id="main">

        {/* ======= Breadcrumbs ======= */}
        <br/>
        <br/>
        <br/>
        <br/>
    <section className="breadcrumbs">
      <div className="container">

        <div className="d-flex justify-content-between align-items-center">
          <h2>{service?.title}</h2>
          <ol>
            <li><a href="index.html">Home</a></li>
            <li>Inner Page</li>
          </ol>
        </div>

      </div>
    </section>{/* End Breadcrumbs */}

    <section className="inner-page">
      <div className="container">
        <p>
        {service?.description}
        </p>
        <p>
        {service?.features}
        </p>
      </div>
    </section>

  </main>
    </div>
  )
}

export default SingleService