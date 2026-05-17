import React from 'react';
import { motion } from 'framer-motion';
import { Coins, User, Lock, Mail } from 'lucide-react';

const AuthCard = ({ authMode, setAuthMode, authForm, handleAuthChange, handleLogin, handleRegister, authError, setAuthError }) => {
  return (
    <div className="auth-container">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="auth-card card"
      >
        <div className="auth-header">
          <div className="logo-icon" style={{ margin: '0 auto 1rem auto' }}>
            <Coins size={32} color="white" />
          </div>
          <h2>{authMode === 'login' ? 'Welcome Back' : 'Create Account'}</h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            {authMode === 'login' ? 'Log in to manage your finances' : 'Start tracking your finances today'}
          </p>
        </div>

        {authError && <div className="auth-error">{authError}</div>}

        <form onSubmit={authMode === 'login' ? handleLogin : handleRegister} className="auth-form">
          {authMode === 'register' && (
            <div className="form-group">
              <label><User size={16} style={{ verticalAlign: 'middle', marginRight: '5px' }}/> Name</label>
              <input 
                type="text" 
                name="name" 
                value={authForm.name} 
                onChange={handleAuthChange} 
                placeholder="John Doe" 
                required 
              />
            </div>
          )}
          <div className="form-group">
            <label><Mail size={16} style={{ verticalAlign: 'middle', marginRight: '5px' }}/> Email</label>
            <input 
              type="email" 
              name="email" 
              value={authForm.email} 
              onChange={handleAuthChange} 
              placeholder="john@example.com" 
              required 
            />
          </div>
          <div className="form-group">
            <label><Lock size={16} style={{ verticalAlign: 'middle', marginRight: '5px' }}/> Password</label>
            <input 
              type="password" 
              name="password" 
              value={authForm.password} 
              onChange={handleAuthChange} 
              placeholder="••••••••" 
              required 
            />
          </div>
          <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem', justifyContent: 'center' }}>
            {authMode === 'login' ? 'Log In' : 'Sign Up'}
          </button>
        </form>

        <p className="auth-switch">
          {authMode === 'login' ? "Don't have an account? " : "Already have an account? "}
          <button type="button" className="text-btn" onClick={() => {
            setAuthMode(authMode === 'login' ? 'register' : 'login');
            setAuthError('');
          }}>
            {authMode === 'login' ? 'Sign up' : 'Log in'}
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default AuthCard;
