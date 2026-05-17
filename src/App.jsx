import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AuthCard from './components/auth/AuthCard';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import StatsGrid from './components/dashboard/StatsGrid';
import TransactionForm from './components/dashboard/TransactionForm';
import TransactionList from './components/dashboard/TransactionList';
import AnalyticsCharts from './components/analytics/AnalyticsCharts';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

const CATEGORIES = {
  expense: [
    { name: 'Housing' }, { name: 'Food' }, { name: 'Transportation' }, 
    { name: 'Utilities' }, { name: 'Insurance' }, { name: 'Medical' }, 
    { name: 'Savings' }, { name: 'Personal' }, { name: 'Entertainment' }
  ],
  income: [
    { name: 'Salary' }, { name: 'Investments' }, { name: 'Real Estate' }, 
    { name: 'Business' }, { name: 'Other' }
  ],
  savings: [
    { name: 'Emergency Fund' }, { name: 'Retirement' }, { name: 'Vacation' }, 
    { name: 'Car' }, { name: 'House' }, { name: 'Other' }
  ]
};

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currency, setCurrency] = useState(() => localStorage.getItem('currency') || '$');
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState('all');
  const [timeRange, setTimeRange] = useState('monthly');
  const [stats, setStats] = useState({ income: 0, expense: 0, savings: 0, balance: 0 });
  const [analyticsData, setAnalyticsData] = useState({ donutData: [], barData: [] });
  const [monthFilter, setMonthFilter] = useState(() => new Date().toISOString().substring(0, 7));
  
  const [formData, setFormData] = useState({
    type: 'expense',
    amount: '',
    description: '',
    category: 'Food',
    date: new Date().toISOString().split('T')[0]
  });
  
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  // Auth States
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')) || null);
  const [token, setToken] = useState(() => localStorage.getItem('token') || null);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'
  const [authForm, setAuthForm] = useState({ name: '', email: '', password: '' });
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    localStorage.setItem('currency', currency);
  }, [currency]);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token, user]);

  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [filter, timeRange, activeTab, token, monthFilter]);

  const fetchData = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const [transRes, statsRes, analyticsRes] = await Promise.all([
        axios.get(`${API_URL}/transactions?type=${filter}&month=${monthFilter}`),
        axios.get(`${API_URL}/stats?month=${monthFilter}`),
        axios.get(`${API_URL}/analytics?timeRange=${timeRange}&month=${monthFilter}`)
      ]);
      
      setTransactions(transRes.data);
      setStats(statsRes.data);
      setAnalyticsData(analyticsRes.data);
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'type' ? { category: CATEGORIES[value][0].name } : {})
    }));
  };

  const handleAuthChange = (e) => {
    const { name, value } = e.target;
    setAuthForm(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError('');
    try {
      const res = await axios.post(`${API_URL}/auth/login`, {
        email: authForm.email,
        password: authForm.password
      });
      setToken(res.data.token);
      setUser(res.data.user);
    } catch (err) {
      setAuthError(err.response?.data?.message || 'Login failed');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setAuthError('');
    try {
      const res = await axios.post(`${API_URL}/auth/register`, authForm);
      setToken(res.data.token);
      setUser(res.data.user);
    } catch (err) {
      setAuthError(err.response?.data?.message || 'Registration failed');
    }
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/transactions`, formData);
      setSuccess(true);
      fetchData();
      
      setTimeout(() => {
        setSuccess(false);
        setFormData({
          type: 'expense',
          amount: '',
          description: '',
          category: 'Food',
          date: new Date().toISOString().split('T')[0]
        });
      }, 2000);
    } catch (err) {
      console.error('Error adding transaction:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/transactions/${id}`);
      fetchData();
    } catch (err) {
      console.error('Error deleting transaction:', err);
    }
  };

  const formatPrice = (price) => {
    return `${currency}${Math.abs(price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  if (!token) {
    return (
      <AuthCard 
        authMode={authMode} 
        setAuthMode={setAuthMode} 
        authForm={authForm} 
        handleAuthChange={handleAuthChange} 
        handleLogin={handleLogin} 
        handleRegister={handleRegister} 
        authError={authError} 
        setAuthError={setAuthError} 
      />
    );
  }

  return (
    <div className="dashboard-layout">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        handleLogout={handleLogout} 
        currency={currency} 
        setCurrency={setCurrency} 
      />

      <main className="main-content">
        <Header 
          user={user} 
          monthFilter={monthFilter} 
          setMonthFilter={setMonthFilter} 
        />

        {activeTab === 'dashboard' ? (
          <div className="dashboard-content">
            <StatsGrid stats={stats} formatPrice={formatPrice} />
            <div className="charts-grid">
              <TransactionForm 
                handleSubmit={handleSubmit} 
                formData={formData} 
                handleInputChange={handleInputChange} 
                currency={currency} 
                success={success} 
                CATEGORIES={CATEGORIES} 
              />
              <TransactionList 
                transactions={transactions} 
                filter={filter} 
                setFilter={setFilter} 
                loading={loading} 
                handleDelete={handleDelete} 
                formatPrice={formatPrice} 
              />
            </div>
          </div>
        ) : (
          <AnalyticsCharts 
            timeRange={timeRange} 
            setTimeRange={setTimeRange} 
            analyticsData={analyticsData} 
            formatPrice={formatPrice} 
          />
        )}
      </main>
    </div>
  );
}

export default App;
