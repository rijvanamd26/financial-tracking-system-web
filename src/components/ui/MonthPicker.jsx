import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar } from 'lucide-react';

const MonthPicker = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dateObj = new Date(`${value}-01T00:00:00`);
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth();

  const handleMonthSelect = (m) => {
    const newMonth = String(m + 1).padStart(2, '0');
    onChange(`${year}-${newMonth}`);
    setIsOpen(false);
  };

  const changeYear = (delta) => {
    const newYear = year + delta;
    const newMonth = String(month + 1).padStart(2, '0');
    onChange(`${newYear}-${newMonth}`);
  };

  return (
    <div style={{ position: 'relative' }}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="month-picker-btn"
        type="button"
      >
        <Calendar size={18} />
        {dateObj.toLocaleString('default', { month: 'long', year: 'numeric' })}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="custom-calendar-popup"
          >
            <div className="calendar-header">
              <button type="button" onClick={() => changeYear(-1)}>&lt;</button>
              <span>{year}</span>
              <button type="button" onClick={() => changeYear(1)}>&gt;</button>
            </div>
            <div className="calendar-grid">
              {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m, i) => (
                <button 
                  key={m} 
                  type="button"
                  className={`month-btn ${i === month ? 'active' : ''}`}
                  onClick={() => handleMonthSelect(i)}
                >
                  {m}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MonthPicker;
