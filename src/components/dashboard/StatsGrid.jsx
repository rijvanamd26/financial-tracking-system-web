import React from 'react';
import { Wallet, TrendingUp, TrendingDown, PiggyBank } from 'lucide-react';

const StatsGrid = ({ stats, formatPrice }) => {
  return (
    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-header">
          <div className="stat-icon" style={{ background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)' }}>
            <Wallet size={20} />
          </div>
        </div>
        <div className="stat-info">
          <h3>Total Balance</h3>
          <p>{stats.balance < 0 ? '-' : ''}{formatPrice(stats.balance)}</p>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-header">
          <div className="stat-icon" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--secondary)' }}>
            <TrendingUp size={20} />
          </div>
        </div>
        <div className="stat-info">
          <h3>Monthly Income</h3>
          <p style={{ color: 'var(--secondary)' }}>+{formatPrice(stats.income)}</p>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-header">
          <div className="stat-icon" style={{ background: 'rgba(244, 63, 94, 0.1)', color: 'var(--accent)' }}>
            <TrendingDown size={20} />
          </div>
        </div>
        <div className="stat-info">
          <h3>Monthly Expenses</h3>
          <p style={{ color: 'var(--accent)' }}>-{formatPrice(stats.expense)}</p>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-header">
          <div className="stat-icon" style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>
            <PiggyBank size={20} />
          </div>
        </div>
        <div className="stat-info">
          <h3>Total Savings</h3>
          <p style={{ color: '#3b82f6' }}>{formatPrice(stats.savings)}</p>
        </div>
      </div>
    </div>
  );
};

export default StatsGrid;
