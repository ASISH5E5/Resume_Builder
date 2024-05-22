import React from 'react'
import { Link } from 'react-router-dom'
import './Home.css'
import Slideshow from './Slideshow'
import data from './Tempates.json'
import Image from './resumeicon.png'
import { useLocation } from 'react-router-dom';

const Home = () => {
  const location = useLocation();
  const email = location.state?.email;
  return (
    <div>
      <div className='header'>
        <h2 className='logo'><img src={Image} alt="Resume Builder Logo" className='log'/>Resume Builder</h2>
        <ul className='listelements'>
          <li> <a href='#head'>Home</a> </li>
          <li><a href='#prof'>Professional</a></li>
          <li><a href='#modern'>Modern</a></li>
          <li><a href='#about'>About</a></li>
          <li><Link to={`/profile/${email}`}>Profile</Link></li>
          <li><a href='/signup'>Signup</a></li>
          <li></li>
        </ul>
      </div>
      
      <div className='mid'>
        <div className='slideshow'>
          <Slideshow/>
        </div>
      </div>
      

      <div className='profes' id='profes'>
        <div className='subhead'>Professional </div><br/>
        <div className='second'>
          <div className='insp'>
            <p>"In the competitive realm of professionalism, your resume should be a beacon of your accomplishments. Choose from our professional templates to make your mark."</p>
          </div>
          <div className='contain'>
          <div className='boxes'>
          {data.prof.map((item) => (
            <div className='box' key={item.id}>
              <Link to={`/prof/${email}`}>
  <img src={item.image} alt={`Modern Template ${item.id}`} />
</Link>

            </div>
          ))}
          </div>
          </div>
        </div>
      </div>

      <div className='modern' id='modern'>
        <div className='subhead'>Modern </div><br/>
        <div className='insp'>
          <p>"Step into the modern era of resume building. Our templates blend cutting-edge design with substance, ensuring your resume stands out in a crowd."</p>
        </div>
        <div className='boxes'>
          {data.modern.map((item) => (
            <div className='box' key={item.id}>
              <Link to={`/home/${email}`}>
  <img src={item.image} alt={`Modern Template ${item.id}`} />
</Link>

            </div>
          ))}
        </div>
      </div>

      <div className='about' id='about'>
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
