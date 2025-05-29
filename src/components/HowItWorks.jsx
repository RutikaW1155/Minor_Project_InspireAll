import React from 'react';
import './HowItWorks.css';

function HowItWorks() {
  const steps = [
    { id: 1, title: "Sign Up & Select Language", img: "https://img.freepik.com/free-vector/languages-concept-illustration_114360-19548.jpg?semt=ais_hybrid&w=800", desc: "Create your account using phone, email, or voice call and choose from 9+ Indian languages." },
    { id: 2, title: "Get Personalized Guidance", img: "/images/step2.png", desc: "Receive AI-powered business advice, access learning resources, and discover government schemes." },
    { id: 3, title: "Grow Your Business", img: "/images/step3.png", desc: "Connect with the marketplace, join the community, and scale your rural business." },
  ];

  return (
    <section className="how-it-works">
      <h2 className="section-title">How InspireAll Works</h2>
      <p className="section-description">Our platform makes it easy for rural entrepreneurs to grow their businesses with AI-powered guidance.</p>
      <div className="cards">
        {steps.map(step => (
          <div className="card" key={step.id}>
            <div className="step-circle">
              <span className="step">{step.id}</span>
            </div>
            <h3 className="card-title">{step.title}</h3>
            <p className="card-description">{step.desc}</p>
            <div className="card-image-placeholder">
              <img src={step.img} alt={step.title} className="card-image" />
            </div>
          </div>
        ))}
      </div>
      <button className="btn purple">Learn More →</button>
    </section>
  );
}

export default HowItWorks;