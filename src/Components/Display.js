import React, { useEffect, useState } from 'react';
import { db } from '../Firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import html2pdf from 'html2pdf.js';
import './Display.css';

const Display = () => {
  const { email } = useParams();
  const [resumeData, setResumeData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!email) {
          console.error('Email is undefined.');
          return;
        }
        const q = query(collection(db, 'resume'), where('email', '==', email));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.size === 0) {
          console.log('No matching documents.');
          setResumeData(null);
        } else {
          querySnapshot.forEach((doc) => {
            // Assuming there is only one document for a given email
            setResumeData(doc.data());
          });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [email]);

  const handleDownload = () => {
    const element = document.getElementById('resume-container'); // Ensure you have an ID on your container
  
    html2pdf(element, {
      margin: 10,
      filename: 'resume.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    });
  };
  

  if (!resumeData) {
    return <div>No data found for the provided email.</div>;
  }

  return (
    <center>
      <div className='resumepage' id='resume-container'>
        <div className="resume-display"  id='resume-container'>
          <div className='dpers dsec'>
            <div className='dimage'>
              <img src={resumeData.image} alt='Profile' />
            </div>
            <div className='details'>
              <h1 className='name'>{resumeData.firstName} {resumeData.lastName}</h1><br/>
              <h3>-{resumeData.title}</h3>
              <p><strong>Email: </strong>{resumeData.email}, <br/><strong>Phone : </strong>{resumeData.phone},</p>
              <p><strong>City : </strong> {resumeData.city},{resumeData.country}.</p>
            </div>
          </div> 

          <div className='dprof dsec'>
            <div className='dhead'>Objective</div><br/>
            <hr/>
            <p className='dobj'>{resumeData.professionalSummary}</p><br/>
          </div>

          <div className='dexp desc'>
            <div className='dhead'>Experience</div><br/><hr/><br/>
            {resumeData.experiences && resumeData.experiences.map((exp, index) => (
              <ul className='dexps' key={index}>
                <div>
                  <li>{exp.role}</li><br/>
                  <p>-{exp.description}</p>
                </div>
              </ul>
            ))}
          </div><br/><br/>

          <div className='dhead'>Education</div><br/>
          <hr/><br/>
          <div className='dexp dsec'>
            {resumeData.education && resumeData.education.map((edu, index) => (
              <ul className='dexps' key={index}>
                <div>
                  <li className='liedu'>{edu.course}</li><br/>
                  <p>-{edu.description}</p>
                </div>
              </ul>
            ))}
          </div><br/>

          <div className='dhead'>Skills</div><br/>
          <hr/><br/>
          <div className='dskills'>
            <ul className='dskl'>
              {resumeData.skills && resumeData.skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>

          <div className='dprj dsec'>
            <div className='dhead'>Projects</div><br/>
            <hr/><br/>
            {resumeData.projects && resumeData.projects.map((project, index) => (
              <ul className='dprcs' key={index}>
                <div>
                  <li>{project.title}</li><br/><br/>
                  <p>{project.description}</p><br/>
                </div>
              </ul>
            ))}
          </div>

          <div className='dhead'>Achievements</div><br/>
          <hr/><br/>
          <div className='dach dsec'>
            {resumeData.achievements && resumeData.achievements.map((achievement, index) => (
              <ul className='dachs' key={index}>
                <div>
                  <li>{achievement.companyName}</li><br/>
                  <p>{achievement.job}</p><br/>
                </div>
              </ul>
            ))}
          </div>
        </div>
        <button className='down' onClick={handleDownload}>Download</button>
      
      </div>
    </center>
  );
};

export default Display;
