/*import react, {useEffect,useState} from 'react';
import './App.css';

function App() {
  const[data,setData]=useState({})
  useEffect(()=>{
    fetchData();
  },[]);

  const fetchData=async()=>{
    try{
      const response=await fetch('http://127.0.0.1:5000')
      const jsonData=await response.json();
      setData(jsonData)
    } catch(error){
      console.log('Error',error)
    }
  }
  return (
    <div className="App">
      
    </div>
  );
}

export default App;
*/

/*import React, { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState({});

  useEffect(() => {
    fetchData();
    setupIntersectionObservers();
    setupSmoothScroll();
    setupScrollIndicator();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000');
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.log('Error', error);
    }
  };

  const redirectToTest = () => {
    window.location.href = 'http://127.0.0.1:5000';
  };

  const setupIntersectionObservers = () => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        } else {
          entry.target.classList.remove('show');
        }
      });
    }, {
      threshold: 0.5
    });

    document.querySelectorAll('.hidden').forEach((el) => observer.observe(el));

    const sections = document.querySelectorAll('.section');
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const currentSection = entry.target;

          document.querySelectorAll('.nav-content a').forEach(navItem => {
            const sectionId = navItem.getAttribute('href');
            if (sectionId === `#${currentSection.id}`) {
              navItem.classList.add('active');
            } else {
              navItem.classList.remove('active');
            }
          });

          const sectionColors = {
            'hero': '#20B2AA',
            'login-section': '#050505',
            'tutorial-section': '#ffffff',
            'history-section': '#050505',
            'about-section': '#FFA500'
          };

          document.body.style.transition = 'background-color 1.2s ease-in-out';
          document.body.style.backgroundColor = sectionColors[currentSection.id] || '#050505';
        }
      });
    }, {
      threshold: 0.5,
      rootMargin: '-100px 0px -100px 0px'
    });

    sections.forEach(section => sectionObserver.observe(section));
  };

  const setupSmoothScroll = () => {
    document.querySelectorAll('.nav-content a').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');

        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          const navbarHeight = document.querySelector('.topbar').offsetHeight;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  };

  const setupScrollIndicator = () => {
    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'scroll-progress';
    document.body.appendChild(scrollIndicator);

    window.addEventListener('scroll', () => {
      const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (window.scrollY / windowHeight) * 100;
      scrollIndicator.style.width = `${scrolled}%`;
    });
  };

  return (
    <div className="App">
      <nav className="topbar">
        <div className="nav-container">
          <div className="logo-container">
            <img src="images/main_logo.PNG" alt="Logo" className="topbar-logo" />
          </div>
          <div className="nav-content">
            <a href="#login-section" className="nav-item">Login</a>
            <a href="#login-section" className="nav-item">Register</a>
            <a href="#tutorial-section" className="nav-item">Tutorial</a>
            <a href="#history-section" className="nav-item">History</a>
            <a href="#about-section" className="nav-item">About</a>
          </div>
        </div>
      </nav>

      <section id="hero" className="section hidden">
        <div className="content">
          <h1>Dot Dash Decode</h1>
          <img src="images/Logo_dotdash.png" alt="Logo" className="hero-image" />
          <div className="button-group">
            <button className="btn" onClick={redirectToTest}>Start</button>
          </div>
        </div>
      </section>

      <section id="login-section" className="section hidden">
        <div className="content">
          <h2>A Morse code decoding website</h2>
          <div className="button-group">
            <button className="btn">Login</button>
            <button className="btn">Register</button>
          </div>
        </div>
      </section>

      <section id="tutorial-section" className="section hidden">
        <div className="content">
          <h2>Tutorial</h2>
          <img src="images/morsecode.png" alt="Morse Code Chart" className="tutorial-image" />
        </div>
      </section>

      <section id="history-section" className="section hidden">
        <div className="content">
          <h2>Previous Conversation</h2>
          <button className="btn">View History</button>
        </div>
      </section>

      <section id="about-section" className="section hidden">
        <div className="content">
          <h2>Interactive things</h2>
        </div>
      </section>
    </div>
  );
}

export default App;*/

