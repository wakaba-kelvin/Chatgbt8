import React from 'react'
import './Navbar.scss'
import { useState } from 'react'

function Navbar() {

  const [isActive, setIsActive] = useState('home')

  return (
    <div className="navbar">
      <div className="logo">
        <h3>GBT8</h3>
      </div>
      <div className="center">
        <div className="home">Home</div>
        <div className="chat">What is GPT</div>
        <div className="open-ai">Open AI</div>
        <div className="casestudies">Case Studies</div>
        <div className="library">Library</div>
        </div>
        <div className="signup">
          <div className="signin">
            <p>Sign in</p>
          </div>
          <div className="register">
            <button>Sign up</button>
          </div>
        </div>
    </div>
  )
}

export default Navbar