import React from 'react';
import { PlusCircle } from 'lucide-react';
import MonthPicker from '../ui/MonthPicker';

const Header = ({ user, monthFilter, setMonthFilter }) => {
  return (
    <header className="top-header">
      <div className="welcome-text">
        <h2>Welcome back, {user?.name || 'User'}!</h2>
        <p>Here's what's happening with your money.</p>
      </div>
      <div className="header-actions">
        <MonthPicker value={monthFilter} onChange={setMonthFilter} />
        {/* <button type="button" className="btn-primary" style={{ width: 'auto', padding: '0.6rem 1.2rem', fontSize: '0.875rem' }}>
          <PlusCircle size={18} /> New Report
        </button> */}
      </div>
    </header>
  );
};

export default Header;
