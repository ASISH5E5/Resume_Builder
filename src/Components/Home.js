import React from 'react'
import { Link } from 'react-router-dom'
import './Home.css'
import Slideshow from './Slideshow'
import data from './Tempates.json'
import Image from './resumeicon.png'

const Home = () => {
  return (
    <div>
      <div className='header'>
        <h2 className='logo'><img src={Image} alt="Resume Builder Logo" className='log'/>Resume Builder</h2>
        <ul className='listelements'>
          <li>Home</li>
          <li>Professional</li>
          <li>Modern</li>
          <li>About</li>
          <li></li>
        </ul>
      </div>
      
      <div className='mid'>
        <div className='slideshow'>
          <Slideshow/>
        </div>
      </div>

      <div className='prof'>
        <div className='subhead'>Professional </div><br/>
        <div className='second'>
          <div className='insp'>
            <p>"In the competitive realm of professionalism, your resume should be a beacon of your accomplishments. Choose from our professional templates to make your mark."</p>
          </div>
          <div className='boxes'>
            {data.prof.map((item) => (
              <div className='box' key={item.id}>
                <img src={item.image} alt={`Professional Template ${item.id}`} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='modern'>
        <div className='subhead'>Modern </div><br/>
        <div className='insp'>
          <p>"Step into the modern era of resume building. Our templates blend cutting-edge design with substance, ensuring your resume stands out in a crowd."</p>
        </div>
        <div className='boxes'>
          {data.modern.map((item) => (
            <div className='box' key={item.id}>
              <Link to={`/form`}><img src={item.image} alt={`Modern Template ${item.id}`} /></Link>
            </div>
          ))}
        </div>
      </div>

      <div className='about'>
        <img src={Image} alt="Logo" className='log'/>
        <h1 className='logo'>Resume Builder</h1>
        <p>Asishkumar Pydi</p>
        <p>@Full Stack Developer</p>
        <p>Asishp5742@gmail.com</p>
      </div>
    </div>
  )
}

export default Home;
