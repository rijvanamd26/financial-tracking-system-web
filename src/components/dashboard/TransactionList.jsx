import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wallet, Trash2, Home, ShoppingCart, Activity, Coffee, Car, CreditCard, DollarSign } from 'lucide-react';

const getIcon = (category) => {
  switch (category) {
    case 'Housing': return <Home size={20} />;
    case 'Food': return <ShoppingCart size={20} />;
    case 'Health': return <Activity size={20} />;
    case 'Entertainment': return <Coffee size={20} />;
    case 'Transportation': return <Car size={20} />;
    case 'Salary': return <DollarSign size={20} />;
    default: return <CreditCard size={20} />;
  }
};

const TransactionList = ({ transactions, filter, setFilter, loading, handleDelete, formatPrice }) => {
  return (
    <section className="card">
      <div className="card-header">
        <h2 className="card-title"><Wallet size={22} color="var(--primary)" /> Transactions</h2>
        <select 
          className="filter-select" 
          value={filter} 
          onChange={(e) => setFilter(e.target.value)}
          style={{ width: 'auto', minWidth: '140px', fontSize: '0.85rem' }}
        >
          <option value="all">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
          <option value="savings">Savings</option>
        </select>
      </div>
      
      {loading ? (
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '2rem' }}>Loading...</p>
      ) : (
        <div className="transaction-list">
          <AnimatePresence>
            {transactions.length === 0 ? (
              <p style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '2rem' }}>No history yet.</p>
            ) : (
              transactions.map((t) => (
                <motion.div 
                  key={t._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className={`transaction-item ${t.type}`}
                >
                  <div className="t-icon">
                    {getIcon(t.category)}
                  </div>
                  <div className="t-details">
                    <h4>{t.description}</h4>
                    <span>{t.category} • {new Date(t.date).toLocaleDateString()}</span>
                  </div>
                  <div className="t-amount-group">
                    <div className={`t-amount ${t.type}`}>
                      {t.type === 'expense' ? '-' : '+'}{formatPrice(t.amount)}
                    </div>
                  </div>
                  <div>
                    <button className="delete-btn" onClick={() => handleDelete(t._id)}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      )}
    </section>
  );
};

export default TransactionList;