import React, { useEffect } from 'react';
import './App.css'; // Ensure your CSS file is imported
import mainLogo from './assets/images/main_logo.PNG';
import dotdashLogo from './assets/images/Logo_dotdash.PNG';
import morseCodeChart from './assets/images/morsecode.png';

function App() {
  
  useEffect(() => {
    setupIntersectionObservers();
    setupSmoothScroll();
    setupScrollIndicator();
  }, []);

  const redirectToTest = () => {
    window.location.href = 'http://127.0.0.1:5000';
  };

  const setupIntersectionObservers = () => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        } else {
          entry.target.classList.remove('show');
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('.hidden').forEach((el) => observer.observe(el));

    const sections = document.querySelectorAll('.section');
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const currentSection = entry.target;
          document.querySelectorAll('.nav-content a').forEach(navItem => {
            const sectionId = navItem.getAttribute('href');
            if (sectionId === `#${currentSection.id}`) {
              navItem.classList.add('active');
            } else {
              navItem.classList.remove('active');
            }
          });

          const sectionColors = {
            'hero': '#20B2AA',
            'login-section': '#050505',
            'tutorial-section': '#ffffff',
            'history-section': '#050505',
            'about-section': '#FFA500'
          };

          document.body.style.transition = 'background-color 1.2s ease-in-out';
          document.body.style.backgroundColor = sectionColors[currentSection.id] || '#050505';
        }
      });
    }, { threshold: 0.5 });

    sections.forEach(section => sectionObserver.observe(section));
  };

  const setupSmoothScroll = () => {
    document.querySelectorAll('.nav-content a').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');

        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          const navbarHeight = document.querySelector('.topbar').offsetHeight;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  };

  const setupScrollIndicator = () => {
    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'scroll-progress';
    document.body.appendChild(scrollIndicator);

    window.addEventListener('scroll', () => {
      const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (window.scrollY / windowHeight) * 100;
      scrollIndicator.style.width = `${scrolled}%`;
    });
  };

  return (
    <div className="App">
      <nav className="topbar">
        <div className="nav-container">
          <div className="logo-container">
            <img src={mainLogo} alt="Logo" className="topbar-logo" />
          </div>
          <div className="nav-content">
            <a href="#login-section" className="nav-item">Login</a>
            <a href="#login-section" className="nav-item">Register</a>
            <a href="#tutorial-section" className="nav-item">Tutorial</a>
            <a href="#history-section" className="nav-item">History</a>
            <a href="#about-section" className="nav-item">About</a>
          </div>
        </div>
      </nav>

      <section id="hero" className="section hidden">
        <div className="content">
          <h1>Dot Dash Decode</h1>
          <img src={dotdashLogo} alt="Logo" className="hero-image" />
          <div className="button-group">
            <button className="btn" onClick={redirectToTest}>Start</button>
          </div>
        </div>
      </section>

      <section id="login-section" className="section hidden">
        <div className="content">
          <h2>A Morse code decoding website</h2>
          <div className="button-group">
            <button className="btn">Login</button>
            <button className="btn">Register</button>
          </div>
        </div>
      </section>

      <section id="tutorial-section" className="section hidden">
        <div className="content">
          <h2>Tutorial</h2>
          <img src={morseCodeChart} alt="Morse Code Chart" className="tutorial-image" />
        </div>
      </section>

      <section id="history-section" className="section hidden">
        <div className="content">
          <h2>Previous Conversation</h2>
          <button className="btn">View History</button>
        </div>
      </section>

      <section id="about-section" className="section hidden">
        <div className="content">
          <h2>Interactive things</h2>
        </div>
      </section>
    </div>
  );
}

export default App;

