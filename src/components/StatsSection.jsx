import React from 'react';
import './StatsSection.css';

const StatsSection = () => {
  return (
    <section className="stats-container">
      <div className="stats-top">
        <div className="stat-item">
          <h2>10,000+</h2>
          <p>Rural Entrepreneurs</p>
        </div>
        <div className="stat-item">
          <h2>9+</h2>
          <p>Indian Languages</p>
        </div>
        <div className="stat-item">
          <h2>500+</h2>
          <p>Success Stories</p>
        </div>
        <div className="stat-item">
          <h2>50+</h2>
          <p>Government Schemes</p>
        </div>
      </div>

      <div className="start-journey">
        <h2>Ready to Start Your Journey?</h2>
        <p>Join thousands of entrepreneurs who are transforming their businesses with <strong>InspireAll</strong>.</p>
        <div className="journey-content">
          <ul className="features-list">
            <li>✅ Personalized business guidance in your language</li>
            <li>✅ Access to government schemes and funding opportunities</li>
            <li>✅ Connection to a community of like-minded entrepreneurs</li>
            <li>✅ Marketplace to sell your products and find suppliers</li>
          </ul>
          <div className="cta-box">
            <button className="cta-button">Get Started Today</button>
            <p className="note">No credit card required. Free to start.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
