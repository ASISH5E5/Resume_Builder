import React, { useEffect, useState } from 'react';
import { db } from '../Firebase';
import { doc, getDoc } from 'firebase/firestore'; // Import Firestore methods
import { useParams } from 'react-router-dom';
import html2pdf from 'html2pdf.js'; // Import html2pdf library
import Downloading from './Downloading';

const PR1 = () => {
  const { email } = useParams();
  const [resumeData, setResumeData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resumeDocRef = doc(db, 'resume', email);
        const resumeDocSnapshot = await getDoc(resumeDocRef);

        if (resumeDocSnapshot.exists()) {
          const emailDoc = resumeDocSnapshot.data();
          setResumeData(emailDoc);
          console.log('Data fetched successfully:', emailDoc);
        } else {
          console.log('No document found for email:', email);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [email]);

  

  const downloadPDFResume = () => {
    const element = document.getElementById('resume-display');
    html2pdf().from(element).save('resume.pdf');
  };

  if (!resumeData) {
    return <div>No data found for the provided email.</div>;
  }
  const styles = {
    resumeDisplay: {
      width: '100%',
      margin:'10px auto',
      height: '900px',
      backgroundColor: 'white',
      borderLeft: '19px solid rgb(22, 205, 255)',
      boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.3)', 

      overflow: 'hidden',
     
    },
    resumepage: {
      backgroundColor: 'white',
      margin: '0',
      padding: '0',
      overflow: 'hidden',
    },
    dpers: {
      display: 'grid',
      gridTemplateColumns: '40% 50%',
      textAlign:'left',
      height:'auto',
      margin:'10px 10px 0px 20px'
    },
  
    dpersH1: {
      fontSize: '35px',
      fontFamily: "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
      color: 'rgb(22, 205, 255)',
      margin: '30px 10px -30px 0px',
    },
    dpersH3: {
      fontSize: '23px',
      fontFamily: "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
      color: 'rgb(54, 68, 72)',
      margin: '10px 10px -20px 0px',
    },
    dpersP: {
        width: '90%',
        height: 'auto',
        margin: '10px 0px 20px 10px',
        float: 'left',
        fontSize: '17px',
        textAlign: 'justify',
        fontFamily: 'Georgia, \'Times New Roman\', Times, serif',
      },
      shead: {
        height: '40px',
        width: '200px',
        fontSize: '25px',
        margin: '-25px 0px 5px 0px',
        float: 'left',
        color: 'rgb(0, 137, 228)',
      
      },
      dhead: {
        height: '40px',
        width: '200px',
        fontSize: '25px',
        margin: '2px 0px -5px 40px',
        float: 'left',
        textAlign:'left',
        color: 'rgb(0, 137, 228)',
      
      },
      
    dprof: {
      margin: '-20px 0px 0px 0px',
    },
    dname: {
        margin: '-20px 0px 0px 20px',
        minHeight: '250px',
      },
      
      dpersDetails: {
        
        justifyContent: 'space-between',
        lineHeight: '2',
        width:'100%',
        textAlign:'left',
        overflow:'hidden',
        margin: '0px 0px -26px 60px',
      },
    shr: {
      backgroundColor: 'rgb(0, 145, 255)',
      height: '2px',
      margin: '20px 0px 0px 0px',
      width: '100%',
    },
    hr: {
        backgroundColor: 'rgb(0, 145, 255)',
        height: '2px',
        margin: '-20px 0px -5px 0px',
        width: '100%',
      },
    dobj: {
      width: '97%',
      height: 'auto',
      lineHeight: '1.4',
      margin: '0px 0px 0px 5px',
      float: 'left',
      fontSize: '17px',
      
      fontFamily: 'Georgia, \'Times New Roman\', Times, serif',
    },
    dexpLi: {
      fontSize: '18px',
      fontFamily: 'Georgia, \'Times New Roman\', Times, serif',
      fontWeight: 'bold',
      margin: '0px 0px 5px -10px',
      listStyle: 'disc',
    },
    dexps: {
      width: '90%',
      textAlign: 'justify',
      height: 'auto',
      margin: '-10px 50px 0px 50px',
      display:'grid',
      gridTemplateColumns:'50% 50%',
      
      float: 'left',
      fontFamily: 'Georgia, \'Times New Roman\', Times, serif',
    },
    dexpsP: {
      fontSize: '16px',
      margin: '0px 90px 10px 10px',
      width: '90%',
      textAlign: 'justify',
      float: 'left',
      fontFamily: 'Georgia, \'Times New Roman\', Times, serif',
    },
    dedu: {
      width: '1000px',
      height: 'auto',
      margin: '0px 0px 20px 0px',
      textAlign: 'left',
      float: 'left',
    },
    dedusLi: {
      width: '48%',
      height: 'auto',
      fontSize: '40px',
      fontWeight: 'bold',
      color: 'black',
      margin: '10px 10px 10px 10px',
    },
    liedu: {
        fontSize: '18px',
        fontFamily: 'Georgia, \'Times New Roman\', Times, serif',
        fontWeight: 'bold',
        margin: '0px 0px 5px -10px',
        listStyle: 'disc',
    },
    dskl: {
      height: 'auto',
      width: '90%',
      margin: '0px 0px 0px -20px',
      float: 'left',
    },
    dsklLi: {
      width: '200px',
      height: '20px',
      textAlign: 'left',
      margin: '-5px 20px 10px 120px',
      fontSize: '18px',
      listStyle: 'disc',
      display:'grid',
      gridTemplateColumns:'200px 200px',
      

      fontFamily: 'Georgia, \'Times New Roman\', Times, serif',
    },
    dprcs: {
      width: '100%',
      textAlign: 'left',
      height: 'auto',
      margin: '20px 0px 0px 70px',
      float: 'left',
      fontFamily: 'Georgia, \'Times New Roman\', Times, serif',
    },
    dprcsLi: {
      fontSize: '18px',
      fontFamily: 'Georgia, \'Times New Roman\', Times, serif',
      fontWeight: 'bold',
      margin: '-25px 0px -100px -10px',
      listStyle: 'disc',
      width:'450px'
    },
    dprcsUl: {
      margin: '50px 0px -100px -10px',
    },
    dprcsP: {
      fontSize: '16px',
      margin: '-25px 90px 0px 10px',
      width: '350px',
      textAlign: 'justify',
    },
    dach: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'flex-start',
      marginTop: '18px',
    },
    dachs: {
      margin: '0px 50px 0px 70px',
      width: '400px',
    },
    dachsLi: {
      fontSize: '18px',
      fontFamily: 'Georgia, \'Times New Roman\', Times, serif',
      fontWeight: 'bold',
      margin: '-20px 0px 5px -10px',
      width: '350px',
     
      listStyle: 'disc',
      float: 'left',
      textAlign: 'left',
    },
    dachP: {
      fontSize: '16px',
      margin: '0px 90px 5px 10px',
      width: '350px',
      textAlign: 'justify',
    },
    down: {
      height: '40px',
      width: 'auto',
      backgroundColor: 'rgb(0, 255, 255)',
      fontSize: '20px',
      pointerEvents: 'painted',
    },
  };
    return (
      <center>
        <div style={styles.resumepage} id='resume-container'>
          <div style={styles.resumeDisplay} id='resume-display'>
            <div style={styles.dpers}>
              <div className='name' style={styles.dname}>
                <h1 style={styles.dpersH1}>{resumeData.firstName} <br/>{resumeData.lastName}</h1><br />
                <h3 style={styles.dpersH3}>-{resumeData.title}</h3>
              </div>
              <div className='details' style={styles.dpersDetails}>
              <p style={{ ...styles.dpersP, fontSize: '14px' }}>
                <strong style={{ color: 'gray' }}>Email: </strong><span style={{ fontWeight: 'bold' }}>{resumeData.email}</span>,<br />
                <strong style={{ color: 'gray' }}>Phone: </strong><span style={{ fontWeight: 'bold' }}>{resumeData.phone}</span>,<br />
                <strong style={{ color: 'gray' }}>City: </strong><span style={{ fontWeight: 'bold' }}>{resumeData.city}</span>,<br />
                <strong style={{ color: 'gray' }}>Country: </strong><span style={{ fontWeight: 'bold' }}>{resumeData.country}</span>.
              </p>
                <div style={styles.shead}>SUMMARY</div><br /><hr style={styles.shr} />
                <p style={styles.dobj}>{resumeData.professionalSummary}</p><br />
              </div>
            </div>
    
            <div style={styles.dexp} className='desc'>
              <div style={styles.dhead}>Experience</div><br /><hr style={styles.hr} /><br />
              {resumeData.experiences && resumeData.experiences.map((exp, index) => (
                <ul style={styles.dexps} key={index}>
                  <div>
                    <li style={styles.dexpLi}>{exp.role}</li><br />
                    <p style={styles.dexpsP}>-{exp.description}</p>
                  </div>
                </ul>
              ))}
            </div><br /><br />
    
            <div style={styles.dhead}>Education</div>
            <hr style={styles.hr} /><br />
            <div style={styles.dexp} className='dsec'>
              {resumeData.education && resumeData.education.map((edu, index) => (
                <ul style={styles.dexps} key={index}>
                  <div>
                    <li style={styles.liedu}>{edu.course}</li><br />
                    <p style={styles.dexpsP}>-{edu.description}</p>
                  </div>
                </ul>
              ))}
            </div><br />
    
            <div style={styles.dhead}>Skills</div><br />
            <hr style={styles.hr} /><br />
            <div style={styles.dskills}>
              <ul style={styles.dskl}>
                {resumeData.skills && resumeData.skills.map((skill, index) => (
                  <li style={styles.dsklLi} key={index}>{skill}</li>
                ))}
              </ul>
            </div>
    
            <div style={styles.dprj} className='dsec'>
              <div style={styles.dhead}>Projects</div><br />
              <hr style={styles.hr} /><br />
              {resumeData.projects && resumeData.projects.map((project, index) => (
                <ul style={styles.dprcs} key={index}>
                  <div>
                    <li style={styles.dprcsLi}>{project.title}</li><br /><br />
                    <p style={styles.dprcsP}>{project.description}</p><br />
                  </div>
                </ul>
              ))}
            </div>
    
            <div style={styles.dhead}>Achievements</div><br />
            <hr style={styles.hr} /><br />
            <div style={styles.dach} className='dsec'>
              {resumeData.achievements && resumeData.achievements.map((achievement, index) => (
                <ul style={styles.dachs} key={index}>
                  <div>
                    <li style={styles.dachsLi}>{achievement.companyName}</li><br />
                    <p style={styles.dachP}>{achievement.job}</p><br />
                  </div>
                </ul>
              ))}
            </div>
          </div>
          <button style={styles.down} onClick={downloadPDFResume}>
        Download Resume PDF
      </button>
          <Downloading resumeData={resumeData} />
        </div>
      </center>
    );
  
  };
  
  export default PR1;
  