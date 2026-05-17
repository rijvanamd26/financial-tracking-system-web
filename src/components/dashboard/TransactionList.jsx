import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wallet, Trash2, Pencil, Home, ShoppingCart, Activity, Coffee, Car, CreditCard, DollarSign } from 'lucide-react';
import DatePicker from '../ui/DatePicker';

const CATEGORIES = {
  expense: ['Housing', 'Food', 'Transportation', 'Utilities', 'Insurance', 'Medical', 'Savings', 'Personal', 'Entertainment'],
  income: ['Salary', 'Investments', 'Real Estate', 'Business', 'Other'],
  savings: ['Emergency Fund', 'Retirement', 'Vacation', 'Car', 'House', 'Other'],
};

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

const TransactionList = ({ transactions, filter, setFilter, loading, handleDelete, handleEdit, formatPrice }) => {
  const [pendingDeleteId, setPendingDeleteId] = useState(null);
  const [editData, setEditData] = useState(null);

  const confirmDelete = () => {
    handleDelete(pendingDeleteId);
    setPendingDeleteId(null);
  };

  const openEdit = (t) => {
    setEditData({ id: t._id, type: t.type, amount: t.amount, description: t.description, category: t.category, date: t.date });
  };

  const submitEdit = (e) => {
    e.preventDefault();
    const { id, ...data } = editData;
    handleEdit(id, data);
    setEditData(null);
  };

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
                  <div className="t-icon">{getIcon(t.category)}</div>
                  <div className="t-details">
                    <h4>{t.description}</h4>
                    <span>{t.category} • {new Date(t.date).toLocaleDateString()}</span>
                  </div>
                  <div className="t-amount-group">
                    <div className={`t-amount ${t.type}`}>
                      {t.type === 'expense' ? '-' : '+'}{formatPrice(t.amount)}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.4rem' }}>
                    <button className="edit-btn" onClick={() => openEdit(t)}>
                      <Pencil size={15} />
                    </button>
                    <button className="delete-btn" onClick={() => setPendingDeleteId(t._id)}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Delete confirmation */}
      {pendingDeleteId && (
        <div className="dialog-overlay" onClick={() => setPendingDeleteId(null)}>
          <div className="dialog-box" onClick={(e) => e.stopPropagation()}>
            <div className="dialog-icon"><Trash2 size={28} color="var(--accent)" /></div>
            <h3 className="dialog-title">Delete transaction?</h3>
            <p className="dialog-desc">This action cannot be undone.</p>
            <div className="dialog-actions">
              <button className="dialog-btn-cancel" onClick={() => setPendingDeleteId(null)}>Cancel</button>
              <button className="dialog-btn-confirm" onClick={confirmDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit modal */}
      {editData && (
        <div className="dialog-overlay" onClick={() => setEditData(null)}>
          <div className="dialog-box" style={{ width: '100%', maxWidth: '420px' }} onClick={(e) => e.stopPropagation()}>
            <div className="dialog-icon"><Pencil size={24} color="var(--primary)" /></div>
            <h3 className="dialog-title" style={{color: "white"}}>Edit Transaction</h3>
            <form onSubmit={submitEdit} style={{ marginTop: '1.25rem', textAlign: 'left' }}>
              <div className="form-group">
                <label>Type</label>
                <select
                  value={editData.type}
                  onChange={(e) => setEditData({ ...editData, type: e.target.value, category: CATEGORIES[e.target.value][0] })}
                >
                  <option value="expense">Expense</option>
                  <option value="income">Income</option>
                  <option value="savings">Savings</option>
                </select>
              </div>
              <div className="form-group">
                <label>Amount</label>
                <input
                  type="number"
                  value={editData.amount}
                  onChange={(e) => setEditData({ ...editData, amount: e.target.value })}
                  step="0.01"
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <input
                  type="text"
                  value={editData.description}
                  onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select
                  value={editData.category}
                  onChange={(e) => setEditData({ ...editData, category: e.target.value })}
                >
                  {CATEGORIES[editData.type]?.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Date</label>
                <DatePicker
                  value={editData.date}
                  onChange={(val) => setEditData({ ...editData, date: val })}
                />
              </div>
              <div className="dialog-actions" style={{ marginTop: '0.5rem' }}>
                <button type="button" className="dialog-btn-cancel" onClick={() => setEditData(null)}>Cancel</button>
                <button type="submit" className="dialog-btn-confirm" style={{ background: 'var(--primary)', color: 'white' }}>Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default TransactionList;
