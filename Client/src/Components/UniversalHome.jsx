import React from 'react'
import "./Styles/UniversalHome.css"
export default function UniversalHome() {
  return (
    <div className="home-page">
      <div className="sh-header-section">
        <h1 className='sh-head'>𝙴𝚍𝚞 𝚆𝚘𝚛𝚕𝚍</h1>
        <p className='sh-tag'>Welcome to our site</p>
        <p className='puo'>At EduWorld, we believe in fostering a dynamic learning environment where every student can thrive academically, socially, and personally. Our online platform serves as a gateway to our vibrant community, offering a wealth of resources and opportunities for students, parents, and educators alike.
        </p>
        <button className='button-cm'>Start Your Journey With Us</button>
      </div>
      <div className="info-section">
        <div className="info-box">
          <span className="icon">👩‍🏫</span> {/* Replace with actual icons */}
          <button className='sh-buttons-a'>Dedicated Faculty</button>
        </div>
        <div className="info-box">
          <span className="icon">📚</span> {/* Replace with actual icons */}
          <button className='sh-buttons-b'>Academic Excellence</button>
        </div>
        <div className="info-box">
          <span className="icon">👨‍🎓</span> {/* Replace with actual icons */}
          <button className='sh-buttons-c'>Holistic Education</button>
        </div>
      </div>
    </div>
  )
}
