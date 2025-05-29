// File: src/DarkModeToggle.jsx
import { useEffect } from 'react';

const DarkModeToggle = () => {
  const toggleDarkMode = () => {
    document.body.classList.toggle('dark');
    localStorage.setItem('darkMode', document.body.classList.contains('dark'));
  };

  useEffect(() => {
    if (localStorage.getItem('darkMode') === 'true') {
      document.body.classList.add('dark');
    }
  }, []);

  return <button onClick={toggleDarkMode}>Toggle Dark Mode</button>;
};

export default DarkModeToggle;
