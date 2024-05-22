import React from 'react';
import { PDFDownloadLink, Document, Page, Text } from '@react-pdf/renderer';

const MyDocument = ({ resumeData }) => (
  <Document>
    <Page>
  <Text>{resumeData.firstName} {resumeData.lastName}</Text>
  <Text>Email: {resumeData.email}</Text>
  <Text>Phone: {resumeData.phone}</Text>
  <Text>City: {resumeData.city}</Text>
  <Text>Country: {resumeData.country}</Text>

  <Text>Professional Summary:</Text>
  <Text>{resumeData.professionalSummary}</Text>

  <Text>Experience:</Text>
  {resumeData.experiences && resumeData.experiences.map((exp, index) => (
    <React.Fragment key={index}>
      <Text>{exp.role}</Text>
      <Text>{exp.description}</Text>
    </React.Fragment>
  ))}

  <Text>Education:</Text>
  {resumeData.education && resumeData.education.map((edu, index) => (
    <React.Fragment key={index}>
      <Text>{edu.course}</Text>
      <Text>{edu.description}</Text>
    </React.Fragment>
  ))}

  <Text>Skills:</Text>
  {resumeData.skills && resumeData.skills.map((skill, index) => (
    <Text key={index}>{skill}</Text>
  ))}

  <Text>Projects:</Text>
  {resumeData.projects && resumeData.projects.map((project, index) => (
    <React.Fragment key={index}>
      <Text>{project.title}</Text>
      <Text>{project.description}</Text>
    </React.Fragment>
  ))}

  <Text>Achievements:</Text>
  {resumeData.achievements && resumeData.achievements.map((achievement, index) => (
    <React.Fragment key={index}>
      <Text>{achievement.companyName}</Text>
      <Text>{achievement.job}</Text>
    </React.Fragment>
  ))}
</Page>

  </Document>
);

const Downloading = ({ resumeData }) => (
  <PDFDownloadLink document={<MyDocument resumeData={resumeData} />} fileName="resume.pdf">
    {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download PDF')}
  </PDFDownloadLink>
);

export default Downloading;
