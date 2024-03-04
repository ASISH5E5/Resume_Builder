import React, { useState, useEffect } from 'react';
import { db } from '../Firebase';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import './Resume.css';

const ResumeBuilder = () => {
  const history = useNavigate();
  const [data, setdata] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    title: '',
    professionalSummary: '',
    experiences: [{ role: '', description: '' }],
    skills: [''],
    achievements: [{ companyName: '', job: '' }],
    projects: [{ title: '', description: '' }],
    education: [{ course: '', description: '' }],
    image: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (data.email) {
          const emailQuery = query(collection(db, 'resume'), where('email', '==', data.email));
          const emailQuerySnapshot = await getDocs(emailQuery);
  
          if (emailQuerySnapshot.size > 0) {
            const emailDoc = emailQuerySnapshot.docs[0].data();
            setdata((prevData) => ({ ...prevData, ...emailDoc }));
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [data.email]);
  
  const handleChange = (field, value, index, subField) => {
    setdata((prevData) => {
      const newData = { ...prevData };

      if (field === 'experiences' && index !== undefined) {
        if (!newData.experiences[index]) {
          newData.experiences[index] = {};
        }
        newData.experiences[index][subField] = value;
      } else if (field === 'skills' && index !== undefined) {
        newData.skills[index] = value;
      } else if (field === 'achievements' && index !== undefined) {
        if (!newData.achievements[index]) {
          newData.achievements[index] = {};
        }
        newData.achievements[index][subField] = value;
      } else if (field === 'projects' && index !== undefined) {
        if (!newData.projects[index]) {
          newData.projects[index] = {};
        }
        newData.projects[index][subField] = value;
      } else if (field === 'education' && index !== undefined) {
        if (!newData.education[index]) {
          newData.education[index] = {};
        }
        newData.education[index][subField] = value;
      } else {
        newData[field] = value;
      }

      return newData;
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setdata((prevData) => ({
        ...prevData,
        image: reader.result,
      }));
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleAddField = (field) => {
    setdata((prevData) => {
      const newData = { ...prevData };

      if (field === 'experiences') {
        newData.experiences = [...newData.experiences, { role: '', description: '' }];
      } else if (field === 'skills') {
        newData.skills = [...newData.skills, ''];
      } else if (field === 'achievements') {
        newData.achievements = [...newData.achievements, { companyName: '', job: '' }];
      } else if (field === 'projects') {
        newData.projects = [...newData.projects, { title: '', description: '' }];
      } else if (field === 'education') {
        newData.education = [...newData.education, { course: '', description: '' }];
      }

      return newData;
    });
  };

  const handleDeleteField = (field, index) => {
    setdata((prevData) => {
      const newData = { ...prevData };

      if (field === 'experiences') {
        newData.experiences.splice(index, 1);
      } else if (field === 'skills') {
        newData.skills.splice(index, 1);
      } else if (field === 'achievements') {
        newData.achievements.splice(index, 1);
      } else if (field === 'projects') {
        newData.projects.splice(index, 1);
      } else if (field === 'education') {
        newData.education.splice(index, 1);
      }

      return newData;
    });
  };

  const submithandler = async (e) => {
    e.preventDefault();

    if (data.firstName !== '' && data.email !== '') {
      await addDoc(collection(db, 'resume'), {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        country: data.country,
        city: data.city,
        title: data.title,
        professionalSummary: data.professionalSummary,
        experiences: data.experiences,
        skills: data.skills,
        achievements: data.achievements,
        projects: data.projects,
        education: data.education,
        image: data.image,
        completed: false,
      });

      setdata({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        city: '',
        country: '',
        title: '',
        professionalSummary: '',
        experiences: [{ role: '', description: '' }],
        skills: [''],
        achievements: [{ companyName: '', job: '' }],
        projects: [{ title: '', description: '' }],
        education: [{ course: '', description: '' }],
        image: null,
      });

      history(`/home/${data.email}`);
    }
  };


  return (
    <div className="resume-builder">


      <div  className='section1 pers'>
    <h1>Personal Details_________________________________________</h1>
        <input  type="text" placeholder='First Name' className='left'  value={data.firstName}  onChange={(e) => handleChange('firstName', e.target.value)}  />
        <input  type="text"  placeholder='Last Name' className='right'  value={data.lastName}  onChange={(e) => handleChange('lastName', e.target.value)}  />
        <input type="email" placeholder='Email' value={data.email} className='left' onChange={(e) => handleChange('email', e.target.value)}  />
        <input type="number" placeholder='Mobile No.' value={data.phone} className='right' onChange={(e) => handleChange('phone', e.target.value)}  />
        <input type="text" placeholder='City' value={data.city} className='right' onChange={(e) => handleChange('city', e.target.value)}  />
        <input type="text" placeholder='Country' value={data.country} className='left' onChange={(e) => handleChange('country', e.target.value)}  />
  <div className='fimage'><input type="file" accept="image/*" onChange={handleImageChange} /><p>Please upload your Image here...</p></div>
      </div><br></br>
      <div className='section1 title'>
      <h1>Title__________________________________________________</h1>
        <label className='title'>Title:</label>
      <input  type="text"  className='left'  value={data.title}  onChange={(e) => handleChange('title', e.target.value)}  />

      </div>
      <div  className='section1 prof'>
      <h1>Professional Summary____________________________________</h1><br/>
      <label className='ob'>Objective:</label><br></br>
      <textarea
        value={data.professionalSummary}
        onChange={(e) => handleChange('professionalSummary', e.target.value)}
      ></textarea>
      </div>
      <div  className='section1 exp'>
      <h1>Experience_____________________________________________</h1>
      {data.experiences.map((exp, index) => (
        <div key={index}>
          <label>Role:</label>
          <input
            type="text"
            value={exp.role}
            onChange={(e) => handleChange('experiences', e.target.value, index, 'role')}
          />

          <label className='desc'>Description:</label><br/>
          <textarea
            value={exp.description}
            onChange={(e) => handleChange('experiences', e.target.value, index, 'description')}
          ></textarea>

          <button onClick={() => handleDeleteField('experiences', index)} className='del'>Delete</button>
        </div>
      ))}
      <button onClick={() => handleAddField('experiences')} className='add'>Add</button>
</div>
<div className='skhead'><h1>Skills_________________________________________________</h1></div>
<div  className='section1 skill'>
      
      {data.skills.map((skill, index) => (
        <div className='skills' key={index}>
          <input
            type="text"
            value={skill}
            onChange={(e) => handleChange('skills', e.target.value, index)}
          />
          <button onClick={() => handleDeleteField('skills', index)} className='del'>Delete</button>
        </div>
      ))}
      
</div>

<div  className='section1 exp'>
<button onClick={() => handleAddField('skills')} className='add'>Add</button>
      <h1>Education_____________________________________________</h1>
      {data.education.map((edu, index) => (
        <div key={index}>
          <label>Course:</label>
          <input
            type="text"
            value={edu.course}
            onChange={(e) => handleChange('education', e.target.value, index, 'course')}
          />

          <label className='desc'>Description:</label><br/>
          <textarea
            value={edu.description}
            onChange={(e) => handleChange('education', e.target.value, index, 'description')}
          ></textarea>

          <button onClick={() => handleDeleteField('education', index)} className='del'>Delete</button>
        </div>
      ))}
      <button onClick={() => handleAddField('education')} className='add'>Add</button>
</div>
{/* Achievements section */}
<div className='section1 ach'>
        <h1>Achievements___________________________________________</h1>
        {data.achievements.map((ach, index) => (
          <div key={index}>
            <label>Company Name:</label><br/>
            <input
              type="text"
              value={ach.companyName}
              onChange={(e) => handleChange('achievements', e.target.value, index, 'companyName')}
            /><br/>

            <label>Job:</label><br/><br/>
            <input
              type="text"
              className='job'
              value={ach.job}
              onChange={(e) => handleChange('achievements', e.target.value, index, 'job')}
            />

            <button onClick={() => handleDeleteField('achievements', index)} className='del'>Delete</button>
          </div>
        ))}
        <button onClick={() => handleAddField('achievements')} className='add'>Add</button>
      </div>

 {/* Projects section */}
 <div className='section1 pro'>
        <h1>Projects</h1>
        {data.projects.map((project, index) => (
          <div key={index}>
            <label>Title:</label>
            <input
              type="text"
              value={project.title}
              onChange={(e) => handleChange('projects', e.target.value, index, 'title')}
            /><br/>

            <label>Description:</label><br/>
            <textarea
              value={project.description}
              onChange={(e) => handleChange('projects', e.target.value, index, 'description')}
            ></textarea>

            <button onClick={() => handleDeleteField('projects', index)} className='del'>Delete</button>
          </div>
        ))}
        <button onClick={() => handleAddField('projects')} className='add'>Add</button>
      </div>


      <button onClick={submithandler} className='submit'>Submit</button>
      <div>
    </div>
    </div>
  );
};

export default ResumeBuilder;
