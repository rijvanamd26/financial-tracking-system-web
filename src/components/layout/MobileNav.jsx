import { useState } from 'react';
import { LayoutDashboard, BarChart3, LogOut, Coins } from 'lucide-react';
import LogoutDialog from '../ui/LogoutDialog';

const MobileNav = ({ activeTab, setActiveTab, handleLogout, currency, setCurrency }) => {
  const [showDialog, setShowDialog] = useState(false);
  const CURRENCIES = ['$', '€', '₹', '£', '¥'];

  return (
    <>
      <nav className="mobile-nav">
        <button
          className={`mobile-nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          <LayoutDashboard size={22} />
          <span>Dashboard</span>
        </button>

        <button
          className={`mobile-nav-item ${activeTab === 'analytics' ? 'active' : ''}`}
          onClick={() => setActiveTab('analytics')}
        >
          <BarChart3 size={22} />
          <span>Analytics</span>
        </button>

        <div className="mobile-nav-currency">
          <Coins size={14} />
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            onClick={(e) => e.stopPropagation()}
          >
            {CURRENCIES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <button className="mobile-nav-item mobile-nav-logout" onClick={() => setShowDialog(true)}>
          <LogOut size={22} />
          <span>Logout</span>
        </button>
      </nav>

      {showDialog && (
        <LogoutDialog
          onConfirm={handleLogout}
          onCancel={() => setShowDialog(false)}
        />
      )}
    </>
  );
};

export default MobileNav;
