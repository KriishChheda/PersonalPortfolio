import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { FiExternalLink } from "react-icons/fi";
import image from '../assets/image.png';

const Portfolio = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const particlesRef = useRef(null);
  const shapesRef = useRef([]);
  const frameId = useRef(null);
  const isAnimating = useRef(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const sections = ['Home','Projects', 'Skills', 'Experience', 'Research','Achievements','contact'];

  const projects = [
    {
      title: "Thunder Trail",
      tech: "HTML, CSS, JS",
      description: "Fully functional weather forecasting app with immediate present and future weather data",
      date: "June 2024",
      link: "https://github.com/KriishChheda/Frontend-projects"
    },
    {
      title: "PatrolConnect",
      tech: "React, CSS",
      description: "Platform for police officials and citizens to report crimes and file FIRs online",
      date: "2024",
      link:"https://github.com/KriishChheda/PoliceWebsite",
      vercel:"https://police-website.vercel.app"
    },
    {
      title: "CivicSphere",
      tech: "React, Tailwind CSS",
      description: "Hyperlocal micro-jobs and skills exchange platform connecting users with nearby skilled workers",
      date: "2024",
      link:"https://github.com/KriishChheda/UC_ProjectPhase"
    },
    {
      title: "Drumify",
      tech: "HTML, CSS, JS",
      description: "Interactive drum kit application with responsive audio-visual feedback",
      date: "July 2024",
      link:"https://github.com/KriishChheda/My_projects"
    },
    {
      title: "DataDock",
      tech: "HTML, CSS, JS",
      description: "Basic web application to perform CRUD operations",
      date: "2024",
      link:"https://github.com/KriishChheda/Frontend-projects"
    }
  ];

  const skills = {
    "Languages": ["C", "Python", "C++", "HTML/CSS", "JavaScript", "SQL", "Java"],
    "Frameworks": ["React", "Tailwind CSS"],
    "Tools": ["VS Code", "GitHub"],
    "Data Science": ["NumPy", "Pandas", "Matplotlib", "Seaborn"]
  };

  const experiences = [
    {
      title: "Vice Chairperson",
      organization: "DJSCE eXpress",
      period: "January 2025 - Present",
      type: "Leadership"
    },
    {
      title: "Frontend Mentee",
      organization: "DJ Unicode",
      period: "August 2024 - Present",
      type: "Technical"
    },
    {
      title: "Events Co-Committee Member",
      organization: "Google Developer Group (GDG)",
      period: "October 2024 - Present",
      type: "Community"
    },
    {
      title: "Cultural Co-Committee Member",
      organization: "DJSCE Trinity",
      period: "October 2024 - Present",
      type: "Cultural"
    }
  ];

  useEffect(() => {
    if (!mountRef.current || isAnimating.current) return;

    let scene, camera, renderer, particleSystem, shapes = [];

    const initScene = () => {
      try {
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0x0a0a0a);
        sceneRef.current = scene;

        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 0, 5);
        cameraRef.current = camera;

        renderer = new THREE.WebGLRenderer({ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        });
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x0a0a0a, 1);
        
        if (mountRef.current && !mountRef.current.contains(renderer.domElement)) {
          mountRef.current.appendChild(renderer.domElement);
        }
        rendererRef.current = renderer;

        const particleCount = 1200;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const velocities = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount; i++) {
          const i3 = i * 3;
          
          positions[i3] = (Math.random() - 0.5) * 25;
          positions[i3 + 1] = (Math.random() - 0.5) * 25;
          positions[i3 + 2] = (Math.random() - 0.5) * 25;

          colors[i3] = Math.random() * 0.4 + 0.6;    
          colors[i3 + 1] = Math.random() * 0.6 + 0.4; 
          colors[i3 + 2] = 1;                         

          velocities[i3] = (Math.random() - 0.5) * 0.01;
          velocities[i3 + 1] = (Math.random() - 0.5) * 0.01;
          velocities[i3 + 2] = (Math.random() - 0.5) * 0.01;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));

        const material = new THREE.PointsMaterial({
          size: 0.04,
          vertexColors: true,
          transparent: true,
          opacity: 0.8,
          blending: THREE.AdditiveBlending,
          sizeAttenuation: true
        });

        particleSystem = new THREE.Points(geometry, material);
        scene.add(particleSystem);
        particlesRef.current = particleSystem;

        const geometries = [
          new THREE.TetrahedronGeometry(0.6, 0),
          new THREE.OctahedronGeometry(0.6, 0),
          new THREE.IcosahedronGeometry(0.6, 0)
        ];

        for (let i = 0; i < 6; i++) {
          const geom = geometries[Math.floor(Math.random() * geometries.length)];
          const material = new THREE.MeshBasicMaterial({
            color: new THREE.Color().setHSL(Math.random(), 0.7, 0.6),
            wireframe: true,
            transparent: true,
            opacity: 0.5
          });
          
          const shape = new THREE.Mesh(geom, material);
          shape.position.set(
            (Math.random() - 0.5) * 12,
            (Math.random() - 0.5) * 12,
            (Math.random() - 0.5) * 8
          );
          
          shape.userData = {
            rotationSpeed: {
              x: (Math.random() - 0.5) * 0.02,
              y: (Math.random() - 0.5) * 0.02,
              z: (Math.random() - 0.5) * 0.02
            },
            floatSpeed: Math.random() * 0.02 + 0.01,
            floatOffset: Math.random() * Math.PI * 2
          };
          
          scene.add(shape);
          shapes.push(shape);
        }
        
        shapesRef.current = shapes;
        return true;
      } catch (error) {
        console.error('Error initializing Three.js scene:', error);
        return false;
      }
    };

    const animate = (timestamp) => {
      if (!isAnimating.current) return;
      
      try {
        frameId.current = requestAnimationFrame(animate);

        if (particlesRef.current && particlesRef.current.geometry) {
          const positions = particlesRef.current.geometry.attributes.position.array;
          const velocities = particlesRef.current.geometry.attributes.velocity?.array;
          
          if (velocities) {
            for (let i = 0; i < positions.length; i += 3) {
              positions[i] += velocities[i];
              positions[i + 1] += velocities[i + 1];
              positions[i + 2] += velocities[i + 2];
              
              if (Math.abs(positions[i]) > 15) velocities[i] *= -1;
              if (Math.abs(positions[i + 1]) > 15) velocities[i + 1] *= -1;
              if (Math.abs(positions[i + 2]) > 15) velocities[i + 2] *= -1;
            }
            
            particlesRef.current.geometry.attributes.position.needsUpdate = true;
          }
          
          particlesRef.current.rotation.y += 0.001;
          particlesRef.current.rotation.x += 0.0005;
        }

        shapesRef.current.forEach((shape, index) => {
          if (shape && shape.userData) {
            const { rotationSpeed, floatSpeed, floatOffset } = shape.userData;
            
            shape.rotation.x += rotationSpeed.x;
            shape.rotation.y += rotationSpeed.y;
            shape.rotation.z += rotationSpeed.z;
            
            shape.position.y += Math.sin(timestamp * 0.001 * floatSpeed + floatOffset) * 0.002;
            shape.position.x += Math.cos(timestamp * 0.0008 * floatSpeed + floatOffset) * 0.001;
          }
        });

        if (rendererRef.current && sceneRef.current && cameraRef.current) {
          rendererRef.current.render(sceneRef.current, cameraRef.current);
        }
      } catch (error) {
        console.error('Animation error:', error);
      }
    };

    const handleResize = () => {
      if (cameraRef.current && rendererRef.current) {
        cameraRef.current.aspect = window.innerWidth / window.innerHeight;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      }
    };

    const initTimer = setTimeout(() => {
      if (initScene()) {
        isAnimating.current = true;
        animate(0);
        setIsLoaded(true);
        window.addEventListener('resize', handleResize);
      }
    }, 100);

    return () => {
      clearTimeout(initTimer);
      isAnimating.current = false;
      
      if (frameId.current) {
        cancelAnimationFrame(frameId.current);
      }
      
      window.removeEventListener('resize', handleResize);
      
      if (scene) {
        scene.traverse((child) => {
          if (child.geometry) child.geometry.dispose();
          if (child.material) {
            if (Array.isArray(child.material)) {
              child.material.forEach(material => material.dispose());
            } else {
              child.material.dispose();
            }
          }
        });
        scene.clear();
      }
      
      if (renderer) {
        renderer.dispose();
        if (mountRef.current && renderer.domElement && mountRef.current.contains(renderer.domElement)) {
          mountRef.current.removeChild(renderer.domElement);
        }
      }
      
      sceneRef.current = null;
      rendererRef.current = null;
      cameraRef.current = null;
      particlesRef.current = null;
      shapesRef.current = [];
    };
  }, []);

  const scrollToSection = (index) => {
    setCurrentSection(index);
  };

  return (
    <div className="relative min-h-screen bg-gray-900 text-white overflow-hidden">
      <div ref={mountRef} className="fixed inset-0 z-10" />
      
      {!isLoaded && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-xl font-light">Loading Portfolio...</p>
          </div>
        </div>
      )}

      <nav className="fixed top-0 left-0 right-0 z-40 p-6 backdrop-blur-md bg-black/30">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <div className="great-vibes-regular text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-400 bg-clip-text text-transparent">
          <i>Kriish Chheda</i>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          {sections.map((section, index) => (
            <button
              key={index}
              onClick={() => scrollToSection(index)}
              className={`px-4 py-2 rounded-full transition-all duration-300 backdrop-blur-sm ${
                currentSection === index
                  ? "bg-blue-500/80 text-white shadow-lg shadow-blue-500/30"
                  : "text-gray-300 hover:text-white hover:bg-white/20"
              }`}
            >
              {section}
            </button>
          ))}
        </div>

        <div className="md:hidden">
          <button
            className="text-white p-2"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden mt-4 px-6 space-y-2">
          {sections.map((section, index) => (
            <button
              key={index}
              onClick={() => {
                scrollToSection(index);
                setMenuOpen(false);
              }}
              className={`block w-full text-left px-4 py-2 rounded-lg transition-all duration-300 backdrop-blur-sm ${
                currentSection === index
                  ? "bg-blue-500/80 text-white"
                  : "text-white bg-blue-500 hover:bg-blue-300 duration-100"
              }`}
            >
              {section}
            </button>
          ))}
        </div>
      )}
    </nav>

      <div className="relative z-20 pt-20">
        {currentSection === 0 && (
        <section className="min-h-screen flex items-center justify-center px-6">
            <div className="max-w-6xl mx-auto backdrop-blur-lg bg-black/10 p-8 rounded-3xl border border-white/20 shadow-2xl shadow-black/50">
            <h2 className="text-5xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent drop-shadow-lg">
                About Me
            </h2>

            <div className="grid md:grid-cols-2 gap-12 items-start">
                <div className="space-y-8">
                <div className="w-64 h-64 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-2 border-blue-500/40 flex items-center justify-center relative overflow-hidden group backdrop-blur-sm mx-auto md:mx-0">
                    <div className="absolute bottom-4 left-4 right-4">
                      <img src={image} alt="Profile" className="w-full h-full object-cover" />
                    </div>
                </div>

                <p className="text-lg text-gray-100 leading-relaxed drop-shadow">
                    I'm an aspiring Computer Engineer at D. J. Sanghvi College of Engineering, with a passion for building impactful web applications that serve a purpose. I enjoy solving problems through code and am currently expanding my skills into the fascinating world of data science.
                </p>
                <p className="text-lg text-gray-100 leading-relaxed drop-shadow">
                    I have taken on multiple leadership roles in college, most notably as the Vice Chairperson of DJSCe Express, the official public speaking committee of our college. These roles have helped me sharpen my communication, team-building, and event management skills.
                </p>
                <p className="text-lg text-gray-100 leading-relaxed drop-shadow">
                    I'm an avid traveler who's always eager to explore new places and capture moments through my lens. For me, storytelling extends beyond code—it lives in the people I meet, the places I see, and the perspectives I frame.
                </p>
                </div>

                <div className="space-y-50">
                    <h3 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg text-center leading-snug">
                    <span className="block">Hello!</span>
                    <span className="block text-blue-400">I'm Kriish Chheda</span>
                    </h3>


                <div className="bg-gradient-to-br from-gray-900/40 to-gray-800/40 p-8 rounded-2xl border border-gray-500/50 backdrop-blur-lg">
                    <h3 className="text-2xl font-bold mb-6 text-blue-300">Education</h3>
                    <div className="space-y-4">
                    <div>
                        <h4 className="text-xl font-semibold text-white">Bachelor of Technology</h4>
                        <p className="text-gray-200">Computer Engineering</p>
                        <p className="text-gray-300">SVKM's Dwarkadas J Sanghvi College</p>
                        <p className="text-gray-300">2023 - 2027 | CGPA: 9.6/10</p>
                    </div>
                    <div className="pt-4 border-t border-gray-500">
                        <h5 className="font-semibold text-blue-300 mb-2">Key Coursework</h5>
                        <p className="text-gray-200">Data Structures, Database Management Systems, Operating Systems</p>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </section>
        )}

        {currentSection === 1 && (
          <section className="min-h-screen py-20 px-6">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-5xl font-bold mb-16 text-center bg-gradient-to-r from-blue-400 to-blue-400 bg-clip-text text-transparent drop-shadow-lg">
                My Projects
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-gray-900/40 to-gray-800/40 p-6 rounded-2xl border border-gray-500/50 hover:border-blue-400 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-blue-500/20 backdrop-blur-lg"
                  >
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                      <p className="text-blue-300 text-sm font-medium">{project.tech}</p>
                      <p className="text-gray-300 text-sm">{project.date}</p>
                    </div>
                    <p className="text-gray-200 leading-relaxed">{project.description}</p>
                    <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center mt-3 text-blue-400 hover:text-blue-600 font-medium"
                        >
                        View Project <FiExternalLink className="ml-1" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {currentSection ===2  && (
          <section className="min-h-screen flex items-center justify-center px-6">
            <div className="max-w-4xl mx-auto backdrop-blur-lg bg-black/10 p-8 rounded-3xl border border-white/20 shadow-2xl shadow-black/50">
              <h2 className="text-5xl font-bold mb-16 text-center bg-gradient-to-r from-blue-400 to-blue-400 bg-clip-text text-transparent drop-shadow-lg">
                Technical Skills
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                {Object.entries(skills).map(([category, skillList], index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-gray-900/40 to-gray-800/40 p-8 rounded-2xl border border-gray-500/50 backdrop-blur-lg"
                  >
                    <h3 className="text-2xl font-bold mb-6 text-blue-300">{category}</h3>
                    <div className="flex flex-wrap gap-3">
                      {skillList.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-4 py-2 bg-gradient-to-r from-blue-500/30 to-purple-500/30 border border-blue-400/50 rounded-full text-sm font-medium text-blue-200 hover:bg-blue-500/40 transition-all duration-300 backdrop-blur-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {currentSection === 3 && (
          <section className="min-h-screen py-20 px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-5xl font-bold mb-16 text-center bg-gradient-to-r from-blue-400 to-blue-400 bg-clip-text text-transparent drop-shadow-lg">
                Experience & Leadership
              </h2>
              <div className="space-y-8">
                {experiences.map((exp, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-gray-900/40 to-gray-800/40 p-8 rounded-2xl border border-gray-500/50 hover:border-blue-400 transition-all duration-300 backdrop-blur-lg"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2">{exp.title}</h3>
                        <p className="text-blue-300 text-lg font-medium">{exp.organization}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-300 text-sm">{exp.period}</p>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mt-2 backdrop-blur-sm ${
                          exp.type === 'Leadership' ? 'bg-purple-500/30 text-purple-200 border border-purple-400/50' :
                          exp.type === 'Technical' ? 'bg-blue-500/30 text-blue-200 border border-blue-400/50' :
                          exp.type === 'Community' ? 'bg-green-500/30 text-green-200 border border-green-400/50' :
                          'bg-pink-500/30 text-pink-200 border border-pink-400/50'
                        }`}>
                          {exp.type}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
            </div>
          </section>
        )}

        {currentSection === 4 && (
        <section className="min-h-screen flex items-center justify-center px-6 py-12">
            <div className="max-w-6xl w-full backdrop-blur-lg bg-black/10 p-8 rounded-3xl border border-white/20 shadow-2xl shadow-black/50">
            <h2 className="text-5xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 to-blue-400 bg-clip-text text-transparent drop-shadow-lg">
                Research & Blogs
            </h2>

            <div className="grid md:grid-cols-2 gap-12">
                {/* Research Interests */}
                <div>
                <h3 className="text-2xl font-bold text-blue-300 mb-4">Research Interests</h3>
                <ul className="list-disc pl-5 space-y-3 text-gray-200">
                    <li>Web Performance Optimization & Core Web Vitals</li>
                    <li>AI/ML for Social Good and Civic Technology</li>
                    <li>Human-Computer Interaction and Ethical AI</li>
                    <li>Data-Driven UX Design</li>
                </ul>
                <p className="text-gray-400 text-sm mt-4 italic">
                    Constantly exploring how technology can be used to make information more accessible and decisions more human-centered.
                </p>
                </div>

                <div>
                <h3 className="text-2xl font-bold text-blue-300 mb-4">My Blogs</h3>
                <div className="space-y-6">
                 <a
                        href="https://www.geeksforgeeks.org/community/post/52372/unveiling-views-and-tables-in-dbms-the-window-to-structured-data-management/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative block group rounded-xl bg-green-900/20 border-2 border-green-600 hover:bg-green-700/40 hover:border-green-400 hover:scale-105 transition-all duration-500 ease-out shadow-lg hover:shadow-2xl hover:shadow-green-500/30 p-6 overflow-hidden cursor-pointer transform-gpu"
                        >
                        <div className="absolute inset-0 bg-gradient-to-br from-green-600/10 via-green-500/5 to-emerald-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        <div className="absolute inset-0 rounded-xl border-2 border-green-400/0 group-hover:border-green-400/50 transition-all duration-500 animate-pulse"></div>
                        
                        <div className="relative z-10 flex flex-col h-full justify-between">
                            <div className="transform group-hover:translate-y-[-4px] transition-transform duration-500">
                            <h4 className="text-xl font-bold text-green-300 group-hover:text-white transition-all duration-300 group-hover:drop-shadow-lg">
                                Understanding Views in DBMS
                            </h4>
                            
                            <div className="overflow-hidden transition-all duration-500 max-h-16 group-hover:max-h-32">
                                <p className="text-sm text-green-100 mt-3 leading-relaxed group-hover:text-green-50 transition-colors duration-300">
                                An easy-to-follow guide to what views are in databases and how they can simplify queries and enhance security.
                                </p>
                                
                                <p className="text-xs text-green-200/80 mt-2 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200 transform translate-y-2 group-hover:translate-y-0">
                                Explore advanced database concepts with practical examples and implementation details.
                                </p>
                            </div>
                            </div>
                            
                            <div className="mt-6 flex items-center justify-between transform group-hover:translate-y-[-2px] transition-transform duration-300">
                            <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                <span className="text-xs text-green-300 font-medium">GeeksforGeeks</span>
                            </div>
                            
                            <div className="text-right">
                                <span className="text-green-400 group-hover:text-white text-sm font-semibold underline decoration-2 underline-offset-4 group-hover:decoration-green-300 transition-all duration-300 flex items-center">
                                Read More 
                                <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                                </span>
                            </div>
                            </div>
                        </div>
                        
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        </div>
                        </a>
                </div>
                </div>
            </div>
            </div>
        </section>
        )}

        {currentSection === 5 && (
        <section className="min-h-screen flex items-center justify-center px-6 py-12">
            <div className="max-w-5xl w-full backdrop-blur-lg bg-black/10 p-8 rounded-3xl border border-white/20 shadow-2xl shadow-black/50">
            <h2 className="text-5xl font-bold mb-12 text-center bg-gradient-to-r from-green-300 to-teal-500 bg-clip-text text-transparent drop-shadow-lg">
                Achievements & Rewards
            </h2>

            <div className="space-y-10">
                <div className="p-6 bg-gradient-to-br from-green-800/20 to-green-900/20 border border-green-400/30 rounded-xl shadow-lg hover:shadow-2xl transition">
                <h3 className="text-2xl font-bold text-green-300 mb-2">🏆 National-Level in Yoga</h3>
                <p className="text-green-100 text-sm leading-relaxed">
                    Represented Maharashtra in CISCE National Level Yoga Competition
                </p>
                </div>

            <a
              href="https://docs.google.com/document/d/1-PC3F4A1f6dEPDWSgaXoZMjo0QO7xrlmfGfbFOtxCAA/edit?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="relative block group rounded-xl bg-blue-900/20 border-2 border-blue-400/30 hover:bg-blue-700/40 hover:border-blue-300 hover:scale-105 transition-all duration-500 ease-out shadow-lg hover:shadow-2xl hover:shadow-blue-500/30 p-6 overflow-hidden cursor-pointer transform-gpu"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-blue-500/5 to-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Animated border glow */}
              <div className="absolute inset-0 rounded-xl border-2 border-blue-300/0 group-hover:border-blue-300/50 transition-all duration-500 animate-pulse"></div>
              
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="transform group-hover:translate-y-[-4px] transition-transform duration-500">
                  {/* Main heading with enhanced hover effects */}
                  <h3 className="text-2xl font-bold text-blue-300 group-hover:text-white transition-all duration-300 group-hover:drop-shadow-lg flex items-center gap-2 mb-2">
                     NPTEL Certifications
                  </h3>
                  
                  {/* Expandable description */}
                  <div className="overflow-hidden transition-all duration-500 max-h-16 group-hover:max-h-40">
                    <p className="text-blue-100 text-sm leading-relaxed group-hover:text-blue-50 transition-colors duration-300">
                      Scored 97/100 in NPTEL's Python for Data Science course offered by IIT Madras.
                    </p>
                    
                    {/* Additional content that appears on hover */}
                    <div className="mt-3 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200 transform translate-y-2 group-hover:translate-y-0">
                      <p className="text-xs text-blue-200/80 mb-2">
                        Jan-Feb 2025 • 4 week course 
                      </p>
                      <div className="flex items-center gap-4 text-xs">
                        <span className="bg-blue-500/20 px-2 py-1 rounded-full text-blue-200 border border-blue-400/30">
                          Score: 25/25 + 71.87/75
                        </span>
                        <span className="bg-green-500/20 px-2 py-1 rounded-full text-green-200 border border-green-400/30">
                          Grade: 97/100
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex items-center justify-between transform group-hover:translate-y-[-2px] transition-transform duration-300">
                  <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                    <span className="text-xs text-blue-300 font-medium">IIT Madras</span>
                  </div>
                  
                  <div className="text-right">
                    <span className="text-blue-400 group-hover:text-white text-sm font-semibold underline decoration-2 underline-offset-4 group-hover:decoration-blue-300 transition-all duration-300 flex items-center">
                      View Certificate
                      <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </div>
            </a>
            </div>
            </div>
        </section>
        )}

        {currentSection === 6 && (
        <section className="min-h-screen flex items-center justify-center px-6">
          <div className="max-w-4xl mx-auto text-center backdrop-blur-lg bg-black/10 p-8 rounded-3xl border border-white/20 shadow-2xl shadow-black/50">
            <h2 className="text-5xl font-bold mb-16 bg-gradient-to-r from-blue-400 to-blue-400 bg-clip-text text-transparent drop-shadow-lg">
              Let's Connect
            </h2>
            <div className="mb-12">
              <p className="text-xl text-gray-100 mb-8 max-w-2xl mx-auto drop-shadow">
                Whether you're a tech enthusiast, a fellow traveler, a photography lover, or someone who just enjoys a good conversation, I'd love to connect!
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Contact Info Section */}
              <div className="bg-gradient-to-br from-gray-900/40 to-gray-800/40 p-8 rounded-2xl border border-gray-500/50 backdrop-blur-lg">
                <h3 className="text-2xl font-bold mb-6 text-blue-300">Contact Info</h3>
                <div className="space-y-4 text-left">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-500/30 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <span className="text-green-300">📱</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Phone</p>
                      <p className="text-gray-200">+91 9167160832</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-500/30 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <span className="text-blue-300">📧</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Email</p>
                      <p className="text-gray-200">kriishchheda00522@gmail.com</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links Section */}
              <div className="bg-gradient-to-br from-gray-900/40 to-gray-800/40 p-8 rounded-2xl border border-gray-500/50 backdrop-blur-lg">
                <h3 className="text-2xl font-bold mb-6 text-blue-300">Social Links</h3>
                <div className="space-y-4">
                  <a href="https://www.linkedin.com/in/kriish-chheda-8062b8289/" className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-700/30 transition-all duration-300 group backdrop-blur-sm">
                    <div className="w-12 h-12 bg-blue-600/30 rounded-full flex items-center justify-center group-hover:bg-blue-600/50 backdrop-blur-sm">
                      <span className="text-blue-300">💼</span>
                    </div>
                    <span className="text-gray-200 group-hover:text-white">LinkedIn</span>
                  </a>
                  <a href="https://github.com/KriishChheda" className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-700/30 transition-all duration-300 group backdrop-blur-sm">
                    <div className="w-12 h-12 bg-purple-600/30 rounded-full flex items-center justify-center group-hover:bg-purple-600/50 backdrop-blur-sm">
                      <span className="text-purple-300">💻</span>
                    </div>
                    <span className="text-gray-200 group-hover:text-white">GitHub</span>
                  </a>
                  <a href="https://leetcode.com/u/KriishChheda/" className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-700/30 transition-all duration-300 group backdrop-blur-sm">
                    <div className="w-12 h-12 bg-orange-600/30 rounded-full flex items-center justify-center group-hover:bg-orange-600/50 backdrop-blur-sm">
                      <span className="text-orange-300">🧩</span>
                    </div>
                    <span className="text-gray-200 group-hover:text-white">LeetCode</span>
                  </a>
                  <a href="#" className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-700/30 transition-all duration-300 group backdrop-blur-sm">
                    <div className="w-12 h-12 bg-pink-600/30 rounded-full flex items-center justify-center group-hover:bg-pink-600/50 backdrop-blur-sm">
                      <span className="text-pink-300">📸</span>
                    </div>
                    <span className="text-gray-200 group-hover:text-white">Instagram</span>
                  </a>
                </div>
              </div>
            </div>
            
          </div>
        </section>
        )}
      </div>

      {/* Section Indicators - Bottom */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40 flex space-x-4">
        {sections.map((section, index) => (
          <button
            key={index}
            onClick={() => scrollToSection(index)}
            className={`group flex flex-col items-center transition-all duration-300 backdrop-blur-sm ${
              currentSection === index ? 'scale-110' : 'hover:scale-105'
            }`}
          >
            <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSection === index ? 'bg-blue-400' : 'bg-gray-500 group-hover:bg-gray-300'
            }`} />
            <span className={`text-xs mt-1 transition-all duration-300 ${
              currentSection === index ? 'text-blue-300 opacity-100' : 'text-gray-400 opacity-0 group-hover:opacity-100'
            }`}>
              {section}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;