import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Briefcase, GraduationCap, Code2, Monitor, Database, Wrench, Brain, Terminal, Globe, User, ArrowLeft, Send } from 'lucide-react';
import './Portfolio.css';

export default function Portfolio() {
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  // Framer motion variants for spring bounce
  const containerVars = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVars = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        type: "spring",
        bounce: 0.3,
        duration: 0.8
      }
    }
  };

  return (
    <div className="portfolio-bento-page">
      
      {/* Navigation */}
      <div className="portfolio-nav">
        <Link to="/" className="back-btn">
          <ArrowLeft size={16} /> Back to HealthBridge
        </Link>
      </div>

      <motion.div 
        className="bento-container"
        variants={containerVars}
        initial="hidden"
        animate="show"
      >
        
        {/* 1. Hero Cell */}
        <motion.div variants={itemVars} className="bento-card hero-cell">
          <span className="bento-badge"><Code2 size={12} style={{marginRight: 6}}/> Digital Workspace</span>
          <h1>Santosh Darisi</h1>
          <h2><span className="premium-gradient">CSE Student @ VIT Vellore</span> | AI Enthusiast | Software Developer</h2>
          <p>
            Building AI-powered applications and practical software tools that solve real-world problems. 
            I am a Computer Science undergraduate with a strong interest in Artificial Intelligence,
            Data Science, and scalable software systems.
          </p>
        </motion.div>

        {/* 2. Contact Cell / Quick Links */}
        <motion.div variants={itemVars} className="bento-card contact-cell" id="contact">
          <div className="avatar-container">
            <User size={36} />
          </div>
          <h3>Let's Connect</h3>
          <p>Open to exploring new projects, creative ideas, and opportunities.</p>
          
          <a href="mailto:santosh@example.com" className="btn-primary-glow">
            <Send size={16} /> Email Me
          </a>
          
          <div className="social-links">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="social-btn" aria-label="GitHub">
              <Terminal size={20} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-btn" aria-label="LinkedIn">
              <Globe size={20} />
            </a>
          </div>
        </motion.div>

        {/* 3. Skills Cell */}
        <motion.div variants={itemVars} className="bento-card skills-cell" id="skills">
          <h3 className="cell-title"><Wrench size={22} /> Technical Arsenal</h3>
          
          <div className="bento-skill-group">
            <h4>Programming & Backend</h4>
            <div className="bento-tags">
              <span className="bento-tag">Python</span>
              <span className="bento-tag">C++</span>
              <span className="bento-tag">JavaScript</span>
              <span className="bento-tag">Flask</span>
              <span className="bento-tag">SQL</span>
              <span className="bento-tag">PostgreSQL</span>
            </div>
          </div>

          <div className="bento-skill-group">
            <h4>Artificial Intelligence & ML</h4>
            <div className="bento-tags">
              <span className="bento-tag">Prompt Engineering</span>
              <span className="bento-tag">NLP</span>
              <span className="bento-tag">Deep Learning Fundamentals</span>
              <span className="bento-tag">Machine Learning Workflows</span>
              <span className="bento-tag">Gemini API</span>
            </div>
          </div>

          <div className="bento-skill-group" style={{marginBottom: 0}}>
            <h4>Tools & Web Technologies</h4>
            <div className="bento-tags">
              <span className="bento-tag">Git & GitHub</span>
              <span className="bento-tag">VS Code</span>
              <span className="bento-tag">Tkinter</span>
              <span className="bento-tag">HTML & CSS</span>
            </div>
          </div>
        </motion.div>

        {/* 4. Projects Cell */}
        <motion.div variants={itemVars} className="bento-card project-cell" id="projects-section">
          <h3 className="cell-title"><Monitor size={22} /> Featured Builds</h3>
          
          <div className="project-wrapper">
            <div className="project-item">
              <h4>ManoMitra – AI Mental Health Chatbot</h4>
              <p>Built an AI-powered conversational chatbot providing mental health support using the Gemini API and a responsive web interface.</p>
              <div className="project-links">
                <a href="#"><Terminal size={14} /> Python / Flask / API</a>
              </div>
            </div>

            <div className="project-item">
              <h4>Secure Password Manager</h4>
              <p>Developed a desktop GUI application with secure credential storage, generation, and encrypted retrieval functionality.</p>
              <div className="project-links">
                <a href="#"><Terminal size={14} /> Python / Tkinter</a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 5. Experience Cell */}
        <motion.div variants={itemVars} className="bento-card experience-cell">
          <h3 className="cell-title"><Briefcase size={22} /> Internships</h3>
          
          <div className="timeline-list" style={{paddingLeft: '6px'}}>
            <div className="timeline-entry">
              <div className="timeline-period">Mar 2026 – Present</div>
              <h4>AI & Machine Learning Intern</h4>
              <h5>1Stop.ai</h5>
              <p>Working on machine learning workflows including preprocessing, feature understanding, and pipeline model evaluation.</p>
            </div>
            
            <div className="timeline-entry">
              <div className="timeline-period">Sept 2025 – Oct 2025</div>
              <h4>Artificial Intelligence Intern</h4>
              <h5>AICTE IBM SkillsBuild</h5>
              <p>Completed structured training covering supervised learning concepts and applied AI problem-solving on real datasets.</p>
            </div>
          </div>
        </motion.div>

        {/* 6. Education Cell */}
        <motion.div variants={itemVars} className="bento-card education-cell">
          <h3 className="cell-title"><GraduationCap size={22} /> Academics & Languages</h3>
          
          <div className="education-flex">
            <div>
              <h4 style={{fontSize: '1.1rem', marginBottom: '4px'}}>Vellore Institute of Technology</h4>
              <p style={{color: '#a1a1aa', fontSize: '0.95rem'}}>B.Tech Computer Science Engineering</p>
              <span className="cgpa-badge">CGPA: 9.16 / 10</span>
            </div>

            <div style={{marginTop: '12px'}}>
              <h4 style={{fontSize: '0.85rem', color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px'}}>Currently Learning</h4>
              <ul style={{listStyle: 'none', padding: 0, margin: 0, color: '#d4d4d8', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '8px'}}>
                <li>▹ Data Structures using C++</li>
                <li>▹ Machine learning pipelines</li>
                <li>▹ Backend systems using Flask</li>
              </ul>
            </div>

            <div style={{marginTop: '12px'}}>
              <h4 style={{fontSize: '0.85rem', color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px'}}>Languages</h4>
              <div className="bento-tags" style={{gap: '6px'}}>
                <span className="bento-tag" style={{background: 'transparent', borderColor: '#4a90e2'}}>English (Fluent)</span>
                <span className="bento-tag" style={{background: 'transparent', borderColor: '#4a90e2'}}>Telugu (Fluent)</span>
                <span className="bento-tag" style={{background: 'transparent', borderColor: '#4a90e2'}}>Hindi (Fluent)</span>
                <span className="bento-tag" style={{background: 'transparent', borderColor: 'rgba(255,255,255,0.1)'}}>Kannada (Basic)</span>
              </div>
            </div>
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
}
