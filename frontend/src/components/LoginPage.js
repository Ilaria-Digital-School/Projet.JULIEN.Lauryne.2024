import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';  
import AuthContext from '../AuthContext'; 
import Footer from './Footer';
import axios from 'axios'; 
import '../styles/Login.css';

const LoginPage = () => {
   const [email, setEmail] = useState('');  
  const [password, setPassword] = useState('');  
  const [message, setMessage] = useState('');  

 
  const { login, user } = useContext(AuthContext);
  
  
  const navigate = useNavigate();

  
  const handleSubmit = async (e) => {
    e.preventDefault(); 

    
    const apiUrl = process.env.NODE_ENV === 'production'
      ? process.env.REACT_APP_API_URL_PROD
      : process.env.REACT_APP_API_URL_LOCAL;

    try {
      
      await axios.post(`${apiUrl}/api/login`, { email, password });
      
       
      await login(email, password);
      
      
      navigate('/');
    } catch (err) {
      setMessage('Email ou mot de passe invalide.');
    }
  };

  
  useEffect(() => {
    if (user) {
      navigate('/');  
    }
  }, [user, navigate]); 

  
  return (
    <div className="page-container">
      <div className="content-wrap"> 
        <div className="login-container">
          <h2>Connexion</h2>
    
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password">Mot de passe</label>
              <input
                type="password"
                id="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">Connexion</button>
          </form>
    
          {message && <p>{message}</p>}
    
          <div className="login-links">
            <Link to="/signup">S'inscrire</Link>
            <Link to="/forgot-password">Mot de passe oublié</Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
  
  
};

export default LoginPage;