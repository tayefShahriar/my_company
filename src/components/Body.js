import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { domain } from '../env'

function Body() {
  const [abouts, setabouts] = useState(null)
  const [service, setservice] = useState(null)
  const [portfolio, setportfolio] = useState(null)
  const [client, setclient] = useState(null)
  const [team, setteam] = useState(null)
  useEffect(() => {
    const getAbout = async() => {
      await axios({
        url: `${domain}/api/about/`,
        method: 'GET',
      }).then(response => {
        setabouts(response.data[0])
        console.log('about=====================', response.data)
      }).catch((error) => {
        console.log("about===========", error);
      })
    }
    const getService = async() => {
      await axios({
        url: `${domain}/api/services/`,
        method: 'GET',
      }).then(response => {
        setservice(response.data)
        console.log('services=====================', response.data)
      }).catch((error) => {
        console.log("services===========", error);
      })
    }
    const getPortfolio = async() => {
      await axios({
        url: `${domain}/api/portfolios/`,
        method: 'GET',
      }).then(response => {
        setportfolio(response.data)
        console.log('portfolios=====================', response.data)
      }).catch((error) => {
        console.log("portfolios===========", error);
      })
    }
    const getClient = async() => {
      await axios({
        url: `${domain}/api/client/`,
        method: 'GET',
      }).then(response => {
        setclient(response.data)
        console.log('client=====================', response.data)
      }).catch((error) => {
        console.log("client===========", error);
      })
    }
    const getTeam = async() => {
      await axios({
        url: `${domain}/api/team/`,
        method: 'GET',
      }).then(response => {
        setteam(response.data)
        console.log('team=====================', response.data)
      }).catch((error) => {
        console.log("team===========", error);
      })
    }
    getTeam()
    getClient()
    getAbout()
    getService()
    getPortfolio()
  }, [])
  return (
    <div>
        <main id="main">

{/* ======= Featured Services Section ======= */}
<section id="featured-services" className="featured-services section-bg">
  <div className="container">

    <div className="row no-gutters">
      <div className="col-lg-4 col-md-6">
        <div className="icon-box">
          <div className="icon"><i className="bi bi-laptop"></i></div>
          <h4 className="title"><a href="">Lorem Ipsum</a></h4>
          <p className="description">Voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident</p>
        </div>
      </div>
      <div className="col-lg-4 col-md-6">
        <div className="icon-box">
          <div className="icon"><i className="bi bi-briefcase"></i></div>
          <h4 className="title"><a href="">Dolor Sitema</a></h4>
          <p className="description">Minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat tarad limino ata</p>
        </div>
      </div>
      <div className="col-lg-4 col-md-6">
        <div className="icon-box">
          <div className="icon"><i className="bi bi-calendar4-week"></i></div>
          <h4 className="title"><a href="">Sed ut perspiciatis</a></h4>
          <p className="description">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur trade stravi</p>
        </div>
      </div>
    </div>

  </div>
</section>{/* End Featured Services Section */}

{/* ======= About Us Section ======= */}
<section id="about" className="about">
  <div className="container">

    <div className="section-title">
      <h2>About Us</h2>
      {/* <p>{abouts?.description}</p> */}
    </div>

    <div className="row">
      <div className="col-lg-6 order-1 order-lg-2">
        <img src={abouts?.image} className="img-fluid" alt=""/>
      </div>
      <div className="col-lg-6 pt-4 pt-lg-0 order-2 order-lg-1 content">
        <p className="fst-italic">
          {abouts?.description}
        </p>
        
      </div>
    </div>

  </div>
</section>{/* End About Us Section */}

{/* ======= Why Us Section ======= */}


{/* ======= Our Clients Section ======= */}
<section id="clients" className="clients">
  <div className="container">

    <div className="section-title">
      <h2>Our Clients</h2>
      {/* <p>Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit in iste officiis commodi quidem hic quas.</p> */}
    </div>

    <div className="clients-slider swiper">
    
      <div className="swiper-wrapper align-items-center">
      {
          client?.map((item, i) =>     
        <img height="100px" width="100px" src={item?.logo} className="img-fluid" alt=""/> 
        )  
      }
        </div>
      <div className="swiper-pagination"></div>
    </div>
  </div>
</section>{/* End Our Clients Section */}

{/* ======= Services Section ======= */}
<section id="services" className="services">
  <div className="container">

    <div className="section-title">
      <h2>Services</h2>
      {/* <p>Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit in iste officiis commodi quidem hic quas.</p> */}
    </div>

    <div className="row">
      {
          service?.map((item, i) => 
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

  </div>
</section>{/* End Services Section */}

{/* ======= Cta Section ======= */}
<section id="cta" className="cta">
  <div className="container">

    <div className="row">
      <div className="col-lg-9 text-center text-lg-start">
        <h3>Call To Action</h3>
        <p> Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </div>
      <div className="col-lg-3 cta-btn-container text-center">
        <a className="cta-btn align-middle" href="#">Call To Action</a>
      </div>
    </div>

  </div>
</section>{/* End Cta Section */}

{/* ======= Portfolio Section ======= */}
<section id="portfolio" className="portfolio">
  <div className="container">

    <div className="section-title">
      <h2>Portfolio</h2>
    </div>

    <div className="row">
      <div className="col-lg-12 d-flex justify-content-center">
      </div>
    </div>

    <div className="row portfolio-container">
      {
        portfolio?.map((item2, i)=>
      <div className="col-lg-4 col-md-6 portfolio-item filter-card">
        <div className="portfolio-wrap">
          <img key={i} src={item2?.image} className="img-fluid" alt={`${item2?.title}`}/>
          <div className="portfolio-info">
            <h4>{item2?.title}</h4>
            {/* <p>Card</p> */}
            <div className="portfolio-links">
              <a href={item2?.image} data-gallery="portfolioGallery" className="portfolio-lightbox" title={`${item2?.title}`}><i className="bx bx-plus"></i></a>
              <Link to={`/portfolio/${item2?.id}`} title="More Details"><i className="bx bx-link"></i></Link>
            </div>
          </div>
        </div>
      </div>
      )
    }
    </div>

  </div>
</section>{/* End Portfolio Section */}

{/* ======= Team Section ======= */}
<section id="team" className="team section-bg">
  <div className="container">

    <div className="section-title">
      <h2>Team</h2>
    </div>

    <div className="row">
      {
        team?.map((item, i)=>
      <div className="col-lg-4 col-md-6 d-flex align-items-stretch">
        <div className="member">
          <img src={item?.image} alt=""/>
          <h4>{item?.name}</h4>
          <span>{item?.designation}</span>
          <p>
            {item?.qualification}
          </p>
          <div className="social">
            <a href=""><i className="bi bi-twitter"></i></a>
            <a href=""><i className="bi bi-facebook"></i></a>
            <a href=""><i className="bi bi-instagram"></i></a>
            <a href=""><i className="bi bi-linkedin"></i></a>
          </div>
        </div>
      </div>
      )
      }
    </div>

  </div>
</section>{/* End Team Section */}

{/* ======= Contact Section ======= */}
<section id="contact" className="contact">
  <div className="container">

    <div className="section-title">
      <h2>Contact</h2>
      <p>Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit in iste officiis commodi quidem hic quas.</p>
    </div>

    <div className="row">

      <div className="col-lg-5 d-flex align-items-stretch">
        <div className="info">
          <div className="address">
            <i className="bi bi-geo-alt"></i>
            <h4>Location:</h4>
            <p>A108 Adam Street, New York, NY 535022</p>
          </div>

          <div className="email">
            <i className="bi bi-envelope"></i>
            <h4>Email:</h4>
            <p>info@example.com</p>
          </div>

          <div className="phone">
            <i className="bi bi-phone"></i>
            <h4>Call:</h4>
            <p>+1 5589 55488 55s</p>
          </div>
        
        {/* <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12097.433213460943!2d-74.0062269!3d40.7101282!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xb89d1fe6bc499443!2sDowntown+Conference+Center!5e0!3m2!1smk!2sbg!4v1539943755621" frameborder="0" style="border:0; width: 100%; height: 290px;"  allowfullscreen /> */}
        
        </div>

      </div>

      <div className="col-lg-7 mt-5 mt-lg-0 d-flex align-items-stretch">
        <form action="forms/contact.php" method="post" role="form" className="php-email-form">
          <div className="row">
            <div className="form-group col-md-6">
              <label htmlFor="name">Your Name</label>
              <input type="text" name="name" className="form-control" id="name" required />
            </div>
            <div className="form-group col-md-6 mt-3 mt-md-0">
              <label htmlFor="name">Your Email</label>
              <input type="email" className="form-control" name="email" id="email" required />
            </div>
          </div>
          <div className="form-group mt-3">
            <label htmlFor="name">Subject</label>
            <input type="text" className="form-control" name="subject" id="subject" required />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="name">Message</label>
            <textarea className="form-control" name="message" rows="10" required></textarea>
          </div>
          <div className="my-3">
            <div className="loading">Loading</div>
            <div className="error-message"></div>
            <div className="sent-message">Your message has been sent. Thank you!</div>
          </div>
          <div className="text-center"><button type="submit">Send Message</button></div>
        </form>
      </div>

    </div>

  </div>
</section>

</main>{/* End #main */}
    </div>
  )
}

export default Body