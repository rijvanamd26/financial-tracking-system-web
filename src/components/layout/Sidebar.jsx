import React from 'react';
import { Coins, LayoutDashboard, BarChart3, LogOut } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, handleLogout, currency, setCurrency }) => {
  const CURRENCIES = [
    { symbol: '$', code: 'USD' },
    { symbol: '€', code: 'EUR' },
    { symbol: '₹', code: 'INR' },
    { symbol: '£', code: 'GBP' },
    { symbol: '¥', code: 'JPY' },
  ];

  return (
    <aside className="sidebar">
      <div className="logo">
        <div className="logo-icon">
          <Coins size={24} color="white" />
        </div>
        <span className="logo-text">Finance Tracker</span>
      </div>

      <nav className="nav-links">
        <div 
          className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          <LayoutDashboard size={20} />
          <span className="nav-text">Dashboard</span>
        </div>
        <div 
          className={`nav-item ${activeTab === 'analytics' ? 'active' : ''}`}
          onClick={() => setActiveTab('analytics')}
        >
          <BarChart3 size={20} />
          <span className="nav-text">Analytics</span>
        </div>
        <div 
          className="nav-item logout-item"
          onClick={handleLogout}
        >
          <LogOut size={20} />
          <span className="nav-text">Logout</span>
        </div>
      </nav>


    </aside>
  );
};

export default Sidebar;
