import React from 'react';
import './HeroSection.css';
import { Link } from 'react-router-dom';

function HeroSection() {
  return (
    <section class="hero-section">
    <div class="hero-content">
      <h1 class="hero-title">Empowering every dream <span>with AI Automation</span></h1>
      <p class="hero-subtext">
        An AI-powered platform designed to empower rural entrepreneurs with personalized guidance, marketplace access, and financial literacy — in their own language.
      </p>
      <div class="hero-buttons">
        <button class="btn btn-purple">Get Started</button>
   <Link to="/multilingualchatbot">
          <button className="btn btn-green">Chat with InspireBot</button>
        </Link>   
             <button class="btn btn-outline">Join the Community</button>
      </div>
    </div>
  
    <div class="hero-image">
    <img
          src="https://static.startuptalky.com/2023/12/Rural-Business-Ideas-1.jpg"
          alt="Hero"
          className="image-animation"
        />    </div>
  </section>
  
  );
}

export default HeroSection;