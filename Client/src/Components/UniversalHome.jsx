import React from 'react'
import { Button } from 'react-bootstrap'
import "./Styles/UniversalHome.css"
export default function UniversalHome() {
  return (
    <div className="home-page">
      <div className="sh-header-section">
        <h1 className='sh-head'>𝙴𝚍𝚞 𝚆𝚘𝚛𝚕𝚍</h1>
        <p className='sh-tag'>Welcome to our site</p>
        <p className='puo'>At EduWorld, we believe in fostering a dynamic learning environment where every student can thrive academically, socially, and personally. Our online platform serves as a gateway to our vibrant community, offering a wealth of resources and opportunities for students, parents, and educators alike.
        </p>
        <Button className='button-cm'>Start Your Journey With Us</Button>
      </div>
      <div className="info-section" >
        <div className="info-box" >
          <span className="icon">👩‍🏫</span> {/* Replace with actual icons */}
          <Button className='sh-buttons-a' style={{letterSpacing:"2px",borderRadius:"0.2rem"}}>Dedicated Faculty</Button>
        </div>
        <div className="info-box">
          <span className="icon">📚</span> {/* Replace with actual icons */}
          <Button className='sh-buttons-b' style={{letterSpacing:"2px",borderRadius:"0.2rem"}}>Academic Excellence</Button>
        </div>
        <div className="info-box">
          <span className="icon">👨‍🎓</span> {/* Replace with actual icons */}
          <Button className='sh-buttons-c' style={{letterSpacing:"2px",borderRadius:"0.2rem"}}>Holistic Education</Button>
        </div>
      </div>
    </div>
  )
}
