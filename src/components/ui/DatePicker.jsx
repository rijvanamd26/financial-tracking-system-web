import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar } from 'lucide-react';

const DatePicker = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [viewDate, setViewDate] = useState(new Date(`${value}T00:00:00`));
  
  const viewYear = viewDate.getFullYear();
  const viewMonth = viewDate.getMonth();

  const handleDaySelect = (day) => {
    const newDate = new Date(viewYear, viewMonth, day);
    const formatted = `${newDate.getFullYear()}-${String(newDate.getMonth() + 1).padStart(2, '0')}-${String(newDate.getDate()).padStart(2, '0')}`;
    onChange(formatted);
    setIsOpen(false);
  };

  const changeMonth = (delta) => {
    setViewDate(new Date(viewYear, viewMonth + delta, 1));
  };

  const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  
  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const displayDate = new Date(`${value}T00:00:00`).toLocaleDateString('default', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="month-picker-btn"
        type="button"
        style={{ width: '100%', justifyContent: 'flex-start' }}
      >
        <Calendar size={18} />
        {displayDate}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="custom-calendar-popup"
            style={{ width: '280px', top: 'auto', bottom: 'calc(100% + 0.5rem)' }}
          >
            <div className="calendar-header">
              <button type="button" onClick={() => changeMonth(-1)}>&lt;</button>
              <span>{viewDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
              <button type="button" onClick={() => changeMonth(1)}>&gt;</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.2rem', marginBottom: '0.5rem', textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => <div key={d}>{d}</div>)}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.2rem' }}>
              {days.map((d, i) => {
                const isSelected = d && value === `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
                return (
                  <button 
                    key={i} 
                    type="button"
                    disabled={!d}
                    className={`day-btn ${isSelected ? 'active' : ''}`}
                    onClick={() => d && handleDaySelect(d)}
                    style={{ visibility: d ? 'visible' : 'hidden' }}
                  >
                    {d}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DatePicker;
