import { LayoutDashboard, BarChart3, LogOut, Coins } from 'lucide-react';

const MobileNav = ({ activeTab, setActiveTab, handleLogout, currency, setCurrency }) => {
  const CURRENCIES = ['$', '€', '₹', '£', '¥'];

  return (
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

      <button className="mobile-nav-item mobile-nav-logout" onClick={handleLogout}>
        <LogOut size={22} />
        <span>Logout</span>
      </button>
    </nav>
  );
};

export default MobileNav;
