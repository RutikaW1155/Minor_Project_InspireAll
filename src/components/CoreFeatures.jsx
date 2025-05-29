import React from 'react';
import './CoreFeatures.css';
import { FaComments, FaGlobe, FaTools, FaStore, FaUsers, FaStar } from 'react-icons/fa';

function CoreFeatures() {
  const features = [
    {
      title: "AI Chatbot for Business Help",
      icon: <FaComments />,
      img: "https://support.cc/images/blog/chatbot-customer-service.png?v=1682512742702523116",
      desc: "Get personalized business advice from our AI-powered assistant in your language.",
    },
    {
      title: "Multilingual & Voice Support",
      icon: <FaGlobe />,
      img: "https://support.cc/images/blog/chatbot-customer-service.png?v=1682512742702523116",
      desc: "Access all resources in your preferred regional language with voice support.",
    },
    {
      title: "Business Development Tools",
      icon: <FaTools />,
      img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      desc: "Learn essential skills and access tools to grow your business sustainably.",
    },
    {
      title: "Local Marketplace",
      icon: <FaStore />,
      img: "https://images.unsplash.com/photo-1556740772-1a741367b93e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      desc: "Connect with local suppliers and sell your products to a wider audience.",
    },
    {
      title: "Community Building",
      icon: <FaUsers />,
      img: "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      desc: "Connect with fellow entrepreneurs for support, collaboration, and growth.",
    },
    {
      title: "Government Schemes",
      icon: <FaStar />,
      img: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      desc: "Discover and apply for relevant government schemes and support programs.",
    },
  ];
  return (
    <section className="core-features">
      <h2 className="section-title">Core Features</h2>
      <div className="features">
        {features.map((feature, idx) => (
          <div className="feature" key={idx}>
            <div className="feature-icon">{feature.icon}</div>
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.desc}</p>
            <div className="feature-image-placeholder">
              <img src="/images/placeholder.png" alt={feature.title} className="feature-image" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CoreFeatures;