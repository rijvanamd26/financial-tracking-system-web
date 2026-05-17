import React from 'react';
import { PlusCircle, CheckCircle2 } from 'lucide-react';
import DatePicker from '../ui/DatePicker';

const TransactionForm = ({ handleSubmit, formData, handleInputChange, currency, success, CATEGORIES }) => {
  return (
    <section className="card">
      <div className="card-header">
        <h2 className="card-title"><PlusCircle size={22} color="var(--primary)" /> New Transaction</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Transaction Type</label>
          <select name="type" value={formData.type} onChange={handleInputChange}>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
            <option value="savings">Savings</option>
          </select>
        </div>
        <div className="form-group">
          <label>Amount ({currency})</label>
          <input 
            type="number" 
            name="amount" 
            value={formData.amount} 
            onChange={handleInputChange} 
            placeholder="0.00" 
            step="0.01"
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <input 
            type="text" 
            name="description" 
            value={formData.description} 
            onChange={handleInputChange} 
            placeholder="e.g. Starbucks Coffee" 
            required
          />
        </div>
        <div className="form-group">
          <label>Category</label>
          <select name="category" value={formData.category} onChange={handleInputChange}>
            {CATEGORIES[formData.type]?.map(cat => (
              <option key={cat.name} value={cat.name}>{cat.name}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Date</label>
          <DatePicker 
            value={formData.date} 
            onChange={(val) => handleInputChange({ target: { name: 'date', value: val } })} 
          />
        </div>
        <button type="submit" className="btn-primary">
          {success ? <CheckCircle2 size={20} /> : <PlusCircle size={20} />}
          {success ? 'Success!' : `Add ${formData.type}`}
        </button>
      </form>
    </section>
  );
};

export default TransactionForm;
