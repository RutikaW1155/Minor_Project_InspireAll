// import React from 'react';
// import './BusinessInfo.css';

// const BusinessInfo = () => {
//   return (
//     <>
//       <header className="header">
//         <a href="#" className="logo">
//           <img src="/api/placeholder/40/40" alt="InspireAll Logo" />
//           <span>Inspire</span>All
//         </a>
//         <nav className="nav-links">
//           <a href="#">Profile</a>
//           <a href="#">Business Info</a>
//           <a href="#">Post</a>
//           <a href="#">Schemes</a>
//         </nav>
//         <div className="buttons">
//           <button className="btn btn-outline">Sign in</button>
//           <button className="btn btn-primary">Sign up</button>
//         </div>
//       </header>

//       <section className="hero">
//         <h1>Business Growth Strategies</h1>
//         <p>
//           Practical tips and resources to help rural entrepreneurs thrive in today's market —
//           accessible in your language and tailored to your unique journey.
//         </p>
//       </section>

//       <section className="content-section">
//         <h2 className="section-title">Essential Business Tips</h2>
//         <div className="cards-container">
//           {[
//             {
//               title: "Know Your Market",
//               text:
//                 "Understand your local customers and their needs. Conduct simple surveys in your community to identify gaps your business can fill. Track seasonal patterns to anticipate demand changes.",
//               iconColor: "yellow"
//             },
//             {
//               title: "Financial Literacy",
//               text:
//                 "Track your income and expenses daily. Separate personal and business finances. Build an emergency fund covering at least 3 months of expenses. Reinvest a percentage of profits back into your business.",
//               iconColor: "green"
//             },
//             {
//               title: "Digital Presence",
//               text:
//                 "Even small rural businesses benefit from online visibility. Use free social media tools to showcase your products. Join digital marketplaces to reach customers beyond your village or town.",
//               iconColor: "purple"
//             },
//             {
//               title: "Build Networks",
//               text:
//                 "Connect with other entrepreneurs in your region. Form cooperatives to share resources and knowledge. Participate in local markets and fairs to increase visibility and build relationships.",
//               iconColor: "orange"
//             }
//           ].map((card, idx) => (
//             <div className="card" key={idx}>
//               <div className={`card-icon ${card.iconColor}`}>
//                 <img src="/api/placeholder/80/80" alt={`${card.title} Icon`} />
//               </div>
//               <div className="card-content">
//                 <h3 className="card-title">{card.title}</h3>
//                 <p className="card-text">{card.text}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       <section className="content-section resources-section">
//         <h2 className="section-title">Scaling Your Business</h2>
//         <div className="cards-container">
//           {[
//             {
//               title: "Diversify Products",
//               text:
//                 "Add complementary products to your existing offerings. Look for ways to use by-products or waste materials. Create seasonal variations of your popular items to maintain customer interest.",
//               iconColor: "green"
//             },
//             {
//               title: "Train & Delegate",
//               text:
//                 "Document your processes to maintain quality as you grow. Train family members or trusted community members to handle specific tasks. Focus your time on high-value activities that drive growth.",
//               iconColor: "yellow"
//             },
//             {
//               title: "Strategic Partnerships",
//               text:
//                 "Partner with businesses that complement yours. Explore supply arrangements with nearby towns and cities. Consider franchise-like models to expand your reach without major investment.",
//               iconColor: "orange"
//             }
//           ].map((card, idx) => (
//             <div className="card" key={idx}>
//               <div className={`card-icon ${card.iconColor}`}>
//                 <img src="/api/placeholder/80/80" alt={`${card.title} Icon`} />
//               </div>
//               <div className="card-content">
//                 <h3 className="card-title">{card.title}</h3>
//                 <p className="card-text">{card.text}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       <footer className="footer">
//         &copy; 2025 InspireAll. All rights reserved.
//       </footer>
//     </>
//   );
// };

// export default BusinessInfo;
import React from 'react';
import './BusinessInfo.css';

const BusinessInfo = () => {
  const businessTips = [
    {
      title: "Know Your Market",
      text:
        "Understand your local customers and their needs. Conduct simple surveys in your community to identify gaps your business can fill. Track seasonal patterns to anticipate demand changes.",
      iconColor: "yellow",
      icon: "/bussinessicons/flea-market-concept-illustration_52683-55266.avif"
    },
    {
      title: "Financial Literacy",
      text:
        "Track your income and expenses daily. Separate personal and business finances. Build an emergency fund covering at least 3 months of expenses. Reinvest a percentage of profits back into your business.",
      iconColor: "green",
      icon: "/bussinessicons/finance-financial-performance-concept-illustration_53876-40450.avif"
    },
    {
      title: "Digital Presence",
      text:
        "Even small rural businesses benefit from online visibility. Use free social media tools to showcase your products. Join digital marketplaces to reach customers beyond your village or town.",
      iconColor: "purple",
      icon: "/bussinessicons/laptop-which-there-is-world-people-drawn_1232-288.avif"
    },
    {
      title: "Build Networks",
      text:
        "Connect with other entrepreneurs in your region. Form cooperatives to share resources and knowledge. Participate in local markets and fairs to increase visibility and build relationships.",
      iconColor: "orange",
      icon: "/bussinessicons/online-networking-handshake-marketing-remixed-media-background_53876-167284.avif"
    }
  ];

  const scalingTips = [
    {
      title: "Diversify Products",
      text:
        "Add complementary products to your existing offerings. Look for ways to use by-products or waste materials. Create seasonal variations of your popular items to maintain customer interest.",
      iconColor: "green",
      icon: "/bussinessicons/representation-user-experience-interface-design_23-2150169850.avif"
    },
    {
      title: "Train & Delegate",
      text:
        "Document your processes to maintain quality as you grow. Train family members or trusted community members to handle specific tasks. Focus your time on high-value activities that drive growth.",
      iconColor: "yellow",
      icon: "/bussinessicons/employees-with-laptops-learning-professional-trainig_335657-3298.avif"
    },
    {
      title: "Strategic Partnerships",
      text:
        "Partner with businesses that complement yours. Explore supply arrangements with nearby towns and cities. Consider franchise-like models to expand your reach without major investment.",
      iconColor: "orange",
      icon: "/bussinessicons/generating-new-leads-concept-illustration_114360-7654.avif"
    }
  ];

  return (
    <>
      <section className="hero">
        <h1>Business Growth Strategies</h1>
        <p>
          Practical tips and resources to help rural entrepreneurs thrive in today's market —
          accessible in your language and tailored to your unique journey.
        </p>
      </section>

      <section className="content-section">
        <h2 className="section-title">Essential Business Tips</h2>
        <div className="cards-container">
          {businessTips.map((card, idx) => (
            <div className="card" key={idx}>
              <div className={`card-icon ${card.iconColor}`}>
                <img src={card.icon} alt={`${card.title} Icon`} />
              </div>
              <div className="card-content">
                <h3 className="card-title">{card.title}</h3>
                <p className="card-text">{card.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="content-section resources-section">
        <h2 className="section-title">Scaling Your Business</h2>
        <div className="cards-container">
          {scalingTips.map((card, idx) => (
            <div className="card" key={idx}>
              <div className={`card-icon ${card.iconColor}`}>
                <img src={card.icon} alt={`${card.title} Icon`} />
              </div>
              <div className="card-content">
                <h3 className="card-title">{card.title}</h3>
                <p className="card-text">{card.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="footer">
        &copy; 2025 InspireAll. All rights reserved.
      </footer>
    </>
  );
};

export default BusinessInfo;
